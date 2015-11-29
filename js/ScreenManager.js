/**
* Game scenes manager.
*/

var ScreenManager = (function() {



  //All sprites
  var sprites = ["logo", "intro", "game", "level", "record", "logo_isotopic"];



  //Screens and corresponding element's states
  var screens = {
    intro: {
      show: ['logo', 'intro', 'logo_isotopic']
    },
    game: {
      show: ['logo', 'game', 'level', 'record']
    }
  };



  function showScreen(id) {

    //Hide or show corresponding sprites
    for (var i in sprites){

      if( screens[id].show.indexOf(sprites[i])>=0 ){

        document.getElementById(sprites[i]).style.display="";

      }else{

        document.getElementById(sprites[i]).style.display="none";

      }
      
    }

  }





  return {
    showScreen: showScreen
  };

})();




