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

      //White circle below the others
      var newElement = document.createElementNS("http://www.w3.org/2000/svg", 'circle'); 
      newElement.setAttributeNS(null,"cx","50%");
      newElement.setAttributeNS(null,"cy","50%");
      newElement.setAttributeNS(null,"r",r);
      newElement.setAttributeNS(null, "stroke", 'rgb(255,255,255)');
      whitestrokeWidth = strokeWidth+4;
      newElement.style.strokeWidth = whitestrokeWidth+"px";
      newElement.style.fill = "none";
      newElement.id = "path_base";
      circle.appendChild(newElement);

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
      newElement.style.strokeWidth = strokeWidth+"px";
      newElement.style.fill = "none";
      newElement.id = "path"+a;
      circle.appendChild(newElement);

      newElement.onclick = function(e){
        alert(e.target.id);
      }

    }

  }







  return {
    generateCircle: generateCircle
  };

})();




