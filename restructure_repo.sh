#!/bin/bash

# Step 1: Create the directory structure
mkdir -p backend/app
mkdir -p frontend/src/components
mkdir -p frontend/src/pages
mkdir -p docs

# Step 2: Move backend files to their respective directories
mv tokenization_service.py backend/app/routes.py
mv models.py backend/app/models.py
mv requirements.txt backend/requirements.txt

# Step 3: Create backend config and wsgi files
cat <<EOF > backend/app/config.py
# Configuration settings for the Flask app

class Config:
    SECRET_KEY = 'your-secret-key'
    SQLALCHEMY_DATABASE_URI = 'sqlite:///tokens.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
EOF

cat <<EOF > backend/wsgi.py
from app import app

if __name__ == "__main__":
    app.run()
EOF

# Step 4: Move tests to the backend/tests directory
mv tests/test_tokenization_service.py backend/tests/

# Step 5: Create frontend package.json (for React)
cat <<EOF > frontend/package.json
{
  "name": "tokenization-frontend",
  "version": "1.0.0",
  "description": "Frontend for Tokenization POC",
  "main": "index.js",
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "dependencies": {
    "axios": "^0.21.1",
    "react": "^17.0.2",
    "react-dom": "^17.0.2",
    "react-scripts": "4.0.3"
  }
}
EOF

# Step 6: Create a basic frontend structure
cat <<EOF > frontend/src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
EOF

cat <<EOF > frontend/src/App.js
import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Tokenization POC</h1>
    </div>
  );
}

export default App;
EOF

# Step 7: Update .gitignore to ignore node_modules and venv
cat <<EOF > .gitignore
# Python
venv/
__pycache__/

# Node
node_modules/
build/

# Environment
.env
EOF

# Step 8: Update README.md to reflect the new structure
cat <<EOF > docs/architecture.md
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
EOF

# Step 9: Add, commit, and push the changes
git add .
git commit -m "Restructure repo to include backend and frontend"
git push origin main

echo "Repo restructured and pushed successfully."

