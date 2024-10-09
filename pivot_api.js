require('dotenv').config(); // Load the .env file

const crypto = require('crypto');
const express = require('express');
const app = express();
const port = 6060;
const { generateText } = require('./api_call.js');
const { sendEmail } = require('./send_email.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));
app.set('view engine', 'ejs');

// Initialize VERSION from the .env file
let VERSION = parseFloat(process.env.VERSION) || 0.0001;


const fs = require('fs');

// Read emails from emails.json
let emails;
try {
    const emailsData = fs.readFileSync('emails.json', 'utf8');
    emails = JSON.parse(emailsData).emails;
} catch (error) {
    console.error('Error reading emails.json:', error);
    emails = [];
}



    


function generateRandomLongString(length = 10) {
    return crypto.randomBytes(length).toString('hex');
}



    

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


app.get('/testers', (req, res) => {
    

    res.render('testers')

});


let downloadcode 


app.post('/beta-test', (req, res) => {

    
    // const { email } = req.body;
    downloadcode = generateRandomLongString();

    console.log(downloadcode);
    
    const link = 'https://www.pivott.click/download/' + downloadcode;
    const message = 
`
Hello,

Thank you for choosing Pivott! We’re thrilled to have you on board. To get started, simply click the link below to download the app:

${link}

We hope you enjoy using Pivott and discover how it can simplify your tasks. If you have any questions or need assistance, don’t hesitate to reach out.

Best regards,
The Pivott Team
`
    
    if (emails.includes(req.body.email)) {

    sendEmail(req.body.email, 'Welcome to Pivott! Download Your App Now', message)
      .then(result => {
        if (result) {
          console.log('Email sent successfully');
          res.send("Download link sent to " + req.body.email);
        } else {
          console.log('Failed to send email');
        }
      });
    
    }
    else {
        res.send("please contact at rajvendrarahi126@gmail.com");
    }


});
app.get(`/download/:code`, (req, res) => {
    if (req.params.code == downloadcode) {
    const filePath = `${__dirname}/static/pivott.exe`;
    res.download(filePath, (err) => {
        if (err) {
            res.status(404).send('File not found');
        }
    });
    }
});


app.get('/download/testing', (req, res) => {
    print("testing")
    const filePath = `${__dirname}/static/pivott.exe`;
    res.download(filePath, (err) => {
        if (err) {
            res.status(404).send('File not found');
        }
    });
    
   

});





app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
