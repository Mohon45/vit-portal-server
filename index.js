const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();

port = process.env.port || 5000;

// mongoDB database uri
const uri =
  "mongodb+srv://(yourDatabaseUserName):(YourDatabasePassword)@cluster0.m0coh.mongodb.net/?retryWrites=true&w=majority";

app.use(cors());
app.use(express.json());

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    const db = client.db("vit-portal");
    const userCollection = db.collection("user");

    // all api functionality here
    app.get("/user", (req, res) => {
      const result = userCollection.find({});
      res.send(result);
    });
  } catch (err) {
    console.log(err);
  }
}
run();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`VIT Portal server is Running on port ${port}`);
});
