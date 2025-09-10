#!/bin/bash
# setup.sh - Setup script for ShareMyRecipe project

set -e  # exit on error

echo "Starting ShareMyRecipe setup..."

# ----------- 1. Install project dependencies -----------

echo "Installing frontend dependencies..."
cd frontend
npm install
cd ..

echo "Installing backend dependencies..."
cd backend
npm install
cd ..

# ----------- 2. Create environment files -----------

echo "Setting up environment variables..."

if [ ! -f ".env" ]; then
cat <<EOL > .env
# Backend environment
PORT=5000
SESSION_SECRET=your_session_secret_here
JWT_SECRET=your_jwt_secret_here
DB_URI=mongodb://localhost:27017/sharemyrecipe
EOL
echo ".env file created with default values. Update secrets if needed."
else
  echo ".env file already exists, skipping."
fi

# ----------- 3. Seed database -----------

echo "Seeding database..."
cd backend
npm run seed
cd ..

# ----------- 4. Start the application -----------

echo "Starting frontend and backend..."

# Start backend in a separate terminal window
gnome-terminal -- bash -c "cd backend && npm run dev; exec bash"

# Start frontend in a separate terminal window
gnome-terminal -- bash -c "cd frontend && npm start; exec bash"

echo "Setup complete! Backend running on port 5000, frontend on port 3000."
