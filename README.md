# Symptom Tracker

A full-stack web application for tracking symptoms over time. Built with React, Node.js, Express, and MySQL.

## Features

- User authentication (login/register)
- Add, view, and delete symptoms
- Track symptom severity and notes
- Date-based symptom tracking
- Modern, responsive UI

## Prerequisites

- Node.js (v14 or higher)
- MySQL (v8.0 or higher)
- npm or yarn

## Setup

1. Clone the repository
2. Install dependencies for both server and client:

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

3. Create a `.env` file in the server directory with the following variables:

```
DB_NAME=symptom_tracker
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_HOST=localhost
JWT_SECRET=your-secret-key
PORT=1234
```

4. Create the MySQL database:

```sql
CREATE DATABASE symptom_tracker;
```

## Running the Application

1. Start the MySQL server
2. Start the backend server:

```bash
cd server
npm run dev
```

3. Start the frontend development server:

```bash
cd client
npm start
```

4. Open your browser and navigate to `http://localhost:1234`

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register a new user
- POST `/api/auth/login` - Login user

### Symptoms
- GET `/api/symptoms` - Get all symptoms for the logged-in user
- POST `/api/symptoms` - Add a new symptom
- PATCH `/api/symptoms/:id` - Update a symptom
- DELETE `/api/symptoms/:id` - Delete a symptom

## Technologies Used

- Frontend:
  - React
  - Material-UI
  - React Router
  - Axios
  - date-fns

- Backend:
  - Node.js
  - Express
  - MySQL
  - Sequelize ORM
  - JWT for authentication
  - bcrypt for password hashing 