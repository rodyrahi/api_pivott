
const express = require('express')
const app = express()
const port = 6060


app.use(express.urlencoded({ extended: true }));

app.post('/api', (req, res) => {
    const test = req.body;
    console.log(test);
    res.sendStatus(200);
})




app.get('/', (req, res) => {
  res.send('Hello World! , pivott here')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})