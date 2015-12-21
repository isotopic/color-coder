/**
* Game
*
* This one takes care of the game itself, like starting a new game, counting the levels, managing clicks, etc.
*/

var Game = (function() {


	var circle_svg = document.getElementById('circle_svg');
	var play_bt = document.getElementById('play_bt');
	var level_field = document.getElementById('level');
 	var record_field = document.getElementById('record');

	var level = 0;
	var record = getLocalRecord();
	var accept_click = false;


	// Sets up the first screen
	function setup(){
		ScreenManager.showScreen('intro', true);
		play_bt.onclick = function(){
			start();
		};  
	}

	// Starts a fresh new game and listens to the circle
	function start(){
		level = 1;
		updateHud();
		ScreenManager.showScreen('game');
		ColorWheel.generateCircle('circle_svg', 2, 1);
		accept_click = true;
		circle_svg.onclick = function(event){
			if( typeof(event.target.isCorrect) !== 'undefined' && accept_click){
				accept_click = false;
				if(event.target.isCorrect){
					nextLevel();
				}else{
					gameOver();
				}
			}
		}
	}

	// Checks if the user has targeted the right color
	function nextLevel(){
		level++;
        feedback_label.innerHTML = 'Correct!';
        ScreenManager.showScreen('feedback');
        Sounds.yes.play();
        feedback.onclick = function(){
        	accept_click = true;
        	ColorWheel.generateCircle('circle_svg', level+1, 0.5);
        	ScreenManager.showScreen('game');
        }
        updateHud();
	}

	// Get back to the beginning
	function gameOver(){
		level = 1;
        feedback_label.innerHTML = 'Game over';
        ScreenManager.showScreen('feedback');
        Sounds.no.play();
        feedback.onclick = function(){
        	ScreenManager.showScreen('intro');
        }
	}

	function updateHud(){
        if( level>record ){
          record=level;
          setLocalRecord(record);
        }
		level_field.getElementsByTagName("span")[0].innerHTML = (level<10?'0':'')+(level);
		record_field.getElementsByTagName("span")[0].innerHTML = (record<10?'0':'')+(record);
	}


	function setLocalRecord(r){
		localStorage.record = r;
	}
	function getLocalRecord(){
		return localStorage.record || 0;
	}
	

	return {
		setup:setup
	};

})();