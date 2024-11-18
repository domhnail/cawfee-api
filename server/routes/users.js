import express from 'express';
import { PrismaClient } from '@prisma/client';
import { hashPassword, comparePassword } from '../lib/utility.js';

const router = express.Router();

const prisma = new PrismaClient ({
  log: ['query', 'info', 'warn', 'error']
});

//SIGNUP//
router.post('/signup', async (req,res) => {
  //receiving customer inputs
  const { email, password, first_name, last_name } = req.body;
  
  //validate the customer inputs
  if(!email || !password || !first_name || !last_name) {
    return res.status(400).send('Missing required fields');
  }

  //check if customer already exists
  const existingUser = await prisma.customer.findUnique({
    where: {
      email: email,
    }
  });
  if (existingUser) {
    return res.status(400).send('User already exists');
  }

  //hash password
  const hashedPassword = await hashPassword(password);

  //post customer entry to database
  const customer = await prisma.customer.create({
    data: {
      email: email,
      password: hashedPassword,
      first_name: first_name,
      last_name: last_name
    },
  });
  //send response back to customer
  res.send({'customer' : email});
});


//LOG IN//
router.post('/login', async (req,res) => {
  //receive customer inputs
  const { email, password } = req.body;

  //validate inputs
  if(!email || !password) {
    return res.status(400).send('Missing required fields');
  }

  //find customer in db
  const existingUser = await prisma.customer.findUnique({
    where: {
      email: email,
    }
  });
  if (!existingUser) {
    return res.status(404).send('User not found');
  }

  //validate password
  const passwordMatch = await comparePassword(password, existingUser.password);
  if (!passwordMatch) {
    return res.status(401).send('Invalid password');
  }

  //setup customer session
  req.session.email = existingUser.email;
  req.session.customer_id = existingUser.customer_id;
  req.session.first_name = existingUser.first_name;
  req.session.last_name = existingUser.last_name;

  //send response
  res.send('Login route');
});


//LOG OUT//
router.post('/logout', (req,res) => {
  req.session.destroy();
  res.send('Logged out.');
});


//GET SESSION//
router.get('/getsession', (req,res) => {
  res.send({'customer' : req.session});
});

export default router;