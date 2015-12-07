/**
* Game
*
* This one takes care of the game itself, like starting a new game, counting the levels, managing clicks, etc.
*/

var Game = (function() {

	var level = 0;
	var record = 0;

	// Sets up the first screen
	function setup(){
		ScreenManager.showScreen('intro', true);
		var play_bt = document.getElementById('play_bt');
		play_bt.onclick = function(){
			start();
		};  
	}

	// Starts a fresh new game
	function start(){
		level = 0;
		ScreenManager.showScreen('game');
		ColorWheel.generateCircle('circle_svg', 2, 1);
	}

	// 


  return {
  	setup:setup
  };

})();




