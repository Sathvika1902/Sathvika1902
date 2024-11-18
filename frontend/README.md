E-Commerce Product Page Application
This project was bootstrapped with Create React App.

Getting Started
Prerequisites
Docker and Docker Compose installed on your system.
Node.js and npm for local development.
AWS EC2 Instance for deployment.
Installation
Clone the repository:


git clone <>
cd Sathvika1902

Install dependencies:
npm install
Set up environment variables: Create a .env file in the root directory and add the following:


REACT_APP_API_URL= http://18.188.241.73:5000/
JWT_SECRET=your_jwt_secret
Available Scripts
In the project directory, you can run:

npm start
Runs the app in development mode.
Open http://localhost:3000 to view it in your browser.

The page will reload when you make changes.
You may also see any lint errors in the console.

npm test
Launches the test runner in the interactive watch mode.
Refer to the running tests documentation.

npm run build
Builds the app for production in the build folder. It correctly bundles React in production mode for optimized performance.

npm run eject
Note: This operation is irreversible. Once you eject, you will have full control over the configuration files and dependencies.

For more information, see the Create React App documentation.

Dockerization
This project is fully containerized. Follow these steps to run the application using Docker:

Build and run the Docker containers:


docker-compose up --build
Access the application:

http://18.188.241.73:5000/

React Frontend: http://localhost
Backend API: http://localhost:5000/api
Deployment
AWS EC2 Setup
Deploy to EC2 using Docker Compose:


docker-compose up -d
Use PM2 to manage Node.js server:


pm2 start npm --name "ecommerce-app" -- run start
Reverse Proxy with Caddy
The project uses Caddy for reverse proxy and SSL termination. The configuration is included in the Caddyfile.

Key Features
User Registration and Login with JWT-based authentication.
User Profile Page with update and logout functionality.
Cart and Wishlist are accessible only by authenticated users.
Local MongoDB Database using Docker.
AWS Deployment with Docker Compose and PM2.








