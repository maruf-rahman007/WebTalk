# WebTalk

Used Stack 
* React in Front End
* Cloudflare workers in backend
* Zod as the input validation library, type inference for the frontend types
* Typescript as the language
* Prisma as the ORM, with connection pooling
* Postgres as the Database
* JWT for authentication (cookies)

### Backend

Steps 
1. Initialize the Backend
    ``` mkdir medium ```
    ``` cd medium ```

2. Initialize a hono based cloudflare worker app
    ``` npm create hono@latest```
    >directory backend
    >environment cloudflareworkers
    > package manager yes
    >npm
    [Reference](https://hono.dev/top)
    ``` cd backend ```
    ``` npm install ```
    ``` npm run dev ```

3. Initialize handlers
    To begin with, our backend will have 4 routes
    * POST /api/v1/user/signup
    * POST /api/v1/user/signin
    * POST /api/v1/blog
    * PUT /api/v1/blog
    * GET /api/v1/blog/:id
    * GET /api/v1/blog/bulk
    [Reference](https://hono.dev/api/routing)

4. Initialize Database 
    > **Note:** Here comes the problem prisma can not be bootstraped things get little tricky as we are using the serverless backend as we also need to use the connection pool remember we are using ts so we have to have some concirn of the types so everytime you need to use db you need to import the db string so you need to tell the type of this environment variables so what you can do is make a change in the app and tell it upfront all the types

    ``` 
    const app = new Hono<{
	Bindings: {
		DATABASE_URL: string,
    JWT_SECRET: string
	}
    }>();

    ```

    1. Get a connection url from any provider and don't use anything locally
        ``` postgres://url ```
    2. Get connection pool URL from Prisma accelerate
    [](https://www.prisma.io/data-platform/accelerate) 
        ``` prisma://accelerate.prisma-url ```
    3. Inialize prisma in backend 
        ``` npm i prisma ```
        ``` npx prisma init ```
    
    4. Replace DATABASE_URL in ``.env`` with the original database url 
    5. Add DATABASE_URL as the connection pool url in wrangler.toml after [vars]
    6. Initialize the schema
    7. Migrate your database
    ``` npx prisma migrate dev --name init_schema ```
    8. Generate the prisma client 
    ``` npx prisma generate --no-engine ```
    9. Add the accelerate extension
    ``` npm install @prisma/extension-accelerate ```
    10. Initialize prisma Clint
        ``` import { PrismaClient } from '@prisma/client/edge'
            import { withAccelerate } from '@prisma/extension-accelerate'

            const prisma = new PrismaClient({
                datasourceUrl: env.DATABASE_URL,
            }).$extends(withAccelerate()) 
        ```
5. Add JWT and write the signin route 

6. Middlewares
    [Creating a middleware in hono is well documented -](https://hono.dev/guides/middleware)
    * get the header
    * verify the header
    * if the header is correct lets proceed
    * else return 403
    


mkdir common 
cd common
npm init -y
npx tsc --init
change all the tsconfig as required (rootDir, outDir, declerations)
npm login
tsc -b
change package.json main to dist/index.js
npm publish --access public
add .npmignore