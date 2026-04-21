# AstroCart ✨

AstroCart is a full-stack web application that provides personalized astro-cartography insights. By entering your birth details, you can discover cities around the world that are astrologically significant for different aspects of your life, such as love, career, and wealth.

This project is a monorepo containing:
-   A **React frontend** built with Vite and Tailwind CSS.
-   A **Python backend** API powered by FastAPI.

## Features

-   **Personalized Calculations**: Generates astro-cartography data based on user's birth date, time, and location.
-   **Interactive UI**: A multi-step form to guide users through the process.
-   **Geocoding**: Converts user-friendly location names into latitude/longitude using the Mapbox API.
-   **Influence Focus**: Allows users to see results tailored to Love (Venus), Career (Mars), or Wealth (Jupiter).

## Prerequisites

Before you begin, ensure you have the following installed on your system:

-   [Node.js](https://nodejs.org/) (v18 or later) and npm
-   [Python](https://www.python.org/) (v3.9 or later) and pip

## Getting Started

Follow these steps to get your development environment set up and running.

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd AstroCart
```

### 2. Set Up Environment Variables

The application uses the Mapbox API for geocoding birth locations.

1.  Create a file named `.env.local` in the root of the project.
2.  Sign up for a free Mapbox account and get your public access token.
3.  Add your token to the `.env.local` file:

    ```
    VITE_MAPBOX_ACCESS_TOKEN=pk.your_mapbox_access_token_here
    ```

### 3. Install Dependencies

This single command will install the necessary Node.js packages for the frontend.

```bash
npm install
```

### 4. Set Up the Python API

This command creates a Python virtual environment inside the `swisseph-api` directory and installs all required Python packages.

```bash
npm run setup:api
```

### 5. Run the Application

This command uses `concurrently` to start both the React frontend and the FastAPI backend at the same time.

```bash
npm run dev
```

-   The frontend will be available at `http://localhost:5173`.
-   The backend API will be running at `http://localhost:8000`.