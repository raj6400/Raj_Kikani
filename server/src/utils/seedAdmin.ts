import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/LB14');
        console.log("Connected to MongoDB for admin seeding...");

        // Remove existing admin with this email if it exists
        await User.deleteOne({ email: 'admin64@gmail.com' });

        const adminUser = new User({
            name: 'Raj Kikani',
            email: 'admin64@gmail.com',
            password: 'Raj@8956785623',
            role: 'admin'
        });

        await adminUser.save();
        console.log("Admin account successfully created!");
        console.log("Email: admin64@gmail.com");
        console.log("Role: admin");

        await mongoose.connection.close();
        console.log("Database connection closed.");
    } catch (error) {
        console.error("Error seeding admin:", error);
        process.exit(1);
    }
};

seedAdmin();
