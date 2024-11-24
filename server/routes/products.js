import express, { Router } from 'express';
import multer from 'multer';
import { PrismaClient } from '@prisma/client';

const router = express.Router();

// //multer setup
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'public/images/'); // save uploaded files in `public/images` folder
//   },
//   filename: function (req, file, cb) {
//     const ext = file.originalname.split('.').pop(); // get file extension
//     const uniqueFilename = Date.now() + '-' + Math.round(Math.random() * 1000) + '.' + ext; // generate unique filename - current timestamp + random number between 0 and 1000.
//     cb(null, uniqueFilename);
//   }
// });
// const upload = multer({ storage: storage });

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

  if (parseInt(id)){ //validation ID is a workable int
    //search table for id
    const product = await prisma.product.findUnique({
      where: {
        product_id: parseInt(id),
      },
    });
    //404 for when product doesn't exist
    if (!product) {
      res.status(404).json({message: 'Product not found.'})
    } 
    //returning product when everything is correct
    else {
      res.status(200).json({product})
    }
  } else  { //returning invalid if the product id is bad
    res.status(400).json({message: 'Product ID is invalid.'})
  }
});

//POSSIBLE TODO: addToCart

  // //retrieving the product being purchased
  // const product = await prisma.product.findUnique({
  //   where: {
  //     product_id: product_id,
  //   }
  // });

  // //adding it to the cart
  // for (let index = 0; index < quantity; index++) {
  //   //check for the first item in the cart
  //   if (cart == null) {
  //     //adding in product id
  //     cart += `${product_id}`;
  //     //adding product cost to invoice_amt
  //     invoice_amt += product.cost;
  //   } else { //for all the subsequent items in the cart
  //     cart += (`,${product_id}`);
  //     invoice_amt += product.cost;
  //   }
  // }

//TODO: purchase
router.post('/purchase', async (req,res) => {
  //init fields
  const {street, city, province, country, postal_code, credit_card, credit_expire, credit_cvv, invoice_amt, invoice_tax, invoice_total, cart} = req.body;

  //checking all fields are filled.
  if(!street || !city || !province || !country || !postal_code || !credit_card || !credit_expire || !credit_cvv || !invoice_amt || !invoice_tax || !invoice_total || !cart) {
    return res.status(400).send('Missing required fields');
  }

  //checking that user is logged in
  if(!req.session.email) {
    return res.status(401).send('Not logged in');
  }

  let productId = [];
  let productQuantity = {};

  const cartItems = cart.split(',');

  //counting quantities of products
  for (let index = 0; index < cartItems.length; index++) {
    const product = parseInt(cartItems[index]);
    if (product) {
      productId.push(product);
      productQuantity[product] = (productQuantity[product] || 0) + 1; //increment quantity for the same product
    }
  }

  //create a purchase
  const purchase = await prisma.purchase.create({
    data: {
      street: street,
      city: city,
      province: province,
      country: country,
      postal_code: postal_code,
      credit_card: parseInt(credit_card),
      credit_expire: parseInt(credit_expire),
      credit_cvv: parseInt(credit_cvv),
      invoice_amt: parseFloat(invoice_amt),
      invoice_tax: parseFloat(invoice_tax),
      invoice_total: parseFloat(invoice_total),
      customer_id: req.session.customer_id,
    },
  });

  //creating purchase items or updating their quantity if they already exist
  for (let product_id in productQuantity) {
    const quantity = productQuantity[product_id];

    //check if product is a dupe in cart
    const existingItem = await prisma.purchaseItem.findFirst({
      where: {
        purchase_id: purchase.purchase_id,
        product_id: parseInt(product_id),
      },
    });

    if (existingItem) {
      //update quantity of existing items
      await prisma.purchaseItem.update({
        where: { purchase_item_id: existingItem.purchase_item_id },
        data: { quantity: existingItem.quantity + quantity },
      });
    } else {
      //create new purchaseItems for uniques
      await prisma.purchaseItem.create({
        data: {
          product_id: parseInt(product_id),
          purchase_id: purchase.purchase_id,
          quantity: quantity,
        },
      });
    }
  }

  //404 for when product doesn't exist
  if (!purchase) {
    res.status(404).json({message: 'Product not found.'})
  } else {
    res.status(200).json({ purchase, message: 'Purchase completed successfully' });
  }
} )

export default router;