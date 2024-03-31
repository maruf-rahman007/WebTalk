import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { jwt, sign, verify } from 'hono/jwt'

export const blogRouter = new Hono<{
    Bindings: {
        JWT_SECRET:string
    }
}>();

blogRouter.use('/*',async(c,next)=>{
    const header = c.req.header("authorization")||"";
  
    const response = await verify(header,c.env.JWT_SECRET);
    if(response.id) {
      next()
    } else {
      c.status(403)
      return c.json({
        error : "Unauthorized"
      })
    }
  })

blogRouter.post('/blog', (c) => {
    return c.text('Hello This is blog')
})

blogRouter.put('/blog', (c) => {
    return c.text('Hello Hono!')
})

blogRouter.get('/blog/:id', (c) => {
    return c.text('Hello Hono!')
})

blogRouter.get('/blog/bulk', (c) => {
    return c.text('Hello Hono!')
})