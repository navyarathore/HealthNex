# 🏥 HealthNex: Symptom Tracker

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

A comprehensive full-stack web application for tracking health symptoms over time. Built with modern web technologies to provide a seamless user experience.

<div align="center">
  <img src="client/public/health-tracking.svg" alt="HealthNex Logo" width="150"/>
</div>

## ✨ Features

- **User Authentication** - Secure login and registration
- **Symptom Management** - Add, view, edit, and delete symptoms
- **Health Metrics** - Track symptom severity and detailed notes
- **Time-based Analytics** - Monitor symptoms over time with date filtering
- **Responsive Design** - Modern UI that works on all devices

## 🛠️ Tech Stack

### Frontend
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Material UI](https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white)
- React Router
- Axios
- date-fns

### Backend
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![MySQL](https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white)
- Sequelize ORM
- JWT Authentication
- bcrypt

## 📋 Prerequisites

- Node.js (v14 or higher)
- MySQL (v8.0 or higher)
- npm or yarn

## 🚀 Getting Started

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/navyarathore/healthnex.git
   cd healthnex
   ```

2. **Install dependencies**
   ```bash
   # Install server dependencies
   cd server
   npm install

   # Install client dependencies
   cd ../client
   npm install
   ```

3. **Environment Configuration**
   
   Create a `.env` file in the server directory with:
   ```
   DB_NAME=symptom_tracker
   DB_USER=your_mysql_username
   DB_PASSWORD=your_mysql_password
   DB_HOST=localhost
   JWT_SECRET=your-secret-key
   PORT=1234
   ```

4. **Database Setup**
   ```sql
   CREATE DATABASE symptom_tracker;
   ```

### Running the Application

1. **Start the MySQL server**

2. **Launch the backend server**
   ```bash
   cd server
   npm run dev
   ```

3. **Start the frontend development server**
   ```bash
   cd client
   npm start
   ```

4. **Access the application**
   
   Open your browser and navigate to `http://localhost:1234`

## 📡 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login user |

### Symptoms
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/symptoms` | Get all symptoms for logged-in user |
| POST | `/api/symptoms` | Add a new symptom |
| PATCH | `/api/symptoms/:id` | Update a symptom |
| DELETE | `/api/symptoms/:id` | Delete a symptom |

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Contact

If you have any questions, please open an issue or contact the project maintainers.