var express = require("express");
var app = express();
var Razorpay=require("razorpay");
var bodyParser = require('body-parser')
const path = require('path');
var localStorage = require('localStorage')
var firebase = require('firebase')
var { v4 } = require('uuid');

// const storageBucket = require('../utils/firebaseStorage');
const request = require('request');
const pdf = require('html-pdf');
const dateFormat = require('dateformat');
const fs = require('fs');
const receiptGen = require('./utils/receiptGenerator');
const transporter = require('./utils/email');
const nodemailer = require('nodemailer');
const firestoreOps = require('./config/utils');
let UserData = {};
require('dotenv').config();

let instance = new Razorpay({
  key_id: "rzp_test_gBxfU8lz93zioG", // your `KEY_ID`
  key_secret: 'z1K7k9FWLgFxM7ugKI4IoAEL' // your `KEY_SECRET`
})

var config = {
  apiKey: "AIzaSyDyKNBmzmN7VrreVcmU7gSvBFkXxe1Xal4",
  authDomain: "pcsb-registration.firebaseapp.com",
  projectId: "pcsb-registration",
  storageBucket: "pcsb-registration.appspot.com",
  messagingSenderId: "886605638923",
  appId: "1:886605638923:web:3d4dad85c2432cb035060e"
};

firebase.initializeApp(config);


// Get a reference to the database service
var database = firebase.database();

function writeUserData(paymentId, obj) {
  try{firebase.database().ref('registrations/' + paymentId).set({
    ...obj
  });}catch(e){
    console.log("eerrror");
  }
}

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', (req, res)=>{
  // console.log("get req for /");
  res.render('index');
});

app.post('/', (req, res)=>{
  res.redirect('/pay');
});

app.get('/pay', (req, res)=>{
  res.render('pay');
});

app.post("/pay",(req,res)=>{
  UserData = req.body;
  var myValue = UserData;
  var params={
    amount: req.body.amount,
    currency: 'INR',
    receipt: 'su001',
    payment_capture: '1'
  };
  instance.orders.create(params).then((data) => {
        // res.send({"sub":data,"status":"success"});
        myValue['orderId'] = data.id
        localStorage.setItem('myKey', JSON.stringify(myValue));
        res.render('checkout', {orderId : data.id, contact: req.body.phone, amount: req.body.amount});
  }).catch((error) => {
      console.log("err | ", error);
        res.send({"sub":error,"status":"failed"});
})
});

app.get('/checkout', (req, res)=>{
  // console.log("get req for /checkout");
  res.render('checkout');
})

app.get('/success', async (req, res)=>{
  const paymentId = req.query.paymentId;
  const receiptId = v4();
  myValue = JSON.parse(localStorage.getItem('myKey'));
  console.log("myval", myValue);
  myValue['paymentId'] = paymentId;
  myValue['receiptId'] = receiptId;

  await firestoreOps.addRegistration(paymentId, myValue);

  var data = {
    name: myValue.name,
    email: myValue.email,
    amount: myValue.amount,
    phone: myValue.phone,
    paymentId: paymentId,
    receiptId : receiptId
  }
    // myValue.clear();
  console.log(myValue);
  pdf.create(receiptGen.htmlTemplate(data), receiptGen.options)
    .toFile('assets/'+ 'receipt.pdf', async (err, result) => {
        var mailOptions = {
         
          from: process.env.EMAIL_USER,
          to: data.email,
          subject: "Donation Payment Receipt",
          html: `<strong>Thank you for your great generosity !</strong> greatly appreciate your donation, your support helps to further our mission. Your support is invaluable to us, <strong>Thank You again !</strong> `,
          attachments: [
            { 
              filename: 'receipt.pdf',
              path: path.join(__dirname, '../assets/receipt.pdf'),
              contentType: 'application/pdf'
            },
          ]
      }
      transporter.sendMail(mailOptions, function(error, info){
          if(error){
              console.log("error sending mail!", error);
              res.send({
                  status: false,
                  message: "email sending failed!",
              });
          }else{
              console.log("email sent to : ", info.response);
              // res.send({
              //     status: true,
              //     message: "email sent successfully.",
              // });

              res.render('success');

          }
      })
    });
})

var port = process.env.PORT || 3000

app.listen(port,()=>{
    console.log("server running at port 3000");
})