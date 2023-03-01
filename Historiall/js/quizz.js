(function(){
    // Functions
    function buildQuiz(){
      // variable to store the HTML output
      const output = [];
  
      // for each question...
      myQuestions.forEach(
        (currentQuestion, questionNumber) => {
  
          // variable to store the list of possible answers
          const answers = [];
  
          // and for each available answer...
          for(letter in currentQuestion.answers){
  
            // ...add an HTML radio button
            answers.push(
              `<label>
                <input type="radio" name="question${questionNumber}" value="${letter}">
                ${letter} :
                ${currentQuestion.answers[letter]}
              </label>`
            );
          }
  
          // add this question and its answers to the output
          output.push(
            `<div class="slide">
              <div class="question"> ${currentQuestion.question} </div>
              <div class="answers"> ${answers.join("")} </div>
            </div>`
          );
        }
      );
  
      // finally combine our output list into one string of HTML and put it on the page
      quizContainer.innerHTML = output.join('');
    }
  
    function showResults(){
  
      // gather answer containers from our quiz
      const answerContainers = quizContainer.querySelectorAll('.answers');
  
      // keep track of user's answers
      let numCorrect = 0;
  
      // for each question...
      myQuestions.forEach( (currentQuestion, questionNumber) => {
  
        // find selected answer
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;
  
        // if answer is correct
        if(userAnswer === currentQuestion.correctAnswer){
          // add to the number of correct answers
          numCorrect++;
  
          // color the answers green
          answerContainers[questionNumber].style.color = 'lightgreen';
        }
        // if answer is wrong or blank
        else{
          // color the answers red
          answerContainers[questionNumber].style.color = 'red';
        }
      });
  
      // show number of correct answers out of total
      resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
    }
  
    function showSlide(n) {
      slides[currentSlide].classList.remove('active-slide');
      slides[n].classList.add('active-slide');
      currentSlide = n;
      if(currentSlide === 0){
        previousButton.style.display = 'none';
      }
      else{
        previousButton.style.display = 'inline-block';
      }
      if(currentSlide === slides.length-1){
        nextButton.style.display = 'none';
        submitButton.style.display = 'inline-block';
      }
      else{
        nextButton.style.display = 'inline-block';
        submitButton.style.display = 'none';
      }
    }
  
    function showNextSlide() {
      showSlide(currentSlide + 1);
    }
  
    function showPreviousSlide() {
      showSlide(currentSlide - 1);
    }
  
    // Variables
    const quizContainer = document.getElementById('quiz');
    const resultsContainer = document.getElementById('results');
    const submitButton = document.getElementById('submit');
    const myQuestions = [
      {
        question: "Which of the following is NOT a wonder of the world?",
        answers: {
          a: "Lighthouse of Alexandria",
          b: "Mausoleum at Halicarnassus",
          c: "Solomon's Temple"
        },
        correctAnswer: "c"
      },
      {
        question: "How long did the Hundred Years War last?",
        answers: {
          a: "100 years",
          b: "102 years",
          c: "116 years"
        },
        correctAnswer: "c"
      },
      {
        question: "Which monarch ruled the longest?",
        answers: {
          a: "Ferdinand III",
          b: "Elizabeth II",
          c: "Louis XIV",
          d: "Louis XV"
        },
        correctAnswer: "c"
      },
      {
        question: "Where was Napoleon Bonaparte born?",
        answers: {
          a: "Corsica",
          b: "Sicilia",
          c: "Belgium",
         
        },
        correctAnswer: "a"
      },
      {
        question: "What does V-E Day stand for?",
        answers: {
          a: "Vest-Est Attack Day",
          b: "Victory Day",
          c: "Versailles-Eckhart Day",
         
        },
        correctAnswer: "b"
      },
      {
        question: "When did the Russian Revolution take place?",
        answers: {
          a: "1907",
          b: "1917",
          c: "1939",
         
        },
        correctAnswer: "b"
      },
      {
        question: "Which artist cut off his ear and mailed it to an escort?",
        answers: {
          a: "Vincent Van Gogh",
          b: "Pablo Picasso",
          c: "Salvador Dali",
         
        },
        correctAnswer: "a"
      },
      {
        question: "When did the great fire of London start?",
        answers: {
          a: "1777",
          b: "1563",
          c: "1666",
         
        },
        correctAnswer: "c"
      },
      {
        question: "When did the great depression end?",
        answers: {
          a: "1929",
          b: "1933",
          c: "1939",
         
        },
        correctAnswer: "b"
      },
      {
        question: "Which of the following is considered to be the first empire ever?",
        answers: {
          a: "Akkadian Empire",
          b: "Egyptian Empire",
          c: "Babylonian Empire",
         
        },
        correctAnswer: "a"
      },
    ];
  
    // Kick things off
    buildQuiz();
  
    // Pagination
    const previousButton = document.getElementById("previous");
    const nextButton = document.getElementById("next");
    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0;
  
    // Show the first slide
    showSlide(currentSlide);
  
    // Event listeners
    submitButton.addEventListener('click', showResults);
    previousButton.addEventListener("click", showPreviousSlide);
    nextButton.addEventListener("click", showNextSlide);
  })();
  