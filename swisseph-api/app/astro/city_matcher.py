import pandas as pd
import swisseph as swe
import math
from datetime import datetime
import os
from timezonefinder import TimezoneFinder
import pytz

# --- Setup Ephemeris Path ---
# This ensures the script can find the necessary Swiss Ephemeris data files.
# It assumes an 'ephe' directory is located one level up from this script's directory.
try:
    current_dir = os.path.dirname(os.path.abspath(__file__))
    ephe_path = os.path.join(current_dir, '..', 'ephe')
    swe.set_ephe_path(ephe_path)
except Exception as e:
    print(f"Warning: Could not set ephemeris path. Ensure 'ephe' directory exists. Error: {e}")


# --- Constants and Pre-loaded Data for Performance ---

# Use swisseph constants for clarity and robustness.
PLANET_MAP = {
    "Sun": swe.SUN,
    "Moon": swe.MOON,
    "Mercury": swe.MERCURY,
    "Venus": swe.VENUS,
    "Mars": swe.MARS,
    "Jupiter": swe.JUPITER,
    "Saturn": swe.SATURN,
    "Uranus": swe.URANUS,
    "Neptune": swe.NEPTUNE,
    "Pluto": swe.PLUTO
}

TF = TimezoneFinder() # Initialize the timezone finder once.

def _load_cities():
    """Loads the city database from CSV, with a fallback for robustness."""
    cities_file_path = os.path.join(os.path.dirname(__file__), 'world_cities.csv')
    try:
        df = pd.read_csv(cities_file_path)
        # Standardize column names if they differ
        if 'lng' in df.columns:
            df.rename(columns={'lng': 'lon'}, inplace=True)
        return df
    except FileNotFoundError:
        print(f"Warning: City database '{cities_file_path}' not found. Using a small hardcoded list.")
        cities_list = [
            {"city": "New York", "lat": 40.7128, "lon": -74.0060},
            {"city": "London", "lat": 51.5074, "lon": -0.1278},
            {"city": "Tokyo", "lat": 35.6762, "lon": 139.6503},
        ]
        return pd.DataFrame(cities_list)

# Load the city data once when the module is imported.
CITIES_DF = _load_cities()

def angular_difference(deg1, deg2):
    """Calculates the shortest angle between two degrees on a circle."""
    diff = abs(deg1 - deg2) % 360
    return min(diff, 360 - diff)

def get_top_cities_for_planets(birth_dt, birth_lat, birth_lon, planets, orb_tolerance=3):
    """
    Finds top cities where specified planets were angular, based on a local birth time and location.

    Args:
        birth_dt (datetime): The local birth datetime (assumed to be naive).
        birth_lat (float): Latitude of the birth location.
        birth_lon (float): Longitude of the birth location.
        planets (list): A list of planet names (e.g., ["Sun", "Moon"]).
        orb_tolerance (int, optional): The maximum allowed orb in degrees. Defaults to 3.

    Returns:
        dict: A dictionary where keys are planet names and values are lists of matching cities.
    """
    # --- UTC Conversion from Local Birth Time and Location ---
    # 1. Find the timezone for the birth location.
    tz_name = TF.timezone_at(lng=birth_lon, lat=birth_lat)
    if not tz_name:
        raise ValueError(f"Could not determine timezone for lat={birth_lat}, lon={birth_lon}")

    # 2. Localize the naive birth datetime to its timezone.
    local_tz = pytz.timezone(tz_name)
    local_dt = local_tz.localize(birth_dt)

    # 3. Convert the localized datetime to UTC for all calculations.
    utc_dt = local_dt.astimezone(pytz.utc)

    # 4. Calculate Julian Day from the now-accurate UTC datetime.
    hour_float = utc_dt.hour + utc_dt.minute / 60.0 + utc_dt.second / 3600.0
    jd_ut = swe.julday(utc_dt.year, utc_dt.month, utc_dt.day, hour_float)

    final_results = {}

    for planet in planets:
        if planet not in PLANET_MAP:
            print(f"Warning: Invalid planet name '{planet}' skipped.")
            continue
        planet_id = PLANET_MAP[planet]

        planet_pos_data = swe.calc_ut(jd_ut, planet_id, swe.FLG_SWIEPH)
        planet_long = planet_pos_data[0][0]

        planet_matches = []

        for _, city_row in CITIES_DF.iterrows():
            lat, lon = city_row["lat"], city_row["lon"]

            try:
                _, ascmc_data = swe.houses(jd_ut, lat, lon, b'P')
                asc_deg = ascmc_data[0]
            except swe.Error:
                continue # Skip city if house calculation fails

            orb = angular_difference(planet_long, asc_deg)

            if orb <= orb_tolerance:
                planet_matches.append({
                    "city": city_row["city"],
                    "orb": round(orb, 4),
                    "lat": lat,
                    "lon": lon,
                })

        if planet_matches:
            df = pd.DataFrame(planet_matches)
            top3_for_planet = df.sort_values("orb").head(3).to_dict(orient="records")
            final_results[planet] = top3_for_planet

    return final_results

# Example Usage:
if __name__ == '__main__':
    # --- Input Data ---
    # Example: A person born in Chicago, USA
    local_birth_dt = datetime(1992, 11, 3, 14, 45) # Nov 3, 1992, 2:45 PM
    birth_latitude = 41.8781  # Latitude for Chicago
    birth_longitude = -87.6298 # Longitude for Chicago

    planets_to_check = ["Sun", "Moon", "Venus"]
    orb = 2

    top_cities_per_planet = get_top_cities_for_planets(
        local_birth_dt,
        birth_latitude,
        birth_longitude,
        planets_to_check,
        orb_tolerance=orb
    )

    if top_cities_per_planet:
        print(f"Found top cities with an orb of {orb}° for a birth in Chicago:")
        for planet, cities in top_cities_per_planet.items():
            print(f"\n--- Top cities for {planet} ---")
            for city_data in cities:
                print(f"  - City: {city_data['city']}, Orb: {city_data['orb']:.4f}°")
    else:
        print(f"No cities found within a {orb}° orb for the specified planets.")