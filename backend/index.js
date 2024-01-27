
//->backend->nodemon index.js
const express = require('express')

const app = express()


// CORS middleware to handle preflight requests
app.use((req, res, next) => {
  // Allow requests from http://localhost:3000
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  // Respond to CORS preflight requests with a 200 OK status
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  next();
});



const port = 5000


app.use(express.json());
const mongoDB=require("./db");
mongoDB();

app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.use('/api',require('./Routes/CreateUser'));
app.use('/api',require('./Routes/DisplayData'));
app.use('/api',require('./Routes/OrderData'));

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})