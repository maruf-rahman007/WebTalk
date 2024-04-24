
![Logo](./frontend/static/logo2.png)


# WebTalk

WebTalk is a modern blogging application with a serverless backend, built using React for the frontend and Hono, a lightweight serverless framework, for the backend. It utilizes CloudFrontWorkers for enhanced content delivery and PostgreSQL hosted on Aiven.io as the database. WebTalk aims to provide a hassle-free setup and robust performance for bloggers and content creators.


## Features

- User Management: Seamless signup and signin processes with JWT authentication.
- Blog Management: Easy creation, updating, and retrieval of blog posts.
- Rich Text Editing: Integration with popular rich text editor libraries such as Jodit and Quill.
- Input Validation: Utilizes Zod for input validation on both frontend and backend.
- Scalability: Serverless architecture ensures scalability to handle varying traffic demands effortlessly.


## Tech Stack

**Client:** React, React Router Dom, TailwindCSS, Axios, Zod, Jodit, Quill, Dompurify

**Server:** Hono, CloudFlare Worker, Prisma, Prisma-accelerate, BcryptJs, Zod


## Deployment

Frontend - Vercel

Backend - Cloudflare 

Database - Aiven


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`Prisma Accelerate api key `-> You can get it from [Here](https://www.prisma.io/data-platform/accelerate)

`Postgress Database`

`JWTSECREAT`

`BACKENDURL`



## Installation

Install my-project with npm

```bash
  git clone https://github.com/maruf-rahman007/WebTalk.git
```
```bash
  cd WebTalk
```
```bash
  cd backend
```
```bash 
  npm install
```
Create a  wrangler.toml file and paste the following 
```
name = "backend"
compatibility_date = "2023-12-01"

[vars]
DATABASE_URL="your-prisma-accelerate-url"
JWT_SECRET="jwtsecreat"
```
Create a .env and paste the following 
```
DATABASE_URL="your-DATABASE_URL"

```
```bash
npx prisma migrate dev --name init_schema

```
```bash
npx prisma generate --no-engine

```

```bash
npm run dev

```
Copy the url and open another terminal 
```bash
cd frontend
```
```bash
npm install

```
Create a .env and paste the following 

```
VITE_BACKEND_URL = "your backend url"

```

```bash
npm run dev
```
Now you are good to go 
## Authors

- [@maruf-rahman007](https://github.com/maruf-rahman007)


## Feedback

If you have any feedback, please reach out to us at marufrahman.dev@gmail.com

