# Project Name
## Description

This project is a web application designed to provide a seamless user experience with robust security features and an intuitive user interface. It includes a login system with validation and dedicated error handling.
## Features

- **Security Enhancements:**
  - Validates email and password server-side.
  - Implements rate limiting to protect against brute force attacks.

- **User Interface Improvements:**
  - Modern styling for login and error pages.
  - Clear error messages and dedicated pages for different types of errors.
## Installation

To get started with this project, follow these steps:

1. **Clone the Repository:**

    ```bash
    https://github.com/PrashantKumar0010/Login-Form.git
    ```

2. **Navigate to the Project Directory:**

    ```bash
    cd your-repo
    ```

3. **Install Dependencies:**

    ```bash
    npm install
    ```

4. **Set Up Environment Variables:**

    Create a `.env` file in the root directory and add necessary environment variables, such as:

    ```plaintext
    NODE_ENV=development
    PORT=3000
    ```

5. **Start the Application:**

    ```bash
    npm start
    ```

    The application will be available at `http://localhost:8001`.

## Usage

### Endpoints

1. **Home Page**

    - **GET** `/` - Renders the home page.

2. **Course Page**

    - **GET** `/course` - Renders the course page.

3. **Registration Page**

    - **GET** `/registration` - Renders the registration page.

4. **Register User**

    - **POST** `/register` - Registers a new user with the following body parameters:
      - `FirstName`
      - `Gmail`
      - `Mobile`
      - `Password`
      - `ConfirmPassword`

5. **Login Page**

    - **GET** `/login` - Renders the login page.

6. **Login User**

    - **POST** `/login` - Logs in a user with the following body parameters:
      - `Gmail`
      - `Password`

7. **Contact Page**

    - **GET** `/contact` - Renders the contact page.

8. **Send Message**

    - **POST** `/contact` - Sends a message with the following body parameters:
      - `name`
      - `email`
      - `message`

9. **Send Email (Example Endpoint)**

    - **POST** `/send-email` - (For demonstration purposes) Sends an email with the following body parameter:
      - `email`

## Error Handling

The application handles errors gracefully with specific messages:

- **Invalid Email:** Redirects to the `invalid-email` page.
- **Invalid Password:** Redirects to the `invalid-password` page.
- **Internal Server Error:** Returns a 500 status with an error message.
