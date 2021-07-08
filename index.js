require('dotenv').config();
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
const compression = require('compression')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const authRoute  = require('./routes/auth')
const productRoute = require('./routes/product')
const app = express()

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));
app.use(compression());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get('/ping', (req, res) => res.send('pong.'));
app.use('/auth', authRoute);
app.use('/product', productRoute);

mongoose.connect(process.env.MONGOURL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then(() => console.log('Mongodb Connect Successflly!'))
  .catch((err) => console.log("Something Went Wrong. Exiting now... ", err));
const server = app.listen(process.env.PORT || 8081, () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log('Product app is listening at http://%s:%s', host, port);
});