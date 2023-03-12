const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

// user: productUser
// pass: xrRMYwxHEi0ZLSk6

// middleware
app.use(cors());
app.use(express.json());

const uri =
  "mongodb+srv://productUser:xrRMYwxHEi0ZLSk6@cluster0.xgh8h2c.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const run = async () => {
  try {
    const productCollection = client
      .db("productCollection")
      .collection("products");

    app.get("/products", async (req, res) => {
      const query = {};
      const cursor = productCollection.find(query);
      const products = await cursor.toArray();
      res.send(products);
    });
    app.post("/products", async (req, res) => {
      const product = req.body;
      const result = await productCollection.insertOne(product);
      console.log(`Product is inserted with the result, ${result}`);
      res.send(result);
    });
  } finally {
  }
};

run().catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Products crud server is running");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
