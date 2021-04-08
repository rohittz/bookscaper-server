const express = require('express')
const cors = require('cors');
require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
const port = 3005;
//mongodb
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.dipq6.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// connecting to mongodb
client.connect(err => {
    const bookList = client.db(process.env.DB_NAME).collection("All books");
    // perform actions on the collection object
    app.post('/addbook', (req, res) => {
        const newBook = req.body;
        bookList.insertOne(newBook)
            .then(result => {
                res.send(result.insertedCount > 0);
            })
    });
    app.get('/allbooks', (req, res) => {
        bookList.find({})
            .toArray((err, documents) => {
                res.status(200).send(documents);
            })
    })
});

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(process.env.PORT || port);
