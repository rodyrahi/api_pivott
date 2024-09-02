require('dotenv').config(); // Load the .env file

const express = require('express');
const app = express();
const port = 6060;
const { generateText } = require('./api_call.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));
app.set('view engine', 'ejs');

// Initialize VERSION from the .env file
let VERSION = parseFloat(process.env.VERSION) || 0.0001;


const emails = ['jasminekherajani12@gmail.com' , 'heynitin110493@gmail.com' , 'dataanalystnitinp@gmail.com' , 
    
    'sd141299@gmail.com' , 'shrivastavashaifali3@gmail.com' , 'taslimnkhan2004@gmail.com' ]




app.get('/', (req, res) => {
    res.render('index');
});

app.post('/api/data', async (req, res) => {
    const result = await generateText(req.body.prompt); 
    res.send({"result":result});
})

app.post('/api/setversion', (req, res) => {
    const test = req.body;
    VERSION = test["version"];
    
    // Update the .env file with the new version
    const fs = require('fs');
    fs.writeFileSync('.env', `VERSION=${VERSION}\n`);

    res.send("Version Updated to " + VERSION);
})

app.post('/api', (req, res) => {
    const test = req.body;
    console.log(test);
    if (test["version"] < VERSION) {
        res.send({"update":"yes"});
    } else {
        res.send({"update":"no"});
    }
});

// app.get('/trynow', (req, res) => {


    // const { filename } = req.params;
    // const filePath = `${__dirname}/static/pivott.exe`;
    // res.download(filePath, (err) => {
    //     if (err) {
    //         res.status(404).send('File not found');
    //     }
    // });
// });

app.get('/download/:email', (req, res) => {
    const { filename } = req.params;
    const email  = req.params.email;
    
    if (emails.includes(email)) {
    const filePath = `${__dirname}/static/pivott.exe`;
    res.download(filePath, (err) => {
        if (err) {
            res.status(404).send('File not found');
        }
    });
    }
    else {
        res.send("please contact at rajvendrarahi126@gmail.com");
    }
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
