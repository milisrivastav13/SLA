// server.js
const express = require('express');
const app = express();
const PORT = 3000;

// --- MOCK DATABASE ---

// Dashboard data (unchanged)
const dashboardCourses = [
    { title: "Advanced JavaScript", description: "Master closures, async/await, and functional programming concepts.", progress: 75, buttonText: "Continue Lesson" },
    { title: "Python for Data Science", description: "Learn NumPy, Pandas, and Matplotlib for data analysis and visualization.", progress: 40, buttonText: "Start Lesson" },
    { title: "Modern CSS Techniques", description: "Explore Flexbox, Grid, and custom properties for responsive design.", progress: 90, buttonText: "Review Lesson" }
];
const dashboardQuizzes = [
    { title: "JavaScript Fundamentals Quiz", description: "Test your knowledge of variables, data types, and functions.", progress: 0, buttonText: "Take Quiz" },
    { title: "Data Structures Challenge", description: "A timed quiz on arrays, linked lists, and hash tables.", progress: 0, buttonText: "Take Quiz" }
];

// *NEW:* Detailed data for individual lessons
const lessonsData = {
    "advanced-javascript": {
        title: "Advanced JavaScript",
        content: "This lesson explores three core concepts of advanced JavaScript: Closures, Promises, and Async/Await. Closures give you access to an outer function's scope from an inner function. Promises are used for asynchronous computations, representing a value which may be available now, or in the future, or never. Async/Await is modern syntax that makes asynchronous code look and behave a little more like synchronous code, which makes it easier to read and write."
    },
    "python-for-data-science": {
        title: "Python for Data Science",
        content: "Data science in Python is powered by libraries like NumPy for numerical operations, Pandas for data manipulation (using its famous DataFrame), and Matplotlib for creating static, animated, and interactive visualizations. These tools form the foundation of most data analysis and machine learning work in Python."
    },
    "modern-css-techniques": {
        title: "Modern CSS Techniques",
        content: "Modern CSS has moved beyond simple selectors and properties. Today, powerful layout tools like Flexbox (for one-dimensional layouts) and CSS Grid (for two-dimensional layouts) are essential. Additionally, CSS Custom Properties (often called CSS Variables) allow you to store values for reuse throughout your stylesheet, making themes and large-scale changes much easier to manage."
    }
};

// *NEW:* Detailed data for individual quizzes
const quizzesData = {
    "javascript-fundamentals-quiz": {
        title: "JavaScript Fundamentals Quiz",
        questions: [
            { question: "Which keyword is used to declare a variable that cannot be reassigned?", options: ["let", "const", "var", "static"], answer: 1 },
            { question: "What does the '===' operator do?", options: ["Compares values for equality", "Assigns a value to a variable", "Compares both value and type for equality", "Checks if a value is null"], answer: 2 },
            { question: "How do you call a function named 'myFunction'?", options: ["call myFunction()", "myFunction", "myFunction()", "exec myFunction"], answer: 2 }
        ]
    },
    "data-structures-challenge": {
        title: "Data Structures Challenge",
        questions: [
            { question: "Which data structure uses LIFO (Last-In, First-Out)?", options: ["Queue", "Stack", "Array", "Linked List"], answer: 1 },
            { question: "What is the time complexity for accessing an element in a hash table on average?", options: ["O(n)", "O(log n)", "O(1)", "O(n^2)"], answer: 2 }
        ]
    }
};


// --- API ROUTES ---

// Routes for the main dashboard
app.use(express.static('public'));
app.get('/api/courses', (req, res) => res.json(dashboardCourses));
app.get('/api/quizzes', (req, res) => res.json(dashboardQuizzes));

// *NEW:* API route to get a specific lesson's data
app.get('/api/lesson/:slug', (req, res) => {
    const lesson = lessonsData[req.params.slug];
    if (lesson) {
        res.json(lesson);
    } else {
        res.status(404).json({ error: "Lesson not found" });
    }
});

// *NEW:* API route to get a specific quiz's data
app.get('/api/quiz/:slug', (req, res) => {
    const quiz = quizzesData[req.params.slug];
    if (quiz) {
        res.json(quiz);
    } else {
        res.status(404).json({ error: "Quiz not found" });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
});
