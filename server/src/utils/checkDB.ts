import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Project from '../models/Project';
import Skill from '../models/Skill';
import User from '../models/User';

dotenv.config(); // Looks in the current working directory (server/)

const checkDB = async () => {
    try {
        const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/LB14";
        await mongoose.connect(uri);
        console.log("Connected to database:", mongoose.connection.name);
        
        const pCount = await Project.countDocuments();
        const sCount = await Skill.countDocuments();
        const uCount = await User.countDocuments();
        
        console.log("Projects found:", pCount);
        console.log("Skills found:", sCount);
        console.log("Users found:", uCount);

        const users = await User.find({}, 'email role');
        console.log("Admin Users in DB:", users);

        await mongoose.connection.close();
    } catch (error) {
        console.error("Error connected to DB:", error);
    }
};

checkDB();
