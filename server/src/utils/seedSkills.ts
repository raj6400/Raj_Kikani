import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Skill from '../models/Skill';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });

const skills = [
    { name: "HTML", level: 95 },
    { name: "CSS", level: 90 },
    { name: "JavaScript", level: 85 },
    { name: "Advanced JS", level: 80 },
    { name: "React JS", level: 85 },
    { name: "Node.js", level: 80 },
    { name: "TypeScript", level: 75 },
    { name: "PHP", level: 90 },
    { name: "Laravel", level: 85 },
    { name: "Laravel Livewire", level: 80 },
    { name: "Java", level: 75 },
    { name: "C", level: 70 },
    { name: "C++", level: 75 }
];

const seedSkills = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/LB14');
        console.log("Connected to MongoDB for skill seeding...");

        await Skill.deleteMany({});
        console.log("Existing skills cleared.");

        await Skill.insertMany(skills);
        console.log(`${skills.length} Skills successfully seeded into the database.`);

        await mongoose.connection.close();
        console.log("Database connection closed.");
    } catch (error) {
        console.error("Error seeding skills:", error);
        process.exit(1);
    }
};

seedSkills();
