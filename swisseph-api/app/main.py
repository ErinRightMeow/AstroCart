from fastapi import FastAPI, HTTPException, Query
from pydantic import BaseModel, Field
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
from typing import List, Dict, Any, Optional
import uuid
import json
from pathlib import Path

# Assuming your updated script is in a directory structure like:
# project_folder/
# ├── app/
# │   ├── __init__.py
# │   ├── main.py
# │   └── astro/
# │       ├── __init__.py
# │       ├── city_matcher.py
# │       └── world_cities.csv
# To run, cd into project_folder and use: uvicorn app.main:app --reload
try:
    from app.astro.city_matcher import get_top_cities_for_planets
except ImportError:
    # Fallback for environments where the structure might differ
    try:
        from astro.city_matcher import get_top_cities_for_planets
    except ImportError:
        def get_top_cities_for_planets(*args, **kwargs):
            raise RuntimeError("The 'city_matcher' module could not be found. "
                               "Please ensure your project structure is correct.")

app = FastAPI(
    title="Astro-Cartography API",
    description="API to find astrological power spots based on birth data.",
    version="1.2.0"
)

# --- CORS Middleware Setup ---
# This allows the frontend (running on a different port) to communicate with the API.
# It's crucial for development when your UI and API are on different "origins".
origins = [
    "http://localhost:5173",  # Your Vite frontend
    "http://127.0.0.1:5173", # Also allow the IP address
    "http://localhost:3000",  # A common port for Create React App
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)

# --- Setup for Storing Results ---
# Create a directory to store results if it doesn't exist.
RESULTS_DIR = Path(__file__).parent.parent / "data"
RESULTS_DIR.mkdir(exist_ok=True)

class AstroPostRequest(BaseModel):
    birth_dt: datetime = Field(
        ...,
        description="The local date and time of birth (naive, without timezone).",
        example="1992-11-03T14:45:00"
    )
    birth_lat: float = Field(
        ...,
        description="The geographic latitude of the birth location.",
        example=41.8781
    )
    birth_lon: float = Field(
        ...,
        description="The geographic longitude of the birth location.",
        example=-87.6298
    )
    planets: List[str] = Field(
        ...,
        description="A list of planets to check.",
        example=["Sun", "Moon", "Venus"]
    )
    orb_tolerance: float = Field(
        default=2.0,
        ge=0.0,
        le=10.0,
        description="The maximum allowed orb of influence in degrees.",
        example=2.0
    )

class AstroPostResponse(BaseModel):
    result_id: str = Field(..., description="A unique ID to retrieve the results later.")
    message: str = Field(..., description="A confirmation message.")

@app.post("/astrocartography", response_model=AstroPostResponse)
def astrocartography_post(request: AstroPostRequest):
    """
    Calculates astro-cartography locations and saves the result for later retrieval.
    This is ideal for a multi-step user flow where results are shown on a different screen.
    It returns a `result_id` which can be used with the `/results/{result_id}` endpoint.
    """
    try:
        results = get_top_cities_for_planets(
            birth_dt=request.birth_dt,
            birth_lat=request.birth_lat,
            birth_lon=request.birth_lon,
            planets=request.planets,
            orb_tolerance=request.orb_tolerance
        )

        # Overwrite the mockResults.json file with the new data.
        # This allows the frontend to fetch a consistent endpoint for the latest results.
        result_id = "mockResults"
        result_file = RESULTS_DIR / f"{result_id}.json"

        # Save results to a JSON file
        with open(result_file, 'w') as f:
            json.dump(results, f, indent=4)

        return {
            "result_id": result_id,
            "message": "Calculation successful. Results have been updated."
        }
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        raise HTTPException(status_code=500, detail="An internal server error occurred during calculation.")


@app.get("/astrocartography", response_model=Dict[str, Any])
def astrocartography_get(
    birth_dt: datetime = Query(..., description="Birth date and time in ISO format.", example="1992-11-03T14:45:00"),
    birth_lat: float = Query(..., description="Geographic latitude of birth.", example=41.8781),
    birth_lon: float = Query(..., description="Geographic longitude of birth.", example=-87.6298),
    planets: str = Query("Sun,Moon,Venus", description="Comma-separated list of planets."),
    orb_tolerance: float = Query(2.0, ge=0.0, le=10.0, description="Orb tolerance in degrees.")
):
    """
    Calculates and returns astro-cartography locations directly in a single GET request.
    This method is useful for quick testing or creating shareable links for immediate results.
    """
    try:
        planet_list = [p.strip() for p in planets.split(',') if p.strip()]
        if not planet_list:
            raise ValueError("The 'planets' query parameter cannot be empty.")

        results = get_top_cities_for_planets(
            birth_dt=birth_dt,
            birth_lat=birth_lat,
            birth_lon=birth_lon,
            planets=planet_list,
            orb_tolerance=orb_tolerance
        )
        return results
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        raise HTTPException(status_code=500, detail="An internal server error occurred during calculation.")

@app.get("/results/{result_id}", response_model=Dict[str, Any])
def get_astrocartography_result(result_id: str):
    """
    Retrieves a previously calculated astro-cartography result by its ID.
    """
    # Basic security check for path traversal
    if not result_id.replace('-', '').isalnum() or ".." in result_id or "/" in result_id:
        raise HTTPException(status_code=400, detail="Invalid result ID format.")

    result_file = RESULTS_DIR / f"{result_id}.json"
    if not result_file.is_file():
        raise HTTPException(status_code=404, detail="Result not found.")

    try:
        return json.loads(result_file.read_text())
    except Exception as e:
        print(f"An error occurred reading result file: {e}")
        raise HTTPException(status_code=500, detail="Could not retrieve result.")

@app.get("/", include_in_schema=False)
def root():
    """A simple root endpoint to confirm the API is running."""
    return {"message": "Astro-Cartography API is running. Navigate to /docs for the interactive API documentation."}