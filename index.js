var express = require('express')
var app = express()
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');
const Registration = require('./models/carRegistration')
require('./db/mongoose')






require('dotenv').config()



// middleware
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT






app.post('/ussd',  async (req, res) => {


    let message = '';


    let sessionId   = req.body.sessionId;
    let serviceCode = req.body.serviceCode;
    let phoneNumber = req.body.phoneNumber;
    let text     = req.body.text

    console.log(sessionId, serviceCode, phoneNumber, text)



    let length = text.split('*').length

    let txt = text.split('*')
    res.contentType('text/plain');


    if (text === '') {
        message = 'CON Welcome to Latex Garage Ltd \n';
        message += '1: Enter for new car reg device \n';
        message += '2: Check status of car\n';
        message += '3: Exit\n';
        res.send(message, 200);

    }
    else if (text === '1') {

        message = 'CON Enter car Reg number\n';
        res.send(message, 200);

    }

    else if (length === 2 && txt[0] === '1'){

        message = 'CON Enter year of manufacture\n';
        res.send(message, 200);

    }

    else if (length === 3 && txt[0] === '1') {

        message = 'CON Enter car Make\n';
        res.send(message, 200);

    }

    else if (length === 4 && txt[0] === '1') {

        message = 'CON Enter car body type\n';
        res.send(message, 200);

    }

    else if (length === 5 && txt[0] === '1') {

        message = 'CON Enter car Capacity\n';
        res.send(message, 200);

    }

    else if (length === 6 && txt[0] === '1') {

        message = 'CON Enter car Model\n';
        res.send(message, 200);

    }

    else if (length === 7 && txt[0] === '1') {

        message = 'CON Enter car Engine size\n';
        res.send(message, 200);

    }

    else if (length === 8 && txt[0] === '1') {

        message = 'END Thank you, your information has been recorded.';
        res.send(message, 200);


        let data = text.split('*');

        await Registration.create({
            regNo: data[1],
            year: data[2],
            make: data[3],
            bodyType: data[4],
            capacity: data[5],
            model: data[6],
            engine: data[7],
            phone_number: phoneNumber
        }).then(function (registrant) {
            console.log("car Added", registrant)
        })

    }  else if (text === '2') {

        await Registration.findOne({
            phone_number: phoneNumber
        }).then((registrant) => {
            if (registrant.done === true) {
                message = `END Thank you. Come collect your ${registrant.regNo} car.\n`;
                res.send(message, 200);
            } else {
                message = 'END Still in progress.\n';
                res.send(message, 200);
            }
        })


    } else if (text === '3') {
        message = 'END Thank you.';
        res.send(message, 200);
    }

    else {
        message = 'End Wrong Input.'
        res.send(message, 200);

    }


})





app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
