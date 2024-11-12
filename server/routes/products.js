import express, { Router } from 'express';
import multer from 'multer';
import { PrismaClient } from '@prisma/client';

const router = express.Router();

//multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/'); // save uploaded files in `public/images` folder
  },
  filename: function (req, file, cb) {
    const ext = file.originalname.split('.').pop(); // get file extension
    const uniqueFilename = Date.now() + '-' + Math.round(Math.random() * 1000) + '.' + ext; // generate unique filename - current timestamp + random number between 0 and 1000.
    cb(null, uniqueFilename);
  }
});
const upload = multer({ storage: storage });

//prisma setup (logging)
const prisma = new PrismaClient ({
  log: ['query', 'info', 'warn', 'error']
});

//GET ALL PRODUCTS//
router.get('/all', async (req, res) => {
  const product = await prisma.product.findMany();
  //message: 'Displaying all image entries.',
  res.status(200).json({product});
});

//GET A PRODUCT BY ID//
router.get('/:id', async (req, res) => {
  //get id
  const id = req.params.id;

  //search table for id
  const product = await prisma.product.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  //404 for when product doesn't exist
  if (!product) {
    res.status(404).json({message: 'Product not found.'})
  } else {
    res.status(200).json({product})
  }
});

//TODO: purchase

export default router;