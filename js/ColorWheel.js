/**
* All color calculations including generating the circle
*/

var ColorWheel = (function() {


  function generateCircle(svg, n){

    var circle = document.getElementById(svg);
    var n = n||2;
    var svg_width = circle.getBoundingClientRect().width;
    var strokeWidth = 100;
    var padding = Math.ceil(strokeWidth/2)+2;
    var r = (svg_width/2 - padding);
    var radian = ( Math.PI*2) / n;

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
        console.log(e.target.id);
      }

    }

    var color_label = document.getElementById('color_label');
    console.log(color_label);
    color_label.x = svg_width/2;
    color_label.y = svg_width/2;


  }


  return {
    generateCircle: generateCircle
  };

})();




