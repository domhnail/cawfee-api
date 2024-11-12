import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();

const prisma = new PrismaClient ({
  log: ['query', 'info', 'warn', 'error']
});

//SIGNUP//
router.post('/signup', async (req,res) => {
  //receiving user inputs
  const { email, password, username } = req.body;
  
  //validate the user inputs
  if(!email || !password || !first_name || !last_name) {
    return res.status(400).send('Missing required fields');
  }

  //check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: {
      email: email,
    }
  });
  if (existingUser) {
    return res.status(400).send('User already exists');
  }

  //hash password
  const hashedPassword = await hashPassword(password);

  //post user entry to database
  const user = await prisma.user.create({
    data: {
      email: email,
      password: hashedPassword,
      first_name: first_name,
      last_name: last_name
    },
  });
  //send response back to user
  res.send({'user' : email});
});


//LOG IN//
router.post('/login', async (req,res) => {
  //receive user inputs
  const { email, password } = req.body;

  //validate inputs
  if(!email || !password) {
    return res.status(400).send('Missing required fields');
  }

  //find user in db
  const existingUser = await prisma.user.findUnique({
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

  //setup user session
  req.session.user = existingUser.email;
  req.session.user_id - existingUser.email;
  console.log("User session " + req.session.user);

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
  res.send({'user' : req.session.user});
});

export default router;