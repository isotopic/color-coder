/**
* ScreenManager
*
* This one takes care of transitions between the screens of the game.
*/
var ScreenManager = (function() {


  //All sprites and corresponding states 'on' and 'off' 
  var sprites = {};
  sprites.logo = document.getElementById('logo_svg');
  sprites.logo.vars_active = {width:'200px', 'margin-top':sprites.logo.style['margin-top']};
  sprites.logo.vars_inactive = {width:'150px', 'margin-top':'30px'};

  sprites.intro = document.getElementById('intro');
  sprites.intro.vars_active = {autoAlpha:1};
  sprites.intro.vars_inactive = {autoAlpha:0};

  sprites.game = document.getElementById('game');
  sprites.game.vars_active = {autoAlpha:1};
  sprites.game.vars_inactive = {autoAlpha:0};

  sprites.feedback = document.getElementById('feedback');
  sprites.feedback.vars_active = {autoAlpha:1};
  sprites.feedback.vars_inactive = {autoAlpha:0};

  sprites.level = document.getElementById('level');
  sprites.level.vars_active = {autoAlpha:1, bottom:'15px'};
  sprites.level.vars_inactive = {autoAlpha:0, bottom:'5px'};

  sprites.record = document.getElementById('record');
  sprites.record.vars_active = {autoAlpha:1, bottom:'15px'};
  sprites.record.vars_inactive = {autoAlpha:0, bottom:'5px'};

  sprites.logo_isotopic = document.getElementById('logo_isotopic');
  sprites.logo_isotopic.vars_active = {autoAlpha:1};
  sprites.logo_isotopic.vars_inactive = {autoAlpha:0};



  //The screens and what sprites are active.
  //All the rest is considered inactive.
  var screens = {
    intro:    [sprites.logo, sprites.intro, sprites.logo_isotopic],
    game:     [sprites.game, sprites.level, sprites.record],
    feedback: [sprites.feedback, sprites.level, sprites.record]
  };




  function showScreen(id, instantly) {


    var instantly = instantly || false;
    var counter = 0;

    for (var i in sprites) { if (sprites.hasOwnProperty(i)) {

      var anim_vars = {};

      if( screens[id].indexOf(sprites[i])>=0 ){

        //Active state
        anim_vars.delay = 0.3+(counter++*0.1);
        for (var prop in sprites[i].vars_active) {
          anim_vars[prop] = sprites[i].vars_active[prop]; 
        }
        TweenLite.to(sprites[i], (instantly?0:0.5), anim_vars);

      }else{

        //Inactive state
        anim_vars.delay = 0;
        for (var prop in sprites[i].vars_inactive) {
          anim_vars[prop] = sprites[i].vars_inactive[prop]; 
        }
        TweenLite.to(sprites[i], (instantly?0:0.3), anim_vars);

      }

          
    }}



  }






  return {
    showScreen: showScreen
  };

})();


