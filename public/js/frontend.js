//fade in scrolling
window.sr = ScrollReveal();
sr.reveal(".fade-in", {duration: 2000});



//create list page
var questions;

$("#add-button").on("click", function() {
    if($("#question-input").val().length > 0) {
        displayQuestion();
    }
});

$("#question-input").keypress(function(e) {
    if(e.which == 13 && $("#question-input").val().length > 0) {
        displayQuestion();
    }
});

//  removes question item from page and questions array
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

// creates question item div
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


    $(".pending-questions:last-child > .question-item button").on("click", deleteQuestion);
};


// sends question array to the server
$("#submit-question-list").on("click", function() {
    if (questions.length > 0) {
        // create question list object
        var questionList = {
        }
        questionList.title = title;
        questionList.questions = questions;
        

        $.ajax({
            type: "POST",
            url: "/profile",
            dataType: "json",
            data: {questionList: JSON.stringify(questionList)}
        });

    }
});


// PROFILE PAGE
var index;


// click button on profile page send index to server
$(".list-item").on("click", function() {
    var element = this;
    //  minus 2 as first two elements are headings
    index = Array.from(element.parentNode.children).indexOf(element) - 2;
    return index;
});