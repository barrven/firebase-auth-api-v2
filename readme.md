# About

This project is a REST API built using Node.js and the firebase admin SDK.

## Prerequisites

Before setting up and running this project, ensure you have the following installed:

- [Node.js](https://nodejs.org/en/) (v18 or later)
- [NPM](https://www.npmjs.com/)

## To Create the Project From Scratch

1. **Set Up Node.js and Express**

    Initialize a new Node.js project and install necessary dependencies:

    ```bash
    mkdir my-project
    cd my-project
    npm init -y
    npm install express firebase-admin firebase --save
    ```

    Optionally, you can install nodemon so that the server reloads when changes are made:
    ```bash
    npm install nodemon
    ```

    To run the project you can add a script into the `scripts` section of the `package.json` file:
    ```json
    "dev": "nodemon index.js"
    ```

2. **Create a Firebase project in the cloud console**

    - Create a project in the [cloud console](https://console.firebase.google.com/). 
    
    - Then go to `build > authentication > sign-in method > add new provider` 
    - and select `Email/Password`. You can add additional sign in methods here as well. 

3. **Set Up Firebase Admin SDK**

    You'll need to use the Firebase Admin SDK to verify and manage Firebase authentication tokens. Download the service account key from your Firebase project in the admin console:

    - Go to `Project Settings > Service accounts`
    - Click on "Generate new private key" and save the JSON key file.
    
    Then, copy this json key file into your project.
    
    This file points to a service account and contains all the info necessary to initialize the Firebase Admin SDK.

5. **Import the json key file into `index.js`**

    ```javascript
    const admin = require('firebase-admin');
    
    // Initialize Firebase Admin SDK
    const serviceAccount = require('./path-to-your-keyfile.json');

    admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
    });
    ```
