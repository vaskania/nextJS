//  /api/new-meetup
// POST /api/new-meetup  ONLY

import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(
      "mongodb+srv://vaska:vaskania@nextjs-test.oyffq.mongodb.net/meetups?retryWrites=true&w=majority"
    ); // database migneba-an tu araa sheqmna
    const db = client.db();

    const meetupsCollection = db.collection("meetups"); //coleqciis migneba an sheqmna
    const result = await meetupsCollection.insertOne(data);

    console.log(result);

    client.close();

    res.status(201).json({ message: "Meetup inserted!" });
  }
}

export default handler;
