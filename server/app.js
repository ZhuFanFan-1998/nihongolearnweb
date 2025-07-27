const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db'); // Use destructuring
const apiRoutes = require('./routes/api');

const app = express();

app.use(cors());
app.use(express.json());

connectDB(); // Call the function

app.use('/api', apiRoutes);
app.use(cors({ origin: 'http://localhost:4173' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
