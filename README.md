# DriveHive

## Project Structure

- **Backend/**: Contains the server-side code and logic.
  - **controllers/**: Contains the logic for handling HTTP requests.
    - **captain.controller.js**: Handles captain-related requests.
    - **map.controller.js**: Handles map-related requests.
    - **ride.controller.js**: Handles ride-related requests.
    - **user.controller.js**: Handles user-related requests.
  - **db/**: Contains the database connection and setup.
    - **db.js**: Database configuration file.
  - **index.js**: The main entry point for the backend application.
  - **middlewares/**: Contains middleware functions for request handling.
    - **isAuthenticated.js**: Middleware to check if the user is authenticated.
  - **models/**: Contains the Mongoose models for the application.
    - **blacklistToken.model.js**: Model for blacklisted tokens.
    - **captain.model.js**: Model for captain data.
    - **ride.model.js**: Model for ride data.
    - **user.model.js**: Model for user data.
  - **package.json**: Contains metadata about the backend project and its dependencies.
  - **routes/**: Defines the routes for the backend.
    - **captain.router.js**: Routes for captain-related actions.
    - **maps.routes.js**: Routes for map-related actions.
    - **ride.routes.js**: Routes for ride-related actions.
    - **user.router.js**: Routes for user-related actions.
  - **services/**: Contains the business logic for various entities.
    - **captain.service.js**: Service for captain-related operations.
    - **maps.service.js**: Service for map-related operations.
    - **ride.service.js**: Service for ride-related operations.

- **Frontend/**: Contains the client-side code for the application.
  - **.DS_Store**: A macOS-specific file used by Finder.
  - **.gitignore**: Specifies files and directories to be ignored by Git.
  - **eslint.config.js**: Configuration file for ESLint.
  - **index.html**: The main HTML file for the frontend.
  - **package.json**: Contains metadata about the frontend project and its dependencies.
  - **postcss.config.js**: Configuration file for PostCSS.
  - **public/**: Contains static files served by the frontend.
    - **.DS_Store**: A macOS-specific file used by Finder.
    - **README.md**: Provides an overview of the frontend project.
  - **src/**: Contains the source code for the frontend application.
    - **App.css**: Main CSS file for the frontend.
    - **App.jsx**: Main React component for the application.
    - **assets/**: Contains static assets like images and icons.
    - **components/**: Contains reusable React components.
      - **shared/**: Shared components across different pages.
        - **About.jsx**: About page component.
        - **CheckRides.jsx**: Component to check rides.
        - **ConnectedMap.jsx**: Map component integrated with the app.
        - **Contact.jsx**: Contact page component.
        - **Dashboard.jsx**: Dashboard page component.
        - **Features.jsx**: Features section component.
        - **Footer.jsx**: Footer component.
        - **Home.jsx**: Home page component.
        - **Loader.jsx**: Loading spinner component.
        - **Map.jsx**: Map component.
        - **Navbar.jsx**: Navigation bar component.
        - **Profile.jsx**: User profile component.
        - **Suggestions.jsx**: Suggestions section component.
    - **Images/**: Contains image assets used in the frontend.
      - **lights.avif**: Image for lights.
      - **taxi.avif**: Image for taxi.
    - **index.css**: Global styles for the frontend.
    - **main.jsx**: The entry point for the frontend React application.
    - **redux/**: Contains Redux slices for state management.
      - **authSlice.js**: Redux slice for authentication state.
      - **endSlice.js**: Redux slice for end state.
      - **loadingSlice.js**: Redux slice for loading state.
      - **locationSlice.js**: Redux slice for location state.
      - **startSlice.js**: Redux slice for start state.
    - **store.js**: Configures the Redux store.
    - **utils/**: Contains utility functions for the frontend.
      - **constants.jsx**: File with constant values used throughout the app.
  - **tailwind.config.js**: Configuration file for Tailwind CSS.
  - **vite.config.js**: Configuration file for Vite bundler.

- **.gitignore**: Specifies files and directories to be ignored by Git.
- **README.md**: Provides an overview of the entire project.
- **package.json**: Contains metadata about the project and its dependencies.


# Middleware

### isAuthenticated
The `isAuthenticated` middleware checks if the user is authenticated by verifying the JWT token. It is used in the `getProfile` route.

### isAuthCaptain
The `isAuthCaptain` middleware checks if the captain is authenticated by verifying the JWT token. It is used in the `getProfileCaptain` route.

---

# Models

### User Model
The User model is defined in `models/user.model.js` and includes the following fields:
- **firstName** (String, required, minimum length 3)  
- **lastName** (String, minimum length 3)  
- **email** (String, required, unique, minimum length 5)  
- **password** (String, required)  
- **socketId** (String)  

### Captain Model
The Captain model is defined in `models/captain.model.js` and includes the following fields:
- **firstName** (String, required, minimum length 3)  
- **lastName** (String, minimum length 3)  
- **email** (String, required, unique, minimum length 5)  
- **password** (String, required)  
- **socketId** (String)  
- **status** (String, enum: ["active", "inactive"], default: 'inactive')  
- **vehicle** (Object, required)  
  - **color** (String, required, minimum length 3)  
  - **plate** (String, required, minimum length 3)  
  - **capacity** (Number, required, minimum 1)  
  - **vehicleType** (String, enum: ["car", "auto", "motorcycle"], required)  
- **location** (Object)  
  - **lat** (Number)  
  - **lng** (Number)  

### Ride Model
The Ride model is defined in `models/ride.model.js` and includes the following fields:
- **user** (ObjectId, ref: 'User', default: null)  
- **captain** (ObjectId, required, ref: 'Captain')  
- **pickup** (String, required)  
- **destination** (String, required)  
- **status** (String, enum: ['pending', 'accepted', 'completed', 'cancelled'], default: 'pending')  
- **fare** (Number, required)  
- **distance** (Number, required)  
- **duration** (String)  
- **otp** (String, select: false, required)  

### BlacklistToken Model
The BlacklistToken model is defined in `models/blacklistToken.model.js` and includes the following fields:
- **token** (String, required, unique)  
- **createdAt** (Date, default: Date.now, expires: 86400)  

---

# Database Connection
The database connection is handled in `db/db.js`. It connects to the MongoDB database using the URI specified in the `.env` file.

---

# Controllers

### User Controller
The User controller is defined in `controllers/user.controller.js` and includes the following functions:
- **register** - Registers a new user  
- **login** - Logs in a user and returns a JWT token  
- **getProfile** - Returns the profile of the logged-in user  
- **logout** - Logs out a user and blacklists the JWT token  

### Captain Controller
The Captain controller is defined in `controllers/captain.controller.js` and includes the following functions:
- **registerCaptain** - Registers a new captain  
- **loginCaptain** - Logs in a captain and returns a JWT token  
- **getProfileCaptain** - Returns the profile of the logged-in captain  
- **logoutCaptain** - Logs out a captain and blacklists the JWT token  

### Ride Controller
The Ride controller is defined in `controllers/ride.controller.js` and includes the following functions:
- **rideController** - Creates a new ride  
- **fetchRides** - Fetches all rides  

### Map Controller
The Map controller is defined in `controllers/map.controller.js` and includes the following functions:
- **getCoordinates** - Gets coordinates for an address  
- **getDistanceAndTime** - Gets distance and time between two locations  
- **getSuggestions** - Gets location suggestions based on input  

---

# Services

### Ride Service
The Ride service is defined in `services/ride.service.js` and includes the following functions:
- **bookRide** - Books a ride  
- **createRide** - Creates a new ride  
- **endRide** - Ends a ride  

### Map Service
The Map service is defined in `services/maps.service.js` and includes the following functions:
- **getAddressCoordinate** - Gets coordinates for an address  
- **getDistanceTime** - Gets distance and time between two locations  
- **autoSuggestions** - Gets location suggestions based on input  

---

# Server Setup
The server setup is defined in `index.js`. It initializes the Express app, sets up middlewares, and starts the server on the specified port.

---

# Frontend

The frontend is built using React and is located in the `Frontend` directory. It includes the following components:
- **About.jsx** - About page  
- **CheckRides.jsx** - Check available rides  
- **ConnectedMap.jsx** - Map component showing connected locations  
- **Contact.jsx** - Contact page  
- **Dashboard.jsx** - Dashboard page  
- **Features.jsx** - Features page  
- **Footer.jsx** - Footer component  
- **Home.jsx** - Home page  
- **Loader.jsx** - Loader component  
- **Map.jsx** - Map component  
- **Navbar.jsx** - Navbar component  
- **Profile.jsx** - Profile page  
- **Suggestions.jsx** - Suggestions component  

The frontend also includes Redux for state management and Tailwind CSS for styling.

## Cloning and Setting Up the Project

Follow the steps below to clone and set up the DriveHive project:

### Step 1: Clone the Repository

Run the following command in your terminal to clone the DriveHive repository:

```sh
git clone https://github.com/o0sanket0o/DriveHive
```
## Step 2: Set Up the Frontend

1. Navigate to the frontend folder:
   ```sh
   cd DriveHive/frontend
    ```
2. Install the required dependencies:
   ```sh
   npm install
    ```
3. Start the development server:
   ```sh
   npm run dev
    ```
The frontend will now be running on http://localhost:5173.

## Step 3: Set Up the Backend

1. Navigate to the backend folder:
   ```sh
   cd ../Backend
    ```
2. Install the required dependencies:
   ```sh
   npm install
    ```
3. Start the development server:
   ```sh
   npm run dev
    ```

## Step 4: Configure the Environment File

1. Create a .env file in the backend directory.

2. Add the following environment variables to the file:
   ```plaintext
    PORT=Your_Desired_Port_Number
    MONGO_URI=Link_to_your_DB_Connection
    JWT_SECRET=your_jwt_secret
    NODE_ENV=development
    ```
    - **PORT**: The port number for the backend server (e.g., 5000).
    - **MONGO_URI**: The connection string for your MongoDB database.
    - **JWT_SECRET**: A secure key for signing JSON Web Tokens.
    - **NODE_ENV**: The environment mode (`development` or `production`).

3. Save the .env file. Ensure it is listed in .gitignore to keep sensitive data secure

## Step 5: Start the Backend Server

1. Run the following command in the backend directory to start the server
    ```sh
   npm run dev
    ```

The backend will now be running on http://localhost:5000 (or the port specified in your .env file).



```
The project will start running on your machine successfully.
```

## Contributing

We welcome contributions to DriveHive! If you'd like to contribute, follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

Please ensure your code follows the existing style and includes tests where applicable.

## License

This project is licensed under the MIT License - see the LICENSE file for details.


