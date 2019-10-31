
// render div
$(document).ready(function() {
  let queryURL = "https://opentdb.com/api.php?amount=50&type=multiple";
  // lower the margin bottom of button
  $(".btn").on("click", function() {
    $(".btn").hide();

    var questionCounter = 0;
    var score = 0;
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      questionAnswer();
      btnRepeat();
      count();

      function questionAnswer() {
        randomNumber = Math.floor(Math.random() * 50);
        console.log(response);
        console.log(randomNumber);
        var result = response.results[randomNumber].question;
        for (let i = 0; i < 3; i++) {
          var wrongAnswers =
            response.results[randomNumber].incorrect_answers[i];
          var correctAnswer =
            response.results[randomNumber].correct_answer;
          var myJSON2 = JSON.stringify(wrongAnswers);
          var myJSON3 = JSON.stringify(correctAnswer);
          console.log(myJSON3);

          var correct = "correct";
          var incorrect = "incorrect";
          var score = 0;
          var questionCounter = 0;

          var random1 = $(".answers").append(
            '<input type="radio" name="rbtnCount" value=' +
              incorrect +
              ">" +
              myJSON2 +
              "</br>"
          );
        }
        //randomizing answers
        randomNumber2 = Math.floor(Math.random() * 2 + 1);
        if (randomNumber2 == "2") {
          var random2 = $(".answers").append(
            '<input type="radio" name="rbtnCount" value=' +
              correct +
              ">" +
              myJSON3 +
              "</br>"
          );
        } else {
          var random2 = $(".answers").prepend(
            '<input type="radio" name="rbtnCount" value=' +
              correct +
              ">" +
              myJSON3 +
              "</br>"
          );
        }
        var radioBtn = $('<input type="radio" name="rbtnCount" />');

        var myJSON = JSON.stringify(result);
        console.log(result);
        console.log(myJSON2);
        $(".questionAsked").append("<h1>" + myJSON + "</h1>");

        $(".answers").append(
          "<br>" + "<button>" + "Submit Answer" + "</button>"
        );

        $("button:first").addClass("answerBtn");
      }

      function btnRepeat() {
        $(".answerBtn").on("click", function() {
          let answerValue = $(
            ".answers [name='rbtnCount']:checked"
          ).val();
          console.log(answerValue);
          if (answerValue == "correct") {
            stop();
            count();
            score++;
            questionCounter++;
            $(".questionAsked").empty();
            $(".answers").empty();
            $("button:first").empty();
            if (questionCounter == "5") {
              stop();
              alert("Finish");
              $(".questionAsked").text("Congratulations");
              $(".answers").append(
                "You have " + score + " right answers"
              );
              $(".answers").append(
                $("<img>", {
                  id: "theImg",
                  src: "../TriviaGame/assets/images/theoffice.gif"
                })
              );
            } else {
              console.log(questionCounter);

              console.log("question number " + questionCounter);
              questionAnswer();
              btnRepeat();
            }
          } else {
            stop();
            count();
            questionCounter++;
            $(".questionAsked").empty();
            $(".answers").empty();
            $("button:first").empty();
            if (questionCounter == "5") {
              stop();
              alert("Finish");
              $(".questionAsked").text("Congratulations");
              $(".answers").text("You have " + score + " right answers");
              $(".answers").append(
                $("<img>", {
                  id: "theImg",
                  src: "../TriviaGame/assets/images/theoffice.gif"
                })
              );
            } else {
              console.log(questionCounter);

              console.log("question number " + questionCounter);
              questionAnswer();
              btnRepeat();
            }
          }
        });
      }

      var counter;
      function count() {
        counter = setTimeout(function() {
          alert("Times up, next question");
          questionCounter++;
          stop();
          count();
          $(".questionAsked").empty();
          $(".answers").empty();
          $("button:first").empty();
          
          questionAnswer();
          btnRepeat();
        }, 10000); // end function
      }

      function stop() {
        clearTimeout(counter);
      }
    }); //end of ajax request
  });
});

// dont repeat the same question
// when 7 questions have passed show result and new text
//click clear
