const express = require('express');
const app = express();
const port = 6060;
const { generateText } = require('./api_call.js');




app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    res.render('index');
});
app.post('/api/data', async (req, res) => {

    const result = await generateText(req.body.prompt); 
    res.send({"result":result});

})

app.post('/api', (req, res) => {
    const test = req.body;
    console.log(test);
    if (test["version"] < 0.0001) {
        res.send({"update":"yes"});
    } else {
    res.send({"update":"no"});
    }
});


app.get('/download', (req, res) => {
    const { filename } = req.params;
    const filePath = `${__dirname}/static/pivott.exe`;
    res.download(filePath, (err) => {
        if (err) {
            res.status(404).send('File not found');
        }
    });
});




// app.get('/', (req, res) => {
//     res.send('Hello World! , pivott here');
// });





app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
