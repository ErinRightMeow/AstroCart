# Astro-Cartography API

This is a FastAPI service that provides the backend logic for the AstroCart application. It handles the calculation of astro-cartography lines and provides city recommendations based on a user's birth data.

## Technology Stack

-   **FastAPI**: For building the high-performance API.
-   **Pydantic**: For data validation and settings management.
-   **Uvicorn**: As the ASGI server.
-   **Pandas & Swiss Ephemeris**: For the core astrological calculations.

## Standalone Setup

While the recommended way to run this service is via the root `package.json` scripts, you can also run it independently.

1.  **Navigate to the API directory:**
    ```bash
    cd swisseph-api
    ```

2.  **Create and activate a virtual environment:**
    ```bash
    python3 -m venv venv
    source venv/bin/activate
    # On Windows, use: venv\Scripts\activate
    ```

3.  **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

## Running the API

To start the server with live reloading for development:

```bash
uvicorn app.main:app --reload --port 8000
```

The API will be available at `http://localhost:8000`.

## API Documentation

Once the server is running, interactive API documentation (provided by Swagger UI) is available at:

http://localhost:8000/docs

## Data Storage

For development purposes, calculation results are stored as JSON files in the `/data` directory. The `POST /astrocartography` endpoint is configured to overwrite `data/mockResults.json`, which is then read by the frontend. This allows for a rapid development loop without needing a database.