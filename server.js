const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const getPriceInfo = require('./soap-client');

const app = express();
let db;
const uri = 'mongodb://mongo:27017/mydatabase';

async function dbConnect() {
  const client = await MongoClient.connect(uri);
  console.log('Connected to MongoDB');
  db = await client.db('mydatabase');
  const result = await db.collection('cars').insertOne(
    {
      vin: 'J87AH128BDEI29E',
      plate: 'AHN39ND0',
      state: 'New York',
      make: 'Honda',
      model: 'Civic',
      year: '2021',
      owner: 
      {
        name: 'Joe Biden',
        address: 'White House Washington DC',
        license: '18BD39DE3'
      },
      ticket:
      {
        description: 'Engine shaking when reaching 65 mph',
        in_time: '06/24/2023 9:10 AM CST',
        out_time: 'TBD',
        workers: 'Donald Trump'
      }
    }
  );
  console.log(result);
}

app.use(express.json())

app.get('/cars', (req, res) => {
  console.log("Received get request")
    db.collection('cars').find().toArray().then((docs) => {
      res.json(docs);
    }).catch(err => {
      console.error('Failed to fetch documents from MongoDB:', err);
      res.status(500).send('Internal Server Error');
    })
});

app.get('/cars/:id', (req, res) => {
  console.log("Received get request by id")
  var id = req.params.id;
  console.log("id received from get request " + id)
  db.collection('cars').findOne({_id: new ObjectId(id)}).then(docs => {
    console.log("in callback with docs of: " + docs)
    if (!docs) {
      return res.status(401).end();
    }
    res.json(docs);
  }).catch(err => {
    console.error('Failed to fetch item by id from MongoDB:', err);
    res.status(500).send('Internal Server Error');
  })
});

app.delete('/cars/:id', (req, res) => {
  console.log("Received delete request")
  var id = req.params.id;
  console.log("id received from delete request " + id)
  db.collection('cars').deleteOne({_id: new ObjectId(id)}).then((err, docs) => {
    res.status(200).end()
  }).catch(err => {
    console.error('Failed to fetch item by id from MongoDB:', err);
    res.status(500).send('Internal Server Error');
  })
});

app.put('/cars/:id', (req, res) => {
  console.log("Received put request")
  var id = req.params.id;
  console.log("id received from put request " + id)
  db.collection('cars').updateOne({_id: new ObjectId(id)}, {$set: req.body}).then((err, docs) => {
    res.status(200).end()
  }).catch(err => {
    console.error('Failed to fetch item by id from MongoDB:', err);
    res.status(500).send('Internal Server Error');
  })
});

app.post('/cars', (req, res) => {
  console.log("Received post request")
  const body = req.body
  console.log(body);
  db.collection('cars').insertOne(body).then((docs) => {
    res.status(201).send({success: true});
  }).catch(err => {
    console.error('Failed to insert customer to MongoDB:', err);
    res.status(500).send('Internal Server Error');
  })
});

app.get('/cars/partprice/:id', async (req, res) => {
  try {
    const soapPriceInfo = await getPriceInfo({id: req.params.id});
    res.json({
      ...soapPriceInfo,
    });
  } catch (err) {
    console.error('Failed to fetch documents from MongoDB:', err);
    res.status(500).send('Internal Server Error');
  }
});

// Start the server on port 3000
app.listen(3000, () => {
  dbConnect().then (() => {
    console.log('Server is running on port 3000');
  });
});

