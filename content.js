// content.js

const dashboardCourses = [
    { title: "Advanced JavaScript", description: "Master closures, async/await, and functional programming concepts.", progress: 75, buttonText: "Continue Lesson" },
    { title: "Python for Data Science", description: "Learn NumPy, Pandas, and Matplotlib for data analysis and visualization.", progress: 40, buttonText: "Start Lesson" },
    { title: "Modern CSS Techniques", description: "Explore Flexbox, Grid, and custom properties for responsive design.", progress: 90, buttonText: "Review Lesson" },
    { title: "React Basics", description: "Learn the fundamentals of building user interfaces with the React library.", progress: 0, buttonText: "Start Lesson" },
    { title: "Introduction to SQL", description: "Understand how to query and manage relational databases using SQL.", progress: 0, buttonText: "Start Lesson" }
];

const dashboardQuizzes = [
    { title: "JavaScript Fundamentals Quiz", description: "Test your knowledge of variables, data types, and functions.", progress: 0, buttonText: "Take Quiz" },
    { title: "Data Structures Challenge", description: "A timed quiz on arrays, linked lists, and hash tables.", progress: 0, buttonText: "Take Quiz" },
    { title: "React Basics Quiz", description: "Test your knowledge of React components, props, and state.", progress: 0, buttonText: "Take Quiz" }
];

const lessonsData = {
    "advanced-javascript": {
        title: "Advanced JavaScript",
        content: "This lesson explores three core concepts of advanced JavaScript: Closures, Promises, and Async/Await..."
    },
    "python-for-data-science": {
        title: "Python for Data Science",
        content: "Data science in Python is powered by libraries like NumPy for numerical operations, Pandas for data manipulation..."
    },
    "modern-css-techniques": {
        title: "Modern CSS Techniques",
        content: "Modern CSS has moved beyond simple selectors and properties. Today, powerful layout tools like Flexbox and CSS Grid are essential..."
    },
    "react-basics": {
        title: "React Basics",
        content: "React is a JavaScript library for building user interfaces. It lets you compose complex UIs from small and isolated pieces of code called 'components'..."
    },
    "introduction-to-sql": {
        title: "Introduction to SQL",
        content: "SQL (Structured Query Language) is the standard language for relational database management systems. Core commands include SELECT, INSERT, UPDATE, and DELETE..."
    }
};

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
    },
    "react-basics-quiz": {
        title: "React Basics Quiz",
        questions: [
            { question: "What is JSX?", options: ["A new programming language", "A syntax extension for JavaScript", "A database query language", "A CSS pre-processor"], answer: 1 },
            { question: "How do you pass data to a component from its parent?", options: ["Using state", "Using Redux", "Using props", "Using HTML attributes"], answer: 2 }
        ]
    }
};

module.exports = {
    dashboardCourses,
    dashboardQuizzes,
    lessonsData,
    quizzesData
};