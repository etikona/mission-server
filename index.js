const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.6hyeg.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        const userCollection = client.db('Mission').collection('users');
        const taskCollection = client.db('Mission').collection('tasks');

        
           //  Get User Information 

           app.get('/users', async(req, res) => {
            const query = {};
            const users = await userCollection.find(query).toArray();
            console.log(users);
            res.send(users);
        })
        //  Store user data
        app.post('/users', async (req, res) => {
            const user = req.body;
            const result = await userCollection.insertOne(user);
            res.send(result);
        })

     
    }
    finally {

    }
}

app.get('/', (req, res) => {
    res.send("Mission server successfully running")
})

app.listen(port, () => {
    console.log("Server running on", port);
})