
window.onload = function() {


    ScreenManager.showScreen('intro', true);
	

	play_bt.onclick = function(){

		ScreenManager.showScreen('game');

		ColorWheel.generateCircle('circle_svg', 2, 1);

	}   
	  


};


