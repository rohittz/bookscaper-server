const express = require('express')
const cors = require('cors');
const app = express()
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
const port = process.env.PORT || 3005;

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port);
