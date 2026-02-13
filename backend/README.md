**AI Emergency Pressure & Ambulance Load Prediction System**

*Phase 1 – Core Foundation*

Overview

Backend foundation for an AI-based emergency management system.
Phase 1 delivers a Minimum Viable Product (MVP) to analyze emergency pressure, accident hotspots, and ambulance load.

*Tech Stack*

Node.js

Express.js

MongoDB Atlas

Mongoose

*Core Features*

Hospital emergency pressure calculation

Accident hotspot identification

Ambulance arrival load analysis

*API Endpoints (Testing URLs)*

Hospital Pressure

http://localhost:5000/api/pressure


Accident Hotspots

http://localhost:5000/api/accidents/hotspots


Ambulance Load

http://localhost:5000/api/ambulances/load

*Setup & Run*
npm install
npm run dev


*Environment file:*

PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string

*Notes*

Emergency load is simulated for Phase 1

Backend-only implementation

Clean foundation for AI-based prediction in future phases