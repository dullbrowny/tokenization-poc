# Architecture Overview

## Project Structure

- **backend/**: Contains all backend-related code, including the Flask app, models, and tests.
- **frontend/**: Contains the React frontend, with components, pages, and API services.
- **docs/**: Documentation for the project, including architecture diagrams and README files.

## Components

### Backend (Flask)
- **app/routes.py**: Contains the API endpoints for tokenization.
- **app/models.py**: Defines the database models using SQLAlchemy.
- **app/config.py**: Configuration settings for the Flask app.
- **wsgi.py**: Entry point for running the Flask application.

### Frontend (React)
- **src/index.js**: Entry point for the React app.
- **src/App.js**: Main component of the React app.
- **src/components/**: Reusable React components.
- **src/pages/**: Page components that represent different views.

## API Overview

The backend exposes several endpoints for tokenization, detokenization, and lifecycle management. The frontend communicates with these endpoints using Axios.
