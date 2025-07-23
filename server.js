require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, lowercase: true, trim: true },
    email: { type: String, unique: true, required: true, lowercase: true, trim: true },
    password: { type: String, required: true }
});
const User = mongoose.model('User', UserSchema);

app.post('/signup', async (req, res) => {
    let { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    username = username.trim().toLowerCase();
    email = email.trim().toLowerCase();
    password = password.trim();

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'An account already exists with this email.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();
        res.status(201).json({ message: 'Signup successful.' });

    } catch (err) {
        console.error('Signup Error:', err);
        res.status(500).json({ message: 'Server error.' });
    }
});

app.post('/signin', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const user = await User.findOne({
            username: username.trim().toLowerCase(),
            email: email.trim().toLowerCase()
        });

        if (!user) {
            return res.status(404).json({ message: 'No account found with this exact email and username.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Incorrect password.' });
        }

        res.status(200).json({ message: 'Login successful!' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error.' });
    }
});
app.listen(5000, () => console.log('Server running on port 5000'));

