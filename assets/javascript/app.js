$(document).ready(function () {
    
    $(".reset").click(function() {
    location.reload(true);
});
    $(".start").click(trivia);

    function trivia() {
        var scoreAry = [];
        var questions = [{
            q: "What is Archer’s codename?",
            s: ["Duchess", "Statesman", "Indigo", "Rainbow"],
            a: "Duchess",
            correct: 0
        }, {
            q: "Who is Archer's arch nemesis?",
            s: ["Henry Rollins", "Ray", "Lana", "Barry"],
            a: "Barry", 
            correct: 0 
        }, {
            q: "What is Archer’s TMNT-inspired alias?",
            s: ["Tom Smith", "Chet Manley", "Ronnie Michaels", "Andy Garcia"],
            a: "Chet Manley", 
            correct: 0 
        }, {
            q: "What song is Archer obsessed with?",
            s: ["Playing with the Boys", "Footloose", "Danger Zone", "I'm Alright"],
            a: "Danger Zone", 
            correct: 0 

        }, {
            q: "Who is NOT one of Archer’s possible fathers?",
            s: ["Nikolai Jakov", "Len Trexler", "Buddy Rich", "Christian Slater"],
            a: "Christian Slater", 
            correct: 0 
        }, {
            q: "What is Archer’s middle name?",
            s: ["James", "Cooper", "Malory", "Ricardo"],
            a: "Malory", 
            correct: 0 
        }, {
            q: "Who provides the voice for Sterling Archer?",
            s: ["H. Jon Benjamin", "Dan Mintz", "Larry Murphy", "John Roberts"],
            a: "H. Jon Benjamin", 
            correct: 0 
        }, {
            q: "Where does Archer escape to after his fiancee’s death?",
            s: ["French Polynesia", "Siberia", "The Alps", "The Serengeti"],
            a: "French Polynesia", 
            correct: 0 
        }, {
            q: "Who is the Hollywood starlet who manipulated Archer?",
            s: ["Bette Davis", "Evelyn Macy", "Marilyn Monroe", "Veronica Deane"],
            a: "Veronica Deane", 
            correct: 0 
        }, {
            q: "Who is Archer’s hero?",
            s: ["Robert Redford", "Clint Eastwood", "Burt Reynolds", "Paul Newman"],
            a: "Burt Reynolds", 
            correct: 0 
        }];

        var counter = questions.length;

        
        function createQuestion(questions) {
            for (var i = 0; i < questions.length; i++) {
                $(".start").hide();
                $("#questions").append('<form id="' + i + '" class="center-text"><p>Question ' + (i + 1) + ' of ' + questions.length + '<br></p><h3 class="question">' + questions[i].q + '</h3><br>' + radioButtons(questions[i].s, i) + ' <br> <button type="submit" class="next">NEXT;</button><br></p></form>');
            }
            
            for (var k = questions.length - 1; k > 0; k--) {
                $('#' + k).hide();
            }
        }
        
        function radioButtons(ary, qNum) {
            var answers = [];
            for (i = 0; i < ary.length; i++) {
                answers.push('<label><input type="radio" name="' + qNum + '" value="' + ary[i] + '">' + ary[i] + '</label>');
            }
            return answers.join(" ");
        }
        
        
        function sumScore(questions) {
            return scoreAry.reduce(function (previousValue, currentValue, index, array) {
                return previousValue + currentValue;
            });
        }
        
        
        function checkAnswer(answer, qNum, questions) {
            if (answer == questions[qNum].a) {
                questions[qNum].correct = 1;
                scoreAry.push(questions[qNum].correct);
            } else {
                scoreAry.push(questions[qNum].correct);
            }
        }

    
        
        createQuestion(questions);
        
        $(".next").click(function (event) {
            event.preventDefault(); 
            var qNum = $(this).closest("form").attr("id"); 
            var userInput = $('input[name=' + qNum + ']:radio:checked').val(); 

            if (counter > 1) {
                checkAnswer(userInput, qNum, questions);
                $("#" + qNum).hide();
                $("#" + qNum).next().show();
                counter--;
            } else if (counter == 1) {
                checkAnswer(userInput, qNum, questions);
                $("#questions").find("form").remove();
                $("#questions").append('<h3 class="result"></h3>');
                $(".result").text('You answered ' + sumScore(questions) + ' questions correctly out of 10.');
                   for (j = 0; j < scoreAry.length; j++) {
                        if (scoreAry[j] === 0) {
                            console.log(questions[j].q, questions[j].a);
                            $("#questions").append('<p class="missed-' + j + '">You missed: ' + questions[j].q + ' ' + questions[j].a + '</p>');      
                        }
                    }
            } else {
                return false;
            }
        });
    }
});
