/**
* ColorWheel
* 
* This one takes care of the fancy colored circle from the gameplay.
*/

var ColorWheel = (function() {


        var level_field = document.getElementById('level');
        var record_field = document.getElementById('record');


  var level = 1;


  function generateCircle(svg, n, delay){

    var n = n||2;

    //One of them is correct
    var n_correct = Math.round(Math.random()*n);


    var circle = document.getElementById(svg);


    if(window.innerWidth<780 || window.innerHeight<815 ){
      circle.style.width="300px";
      circle.style.height="300px";
    }else{
      circle.style.width="600px";
      circle.style.height="600px";
    }
  
    var svg_width = circle.getBoundingClientRect().width;
    var strokeWidth = (svg_width >= 500 ? 90 : 60);
    var padding = Math.ceil(strokeWidth/2)+10;
    var r = (svg_width/2 - padding);
    var radian = ( Math.PI*2) / n;

    //Cleanup svg
    while (circle.lastChild) {
        circle.removeChild(circle.lastChild);        
    }

    //Text label
    var color_label = document.createElementNS("http://www.w3.org/2000/svg", 'text'); 
    color_label.setAttribute("id", "color_label");
    color_label.setAttributeNS(null,"x","50%");
    color_label.setAttributeNS(null,"y","53%");
    color_label.style['font-size'] = '35px'; 
    color_label.style['fill'] = '#ffffff'; 
    color_label.style['text-anchor'] = 'middle'; 
    color_label.style['cursor'] = 'default'; 
    color_label.style['letter-spacing'] = '2px'; 
    color_label.style['text-transform'] = 'uppercase'; 
    circle.appendChild(color_label);
    

      //White circle under the others
      var white = document.createElementNS("http://www.w3.org/2000/svg", 'circle'); 
      white.setAttributeNS(null,"cx","50%");
      white.setAttributeNS(null,"cy","50%");
      white.setAttributeNS(null,"r",r);
      white.setAttributeNS(null, "stroke", 'rgb(255,255,255)');
      whitestrokeWidth = strokeWidth+4;
      white.style.strokeWidth = "0px";
      white.style.strokeWidth = "0px";
      white.style.fill = "none";
      white.id = "path_base";
      circle.appendChild(white);

    //Each one of the arcs
    for(var a=0; a<n; a++){

      var newElement = document.createElementNS("http://www.w3.org/2000/svg", 'path'); 
      arc0 = radian*a - Math.PI/2;
      arc1 = radian*(a+1) - Math.PI/2 - (Math.PI/400);
      x0 = Math.round(Math.cos(arc0)*r) + (r+padding);
      y0 = Math.round(Math.sin(arc0)*r) + (r+padding);
      x1 = Math.round(Math.cos(arc1)*r) + (r+padding);
      y1 = Math.round(Math.sin(arc1)*r) + (r+padding);
      var coord = "M"+x0+","+y0+"  A"+r+","+r+" 0 0,1 "+x1+","+y1+"";
      newElement.setAttributeNS(null,"d",coord);
      var red = Math.round(Math.random()*255);
      var green = Math.round(Math.random()*255);
      var blue = Math.round(Math.random()*255);
      newElement.setAttributeNS(null, "stroke", 'rgb('+red+','+green+','+blue+')');

      

      if(a==n_correct){
        color_label.textContent = "#"+decimal2hex(red)+""+decimal2hex(green)+""+decimal2hex(blue);
        newElement.isCorrect = true;
      }else{
        newElement.isCorrect = false;
      }

      //newElement.style.strokeWidth = strokeWidth+"px";
      newElement.style.strokeWidth = "1px";
      newElement.style.fill = "none";
      newElement.id = "path"+a;
      circle.appendChild(newElement);

      arc_size = newElement.getTotalLength();
      newElement.setAttribute('stroke-dasharray', arc_size + ' ' + arc_size);
      newElement.setAttribute('stroke-dashoffset', 3*arc_size);


      TweenLite.to(newElement, 0.10, {'stroke-dashoffset':2*arc_size, delay:delay+a*.10, ease: Power0.easeNone});
      TweenLite.to(newElement, 0.4, {'strokeWidth':strokeWidth, delay:delay+(n*.10)});


      //Separar tudo isto em breve!
      newElement.onclick = function(e){//alert(e.target.id);

        var feedback_label = document.getElementById('feedback_label');

        if(e.target.isCorrect){
          level++;
          feedback_label.innerHTML = 'Correct!';
          ScreenManager.showScreen('feedback');
          Sounds.yes.play();
          feedback.onclick = function(){
            ColorWheel.generateCircle('circle_svg', level+1, 0.5);
            ScreenManager.showScreen('game');
          }
        }else{
          level = 1;
          feedback_label.innerHTML = 'Game over';
          ScreenManager.showScreen('feedback');
          Sounds.no.play();
          feedback.onclick = function(){
            ScreenManager.showScreen('intro');
          }
        }

        //update labels

        level_field.getElementsByTagName("span")[0].innerHTML = (level<10?'0':'')+(level);
        if(level>Number( record_field.getElementsByTagName("span")[0].innerHTML)){
          record_field.getElementsByTagName("span")[0].innerHTML = (level<10?'0':'')+(level);
        }


      }


    }

    TweenLite.to(white, 0.4, {'strokeWidth':whitestrokeWidth, delay:delay+(n*.10)});

    var color_label = document.getElementById('color_label');
    color_label.style['opacity'] = 0;
    TweenLite.to(color_label, 0.4, {'opacity':1, delay:delay+0.4+(n*.10)});

    

  }




  function decimal2hex(d) {
      var s = (+d).toString(16);
      if(s.length < 2) {
          s = '0' + s;
      }
      return s;
  }


  return {
    level: level,
    generateCircle: generateCircle
  };

})();




