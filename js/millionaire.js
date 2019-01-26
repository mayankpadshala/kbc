/**
* Edits the number prototype to allow money formatting
*
* @param fixed the number to fix the decimal at. Default 2.
* @param decimalDelim the string to deliminate the non-decimal
*        parts of the number and the decimal parts with. Default "."
* @param breakdDelim the string to deliminate the non-decimal
*        parts of the number with. Default ","
* @return returns this number as a USD-money-formatted String
*         like this: x,xxx.xx
*/
Number.prototype.money = function(fixed, decimalDelim, breakDelim){
    var n = this,
    fixed = isNaN(fixed = Math.abs(fixed)) ? 2 : fixed,
    decimalDelim = decimalDelim == undefined ? "." : decimalDelim,
    breakDelim = breakDelim == undefined ? "," : breakDelim,
    negative = n < 0 ? "-" : "",
    i = parseInt(n = Math.abs(+n || 0).toFixed(fixed)) + "",
    j = (j = i.length) > 3 ? j % 3 : 0;
    return negative + (j ? i.substr(0, j) +
         breakDelim : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + breakDelim) +
          (fixed ? decimalDelim + Math.abs(n - i).toFixed(fixed).slice(2) : "");
}

/**
* Plays a sound via HTML5 through Audio tags on the page
*
* @require the id must be the id of an <audio> tag.
* @param id the id of the element to play
* @param loop the boolean flag to loop or not loop this sound
*/
var soundHandle;
startSound = function(id, loop) {
    soundHandle = document.getElementById(id);
    if(loop)
        soundHandle.setAttribute('loop', loop);
        soundHandle.play();
}

startSound('mainTheme', false);

/**
* The View Model that represents one game of
* Who Wants to Be a Millionaire.
*
* @param data the question bank to use
*/
var MillionaireModel = function(data) {
    var self = this;

    // The 15 questions of this game
    this.questions = data.questions;

    // A flag to keep multiple selections
    // out while transitioning levels
    this.transitioning = false;

    // The current money obtained
    this.money = new ko.observable(0);

    // The current level(starting at 1)
    this.level = new ko.observable(1);
    
    this.KAKA= 50;
    // The three options the user can use to
    // attempt to answer a question (1 use each)
    this.usedFifty = new ko.observable(false);
    this.usedPhone = new ko.observable(false);
     this.usedAudience = new ko.observable(false);
     
    // Start the program by pressing enter
    var isCtrl = false;

    soundHandle.pause();
    soundHandle.currentTime = 0;
    
    startSound('letsPlay', false);

document.onkeydown=function(e){
    if(e.which == 13) isCtrl=true;
    if(e.which == 13 && isCtrl == true) {
		    if(self.questions[self.level() - 1].hasOwnProperty('audiosound')){

                soundHandle.pause();
                soundHandle.currentTime = 0;
                
                startSound(self.questions[self.level() - 1].audiosound, true);
                clearInterval(self.variable);
                
                if(self.questions[self.level() - 1].hasOwnProperty('timeout')){
                    // $('#timer').find('.value').text(self.questions[self.level() - 1].timeout);
                    //  self.KAKA = self.questions[self.level() - 1].timeout;
                    // console.log(self.questions[self.level() - 1].timeout);
                } else {

                }



                if(self.questions[self.level() - 1].timeout != -1) {
                    // $('#timer').find('.value').text(self.questions[self.level() - 1].timeout);
                    // console.log(self.questions[self.level() - 1].timeout);
                    self.variable = setInterval(self.updateDisplay, 1000);
                    // self.KAKA = self.questions[self.level() - 1].timeout;
                }

			}
			else{
				startSound('background', true);
			}

		// $("#answer-box").show();
        // document.getElementById("answer-box").style.visibility='visible';
        $("#answer-one").show();
        $("#answer-two").show();
        $("#answer-three").show();
        $("#answer-four").show();
         
         return false;
    }
}

    // Grabs the question text of the current question
    self.getQuestionText = function() {
	// 	clearInterval(self.variable);
    //     if(self.questions[self.level() - 1].hasOwnProperty('timeout')){
    // $('#timer').find('.value').text(self.questions[self.level() - 1].timeout);
    //     }
    //     if(self.questions[self.level() - 1].timeout != -1) {
    //         $('#timer').find('.value').text(self.questions[self.level() - 1].timeout);
    //         self.variable = setInterval(self.updateDisplay, 1000);
    //     }

    if(self.questions[self.level() - 1].hasOwnProperty('timeout')){
        $('#timer').find('.value').text(self.questions[self.level() - 1].timeout);
        //  self.KAKA = self.questions[self.level() - 1].timeout;
        // console.log(self.questions[self.level() - 1].timeout);
    } else {
        $('#timer').find('.value').text(50);
    }

    if(self.questions[self.level() - 1].timeout != -1) {
        $('#timer').find('.value').text(self.questions[self.level() - 1].timeout);
        // console.log(self.questions[self.level() - 1].timeout);
        // self.variable = setInterval(self.updateDisplay, 1000);
        // self.KAKA = self.questions[self.level() - 1].timeout;
    } else {
        $('#timer').find('.value').text(50); 
    }

        $("#answer-one").hide();
        $("#answer-two").hide();
        $("#answer-three").hide();
        $("#answer-four").hide();
        return self.questions[self.level() - 1].question;
    }

    // Gets the answer text of a specified question index (0-3)
    // from the current question
    self.getAnswerText = function(index) {
        return self.questions[self.level() - 1].content[index];
    }

    // Uses the fifty-fifty option of the user
    self.fifty = function(item, event) {


        
        if(self.transitioning)
            return;

            if(self.questions[self.level() - 1].hasOwnProperty('audiosound')){
                // clearInterval(self.variable);        
                startSound(self.questions[self.level() - 1].audiosound, true);
                
        
            }
            else{
                startSound('background', true);
            }
        
            clearInterval(self.variable);
            $('#timer').find('.value').text(self.KAKA);
            self.variable = setInterval(self.updateDisplay, 1000);
            

        $(event.target).fadeOut('slow');
        var correct = this.questions[self.level() - 1].correct;
        var first = (correct + 1) % 4;
        var second = (first + 1) % 4;
        if(first == 0 || second == 0) {
            $("#answer-one").hide();
        }
        if(first == 1 || second == 1) {
            $("#answer-two").hide();
        }
        if(first == 2 || second == 2) {
            $("#answer-three").hide();
        }
        if(first == 3 || second == 3) {
            $("#answer-four").hide();
        }
    }

self.nextBut = function(item, event) {

    soundHandle.pause();
    soundHandle.currentTime = 0;
    

        self.level(self.level() + 1);
		$("#" + self.currEle).css('background', 'none');
		//document.getElementById("answer-box").style.visibility='hide';
        // $("#answer-box").hide();
        $("#answer-one").hide();
        $("#answer-two").hide();
        $("#answer-three").hide();
        $("#answer-four").hide();
        self.transitioning = false;
        $("#nxt-btn").hide();

    startSound('next', false);
}

self.timerStart = function() {
    if(self.questions[self.level() - 1].hasOwnProperty('audiosound')){
        clearInterval(self.variable);        
        startSound(self.questions[self.level() - 1].audiosound, true);
        

    }
    else{
        startSound('background', true);
    }

    	clearInterval(self.variable);
            $('#timer').find('.value').text(self.KAKA);
            self.variable = setInterval(self.updateDisplay, 1000);
}

self.timerStop = function() {
    soundHandle.pause();
    soundHandle.currentTime = 0;

    clearInterval(self.variable);
    self.KAKA  = parseInt($('#timer').find('.value').text(), 10);
}

var abc;
var globalIndex=-1;
self.seeAns = function(item,event) {
	
        if(self.questions[self.level() - 1].correct == globalIndex) {
            self.rightAnswer(abc);
        } else {
             self.wrongAnswer(abc);
             var g = document.createElement('div');
             if(self.questions[self.level() - 1].correct == 0)
             g.id = 'answer-one';
             else if(self.questions[self.level() - 1].correct ==1)
             g.id = 'answer-two';
             else if(self.questions[self.level() - 1].correct ==2)
             g.id = 'answer-three';
             else if(self.questions[self.level() - 1].correct ==3)
             g.id = 'answer-three';

             $("#" + g.id).slideUp('slow', function() {
                $("#" + g.id).css('background', 'green').slideDown('slow', function() {
                     
                });
            });
             
             
         }

         $("#see-ans").hide();

}

    // Fades out an option used if possible
    self.fadeOutOption = function(item, event) {
        if(self.transitioning)
            return;
        $(event.target).fadeOut('slow');

        soundHandle.pause();
        soundHandle.currentTime = 0;

        startSound('phoneFriend', false);


        clearInterval(self.variable);
        self.KAKA = 19;
         $('#timer').find('.value').text(self.KAKA);
            self.variable = setInterval(self.updateDisplay, 1000);


        
    }

    // Attempts to answer the question with the specified
     // answer index (0-3) from a click event of elm
     
    self.answerQuestion = function(index, elm) {
        if(self.transitioning)
            return;
        self.transitioning = true;
    
         abc=elm;
         globalIndex=index;
         self.selectAnswer(elm);

         soundHandle.pause();
		soundHandle.currentTime = 0;
		// startSound('soundselect', false);

     }
     
     self.selectAnswer = function(elm) {
		soundHandle.pause();
        soundHandle.currentTime = 0;
        
        clearInterval(self.variable);
        self.currEle = elm;
        $("#" + elm).slideUp('slow', function() {
            startSound('selectAns', false);
            $("#" + elm).css('background', 'orange').slideDown('slow', function() {
                
                   $("#see-ans").show();
            
            });
        });
     }

    self.updateDisplay = function() {
        //console.log("Starting the interval ");
        var value = parseInt($('#timer').find('.value').text(), 10);
        
        if (value>1) {
            value--;
        } else if (value == 1) {
            value--;
            soundHandle.pause();
		    soundHandle.currentTime = 0;
            startSound('wrongAnswer', false);
            // self.transitioning = false;
        //     $("#game").fadeOut('slow', function() {
        //         // $("#game-over").html('Timer Passed out!');
        //         // $("#game-over-money").html('$ '+ self.money().money(2, '.', ','))
        //         // $("#game-over").fadeIn('slow');
        //         // $("#game-over-money").fadeIn('slow');
        //         // self.transitioning = false;
        //         return;
        // });
    }


     $('#timer').find('.value').text(value);
    }
    // Executes the proceedure of a correct answer guess, moving
    // the player to the next level (or winning the game if all
    // levels have been completed)
    self.rightAnswer = function(elm) {
        clearInterval(self.variable);
        self.currEle = elm;

        soundHandle.pause();
		soundHandle.currentTime = 0;

        $("#" + elm).slideUp('slow', function() {
            startSound('rightsound', false);
            $("#" + elm).css('background', 'green').slideDown('slow', function() {
                self.money($(".active").data('amt'));
                if(self.level() + 1 > 15) {
                    $("#game").fadeOut('slow', function() {
                        $("#game-over").html('You Win!');
                        $("#game-over").fadeIn('slow');
                    });
                } else {
                    $("#nxt-btn").show();
                }
            });
        });
    }

    self.nextButton = function(elm) {

    }
    // Executes the proceedure of guessing incorrectly, losing the game.
    self.wrongAnswer = function(elm) {
        startSound('wrongAnswer', false);
        $("#" + elm).slideUp('slow', function() {
            startSound('wrongAnswer', false);
        //     soundHandle.pause();
		// soundHandle.currentTime = 0;
        clearInterval(self.variable);
            $("#" + elm).css('background', 'red').slideDown('slow', function() {
                setTimeout(function() {
                    // $("#game").fadeOut('slow', function() {
                        
                    //     $("#game-over").html('<img src="img/logo.jpg" id="logo-start"></img>');
                    //     //$("#game-over").html('Game Over!');
                    //     //$("#game-over-money").html('$ '+ self.money().money(2, '.', ','))
                    //     //$("#game-over").fadeIn('slow');
                    //     //$("#game-over-money").fadeIn('slow');
                    //     self.transitioning = false;
                    // });
                }, 3000);

            });
         });

    }

    // Gets the money formatted string of the current won amount of money.
    self.formatMoney = function() {
        return self.money().money(0, '.', ',');
    }
};

// Executes on page load, bootstrapping
// the start game functionality to trigger a game model
// being created
$(document).ready(function() {
    $.getJSON("questions.json", function(data) {
        for(var i = 1; i <= data.games.length; i++) {
            $("#problem-set").append('<option value="' + i + '">' + i + '</option>');
        }
        $("#pre-start").show();
        $("#start").click(function() {
            var index = $('#problem-set').find(":selected").val() - 1;
            ko.applyBindings(new MillionaireModel(data.games[index]));
            $("#pre-start").fadeOut('slow', function() {
               // startSound('background', true);
                $("#game").fadeIn('slow');
            });
        });
    });
});
