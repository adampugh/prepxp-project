$(window).on("load", function() {
    $("#titleModal").modal("show");
});

var title;

// prevent default closing e.g. esc & clicking outside of modal
$('#titleModal').modal({
    backdrop: 'static',
    keyboard: false
});

// hide close class button
$(".close").hide();

// return title value if present
$("#title-button").on("click", function() {
    title = $("#titleInput").val();
    if (title.length > 0) {
        $("#titleModal .close").click();
        return title;
    }
});
