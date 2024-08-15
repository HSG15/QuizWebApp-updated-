let questionCount = 1;

document.getElementById('add-question').addEventListener('click', function() {
    questionCount++;
    
    const questionContainer = document.getElementById('question-container');
    const questionItem = document.createElement('div');
    questionItem.classList.add('question-item');
    
    questionItem.innerHTML = `
        <label>Question ${questionCount}</label>
        <input type="text" class="question-text" placeholder="Enter your question" required>
        
        <label>Answer Options</label>
        <input type="text" class="answer-option" placeholder="Option 1" required>
        <input type="text" class="answer-option" placeholder="Option 2" required>
        <input type="text" class="answer-option" placeholder="Option 3" required>
        <input type="text" class="answer-option" placeholder="Option 4" required>
        
        <label>Correct Answer</label>
        <input type="number" class="correct-answer" placeholder="Correct option number (1-4)" required>
    `;
    
    questionContainer.appendChild(questionItem);
});

document.getElementById('generateLink').addEventListener('click', function(e) {
    e.preventDefault();

    const questions = [];
    let isValid = true;
    
    document.querySelectorAll('.question-item').forEach(function(item) {
        const questionText = item.querySelector('.question-text').value.trim();
        const answerOptions = Array.from(item.querySelectorAll('.answer-option')).map(input => input.value.trim());
        const correctAnswer = parseInt(item.querySelector('.correct-answer').value.trim());
        
        // Check if any required field is empty
        if (!questionText || answerOptions.some(option => !option) || isNaN(correctAnswer) || correctAnswer < 1 || correctAnswer > 4) {
            isValid = false;
            item.classList.add('error');
        } else {
            item.classList.remove('error');
            questions.push({ questionText, answerOptions, correctAnswer });
        }
    });
    
    if (!isValid) {
        alert('Please fill all required fields and ensure that the correct answer is a valid number between 1 and 4.');
        return;
    }
    
    const quizId = `quiz_${Date.now()}`;
    const quizzes = JSON.parse(localStorage.getItem('quizzes')) || {};
    quizzes[quizId] = questions;
    localStorage.setItem('quizzes', JSON.stringify(quizzes));

    const shareableLink = `${window.location.origin}/take-quiz.html?id=${quizId}`;
    
    // Display the link
    const linkElement = document.getElementById('link');
    linkElement.textContent = shareableLink;
    document.getElementById('quiz-link').style.display = 'block';
});
