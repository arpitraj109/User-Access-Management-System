# User Access Management System

This project is a full-stack application for managing user access to software. It provides a frontend built with React and a backend built with Node.js, Express, and TypeORM.

## Features

- **User Authentication**: Sign up and log in with role-based access control (Employee, Manager, Admin).
- **Software Management**: Admins can create new software entries with customizable access levels.
- **Access Requests**: Employees can request access to software, and managers can approve or reject these requests.
- **Pending Requests Dashboard**: Managers can view and manage pending access requests.

## Project Structure

- **Frontend**: Located in the `frontend` directory, built with React and React Router.
  - Key components include Login, Signup, RequestAccess, CreateSoftware, and PendingRequests.
- **Backend**: Located in the `backend` directory, built with Node.js, Express, and TypeORM.
  - Includes routes, controllers, middleware, and entity definitions for users, software, and access requests.

## Setup Instructions

### Prerequisites

- Node.js and npm installed
- PostgreSQL database

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd user-access-management/backend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the `backend` directory with the following variables:
   ```
   PORT=3000
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=your_db_username
   DB_PASSWORD=your_db_password
   DB_NAME=your_db_name
   JWT_SECRET=your_jwt_secret
   ```
4. Start the backend server:
   ```
   npm start
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd user-access-management/frontend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Start the frontend development server:
   ```
   npm start
   ```

## Usage

- Open your browser and navigate to `http://localhost:5173` to access the application.
- Sign up or log in to access the features based on your role.

## License

This project is licensed under the MIT License.
