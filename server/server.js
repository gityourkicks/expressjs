const express = require('express');
const path = require('path')
const bodyParser = require('body-parser');
let fs = require('fs');

let app = express();


app.use(bodyParser.urlencoded({ extended: false }));

app.post('/contact-form', (req, res) => {
    console.log(req.body.email);
    console.log(req.body.name);

    fs.readFile('./data.json', {
        encoding: "UTF-8"
    }, (err, dataString) => {

        let data = JSON.parse(dataString);
        console.log(data);

        data.push(req.body);

        fs.writeFile('./data.json', JSON.stringify(data, null, 4), function (err) {
            if (err) return console.log(err);

            res.send('Thank you for submitting your contact form.');
        });
    });

});

app.get('/formsubmissions', (req, res) => {


    fs.readFile('./data.json', {
        encoding: "UTF-8"
    }, (err, dataString) => {

        let data = JSON.parse(dataString);
        console.log(data);
        res.send(data);
    });


});



app.use(express.static(path.join(__dirname, '../public')));

app.listen(3000);
