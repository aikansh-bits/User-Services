import User from '../models/users.model.js';
import bcrypt from 'bcrypt';

// Signup
export const signup = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const userId = `usr_${Date.now()}`;

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            userId,
            name,
            email,
            password: hashedPassword,
            role
        });

        await newUser.save();
        res.status(201).json({ message: 'User created successfully', userId: newUser.userId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        res.status(200).json({ message: 'Login successful', userId: user.userId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get User by userId
export const getUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findOne({ userId }, '-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update User
export const updateUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const updates = req.body;

        if (updates.password) {
            updates.password = await bcrypt.hash(updates.password, 10);
        }

        const user = await User.findOneAndUpdate({ userId }, updates, { new: true });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
