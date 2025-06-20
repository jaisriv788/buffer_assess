# Project Name

A full-stack web application with React frontend and Node.js backend.

## Project Structure

```
project-root/
├── frontend/          # React frontend application
├── backend/           # Node.js backend server
└── README.md         # This file
```

## Prerequisites

Before running this application, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [MongoDB](https://www.mongodb.com/) (local installation or MongoDB Atlas account)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd <project-directory>
```

### 2. Backend Setup

First, set up the backend server:

```bash
# Navigate to backend directory
cd ./backend

# Install dependencies
npm install

# Install nodemon globally (for development)
npm i -g nodemon
```

#### Configure Database Connection

1. Navigate to `./backend/db/index.js`
2. Replace the MongoDB URL with your actual database connection string:

```javascript
// Example: Replace with your MongoDB connection string
const mongoURL = "mongodb://localhost:27017/your-database-name";
// or for MongoDB Atlas:
// const mongoURL = "mongodb+srv://username:password@cluster.mongodb.net/database-name";
```

#### Start Backend Server

```bash
# Make sure you're in the backend directory
cd ./backend

# Start the server with nodemon
nodemon index.js
```

The backend server should now be running (typically on port 3000 or 5000).

### 3. Frontend Setup

Open a new terminal window/tab and set up the frontend:

```bash
# Navigate to frontend directory
cd ./frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend application should now be running and accessible in your browser (typically at `http://localhost:3000` or `http://localhost:5173`).

## Running the Application

### Startup Order

**Important**: Always start the services in this order:

1. **Database**: Ensure MongoDB is running
2. **Backend**: Start the backend server first
3. **Frontend**: Start the frontend development server

### Development Workflow

```bash
# Terminal 1 - Backend
cd ./backend
nodemon index.js

# Terminal 2 - Frontend
cd ./frontend
npm run dev
```

## Configuration

### Database Configuration

- Database connection settings are located in `./backend/db/index.js`
- Make sure to update the MongoDB URL before starting the backend server
- Ensure your MongoDB instance is running and accessible

### Environment Variables

If your project uses environment variables, create a `.env` file in the backend directory:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```

## Troubleshooting

### Common Issues

1. **Port conflicts**: If you get port errors, make sure no other applications are using the same ports
2. **Database connection**: Verify your MongoDB URL is correct and the database is running
3. **Dependencies**: Run `npm install` in both directories if you encounter module errors
4. **Nodemon not found**: Install nodemon globally with `npm i -g nodemon`

### Useful Commands

```bash
# Check if nodemon is installed globally
nodemon --version

# Restart backend server
# Press Ctrl+C to stop, then run nodemon index.js again

# Clear npm cache if needed
npm cache clean --force
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

[Add your license information here]

---

**Note**: Make sure to keep your database credentials secure and never commit them to version control. Consider using environment variables for sensitive configuration.
