const connection = require("./Database/DB-Connection");
const express = require('express');
const cookieParser = require("cookie-parser");
const cors = require("cors");  // 👉 import cors

const app = express();

// app.use(cors({
//   origin: '*',               // ✅ allow all origins for testing (adjust in production)
//   methods: ['GET', 'POST'],  // ✅ allow your request types
//   allowedHeaders: ['Content-Type', 'Authorization'],
// }));

// Allowed origins
const allowedOrigins = [
  'http://localhost:5173',     // React Web frontend
  'http://192.168.1.35:3000',  // React Native fetch (if any)
  'http://192.168.1.35:8081'   // Metro bundler (optional)
];

// CORS middleware
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
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
