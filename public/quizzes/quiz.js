document.addEventListener('DOMContentLoaded', async () => {
    // --- ADDED: Theme-checking logic ---
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark-mode') {
        document.body.classList.add('dark-mode');
    }
    // --- End of new block ---

    // Get all the elements we need from the page
    const quizTitleEl = document.getElementById('quiz-title');
    const questionTextEl = document.getElementById('question-text');
    const optionsContainerEl = document.getElementById('options-container');
    const nextBtn = document.getElementById('next-btn');
    const resultAreaEl = document.getElementById('result-area');
    const scoreTextEl = document.getElementById('score-text');

    let currentQuestionIndex = 0;
    let score = 0;
    let questions = [];

    // --- Main function to start the quiz ---
    async function startQuiz() {
        const params = new URLSearchParams(window.location.search);
        const topicSlug = params.get('topic');

        if (!topicSlug) {
            quizTitleEl.textContent = "Quiz topic not specified!";
            return;
        }

        try {
            const response = await fetch(`/api/quiz/${topicSlug}`);
            if (!response.ok) throw new Error('Quiz not found');
            
            const quizData = await response.json();
            questions = quizData.questions;
            quizTitleEl.textContent = quizData.title;
            document.title = quizData.title;

            showQuestion();
        } catch (error) {
            quizTitleEl.textContent = "Error loading quiz";
            console.error(error);
        }
    }

    // --- Function to display the current question ---
    function showQuestion() {
        const currentQuestion = questions[currentQuestionIndex];
        questionTextEl.textContent = currentQuestion.question;
        optionsContainerEl.innerHTML = ''; // Clear old options

        currentQuestion.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.textContent = option;
            button.classList.add('card-button'); // Reuse button style
            button.style.display = 'block';
            button.style.width = '100%';
            button.style.marginBottom = '0.5rem';
            button.dataset.index = index;
            button.addEventListener('click', selectAnswer);
            optionsContainerEl.appendChild(button);
        });

        nextBtn.style.display = 'none';
    }

    // --- Function to handle answer selection ---
    function selectAnswer(e) {
        const selectedButton = e.target;
        const selectedIndex = parseInt(selectedButton.dataset.index);
        const correctIndex = questions[currentQuestionIndex].answer;

        // Provide visual feedback
        Array.from(optionsContainerEl.children).forEach(btn => {
            btn.disabled = true; // Disable all buttons after selection
            if(parseInt(btn.dataset.index) === correctIndex) {
                btn.style.backgroundColor = '#28a745'; // Green for correct
            }
        });
        
        if (selectedIndex === correctIndex) {
            score++;
        } else {
            selectedButton.style.backgroundColor = '#dc3545'; // Red for incorrect
        }

        nextBtn.style.display = 'block'; // Show the next button
    }
    
    // --- Function to show the final results ---
    function showResults() {
        document.getElementById('question-area').style.display = 'none';
        nextBtn.style.display = 'none';
        resultAreaEl.style.display = 'block';
        scoreTextEl.textContent = `You scored ${score} out of ${questions.length}!`;
    }

    // --- Event listener for the "Next" button ---
    nextBtn.addEventListener('click', () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            showResults();
        }
    });

    // --- Start the quiz when the page loads ---
    startQuiz();
});