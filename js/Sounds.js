/**
* Sounds
*
* This one takes care of al the sounds.
*/

var Sounds = (function() {


    var yes = new Howl({
      urls: ['yes.mp3', 'yes.ogg']
    });

    var no = new Howl({
      urls: ['no.mp3', 'no.ogg']
    });




  return {
    yes: yes,
     no: no
  };

})();




