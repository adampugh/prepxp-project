//fade in scrolling
window.sr = ScrollReveal();
sr.reveal(".fade-in", {duration: 2000});



//create list page add button
var questions;


$("#add-button").on("click", displayQuestion);
$("#question-input").keypress(function(e) {
    if(e.which == 13) {
        displayQuestion();
    }
});

function deleteQuestion () {

    var questionText = $(this).parent().children("p")[0].innerHTML;
    
    for (var i = 0; i < questions.length; i++) {
        if (questions[i].question === questionText) {
            questions.splice(i, 1);
            if (questions.length <= 0) {
                $(".no-questions").show();
            }
        }
    }

    $(this).parent().remove();

}



function displayQuestion () {
    questions = questions || [];

    $(".no-questions").hide();

    var questionInput = $("#question-input").val();
    var question = {}
    question.question = questionInput;
    question.answer = "";
    questions.push(question);


    $(".pending-questions").append(`<div class="question-item col-lg-6 mx-auto"><p>${questionInput}</p><button class='btn btn-dark question-item-close'><span>&#9747;</span></button></div>`);

    console.log(questions);
    $("#question-input").val("");

    
    $(".question-item button").on("click", deleteQuestion);
};



