document.addEventListener('DOMContentLoaded', async () => {
    // --- ADDED: Theme-checking logic ---
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark-mode') {
        document.body.classList.add('dark-mode');
    }
    // --- End of new block ---

    const lessonTitleElement = document.getElementById('lesson-title');
    const lessonBodyElement = document.getElementById('lesson-body');

    // Get the topic "slug" from the URL (e.g., "?topic=advanced-javascript")
    const params = new URLSearchParams(window.location.search);
    const topicSlug = params.get('topic');

    if (!topicSlug) {
        lessonTitleElement.textContent = "Error";
        lessonBodyElement.textContent = "No lesson topic specified. Please return to the dashboard.";
        return;
    }

    try {
        // Fetch the specific lesson data from our new API endpoint
        const response = await fetch(`/api/lesson/${topicSlug}`);
        
        if (!response.ok) {
            throw new Error('Lesson not found');
        }

        const lessonData = await response.json();

        // Update the page with the fetched data
        document.title = lessonData.title; // Update the browser tab title
        lessonTitleElement.textContent = lessonData.title;
        lessonBodyElement.textContent = lessonData.content;

    } catch (error) {
        console.error('Failed to load lesson:', error);
        lessonTitleElement.textContent = "Lesson Not Found";
        lessonBodyElement.textContent = "Sorry, we couldn't find the lesson you were looking for.";
    }
});