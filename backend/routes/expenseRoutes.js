const express = require('express');
const router = express.Router();
const Expense = require('../models/Expence');
const { isloggedin } = require('../middleware/isLoggedIn');
const { isAppLoggedIn } = require('../middleware/isAppLoggedin');


// Add Expence
router.post('/add',isloggedin, async (req, res) => {
  try {
    const userId = req.person._id
    const { amount, category, description = "", date } = req.body;

    const expense = new Expense({ userId, amount, category, description, date });
    await expense.save();

    res.status(201).json({ message: 'Expense added ✅', expense });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// app - Add Expence
router.post('/appadd',isAppLoggedIn, async (req, res) => {
  try {
    // console.log("---------------------------------------")
    // console.log("Hit appadd")
    // console.log("---------------------------------------")
    // console.log("➡️ /appadd called");
    // console.log("🧠 req.person:", req.person);  // confirm middleware
    // console.log("📥 req.body:", req.body); 
    const userId = req.person._id
    const { amount, category, description = "", date } = req.body;

    const expense = new Expense({ userId, amount, category, description, date });
    await expense.save();

    res.status(201).json({ message: 'Expense added ✅', expense });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



// Delete Expence
router.post('/delete',isloggedin, async (req, res) => {
  try {
    const userId = req.person._id
    const { _id } = req.body;

    const expense = await Expense.findOne({_id , userId})
    if(!expense){
        res.status(400).json({ message: 'Expense Not found ❌', expense });
    }
    await Expense.deleteOne({_id})
    res.status(201).json({ message: 'Expense deleted ✅', expense });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



// Edit Expence
router.post('/edit',isloggedin, async (req, res) => {
  try {
    const userId = req.person._id
    const { _id , amount, category, description = "", date } = req.body;

    const expense = await Expense.findOne({_id , userId})
    if(!expense){
        res.status(400).json({ message: 'Expense Not found ❌', expense });
    }
    await Expense.updateOne({amount, category, description , date })
    res.status(201).json({ message: 'Expense Updated ✅', expense });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



// // Helper to normalize date range
// const getDateRange = (period) => {
//   const now = new Date();
//   let start, end;

//   if (period === 'daily') {
//     start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
//     end = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
//   } else if (period === 'monthly') {
//     start = new Date(now.getFullYear(), now.getMonth(), 1);
//     end = new Date(now.getFullYear(), now.getMonth() + 1, 1);
//   } else if (period === 'yearly') {
//     start = new Date(now.getFullYear(), 0, 1);
//     end = new Date(now.getFullYear() + 1, 0, 1);
//   }

//   return { start, end };
// };

// // Get daily expenses and total
// router.get('/daily', isloggedin, async (req, res) => {
//   try {
//     const userId = req.person._id;
//     const { start, end } = getDateRange('daily');

//     const expenses = await Expense.find({ userId, date: { $gte: start, $lt: end } });
//     const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);

//     res.status(200).json({ period: 'daily', total, expenses });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Get monthly expenses and total
// router.get('/monthly', isloggedin, async (req, res) => {
//   try {
//     const userId = req.person._id;
//     const { start, end } = getDateRange('monthly');

//     const expenses = await Expense.find({ userId, date: { $gte: start, $lt: end } });
//     const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);

//     res.status(200).json({ period: 'monthly', total, expenses });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Get yearly expenses and total
// router.get('/yearly', isloggedin, async (req, res) => {
//   try {
//     const userId = req.person._id;
//     const { start, end } = getDateRange('yearly');

//     const expenses = await Expense.find({ userId, date: { $gte: start, $lt: end } });
//     const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);

//     res.status(200).json({ period: 'yearly', total, expenses });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });



// Last 7 days total and list of expences 
router.get('/days', isloggedin, async (req, res) => {
  try {
    const userId = req.person._id;

    const today = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 6);

    // Normalize time
    const startDate = new Date(sevenDaysAgo.setHours(0, 0, 0, 0));
    const endDate = new Date(today.setHours(23, 59, 59, 999));

    // Fetch expenses in the last 7 days
    const expenses = await Expense.find({
      userId,
      date: { $gte: startDate, $lte: endDate }
    });

    // Group by date: { "2025-07-13": [exp1, exp2], ... }
    const groupedExpenses = {};

    for (let i = 0; i < 7; i++) {
      const dateObj = new Date();
      dateObj.setDate(today.getDate() - i);
      const dateKey = dateObj.toISOString().split('T')[0];
      groupedExpenses[dateKey] = [];
    }

    expenses.forEach((exp) => {
      const dateKey = new Date(exp.date).toISOString().split('T')[0];
      if (groupedExpenses[dateKey]) {
        groupedExpenses[dateKey].push(exp);
      }
    });

    // Create final data: array of { date, total, expenses: [...] }
    const data = Object.entries(groupedExpenses)
      .map(([date, expList]) => {
        const total = expList.reduce((sum, exp) => sum + exp.amount, 0);
        return {
          date,
          total,
          expenses: expList
        };
      })
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    res.status(200).json({ message: 'Last 7 days expenses ✅', data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});






// Last 12 months total and list
router.get('/months', isloggedin, async (req, res) => {
  try {
    const userId = req.person._id;

    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth() - 11, 1); // 12 months back

    const expenses = await Expense.find({
      userId,
      date: { $gte: start, $lte: now }
    });

    const monthlyTotals = {};

    // Pre-fill with all 12 months
    for (let i = 0; i < 12; i++) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`; // YYYY-MM
      monthlyTotals[key] = [];
    }

    expenses.forEach(exp => {
      const d = new Date(exp.date);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      if (monthlyTotals[key]) {
        monthlyTotals[key].push(exp);
      }
    });

    const data = Object.entries(monthlyTotals)
      .map(([month, exps]) => ({
        month,
        total: exps.reduce((sum, e) => sum + e.amount, 0),
        expenses: exps
      }))
      .sort((a, b) => new Date(a.month) - new Date(b.month));

    res.status(200).json({ message: 'Last 12 months expenses ✅', data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});







// Last 7 years and list
router.get('/years', isloggedin, async (req, res) => {
  try {
    const userId = req.person._id;

    const now = new Date();
    const start = new Date(now.getFullYear() - 6, 0, 1); // 7 years back, Jan 1

    const expenses = await Expense.find({
      userId,
      date: { $gte: start, $lte: now }
    });

    const yearlyTotals = {};

    for (let i = 0; i < 7; i++) {
      const year = now.getFullYear() - i;
      yearlyTotals[year] = [];
    }

    expenses.forEach(exp => {
      const year = new Date(exp.date).getFullYear();
      if (yearlyTotals[year]) {
        yearlyTotals[year].push(exp);
      }
    });

    const data = Object.entries(yearlyTotals)
      .map(([year, exps]) => ({
        year,
        total: exps.reduce((sum, e) => sum + e.amount, 0),
        expenses: exps
      }))
      .sort((a, b) => a.year - b.year);

    res.status(200).json({ message: 'Last 7 years expenses ✅', data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});





module.exports = router;

