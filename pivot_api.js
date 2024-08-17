    const express = require('express')
    const app = express()
    const port = 6060

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.post('/api', (req, res) => {
        const test = req.body;
        console.log(test);
        if (test["version"] < 0.0001) {
            res.send({"update":"yes"})
        }
        else {
            res.send({"update":"no"})
        }
      
    })

    app.get('/', (req, res) => {
      res.send('Hello World! , pivott here')
    })

    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
    })