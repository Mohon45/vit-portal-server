const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const app = express();

port = process.env.port || 5000;

// mongoDB database uri
const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASS}@cluster0.m0coh.mongodb.net/?retryWrites=true&w=majority`;

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
    app.get("/user", async (req, res) => {
      const result = userCollection.find({});
      const data = await result.toArray();
      res.json(data);
    });

    app.post("/add-user", async (req, res) => {
      const newData = req.body;
      const result = await userCollection.insertOne(newData);
      res.json(result);
    });

    app.get("/user/:id", async (req, res) => {
      const { id } = req.params;
      const query = { _id: ObjectId(id) };
      const cursor = await userCollection.findOne(query);
      // const result = await cursor.toArray();
      res.json(cursor);
    });

    app.put("/user/:id", async (req, res) => {
      const { id } = req.params;
      const query = { _id: ObjectId(id) };
      const result = {
        $set: req.body,
      };
      const cursor = await userCollection.updateOne(query, result);
      // const result = await cursor.toArray();
      res.json(cursor);
    });

    app.delete("/user/:id", async (req, res) => {
      const { id } = req.params;
      const query = { _id: ObjectId(id) };
      const cursor = await userCollection.deleteOne(query);
      res.json(cursor);
    });
  } catch (err) {
    console.log(err);
  }
}
run();

app.get("/", (req, res) => {
  res.send("VIT PORTAL Server is Running!");
});

app.listen(port, () => {
  console.log(`VIT Portal server is Running on port ${port}`);
});
