const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();


const uri = `mongodb://localhost:27017/quiz-app`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error) {
    console.error("Connection error:", error.message);
  } finally {
    await client.close();
  }
}

run();
