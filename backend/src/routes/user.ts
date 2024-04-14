import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { jwt, sign, verify } from 'hono/jwt'
import { signininput, signupinput } from "@maruf.rahman/mediuminput";
import bcypt from 'bcryptjs'


export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL:string,
        JWT_SECRET :string
    }
}>();


userRouter.post('/signup', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
  
    const body = await c.req.json();
    const { success } = signupinput.safeParse(body);
    if(!success){
      c.status(411)
      return c.json({
        message:"Invalid inputs "
      })
    }
    const hashedPassword = await bcypt.hash(body.password,10);
    try {
      const user = await prisma.user.create({
        data: {
          email: body.email,
          password: hashedPassword,
          name:body.username
        },
      })
    
      const token = await sign({id:user.id},c.env.JWT_SECRET);
    
      return c.json({
        token:token
      })
    } catch (error) {
      c.status(411)
      return c.json({
        error:"Invalid"
      })
    }
  })
  
  userRouter.post('/signin', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate())
  
    const body = await c.req.json();
    console.log(body)
    const { success } = signininput.safeParse(body);
    if(!success){
      c.status(411)
      return c.json({
        message:"Invalid inputs "
      })
    }
    try {
      const user = await prisma.user.findUnique({
        where: {
          email:body.email
        }
      });
    
      if(!user) {
        c.status(403);
        return c.json({
          error:"Invalid username and Password"
        })
      }
      const isValid = await bcypt.compare(body.password,user.password);
      if(!isValid){
        c.status(403);
        return c.json({
          error:"Invalid username and Password"
        })
      }
      const token = await sign({id:user.id},c.env.JWT_SECRET)
      return c.json({
        token:token
      })
    } catch (error) {
      c.status(411)
      return c.json({
        error:"Invalid"
      })
    }
  
  })