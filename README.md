# eduManage, a Full Stack Course Management Application

This project is a Full Stack Course Management Application that allows users to view, create, update, and delete courses. It is built using a REST API for the backend and a React-based client interface for the frontend.

## Table of Contents

- [eduManage, a Full Stack Course Management Application](#edumanage-a-full-stack-course-management-application)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
    - [Key Features](#key-features)
  - [Installation](#installation)
    - [Prerequisites](#prerequisites)
    - [Setup Instructions](#setup-instructions)
  - [Usage](#usage)
  - [Basic Authentication](#basic-authentication)
    - [How to Use Basic Authentication](#how-to-use-basic-authentication)
  - [API Endpoints](#api-endpoints)
    - [User Endpoints](#user-endpoints)
    - [Course Endpoints](#course-endpoints)
  - [Technologies Used](#technologies-used)
  - [Project Structure](#project-structure)
  - [Additional Notes](#additional-notes)
  - [License](#license)
  - [Contact](#contact)

## Overview

The Full Stack Course Management Application consists of two main components:

1. **Client**: A React application built with Vite that provides a user-friendly interface for managing courses. It features authentication, course management, routing, and state management.

2. **API**: A RESTful API built using Node.js, Express, Sequelize, and SQLite. The API handles requests from the client, performing operations on the database, and supports Basic Authentication for user security.

### Key Features

- **View All Courses**: Users can view a list of all available courses.
- **Course Detail View**: Displays detailed information for each course.
- **User Authentication**: Basic Authentication using username and password.
- **Create, Update, Delete Courses**: Authenticated users can manage courses.
- **Protected Routes**: Ensures only authenticated users can access certain routes.
- **Error Handling**: Comprehensive validation and error handling for both client and server sides.

## Installation

### Prerequisites

- Node.js (version 14 or later)
- npm (version 6 or later)
- Git

### Setup Instructions

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/yourusername/full-stack-course-management-app.git
   cd full-stack-course-management-app
# Full Stack Course Management Application

This project is a Full Stack Course Management Application that allows users to view, create, update, and delete courses. It is built using a REST API for the backend and a React-based client interface for the frontend.

## Table of Contents

- [eduManage, a Full Stack Course Management Application](#edumanage-a-full-stack-course-management-application)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
    - [Key Features](#key-features)
  - [Installation](#installation)
    - [Prerequisites](#prerequisites)
    - [Setup Instructions](#setup-instructions)
  - [Usage](#usage)
  - [Basic Authentication](#basic-authentication)
    - [How to Use Basic Authentication](#how-to-use-basic-authentication)
  - [API Endpoints](#api-endpoints)
    - [User Endpoints](#user-endpoints)
    - [Course Endpoints](#course-endpoints)
  - [Technologies Used](#technologies-used)
  - [Project Structure](#project-structure)
  - [Additional Notes](#additional-notes)
  - [License](#license)
  - [Contact](#contact)

## Overview

The Full Stack Course Management Application consists of two main components:

1. **Client**: A React application built with Vite that provides a user-friendly interface for managing courses. It features authentication, course management, routing, and state management.

2. **API**: A RESTful API built using Node.js, Express, Sequelize, and SQLite. The API handles requests from the client, performing operations on the database, and supports Basic Authentication for user security.

### Key Features

- **View All Courses**: Users can view a list of all available courses.
- **Course Detail View**: Displays detailed information for each course.
- **User Authentication**: Basic Authentication using username and password.
- **Create, Update, Delete Courses**: Authenticated users can manage courses.
- **Protected Routes**: Ensures only authenticated users can access certain routes.
- **Error Handling**: Comprehensive validation and error handling for both client and server sides.

## Installation

### Prerequisites

- Node.js (version 14 or later)
- npm (version 6 or later)
- Git

### Setup Instructions

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/yourusername/full-stack-course-management-app.git
   cd full-stack-course-management-app
   ```

2. **Install API Dependencies:**

    Navigate to the API folder and install the necessary packages.

    ```bash
    Copy code
    cd api
    npm install
    ```
3. **Install Client Dependencies:**

    Navigate to the Client folder and install the necessary packages.

    ```bash
    cd ../client
    npm install
    ```

4. **Setup Environment Variables:**

Create a .env file in the /api directory and add the required environment variables:
    ```bash
    env
    Copy code
    PORT=5000
    DATABASE_URL=sqlite::memory:
    ```

5. **Run Database Migrations:**

    Use Sequelize CLI to set up the database by running migrations.
        ```bash
        npx sequelize-cli db:migrate
        ```

6. **Run the Applications:**

    In separate terminals, start both the API and Client applications:

    API:

    ```bash
    Copy code
    cd api
    npm start
    ```

    Client:

    ```bash
    Copy code
    cd client
    npm run dev
    ```

## Usage

- **Client Application:** Access the client application by navigating to [http://localhost:5173](http://localhost:5173) in your web browser.
- **API:** The API is accessible at [http://localhost:5000](http://localhost:5000).

## Basic Authentication

The application uses Basic Authentication to secure certain routes. Users must authenticate with a username and password to access protected resources, such as creating, updating, or deleting courses.

### How to Use Basic Authentication

1. **Sign Up:** Create an account by sending a POST request to the `/api/users` endpoint with the required fields (e.g., username, password).
2. **Sign In:** Use your credentials to sign in by sending a request to the `/api/users/login` endpoint. The server will respond with a 200 OK status if the credentials are correct.
3. **Access Protected Routes:** Include the `Authorization` header with your requests to access protected routes. Example:

    ```bash
    Authorization: Basic base64(username:password)
    ```

    Note: For testing purposes, use tools like Postman or browser extensions to include the `Authorization` header in your requests.

## API Endpoints

### User Endpoints

- `POST /api/users` - Register a new user. Expects a JSON body with `username` and `password`.
- `POST /api/users/login` - Authenticate a user. Expects a JSON body with `username` and `password`.

### Course Endpoints

- `GET /api/courses` - Retrieve all courses.
- `GET /api/courses/:id` - Retrieve a specific course by ID.
- `POST /api/courses` - Create a new course (Authenticated users only). Expects a JSON body with course details.
- `PUT /api/courses/:id` - Update an existing course (Authenticated users only). Expects a JSON body with updated course details.
- `DELETE /api/courses/:id` - Delete a course (Authenticated users only).

## Technologies Used

- **Frontend:** React, React Router, React Context API, Vite
- **Backend:** Node.js, Express, Sequelize, SQLite
- **State Management:** React Context API
- **Styling:** CSS (with global styles)
- **API Client:** Fetch API

## Project Structure

    ```plaintext
    full-stack-course-management-app/
    ├── api/
    │   ├── controllers/
    │   ├── models/
    │   ├── routes/
    │   ├── migrations/
    │   ├── seeders/
    │   ├── config/
    │   ├── server.js
    │   └── .env
    ├── client/
    │   ├── public/
    │   ├── src/
    │   │   ├── components/
    │   │   ├── context/
    │   │   ├── styles/
    │   │   ├── App.jsx
    │   │   └── main.jsx
    │   └── vite.config.js
    └── README.md
    ```

## Additional Notes

- **Basic Authentication:** The application uses Basic Authentication to protect routes. This is a simple method where the user's credentials are encoded and sent with each request to the server.
- **Database Configuration:** The application uses Sequelize as an ORM to interact with an SQLite database. All configurations related to the database connection can be found in the `/api/config` folder.
- **Database Migrations:** Use Sequelize CLI for managing database migrations. Run these using the `npx sequelize-cli db:migrate` command.
- **Testing:** Use tools like Postman or curl to test API endpoints and verify authentication functionality.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any questions, suggestions, or collaboration, feel free to reach out:

- **GitHub:** [greatxrider](https://github.com/greatxrider)
- **Email:** [daligdig.jephmari@gmail.com](mailto:daligdig.jephmari@gmail.com)
