/**
* ColorWheel
* 
* This one takes care of the fancy colored circle from the gameplay.
*/

var ColorWheel = (function() {





  function generateCircle(svg, n){

    var n = n||2;

    var circle = document.getElementById(svg);

    if(window.innerWidth<500){
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
      //newElement.style.strokeWidth = strokeWidth+"px";
      newElement.style.strokeWidth = "1px";
      newElement.style.fill = "none";
      newElement.id = "path"+a;
      circle.appendChild(newElement);

      arc_size = newElement.getTotalLength();
      newElement.setAttribute('stroke-dasharray', arc_size + ' ' + arc_size);
      newElement.setAttribute('stroke-dashoffset', 3*arc_size);


      TweenLite.to(newElement, 0.10, {'stroke-dashoffset':2*arc_size, delay:a*.10, ease: Power0.easeNone});
      TweenLite.to(newElement, 0.4, {'strokeWidth':strokeWidth, delay:(n*.10)});

      newElement.onclick = function(e){
        alert(e.target.id);
      }

    }

    TweenLite.to(white, 0.4, {'strokeWidth':whitestrokeWidth, delay:(n*.10)});

    Sounds.yes.play();

  }







  return {
    generateCircle: generateCircle
  };

})();




