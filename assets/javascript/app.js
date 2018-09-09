$(document).ready(function () {



    
    var Questions = [{
       
        question: "Where was Ang born?",
        answerList: ["Northern Air Temple", "Southern Air Temple", "Eastern Air Temple", "Western Air Temple"],
        answer: 1
    }, {
       
        question: "How many years was Ang inside the iceberg?",
        answerList: ["10000 years", "10 years", "1000 years", "100 years"],
        answer: 3
    }, {
       
        question: "Who was the avatar before Ang?",
        answerList: ["Kioshi", "Roku", "Katara", "Zuco"],
        answer: 1
    }, {
        
        question: "Which spirits are the patrond of the Northern Water Tribe?",
        answerList: ["Panda and Moon", "Moon and frogs", "Sun and Moon", "Ocean and Moon"],
        answer: 3
    }, {
       
        question: "Who is the only person in the Avatar´s team without powers?",
        answerList: ["Zoca", "Katara", "Toph", "Momo"],
        answer: 0
    }, {
        
        question: "Ang loses the battle against Ozai?",
        answerList: ["True", "False"],
        answer: 1
    }, {
        
        question: "Ang falls in love with Toph?",
        answerList: ["True", "False"],
        answer: 1
    }]


    
    var correctChoices = 0;
    var wrongChoices = 0;

    
    var currentQuestion = 0;

    
    var unanswered = 0;
    var answered = 0;
    var userSelect = 0;

    var sec = 0;
    var time = 0;

    var messages = {
        correct: "Good Job!",
        incorrect: "Wrong Choice!",
        endTime: "TIME'S UP!",
        finished: "Game Over"
    }

   
    function startGame() {
       
        $('#finalMessage').empty();
        $('#correctAnswers').empty();
        $('#wrongAnswers').empty();
        $('#unanswered').empty();
       
        currentQuestion = 0;
        correctChoices = 0;
        WrongChoices = 0;
        unanswered = 0;
        
        newQuestion()
    }

    
    function countDown() {
       
        sec = 10;
        $('#timer').html('<h3> Time Left: ' + sec + '</h3>');
        answered = true;
     
        time = setInterval(showCountdDown, 1000);
    }


    function showCountdDown() {
        
        sec--;
        $('#timer').html('<h3>Time Left: ' + sec + '</h3>');
 
        if (sec < 1) {
            clearInterval(time);
            answered = false;
            
            answerPage()
        }
    }


   
    function newQuestion() {
        $('#message').empty();
        $('#correctedAnswer').empty();
        answered = true;

        
        $('#currentQuestion').html('Question #' + (currentQuestion + 1) + '/' + Questions.length);
        $('.question').html('<h2>' + Questions[currentQuestion].question + '</h2>');
        for (var i = 0; i < 4; i++) {
            var choices = $('<div>');
            choices.text(Questions[currentQuestion].answerList[i]);
            choices.attr({ 'data-index': i });
            choices.addClass('thisChoice');
            $('.answerList').append(choices);
        }
    
        countDown();

       
        $('.thisChoice').on('click', function () {
            userSelect = $(this).data('index');
            clearInterval(time);
            answerPage()
        });
    }

    function answerPage() {
        
        $('#currentQuestion').empty();
        $('.thisChoice').empty();
        $('.question').empty();

       
        var rightAnswerText = Questions[currentQuestion].answerList[Questions[currentQuestion].answer];
        
        var rightAnswerIndex = Questions[currentQuestion].answer;

    
        if ((userSelect == rightAnswerIndex) && (answered == true)) {
           
            correctChoices++;
           
            $('#message').html(messages.correct);
            
        } else if ((userSelect != rightAnswerIndex) && (answered == true)) {
          
            wrongChoices++;
            $('#message').html(messages.incorrect);
            
            $('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
        } else {
           
            unanswered++;
            $('#message').html(messages.endTime);
            $('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
            answered = true;
        }
       
        if (currentQuestion == (Questions.length - 1)) {
            setTimeout(scoreBoard, 1000)
        } else {
            
            currentQuestion++;
            setTimeout(newQuestion, 2000);
        }
    }

    function scoreBoard() {
       
        $('#timer').empty();
        $('#message').empty();
        $('#correctedAnswer').empty();

        
        $('#finalMessage').html(messages.finished);
        
        $('#correctAnswers').html("Correct Answers: " + correctChoices);
        $('#wrongAnswers').html("Wrong Answers: " + wrongChoices);
        $('#unanswered').html("Unanswered: " + unanswered);
        
        $('#startAgainBtn').addClass('reset');
        $('#startAgainBtn').show();
        $('#startAgainBtn').html('Start Over?');
    }

 
    $('#startBtn').on('click', function () {
        $(this).hide();
        startGame();
    });
   
    $('#startAgainBtn').on('click', function () {
        $(this).hide();
        startGame();
    });

});

