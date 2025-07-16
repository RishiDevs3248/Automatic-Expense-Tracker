const express = require('express');
const router = express.Router();
const Person = require('../models/Person');
const createJwtToken = require("../components/createJwtToken");
const { isloggedin } = require('../middleware/isLoggedIn');
const bcrypt = require('bcrypt');
const saltRounds = 10;


// Register 
router.post('/register', async (req, res) => {
    try {
        const { name, email, phoneNo, password } = req.body;


        const personExist = await Person.findOne({ email });
        if (personExist) {
            return res.json({ "msg": `email "${email}" already in use ❌ ` });
        }

        bcrypt.genSalt(saltRounds, function (err, salt) {
            bcrypt.hash(password, salt, async function (err, hash) {
                await Person.create({ email, password: hash, phoneNo, name })
                res.cookie("token", createJwtToken(email))
                return res.json({ message: "User created ✅" });
            });
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// login
router.post('/login', async (req, res) => {
    try {
        console.log("-----------------------------------------------------------------------")
        // console.log(personExist)
        console.log("Hit /login")
        console.log("-----------------------------------------------------------------------")
        const { email, password } = req.body;

        const personExist = await Person.findOne({email});
        if (!personExist) {
            return res.json({ "msg": `Please register ❌ ` });
        }

        const isMatch = await bcrypt.compare(password, personExist.password);
        if (!isMatch) {
            return res.status(401).json({ msg: "Invalid password ❌" });
        }

        res
            .cookie("token", createJwtToken(email))
            .status(200)
            .json({ message: "Login successful ✅", user: personExist ,redirect: "http://localhost:5173/Dashboard" });


    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});




// app - login
router.post('/applogin', async (req, res) => {
    try {

        const { email, password } = req.body;

        const personExist = await Person.findOne({ email });
        console.log("-----------------------------------------------------------------------")
        // console.log(personExist)
        console.log("Hit /applogin")
        console.log("-----------------------------------------------------------------------")
        if (!personExist) {
            return res.status(400).json({ msg: `Please register ❌` });
        }

        const isMatch = await bcrypt.compare(password, personExist.password);
        if (!isMatch) {
            return res.status(401).json({ msg: "Invalid password ❌" });
        }

        const token = createJwtToken(email); // or (personExist._id) if your tokens are based on ID

        // ✅ Log to backend console
        console.log(`✅ User logged in: ${personExist.email} at ${new Date().toLocaleString()}`);

        // ✅ Send only token to match frontend expectations
        res.status(200).json({ token });

    } catch (err) {
        console.error("❌ Error in /applogin:", err);
        res.status(500).json({ msg: 'Internal server error' });
    }
});



// logout
router.post('/logout', isloggedin, async (req, res) => {
    try {

        res
            .cookie("token", "")
            .status(200)
            .json({ message: "Logout successful ✅", user: req.person });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})


module.exports = router;

