# Flight Booking Website

This is a full-stack flight booking website built using Node.js, Express.js, MongoDB for the backend, and React.js with Tailwind CSS for the frontend. The website allows users to search for flights, book tickets, and view their booking history. Admins can manage flight details including prices and schedules.

## Features

- User authentication (login/signup) with OTP verification using email.
- Admin panel for managing flights (add/edit flights).
- Search for flights by selecting departure and destination airports, class, and travel date.
- Display available flights and prices.
- Book flights and process payments via integrated payment gateway.
- View booking itinerary.
- My bookings and booking history.
- Responsive design with Tailwind CSS.

## Project Structure

### Backend

- `server.js`: Entry point for the backend server.
- `config/`: Configuration files (database, mail, etc.).
- `controllers/`: Controllers for handling requests and responses.
- `models/`: Mongoose models for MongoDB.
- `routes/`: Express routes.
- `services/`: Service layer for business logic.
- `middlewares/`: Middleware functions.
- `utils/`: Utility functions and helper modules.

### Frontend

- `public/`: Static files.
- `src/`: React application source files.
  - `components/`: Reusable components (Navbar, Footer, etc.).
  - `pages/`: Page components (Home, Login, Signup, Booking, etc.).
  - `App.js`: Main React component.
  - `index.js`: Entry point for the React application.
  - `tailwind.css`: Tailwind CSS configuration.
  - `index.css`: Global CSS styles.

## Installation

### Prerequisites

- Node.js
- MongoDB

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/flight-booking-website.git
   cd flight-booking-website


Usage

User Flow


Signup/Login: Users can sign up or log in to their account. An OTP will be sent to their registered email for verification.

Search Flights: On the homepage, users can search for flights by selecting departure and destination airports, travel class, and date.

View Flights: Users will see a list of available flights and their prices based on the search criteria.

Book Flight: Users can book a flight and proceed to the payment gateway to complete the booking.

View Itinerary: After booking, users can view their itinerary.

My Bookings: Users can view their booking history and current bookings.


Admin Flow

Admin Login: Admins can log in with their credentials.

Manage Flights: Admins can add new flights, and edit or delete existing flights, including updating prices and schedules.


Technologies Used
Backend
Node.js
Express.js
MongoDB
Mongoose
JWT for authentication
Nodemailer for sending OTP emails
Speakeasy for OTP generation and verification
Frontend
React.js
Tailwind CSS
Axios for HTTP requests
React Router for navigation