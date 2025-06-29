# main.py
from fastapi import FastAPI, Query, HTTPException
from pydantic import BaseModel, Field
from datetime import datetime
from typing import List, Optional

# Relative import from the 'astro' package
from .astro.city_matcher import get_top_cities_for_planets

app = FastAPI(
    title="Astrocartography API",
    description="An API for calculating astrocartography based on birth data.",
    version="0.1.0",
)

# Re-declare Pydantic model here or import it if defined elsewhere
class AstroRequest(BaseModel):
    birth_date: str = Field(..., example="1990-06-01T12:00:00")
    planets: List[str] = Field(["Sun", "Moon", "Mercury", "Venus", "Mars"], example=["Sun", "Moon"])
    orb_tolerance: float = Field(3.0, ge=0.0, le=10.0, example=2.5)

@app.post("/astrocartography")
def astrocartography_post(request: AstroRequest):
    """
    Calculates astrocartography for given birth data and planets via POST request.
    """
    birth_dt = datetime.fromisoformat(request.birth_date)
    results = get_top_cities_for_planets(
        birth_dt, request.planets, request.orb_tolerance
    )
    return {"results": results}

@app.get("/astrocartography")
def astrocartography_get(
    birth_date: str = Query("1990-01-01T12:00:00", description="Birth date and time in ISO format (e.g., '1990-06-01T12:00:00')"),
    planets: Optional[str] = Query(
        "Sun,Moon,Mercury,Venus,Mars",
        description="Comma-separated list of planets to include (e.g., 'Sun,Moon,Mars')"
    ),
    orb_tolerance: float = Query(3.0, ge=0.0, le=10.0, description="Orb tolerance for calculations (0.0 to 10.0)")
):
    """
    Calculates astrocartography for given birth data and planets via GET request.
    """
    try:
        birth_dt = datetime.fromisoformat(birth_date)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid birth_date format. Use ISO format (e.g., '1990-06-01T12:00:00').")

    # Split the comma-separated string into a list of planets,
    # filtering out any empty strings that result from extra commas.
    planet_list = [p.strip() for p in planets.split(',')] if planets else []

    results = get_top_cities_for_planets(birth_dt, planet_list, orb_tolerance)
    return {"results": results}

# Optional: Basic root endpoint
@app.get("/")
def read_root():
    return {"message": "Welcome to the Astrocartography API. Go to /docs for API documentation."}