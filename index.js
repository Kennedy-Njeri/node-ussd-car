const express = require('express')
const app = express()
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const Registration = require('./models/carRegistration')
require('./db/mongoose')






require('dotenv').config()



// middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT || 4000





app.post("/", async (req, res) => {

    const express = require('express');
    const bodyParser = require('body-parser');

    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    app.post('/ussd', (req, res) => {
        // Read the variables sent via POST from our API
        const {
            sessionId,
            serviceCode,
            phoneNumber,
            text,
        } = req.body;

        let response = '';

        if (text === '') {
            // This is the first request. Note how we start the response with CON
            response = `CON What would you like to check
        1. My account
        2. My phone number`;
        } else if ( text === '1') {
            // Business logic for first level response
            response = `CON Choose account information you want to view
        1. Account number
        2. Account balance`;
        } else if ( text === '2') {
            // Business logic for first level response
            // This is a terminal request. Note how we start the response with END
            response = `END Your phone number is ${phoneNumber}`;
        } else if ( text === '1*1') {
            // This is a second level response where the user selected 1 in the first instance
            const accountNumber = 'ACC100101';
            // This is a terminal request. Note how we start the response with END
            response = `END Your account number is ${accountNumber}`;
        } else if ( text === '1*2') {
            // This is a second level response where the user selected 1 in the first instance
            const balance = 'KES 10,000';
            // This is a terminal request. Note how we start the response with END
            response = `END Your balance is ${balance}`;
        }

        // Send the response back to the API
        res.set('Content-Type: text/plain');
        res.send(response);
    });

    // ///return res.send("hello")
    // console.log(req.body)
    //
    //
    // let sessionId   = req.body.sessionId;
    // let serviceCode = req.body.serviceCode;
    // let phoneNumber = req.body.phoneNumber;
    // let text     = req.body.text
    //
    // console.log(sessionId, serviceCode, phoneNumber, text)
    //
    //
    //
    // let message = ""
    //
    // const length = text.split('*').length
    //
    // let txt = text.split('*')
    // res.contentType('text/plain');
    //
    //
    // if (text === '') {
    //     message = 'CON Welcome to Latex Garage Ltd \n';
    //     message += '1: Enter for new car reg device \n';
    //     message += '2: Check status of car \n';
    //     res.send(message, 200);
    //
    //
    // }
    //
    // else if (text === '1') {
    //
    //     message = 'CON Enter car Reg number\n';
    //     res.send(message, 200);
    //
    // }
    //
    // else if (length === 2 && txt[0] === '1'){
    //
    //     message = 'CON Enter year of manufacture\n';
    //     res.send(message, 200);
    //
    // }
    //
    // else if (length === 3 && txt[0] === '1') {
    //
    //     message = 'CON Enter car Make\n';
    //     res.send(message, 200);
    //
    // }
    //
    // else if (length === 4 && txt[0] === '1') {
    //
    //     message = 'CON Enter car body type\n';
    //     res.send(message, 200);
    //
    // }
    //
    // else if (length === 5 && txt[0] === '1') {
    //
    //     message = 'CON Enter car Capacity\n';
    //     res.send(message, 200);
    //
    // }
    //
    // else if (length === 6 && txt[0] === '1') {
    //
    //     message = 'CON Enter car Model\n';
    //     res.send(message, 200);
    //
    // }
    //
    // else if (length === 7 && txt[0] === '1') {
    //
    //     message = 'CON Enter car Engine size\n';
    //     res.send(message, 200);
    //
    // }
    //
    // else if (length === 8 && txt[0] === '1') {
    //
    //     message = 'End Car Registered.';
    //     res.send(message, 200);
    //
    //
    //     let data = text.split('*');
    //
    //     await Registration.create({
    //         regNo: data[1],
    //         year: data[2],
    //         make: data[3],
    //         bodyType: data[4],
    //         capacity: data[5],
    //         model: data[6],
    //         engine: data[7]
    //     }).then(() => {
    //         console.log("car Added")
    //     })
    //
    // }
    //
    // else {
    //     message = 'End Wrong Input.'
    //     res.send(message, 200);
    //
    // }


})





app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
