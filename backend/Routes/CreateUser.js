const express = require('express');
const router = express.Router();
const User = require('../models/User');

const { body, validationResult } = require('express-validator');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const jwtSecret="aaaaabbbbbcccccdddddeeeeefffffgh";

//This route is for creating a user. It uses express-validator to validate 
//the email, name, and password in the request body.
//If validation fails, it returns a 400 Bad Request response with validation errors.
//If successful, it hashes the password using bcrypt and creates a new user using the User model.

router.post('/createUser', [
    body('email', 'Invalid email').isEmail(),
    body('name', 'Invalid name').isLength({ min: 5 }),
    body('password', 'Incorrect password').isLength({ min: 5 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const salt=await bcrypt.genSalt(10);
    let securePassword=await bcrypt.hash(req.body.password,salt);
    try {
        await User.create({
            name: req.body.name,
            password: securePassword,
            email: req.body.email,
            location: req.body.location
        });
        res.json({ success: true });
    } catch (error) {
        console.log(error); // Log the actual error for debugging
        res.json({ success: false });
    }
});


{/*
The /loginUser route is used for user authentication. It also validates the email and password fields.
If validation fails, it returns a 400 Bad Request response with validation errors.
If the email is found in the database, it compares the hashed password with the provided password using bcrypt. 
If the passwords match, it generates a JWT (authToken) and sends it in the response.
*/}

//This route is for user login. It validates the email and password in the request body. 
//If validation fails, it returns a 400 Bad Request response with validation errors. 
//If successful, it attempts to find the user by the provided email. 
//If the user is found, it compares the hashed password with the provided password using bcrypt. 
//If the passwords match, it generates a JWT (JSON Web Token) containing the user's ID and sends 
//it in the response.

router.post('/loginUser', [
    body('email').isEmail(),
    body('password').isLength({ min: 5 })
],
async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    let email = req.body.email;
    try {
        const userData = await User.findOne({ email });
        if (!userData) {
            return res.status(400).json({ errors: "Invalid credentials" });
        }
        const passwordCompare = await bcrypt.compare(req.body.password, userData.password);
        if (!passwordCompare) {
            return res.status(400).json({ errors: "Invalid credentials" });
        }
        const data = {
            user: {
                id: userData.id
            }
        }
        const authToken = jwt.sign(data, jwtSecret);
        return res.json({ success: true, authToken: authToken });
    } catch (error) {
        console.log(error); // Log the actual error for debugging
        res.json({ success: false });
    }
});

module.exports = router;
