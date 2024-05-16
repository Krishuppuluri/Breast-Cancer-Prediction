# E-REACT-FRONTEND

This is the frontend application was built using React and Redux.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Scripts](#scripts)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

## Installation

To get started with this project, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/ottawa-ehospital/E-react-frontend.git

2. **Navigate to the project directory:**

   ```bash
   cd E-react-frontend
3. **Install dependencies:**

   ```bash
   npm install

**This will install all the necessary dependencies listed in package.json**


## Usage
  To run the application locally, you can use the following command:
  
     ```bash
     npm start
  
  This will start the development server, and you can access the application in your web browser at http://localhost:3000.
## Scripts
  This project comes with several useful scripts:
  
  **npm start**: Starts the development server.
  **npm run build**: Builds the production-ready version of the application.
  **npm test**: Runs tests using Jest.
  **npm run eject**: Ejects the project from Create React App, allowing more customization.

## Folder Structure
  The project folder structure is organized as follows:

```
E-react-frontend/
  ├── node_modules/           # Contains project dependencies (created when you run npm install)
  ├── public/                 # Publicly accessible files
  │   ├── index.html         # HTML template for your React application
  │   ├── favicon.ico        # Favicon for your application
  │   └── ...                # Other static assets like images, fonts, etc.
  ├── src/                    # Source code for your React application
  │   ├── assets/            # Contains static assets like images, fonts, etc.
  │   ├── components/        # React components for building your UI
  │   ├── redux/             # Redux related files (actions, reducers, store, etc.)
  │   ├── screens/           # React components representing different screens or pages
  │   ├── styles/            # CSS or SASS styles for your application
  │   ├── App.js             # Main entry point for your React application
  │   └── index.js           # Entry point for ReactDOM rendering
  ├── .gitignore             # Configuration file for specifying files/folders to ignore in Git
  ├── package-lock.json      # locks dependency versions for consistent installations
  ├── package.json           # Project metadata and dependencies
  └── README.md              # Documentation for your project
```

  You can find the main application code in the src/ directory, and Redux-related code in   
  src/redux/.

## Contributing
  We welcome contributions! If you'd like to contribute to this project, please follow these 

   steps:
  
  1) Fork the repository on GitHub.
  2) Create a new branch for your feature or bug fix.
  3) Make your changes and commit them with clear commit messages.
  4) Push your changes to your fork.
  5) Submit a pull request to the original repository.

