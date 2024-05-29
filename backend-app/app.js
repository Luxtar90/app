const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/user');
const { syncDb } = require('./models');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/api/users', userRoutes);

syncDb();

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
