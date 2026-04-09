import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Project from '../models/Project';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });

const projects = [
    {
        title: "Java Commerce Engine",
        description: "A robust e-commerce engine built with Java, focusing on high-performance transaction processing and scalable architecture.",
        technologies: ["Java", "Spring Boot", "MySQL", "Maven"],
        githubLink: "https://github.com/raj6400/java-commerce-engine",
        liveLink: "",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop"
    },
    {
        title: "Vency Perfume",
        description: "A luxury perfume showcase website featuring elegant product displays and smooth user interactions.",
        technologies: ["HTML", "CSS", "JavaScript", "Animation"],
        githubLink: "https://github.com/raj6400/Vency_Perfume",
        liveLink: "https://vency-perfume.vercel.app",
        image: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1974&auto=format&fit=crop"
    },
    {
        title: "WT Practical",
        description: "Web Technology practical assignments showcasing mastery over HTML, CSS, and modern web standards.",
        technologies: ["HTML", "CSS", "Bootstrap"],
        githubLink: "https://github.com/raj6400/WT-Practical",
        liveLink: "",
        image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=1931&auto=format&fit=crop"
    },
    {
        title: "Marwadi Website",
        description: "A comprehensive institutional website developed for Marwadi University student portal requirements.",
        technologies: ["HTML", "JavaScript", "Responsive Design"],
        githubLink: "https://github.com/raj6400/marwadi_website.gtihub.io",
        liveLink: "https://raj6400.github.io/marwadi_website.gtihub.io/",
        image: "https://images.unsplash.com/photo-1523050335392-9bc0ad0b97d0?q=80&w=2070&auto=format&fit=crop"
    },
    {
        title: "Apple Design",
        description: "A pixel-perfect UI clone of Apple's design aesthetic focusing on minimalism and smooth transitions.",
        technologies: ["Blade", "Laravel", "Tailwind CSS"],
        githubLink: "https://github.com/raj6400/Apple_Design",
        liveLink: "",
        image: "https://images.unsplash.com/photo-1491933382434-500287f9b54b?q=80&w=1964&auto=format&fit=crop"
    },
    {
        title: "Learning Laravel",
        description: "A documentation and practice repository for mastering Laravel backend development and MVC architecture.",
        technologies: ["PHP", "Laravel", "PostgreSQL", "Auth"],
        githubLink: "https://github.com/raj6400/Learning_Laravel",
        liveLink: "",
        image: "https://images.unsplash.com/photo-1599507593499-a3f7d7d97667?q=80&w=2070&auto=format&fit=crop"
    },
    {
        title: "Wood Furniture",
        description: "An inventory management and showcase platform for high-quality wood furniture designs.",
        technologies: ["Blade", "Laravel", "Eloquent ORM"],
        githubLink: "https://github.com/raj6400/Wood_Furniture",
        liveLink: "",
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=2070&auto=format&fit=crop"
    },
    {
        title: "Venue Vibe",
        description: "A visually stunning venue booking and management system with a focus on immersive user experience.",
        technologies: ["CSS", "JavaScript", "Dynamic UI"],
        githubLink: "https://github.com/raj6400/Venue_Vibe",
        liveLink: "",
        image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2074&auto=format&fit=crop"
    },
    {
        title: "Marwadi Practical",
        description: "A collection of advanced computer engineering practicals and laboratory implementations.",
        technologies: ["HTML", "CS", "Laboratory Scripts"],
        githubLink: "https://github.com/raj6400/Marwadi_Pratrical",
        liveLink: "",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop"
    },
    {
        title: "Detailing Bull",
        description: "A professional car detailing service platform with booking management and service catalog.",
        technologies: ["PHP", "MySQL", "Dashboard"],
        githubLink: "https://github.com/raj6400/Detailing_Bull",
        liveLink: "",
        image: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?q=80&w=1931&auto=format&fit=crop"
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/LB14');
        console.log("Connected to MongoDB for seeding...");

        await Project.deleteMany({});
        console.log("Existing projects cleared.");

        await Project.insertMany(projects);
        console.log("10 Projects successfully seeded into the database.");

        await mongoose.connection.close();
        console.log("Database connection closed.");
    } catch (error) {
        console.error("Error seeding database:", error);
        process.exit(1);
    }
};

seedDB();
