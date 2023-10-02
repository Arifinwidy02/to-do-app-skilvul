const express = require('express')
const app = express()
// const port = 3000
const routes = require('./routes/index')

require('dotenv').config();

app.use(require("cors")());

//bodyparser
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use(routes)


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});