// interview page

// hides answer div
$(".answer-div").on("click", function() {
    if ($(".answer-text").is(":hidden")) {
        $(".answer-text").slideDown("slow");
    } else {
        $(".answer-text").hide();
    }
});

var userAnswer;
var interviewQuestion = $(".interview-question");
var answerText = $(".answer-text p");
var questionDiv = $(".question-div");
var questionCounter = 0;

function displayQuestion() {
    if (questionCounter < (questions.length)) {
        questionDiv.fadeIn("slow");
        interviewQuestion.text("Q" + (questionCounter + 1) + ": " + questions[questionCounter].question);
        if (questions[questionCounter].answer === "") {
            answerText.text("Add an answer");
        } else {
            answerText.text(questions[questionCounter].answer);
        }
    } else {
        questionDiv.hide();
        $("#interview-page").addClass("goodluck-page");
        $(".goodluck").show();
    }
}

$(".save-answer").on("click", function() {   
    userAnswer = $("#user-answer").val();
    
    // if userAnswer is not empty
    //send userAnswer + questionCounter + list title to server
    if (userAnswer !== "") {
        $.ajax({
            type: "POST",
            url: "/saveanswer",
            dataType: "json",
            data: {questionTitle: questionTitle, questionCounter: questionCounter, userAnswer: userAnswer}
        });
    }

    questionCounter++;
    
    questionDiv.fadeOut("slow", function() {
        $("#user-answer").val("");
        displayQuestion();
    });
});

displayQuestion(); 
