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

// rotating hero tagline
document.addEventListener('DOMContentLoaded', function () {
  var tagline = document.getElementById('dynamic-tagline');
  if (!tagline) return;
  var messages = [
    'Practice real interview questions',
    'Study with industry professionals',
    'Get hired by top companies'
  ];
  var i = 0;
  tagline.textContent = messages[i];
  setInterval(function () {
    i = (i + 1) % messages.length;
    tagline.textContent = messages[i];
  }, 3000);
});
