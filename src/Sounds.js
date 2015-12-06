/**
* Sounds
*
* This one takes care of al the sounds.
*/

var Sounds = (function() {


    var yes = new Howl({
      urls: ['sound/yes.mp3', 'sound/yes.ogg']
    });

    var no = new Howl({
      urls: ['sound/no.mp3', 'sound/no.ogg']
    });



  return {
    yes: yes,
     no: no
  };

})();




