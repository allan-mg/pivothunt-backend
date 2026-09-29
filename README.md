# PivotHunt Backend

Backend API for PivotHunt, a full-stack job search platform built with Node.js, Express, MongoDB, and JWT authentication.

## Features

- User registration and login
- JWT authentication
- Protected routes
- User profile management
- Save and delete jobs
- Create and manage job applications
- Update application status and notes
- Request and error logging with Winston
- Request validation with Celebrate and Joi
- Centralized error handling
- MongoDB persistence with Mongoose

## Technologies

- Node.js
- Express
- MongoDB
- Mongoose
- JSON Web Token
- bcryptjs
- Celebrate / Joi
- Winston
- express-winston
- CORS
- ESLint
- Airbnb JavaScript Style Guide
- Nodemon

## Project Structure

```text
pivothunt-backend/
├── controllers/
├── middlewares/
├── models/
├── routes/
├── utils/
├── app.js
├── package.json
├── .editorconfig
├── .eslintrc
├── .env.example
└── README.md

Environment Variables
Create a .env file in the root of the project.
Example:
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/pivothunt
JWT_SECRET=your_jwt_secret_here
NODE_ENV=development

Do not commit real environment variables or secrets to the repository.
Installation
Clone the repository:
git clone https://github.com/allan-mg/pivothunt-backend.git

Enter the project directory:
cd pivothunt-backend

Install dependencies:
npm install

Create a .env file based on .env.example.
Run the development server:
npm run dev

Run the production server:
npm start

Scripts
npm run dev

Runs the API with Nodemon.
npm start

Runs the API with Node.js.
npx eslint .

Checks the project with ESLint.
API Endpoints
Authentication
POST /signup
POST /signin

Users
GET   /users/me
PATCH /users/me

Saved Jobs
GET    /saved-jobs
POST   /saved-jobs
DELETE /saved-jobs/:savedJobId

Applications
GET    /applications
POST   /applications
PATCH  /applications/:applicationId/status
PATCH  /applications/:applicationId/notes
DELETE /applications/:applicationId

Protected routes require an authorization header:
Authorization: Bearer <token>

Error Handling
The API uses centralized error handling.
Common HTTP status codes include:
- 400 — Invalid request data
- 401 — Authentication required or invalid token
- 404 — Resource not found
- 409 — Duplicate resource
- 500 — Internal server error
Logging
HTTP requests are logged to:
request.log

Server errors are logged to:
error.log

Log files are ignored by Git.
Deployment
Production API URL:
https://pivothunt-backend.onrender.com

Repository
https://github.com/allan-mg/pivothunt-backend
Author
Allan Martínez González
```
