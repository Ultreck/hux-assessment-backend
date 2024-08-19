const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const contactRoutes = require('./src/routes/routers');
const router = require('./src/routes/routers');
dotenv.config();

const app = express();


app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());
app.use('/', router)
app.set('strictQuery', false);
dotenv.config();

app.use(express.json());

app.use('/api/contacts', contactRoutes);

const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
