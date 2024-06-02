// nav menu style
var nav = $("#navbarSupportedContent");
var btn = $(".custom_menu-btn");
btn.click
btn.click(function (e) {

    e.preventDefault();
    nav.toggleClass("lg_nav-toggle");
    document.querySelector(".custom_menu-btn").classList.toggle("menu_btn-style")
});


function getCurrentYear() {
    var d = new Date();
    var currentYear = d.getFullYear()

    $("#displayDate").html(currentYear);
}

getCurrentYear();

function displayText() {
  var text = document.getElementById("answer-field");
  text.style.display = "block";
  text.classList.add("submit-click");
}

function check () {
    var score = 0
    if (document.getElementById("correct").checked)
    {
        var textcorrect = document.getElementById("correct-answer");
        textcorrect.style.display = "block";
        textcorrect.classList.add("displayanswer")
    }
    else {
        var textincorrect = document.getElementById("incorrect-answer");
        textincorrect.style.display = "block";
        textincorrect.classList.add("displayanswer")
    }
}
