# WebTalk

A simple blogging application using Serverless backend. 

# Serverless Blog Application with CloudFront

This is a serverless backend setup for a blog application, utilizing CloudFrontWorkers . The backend is powered by Hono, a lightweight serverless framework, and uses PostgreSQL as the database hosted on Aiven.io. Prisma is employed for database ORM (Object-Relational Mapping) functionalities, and JWT (JSON Web Tokens) is used for authentication.

## Endpoints

### User Management

#### Signup
- **Method:** POST
- **Endpoint:** `/api/v1/signup`
- **Description:** Allows users to create a new account by providing necessary details like username, email, and password.

#### Signin
- **Method:** POST
- **Endpoint:** `/api/v1/signin`
- **Description:** Allows registered users to sign in by providing their credentials (email/username and password).

### Blog Management

#### Create Blog
- **Method:** POST
- **Endpoint:** `/api/v1/blog`
- **Description:** Enables users to create new blog posts. Requires authentication with a valid JWT token.

#### Update Blog
- **Method:** PUT
- **Endpoint:** `/api/v1/blog`
- **Description:** Allows users to update existing blog posts. Authentication with a valid JWT token is required.

#### Get Specific Blog
- **Method:** GET
- **Endpoint:** `/api/v1/blog/:id`
- **Description:** Retrieves a specific blog post identified by its unique ID.

## Technologies Used

- **Serverless Framework:** [Hono](hono.dev)
- **Database:** PostgreSQL hosted on [Aiven](aiven.io)
- **ORM:** Prisma
- **Authentication:** JWT (JSON Web Tokens)

## Setup Instructions

1. Clone this repository to your local machine.
    ` git clone https://github.com/maruf-rahman007/WebTalk.git `
    ` cd backend `
2. Install dependencies by running `npm install`.
3. Configure your environment variables:
   - Ensure you have AWS credentials configured.
   - Set up your PostgreSQL database connection details in the Prisma configuration file.
4. Deploy the serverless backend using Hono.
5. Ensure necessary permissions and security configurations are set up in AWS IAM.
6. You're ready to start using the blog application!

## Contributing

Contributions are welcome! If you have suggestions or find any issues, feel free to open an issue or submit a pull request.

