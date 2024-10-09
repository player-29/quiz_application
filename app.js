const quizData = [
    {
      question: '1. Which of the following is the correct syntax to print a page using JavaScript?',
      options: ['window.print();', 'browser.print();', 'navigator.print();', 'document.print();'],
      answer: 'window.print();',
    },
    {
      question: '2. Which built-in method returns the index within the calling String object of the first occurrence of the specified value?',
      options: ['getIndex()', 'location()', 'indexOf()', 'None of the above'],
      answer: 'indexOf()',
    },
    {
      question: '3. Which built-in method reverses the order of the elements of an array?',
      options: ['changeOrder(order)', 'reverse()', 'sort(order)', 'None of the above'],
      answer: 'reverse()',
    },
    {
      question: '4. Which of the following function of Boolean object returns the primitive value of the Boolean object?',
      options: ['toSource()', 'valueOf()', 'toString()', 'None of the above'],
      answer: 'valueOf()',
    },
    {
      question: '5. Which of the following function of String object splits a String object into an array of strings by separating the string into substrings?',
      options: [
        'slice()',
        'split()',
        'replace()',
        'search()',
      ],
      answer: 'split()',
    },
    {
      question: '6. Which of the following function of String object creates a string to be displayed in a big font as if it were in a <big> tag?',
      options: ['anchor()', 'big()', 'blink()', 'italics()'],
      answer: 'big()',
    },
    {
      question: '7. Which of the following function of String object creates an HTML hypertext link that requests another URL?',
      options: [
        'link()',
        'sub()',
        'sup()',
        'small()',
      ],
      answer: 'link()',
    },
    {
      question: '8. What will be the output of the following code snippet  -- print(typeof(NaN));',
      options: ['Object', 'Number', 'String', 'None of the above'],
      answer: 'Number',
    },
    {
      question: '9. How do you write "Hello World" in an alert box?',
      options: [
        'alertBox("Hello World");  ',
        'msgBox("Hello World");',
        'alert("Hello World");  ',
        'msg("Hello World");',
      ],
      answer: 'alert("Hello World");  ',
    },
    {
      question: '10. How can you detect the clients browser name?',
      options: ['client.navName  ', 'navigator.appName  ', 'browser.name', 'None of the above'],
      answer: 'browser.name',
    },
  ];
  
  const quizContainer = document.getElementById('quiz');
  const resultContainer = document.getElementById('result');
  const submitButton = document.getElementById('submit');
  const retryButton = document.getElementById('retry');
  const showAnswerButton = document.getElementById('showAnswer');
  
  let currentQuestion = 0;
  let score = 0;
  let incorrectAnswers = [];
  
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  function displayQuestion() {
    const questionData = quizData[currentQuestion];
  
    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questionData.question;
  
    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';
  
    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);
  
    for (let i = 0; i < shuffledOptions.length; i++) {
      const option = document.createElement('label');
      option.className = 'option';
  
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'quiz';
      radio.value = shuffledOptions[i];
  
      const optionText = document.createTextNode(shuffledOptions[i]);
  
      option.appendChild(radio);
      option.appendChild(optionText);
      optionsElement.appendChild(option);
    }
  
    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
  }
  
  function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (selectedOption) {
      const answer = selectedOption.value;
      if (answer === quizData[currentQuestion].answer) {
        score++;
      } else {
        incorrectAnswers.push({
          question: quizData[currentQuestion].question,
          incorrectAnswer: answer,
          correctAnswer: quizData[currentQuestion].answer,
        });
      }
      currentQuestion++;
      selectedOption.checked = false;
      if (currentQuestion < quizData.length) {
        displayQuestion();
      } else {
        displayResult();
      }
    }
  }
  
  function displayResult() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'inline-block';
    resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
  }
  
  function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    quizContainer.style.display = 'block';
    submitButton.style.display = 'inline-block';
    retryButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    resultContainer.innerHTML = '';
    displayQuestion();
  }
  
  function showAnswer() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'none';
  
    let incorrectAnswersHtml = '';
    for (let i = 0; i < incorrectAnswers.length; i++) {
      incorrectAnswersHtml += `
        <p>
          <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
          <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
          <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
        </p>
      `;
    }
  
    resultContainer.innerHTML = `
      <p>You scored ${score} out of ${quizData.length}!</p>
      <p>Incorrect Answers:</p>
      ${incorrectAnswersHtml}
    `;
  }
  
  submitButton.addEventListener('click', checkAnswer);
  retryButton.addEventListener('click', retryQuiz);
  showAnswerButton.addEventListener('click', showAnswer);
  
  displayQuestion();