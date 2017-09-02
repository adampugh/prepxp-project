// interview page

// hides answer div
$(".answer-div").on("click", function() {
    if ($(".answer-text").is(":hidden")) {
        $(".answer-text").slideDown("slow");
    } else {
        $(".answer-text").hide();
    }
});

// dummy data
var questions = [
    {
        question: "Why do you like stuff",
        answer: "because i do"
    },
    {
        question: "Do you like things",
        answer: "no i hate them"
    },
    {
        question: "Why is it?",
        answer: "never again"
    },
    {
        question: "Is cake real",
        answer: "no i don't think so"
    }
];
var userAnswer = "";
var interviewQuestion = $(".interview-question");
var answerText = $(".answer-text p");
var questionDiv = $(".question-div");
var questionCounter = 0;

function displayQuestion() {
    if (questionCounter < (questions.length)) {
        questionDiv.fadeIn("slow");
        interviewQuestion.text("Q" + (questionCounter + 1) + ": " + questions[questionCounter].question);
        answerText.text(questions[questionCounter].answer);
    } else {
        questionDiv.hide();
        $("#interview-page").addClass("goodluck-page");
        $(".goodluck").show();
    }
}

$(".save-answer").on("click", function() {
    questionCounter++;
    questionDiv.fadeOut("slow", function() {
        displayQuestion();
    });
});

displayQuestion();