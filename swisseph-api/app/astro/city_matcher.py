import pandas as pd
import swisseph as swe
import math
from datetime import datetime

import os

current_dir = os.path.dirname(os.path.abspath(__file__))
ephe_path = os.path.join(current_dir, '..', 'ephe') # '..' goes up one level from 'astro' to 'my_astro_project'

swe.set_ephe_path(ephe_path)

# --- Constants and Pre-loaded Data for Performance ---

# Use swisseph constants for clarity and robustness.
# Defining this at the module level prevents it from being recreated on every API call.
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

def _load_cities():
    """Loads the city database from CSV, with a fallback for robustness."""
    cities_file_path = os.path.join(os.path.dirname(__file__), 'world_cities.csv')
    try:
        return pd.read_csv(cities_file_path)
    except FileNotFoundError:
        print(f"Warning: City database '{cities_file_path}' not found. Using a small hardcoded list.")
        # Fallback to a small list if the CSV is not available
        cities_list = [
            {"city": "New York", "lat": 40.7128, "lng": -74.0060},
            {"city": "London", "lat": 51.5074, "lng": -0.1278},
            {"city": "Tokyo", "lat": 35.6762, "lng": 139.6503},
        ]
        return pd.DataFrame(cities_list)

# Load the city data once when the module is imported, not on every function call.
CITIES_DF = _load_cities()

def angular_difference(deg1, deg2):
    """Calculates the shortest angle between two degrees on a circle."""
    diff = abs(deg1 - deg2) % 360
    return min(diff, 360 - diff)  # ensures it wraps correctly

def get_top_cities_for_planets(birth_dt, planets, orb_tolerance=3):
    """
    Finds the top 3 cities where specified planets were angular (on the Ascendant)
    at the time of birth.

    Args:
        birth_dt (datetime): The birth datetime object.
        planets (list): A list of planet names (e.g., ["Sun", "Moon"]).
        orb_tolerance (int, optional): The maximum allowed orb in degrees. Defaults to 3.

    Returns:
        dict: A dictionary where keys are planet names and values are lists
              of up to 3 matching cities.
    """

    # Calculate Julian Day for the birth datetime in UT
    # The hour must be a float for swe.julday, representing the fraction of the day.
    hour_float = birth_dt.hour + birth_dt.minute / 60.0 + birth_dt.second / 3600.0
    jd_ut = swe.julday(
        birth_dt.year, birth_dt.month, birth_dt.day,
        hour_float
    )

    final_results = {}

    for planet in planets:
        if planet not in PLANET_MAP:
            print(f"Warning: Invalid planet name '{planet}' skipped.")
            continue
        planet_id = PLANET_MAP[planet]

        # swe.calc_ut returns a tuple where the first element is another tuple of planetary data.
        planet_pos_data = swe.calc_ut(jd_ut, planet_id, swe.FLG_SWIEPH)
        planet_long = planet_pos_data[0][0] # Extract longitude

        planet_matches = []

        for _, city_row in CITIES_DF.iterrows():
            lat, lon = city_row["lat"], city_row["lng"]

            # --- FIX #2 (ROBUSTNESS) ---
            # The swe.houses function returns two values: (house_cusps, ascmc_data).
            # The ascmc_data tuple explicitly contains the Ascendant at index [0].
            # We also wrap this in a try-except block to gracefully handle
            # calculation errors for certain locations (e.g., extreme latitudes).
            try:
                _, ascmc_data = swe.houses(jd_ut, lat, lon, b'P')
                asc_deg = ascmc_data[0] # Ascendant in degrees
            except swe.Error:
                continue # Skip city if house calculation fails

            # Calculate the angular distance (orb) between the planet and the Ascendant
            orb = angular_difference(planet_long, asc_deg)

            if orb <= orb_tolerance:
                planet_matches.append({
                    "city": city_row["city"],
                    "orb": round(orb, 4),
                    "lat": lat,
                    "lon": lon,
                })

        # After checking all cities for the current planet, sort and get the top 3.
        if planet_matches:
            df = pd.DataFrame(planet_matches)
            top3_for_planet = df.sort_values("orb").head(3).to_dict(orient="records")
            final_results[planet] = top3_for_planet

    return final_results

# Example Usage:
if __name__ == '__main__':
    sample_birth_dt = datetime(1990, 5, 15, 10, 30)
    planets_to_check = ["Sun", "Mars"]
    orb = 2

    top_cities_per_planet = get_top_cities_for_planets(sample_birth_dt, planets_to_check, orb_tolerance=orb)

    if top_cities_per_planet:
        print(f"Found top cities with an orb of {orb}°:")
        for planet, cities in top_cities_per_planet.items():
            print(f"\n--- Top cities for {planet} ---")
            for city_data in cities:
                print(f"  - City: {city_data['city']}, Orb: {city_data['orb']:.4f}°")
    else:
        print(f"No cities found within a {orb}° orb for the specified planets.")