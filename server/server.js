import express from 'express';
import cors from 'cors';
import session from 'express-session';
import usersRouter from './routes/users.js';
import productRouter from './routes/products.js';

const port = process.env.PORT || 3000;
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//cors middleware
app.use(cors({
  credentials: true
}));

// session middleware
app.use(session({
  secret: '0*nhfg-4svf^gdhfu76#Ra2A',
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    secure: false, 
    sameSite: 'lax',
    maxAge: 3600000 //1 hour in ms
  }
}));

// routes
app.use('/api/products', productRouter);
app.use('/api/users', usersRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});