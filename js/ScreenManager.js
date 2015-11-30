/**
* All things related to going from one screen to another.
*/

var ScreenManager = (function() {



  //All sprites
  var sprites = ["logo", "intro", "game", "level", "record", "logo_isotopic"];



  //All screens and what must be visible in them
  var screens = {
    intro: {
      show: ['logo', 'intro', 'logo_isotopic']
    },
    game: {
      show: ['logo', 'game', 'level', 'record']
    }
  };



  function showScreen(id, imediatly) {

    //Imediatly skips any animation effects
    var imd = imediatly || false;

    //Hide or show the sprites
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




