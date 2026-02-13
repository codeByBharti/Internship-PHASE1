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

**Phase 3: Final Polish, Security & Completion**

This phase focused on making the system production-ready by improving security, user experience, and deployment readiness while keeping the existing functionality stable.

*Security Improvements*

Sensitive configuration values moved to environment variables.

Added secure HTTP headers using Helmet middleware.

Configured CORS to allow requests only from the frontend application.

Implemented API rate limiting to prevent abuse and excessive requests.

Added centralized global error handling to avoid exposing internal server details.

*User Experience Enhancements*

Implemented loading states while data is being fetched from the backend.

Added user-friendly error messages when API calls fail.

Displayed backend connection status on the dashboard.

Added automatic dashboard refresh at regular intervals for real-time monitoring.

*Code Quality & Architecture*

Maintained modular structure separating backend, frontend, and data logic.

Improved API response handling and failure management.

Ensured all analytics endpoints are API-consumable and scalable.

*Production Readiness*

Configured environment-based backend setup.

Generated optimized production build for frontend using Vite.

Verified all endpoints and dashboard interactions.

Project prepared for deployment and submission.