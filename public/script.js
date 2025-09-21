// public/script.js
document.addEventListener('DOMContentLoaded', () => {

    // Theme Switcher Logic (no changes)
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        document.body.classList.add(currentTheme);
        if (currentTheme === 'dark-mode') {
            themeToggle.checked = true;
        }
    }
    themeToggle.addEventListener('change', () => {
        if (themeToggle.checked) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
        }
    });

    const coursesGrid = document.getElementById('courses-grid');
    const quizzesGrid = document.getElementById('quizzes-grid');

    // Function to create a card element
    const createCard = (item) => {
        const card = document.createElement('article');
        card.className = 'card';
        card.innerHTML = `
            <h3>${item.title}</h3>
            <p>${item.description}</p>
            <div class="progress-container">
                <div class="progress-label">
                    <span>Progress</span>
                    <span>${item.progress}%</span>
                </div>
                <div class="progress-bar">
                    <div class="progress" style="width: 0%;"></div>
                </div>
            </div>
            <button class="card-button">${item.buttonText}</button>
        `;

        // Redirect logic
        const button = card.querySelector('.card-button');
        button.addEventListener('click', () => {
            const slug = item.title.toLowerCase().replace(/\s+/g, '-');

            if (item.buttonText.includes("Lesson")) {
                // Redirect to the lesson page
                window.location.href = `/courses/lesson.html?topic=${slug}`;
            } else {
                // Redirect to the quiz page
                window.location.href = `/quizzes/quiz.html?topic=${slug}`;
            }
        });

        setTimeout(() => {
            const progressBar = card.querySelector('.progress');
            progressBar.style.width = `${item.progress}%`;
        }, 100);

        return card;
    };

    // Asynchronous function to load all dashboard data (no changes)
    async function loadDashboardData() {
        try {
            const coursesResponse = await fetch('/api/courses');
            const coursesData = await coursesResponse.json();
            coursesGrid.innerHTML = '';
            coursesData.forEach(course => coursesGrid.appendChild(createCard(course)));

            const quizzesResponse = await fetch('/api/quizzes');
            const quizzesData = await quizzesResponse.json();
            quizzesGrid.innerHTML = '';
            quizzesData.forEach(quiz => quizzesGrid.appendChild(createCard(quiz)));

        } catch (error) {
            console.error('Failed to load dashboard data:', error);
            coursesGrid.innerHTML = '<p>Could not load courses. Please try again later.</p>';
            quizzesGrid.innerHTML = '<p>Could not load quizzes. Please try again later.</p>';
        }
    }
    
    loadDashboardData();
});
