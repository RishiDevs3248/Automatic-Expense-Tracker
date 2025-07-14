const connection = require("./Database/DB-Connection");
const express = require('express');
const cookieParser = require("cookie-parser");
const cors = require("cors");  // 👉 import cors

const app = express();

app.use(cors({
  origin: '*',               // ✅ allow all origins for testing (adjust in production)
  methods: ['GET', 'POST'],  // ✅ allow your request types
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(cookieParser());
app.use(express.json());

// Routes
app.use('/person', require('./routes/personRoutes'));
app.use('/expense', require('./routes/expenseRoutes'));

app.get('/', (req, res) => {
  res.send('Welcome to Expense Tracker API');
});

app.listen(3000, () => {
  console.log(`✅ Server listening on port 3000`);
  connection();
});
