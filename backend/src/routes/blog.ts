import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { jwt, sign, verify } from 'hono/jwt'

export const blogRouter = new Hono<{
  Bindings: {
    JWT_SECRET: string,
    DATABASE_URL: string
  },
  Variables: {
    userId: string;
  }
}>();

blogRouter.use('/*', async (c, next) => {
  try {
    const header = c.req.header("authorization") || "";

    const response = await verify(header, c.env.JWT_SECRET);
    if (response.id) {
      c.set("userId", response.id)
      await next()
    } else {
      c.status(403)
      return c.json({
        error: "Unauthorized"
      })
    }
  } catch (error) {
    c.status(403)
    return c.json({
      error: "You are not Logged in "
    })
  }
})

blogRouter.post('/', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  try {
    const body = await c.req.json();
    console.log(body)
    const authorId = c.get("userId");
    const blog = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: authorId
      }
    })
    return c.json({
      id: blog.id
    })
  } catch (error) {
    c.status(411)
    return c.json({
      message: "Error while posting try again "
    })
  }
})

blogRouter.put('/', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const body = await c.req.json();
  const blog = await prisma.post.update({
    where: {
      id: body.id
    },
    data: {
      title: body.title,
      content: body.content
    }
  })
  return c.json({
    id: blog.id
  })
})

blogRouter.get('/bulk', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blogs = await prisma.post.findMany();
  // padgination
  return c.json({
    blogs: blogs
  })
})

blogRouter.get('/:id', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  try {
    const id = c.req.param("id");
    const blog = await prisma.post.findFirst({
      where: {
        id: id
      }
    })
    console.log(blog)
    return c.json({
      blog
    })
  } catch (error) {
    c.status(404)
    return c.json({
      error: "Internal Error Try again"
    })
  }
})

