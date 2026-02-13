**AI-Based Emergency Response & Risk Prediction System**
*Overview*

This project is a full-stack application that predicts hospital emergency risk and provides analytics such as accident hotspots, ambulance load, alerts, and trends.

*Tech Stack:*

Backend: Node.js, Express, MongoDB

Frontend: React.js (Vite)

Database: MongoDB

*How to Run the Project*
1. Clone the Repository
git clone <your-repository-link>
cd <project-folder>

2. Run Backend

Go to backend folder:

cd backend

Start backend server:

npm run dev


Backend will run on:

http://localhost:5000


To confirm backend is working, open in browser:

http://localhost:5000/health


If it shows "API is running", backend is working correctly.

3. Run Frontend

Open a new terminal and go to frontend folder:

cd frontend

npm run dev


Frontend will run on:

http://localhost:5173

How to Test the Application

Make sure backend is running on port 5000.

Make sure frontend is running on port 5173.

Open:

http://localhost:5173


You should see the dashboard displaying:

Hospital Risk Index

Accident Count

Active Ambulances

Average Hospital Load

Hotspots

Alerts

Trends

If data is visible and there are no console errors, the system is working properly.