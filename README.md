# DriveHive Backend

This document provides an overview of the backend code for the DriveHive project. The backend is responsible for handling the server-side logic, database interactions, and API endpoints.

## Table of Contents
- [Installation](#installation)
- [Frontend](#frontend)
- [Backend](#backend)

## Frontend

The frontend is built using React and Tailwind CSS. Here are the main components and their purposes:

- **Home.jsx**: The main landing page of the application.
- **Navbar.jsx**: The navigation bar component.
- **SignUpUser.jsx**: The sign-up form for users.
- **LoginUser.jsx**: The login form for users.
- **SignUpCaptain.jsx**: The sign-up form for captains.
- **LoginCaptain.jsx**: The login form for captains.
- **App.jsx**: The main application component that sets up routing.

### Installation

To install the frontend dependencies, run the following command:

```bash
npm install
```

### Usage

To start the frontend development server, use the following command:

```bash
npm run dev
```

## Backend

The backend is built using Node.js, Express, and MongoDB. Here are the main components and their purposes:

- **controllers/**: Contains the logic for handling requests and responses.
    - **user.controller.js**: Handles user-related operations.
    - **captain.controller.js**: Handles captain-related operations.
- **models/**: Defines the database schemas and interacts with the database.
    - **user.model.js**: Defines the schema for users.
    - **captain.model.js**: Defines the schema for captains.
    - **blacklistToken.model.js**: Defines the schema for blacklisted tokens.
- **routes/**: Defines the API endpoints and maps them to controller functions.
    - **user.router.js**: Routes for user-related operations.
    - **captain.router.js**: Routes for captain-related operations.
- **middlewares/**: Contains middleware functions.
    - **isAuthenticated.js**: Middleware to check if a user or captain is authenticated.
- **db/**: Contains the database connection logic.
    - **db.js**: Connects to the MongoDB database.
- **utils/**: Contains utility functions.
    - **constants.js**: Defines API endpoint constants.
- **index.js**: The entry point of the backend application. It sets up the server and middleware.

### Installation

To install the backend dependencies, run the following command:

```bash
npm install
```

### Usage

To start the backend server, use the following command:

```bash
npm start
```

### Environment Variables

Create a `.env` file in the root directory and add the following environment variables:

```properties
PORT = 8000
MONGO_URI = your_mongodb_connection_string
JWT_SECRET = your_jwt_secret
```

### API Endpoints

Here are some example API endpoints:

- `POST /api/user/register`: Registers a new user.
- `POST /api/user/login`: Logs in a user.
- `GET /api/user/getProfile`: Fetches the profile of an authenticated user.
- `GET /api/user/logout`: Logs out a user.
- `POST /api/captain/register`: Registers a new captain.
- `POST /api/captain/login`: Logs in a captain.
- `GET /api/captain/getProfile`: Fetches the profile of an authenticated captain.
- `GET /api/captain/logout`: Logs out a captain.

### Database Schema

The database schema is defined in the models folder. Here are the schemas for users and captains:

#### User Schema

```javascript
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
        firstName: {
                type: String,
                required: "First name is required",
                minlength: [3, "First name should be atleast 3 characters long"]
        },
        lastName: {
                type: String, 
                minlength: [3, "Last name should be atleast 3 characters long"]
        },
        email: {
                type: String,
                required: "Email is required",
                unique: true,
                minlength: [5, "Email should be atleast 5 characters long"]
        },
        password: {
                type: String,
                required: "true",
        },
        socketId: {
                type: String,
        }
}, {timestamps: true})

export const User = mongoose.model("User", userSchema);
```

#### Captain Schema

```javascript
import mongoose from "mongoose";

const captainSchema = new mongoose.Schema({
        firstName: {
                type: String,
                required: true,
                minlength: [3, "First name should be atleast 3 characters long"]
        },
        lastName: {
                type: String, 
                minlength: [3, "Last name should be atleast 3 characters long"]
        },
        email: {
                type: String,
                required: true,
                unique: true,
                minlength: [5, "Email should be atleast 5 characters long"]
        },
        password: {
                type: String,
                required: "true",
        },
        socketId: {
                type: String,
        },
        status:{
                type: String,
                enum: ["active", "inactive"],
                default: 'inactive',
        },
        vehicle:{
                color:{
                        type: String,
                        required: true,
                        minlength: [3, "Color should be atleast 3 characters long"]
                },
                plate:{
                        type: String,
                        required: true,
                        minlength: [3, "Plate should be atleast 3 characters long"]
                },
                capacity:{
                        type: Number,
                        required: true,
                        min: [1, "Capacity should be atleast 1"]
                },
                vehicleType:{
                        type: String,
                        enum: ["car", "auto", "motorcycle"],
                        required: true,
                }
        },
        location: {
                lat:{
                        type: Number,
                },
                lng:{
                        type: Number,
                }
        }
})

export const Captain = mongoose.model("Captain", captainSchema);
```
# DriveHive

This document provides an overview of the DriveHive project, including both the frontend and backend components.

## Table of Contents
- [Frontend](#frontend)
- [Backend](#backend)
- [Installation](#installation)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Contributing](#contributing)
- [License](#license)

## Frontend

The frontend is built using React and Tailwind CSS. Here are the main components and their purposes:

- **Home.jsx**: The main landing page of the application.
- **Navbar.jsx**: The navigation bar component.
- **SignUpUser.jsx**: The sign-up form for users.
- **LoginUser.jsx**: The login form for users.
- **SignUpCaptain.jsx**: The sign-up form for captains.
- **LoginCaptain.jsx**: The login form for captains.
- **App.jsx**: The main application component that sets up routing.

## Backend

The backend is built using Node.js, Express, and MongoDB. Here are the main components and their purposes:

- **controllers/**: Contains the logic for handling requests and responses.
    - **user.controller.js**: Handles user-related operations.
    - **captain.controller.js**: Handles captain-related operations.
- **models/**: Defines the database schemas and interacts with the database.
    - **user.model.js**: Defines the schema for users.
    - **captain.model.js**: Defines the schema for captains.
    - **blacklistToken.model.js**: Defines the schema for blacklisted tokens.
- **routes/**: Defines the API endpoints and maps them to controller functions.
    - **user.router.js**: Routes for user-related operations.
    - **captain.router.js**: Routes for captain-related operations.
- **middlewares/**: Contains middleware functions.
    - **isAuthenticated.js**: Middleware to check if a user or captain is authenticated.
- **db/**: Contains the database connection logic.
    - **db.js**: Connects to the MongoDB database.
- **utils/**: Contains utility functions.
    - **constants.js**: Defines API endpoint constants.
- **index.js**: The entry point of the backend application. It sets up the server and middleware.

## Installation

To install the dependencies for both frontend and backend, run the following commands in their respective directories:

```bash
npm install
```

## Usage

To start the frontend development server, use the following command:

```bash
npm run dev
```

To start the backend server, use the following command:

```bash
npm start
```

## Environment Variables

Create a `.env` file in the root directory and add the following environment variables:

```properties
PORT = 8000
MONGO_URI = your_mongodb_connection_string
JWT_SECRET = your_jwt_secret
```

## API Endpoints

Here are some example API endpoints:

- `POST /api/user/register`: Registers a new user.
- `POST /api/user/login`: Logs in a user.
- `GET /api/user/getProfile`: Fetches the profile of an authenticated user.
- `GET /api/user/logout`: Logs out a user.
- `POST /api/captain/register`: Registers a new captain.
- `POST /api/captain/login`: Logs in a captain.
- `GET /api/captain/getProfile`: Fetches the profile of an authenticated captain.
- `GET /api/captain/logout`: Logs out a captain.

## Database Schema

The database schema is defined in the models folder. Here are the schemas for users and captains:

### User Schema

```javascript
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
        firstName: {
                type: String,
                required: "First name is required",
                minlength: [3, "First name should be atleast 3 characters long"]
        },
        lastName: {
                type: String, 
                minlength: [3, "Last name should be atleast 3 characters long"]
        },
        email: {
                type: String,
                required: "Email is required",
                unique: true,
                minlength: [5, "Email should be atleast 5 characters long"]
        },
        password: {
                type: String,
                required: "true",
        },
        socketId: {
                type: String,
        }
}, {timestamps: true})

export const User = mongoose.model("User", userSchema);
```

### Captain Schema

```javascript
import mongoose from "mongoose";

const captainSchema = new mongoose.Schema({
        firstName: {
                type: String,
                required: true,
                minlength: [3, "First name should be atleast 3 characters long"]
        },
        lastName: {
                type: String, 
                minlength: [3, "Last name should be atleast 3 characters long"]
        },
        email: {
                type: String,
                required: true,
                unique: true,
                minlength: [5, "Email should be atleast 5 characters long"]
        },
        password: {
                type: String,
                required: "true",
        },
        socketId: {
                type: String,
        },
        status:{
                type: String,
                enum: ["active", "inactive"],
                default: 'inactive',
        },
        vehicle:{
                color:{
                        type: String,
                        required: true,
                        minlength: [3, "Color should be atleast 3 characters long"]
                },
                plate:{
                        type: String,
                        required: true,
                        minlength: [3, "Plate should be atleast 3 characters long"]
                },
                capacity:{
                        type: Number,
                        required: true,
                        min: [1, "Capacity should be atleast 1"]
                },
                vehicleType:{
                        type: String,
                        enum: ["car", "auto", "motorcycle"],
                        required: true,
                }
        },
        location: {
                lat:{
                        type: Number,
                },
                lng:{
                        type: Number,
                }
        }
})

export const Captain = mongoose.model("Captain", captainSchema);
```

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
- [Folder Structure](#folder-structure)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Contributing](#contributing)
- [License](#license)

## Installation

To install the backend dependencies, run the following command:

```bash
npm install
```

## Usage

To start the backend server, use the following command:

```bash
npm start
```

## Folder Structure

The backend folder structure is as follows:

```
backend/
├── controllers/
│   └── exampleController.js
├── models/
│   └── exampleModel.js
├── routes/
│   └── exampleRoutes.js
├── utils/
│   └── exampleUtil.js
├── app.js
└── config.js
```

### Controllers

- **exampleController.js**: Contains the logic for handling requests and responses.

### Models

- **exampleModel.js**: Defines the database schema and interacts with the database.

### Routes

- **exampleRoutes.js**: Defines the API endpoints and maps them to controller functions.

### Utils

- **exampleUtil.js**: Contains utility functions used throughout the backend.

### app.js

The entry point of the backend application. It sets up the server and middleware.

### config.js

Contains configuration settings for the backend application.

## API Endpoints

Here are some example API endpoints:

- `GET /api/example`: Fetches example data.
- `POST /api/example`: Creates a new example entry.
- `PUT /api/example/:id`: Updates an existing example entry.
- `DELETE /api/example/:id`: Deletes an example entry.

## Database Schema

The database schema is defined in the models folder. Here is an example schema:

```javascript
const mongoose = require('mongoose');

const exampleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Example', exampleSchema);
```

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.