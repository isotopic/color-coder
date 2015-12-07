/**
* ColorWheel
* 
* This one takes care of the fancy colored circle.
*/

var ColorWheel = (function() {


  function generateColors(n){
    var colors = [];
    for(var a=0;a<n;a++){
      colors.push( '#'+ ('000000' + Math.floor(Math.random()*16777215).toString(16)).slice(-6) );
    }
    return colors;
  }


  /*
  * This function draws a circle made of n different colored arcs,
  * and emits an event when the user clicks on some of them.
  */
  function generateCircle(svg, n, delay){

    // The id of the target svg element
    var circle = document.getElementById(svg);

    // How many pieces?
    var n = n||2;
    var colors = generateColors(n);

    // One of them is randomly choosen to be considered correct
    var a_correct = Math.floor(Math.random()*n);

    // The size of the circle is based on the available screen...
    if(window.innerWidth<780 || window.innerHeight<815 ){
      circle.style.width="300px";
      circle.style.height="300px";
    }else{
      circle.style.width="600px";
      circle.style.height="600px";
    }
  
    // ...and all the measurement is based on it.
    var svg_width = circle.getBoundingClientRect().width;
    var strokeWidth = (svg_width >= 500 ? 90 : 60);
    var padding = Math.ceil(strokeWidth/2)+10;
    var r = (svg_width/2 - padding);
    var radian = ( Math.PI*2) / n;

    // Removes previous elements inside the svg, if any
    while (circle.lastChild) {
      circle.removeChild(circle.lastChild);        
    }

    // The text label showing the color code to be guessed
    var color_label = document.createElementNS("http://www.w3.org/2000/svg", 'text'); 
    color_label.setAttribute("id", "color_label");
    color_label.setAttributeNS(null,"x","50%");
    color_label.setAttributeNS(null,"y","53%");
    color_label.style['font-size'] = '35px'; 
    color_label.style['fill'] = '#ffffff'; 
    color_label.style['text-anchor'] = 'middle'; 
    color_label.style['cursor'] = 'default'; 
    color_label.style['text-transform'] = 'uppercase'; 
    circle.appendChild(color_label);
    

    // A thicker white circle underneath the arcs gives us a nice white border
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


    // Finally, each one of the arcs
    for(var a=0; a<n; a++){

      // If you've forgotten how to define svg arcs, read this:
      // http://tutorials.jenkov.com/svg/path-element.html#arcs
      var newElement = document.createElementNS("http://www.w3.org/2000/svg", 'path'); 
      arc0 = radian*a - Math.PI/2;
      arc1 = radian*(a+1) - Math.PI/2 - (Math.PI/400);
      x0 = (Math.cos(arc0)*r) + (r+padding);
      y0 = (Math.sin(arc0)*r) + (r+padding);
      x1 = (Math.cos(arc1)*r) + (r+padding);
      y1 = (Math.sin(arc1)*r) + (r+padding);
      var coord = "M"+x0+","+y0+"  A"+r+","+r+" 0 0,1 "+x1+","+y1+"";
      newElement.setAttributeNS(null,"d",coord);
      newElement.setAttributeNS(null, "stroke", colors[a]);

      // Fills up the text and marks the elements as correct or incorrect
      if(a==a_correct){
        color_label.textContent = colors[a];
        newElement.isCorrect = true;
      }else{
        newElement.isCorrect = false;
      }

      //newElement.style.strokeWidth = strokeWidth+"px";
      newElement.style.strokeWidth = "1px";
      newElement.style.fill = "none";
      newElement.id = "path"+a;
      circle.appendChild(newElement);

      // Animate the stroke dashoffset
      arc_size = newElement.getTotalLength();
      newElement.setAttribute('stroke-dasharray', arc_size + ' ' + arc_size);
      newElement.setAttribute('stroke-dashoffset', 3*arc_size);
      TweenLite.to(newElement, 0.10, {'stroke-dashoffset':2*arc_size, delay: delay+ a*0.1, ease: Power0.easeNone});
      TweenLite.to(newElement, 0.4, {'strokeWidth':strokeWidth, delay: delay+ (n*0.1)});

    }

    // Animate the white circle base
    TweenLite.to(white, 0.4, {'strokeWidth':whitestrokeWidth, delay:delay+(n*.10)});

    // Animeta the color label
    var color_label = document.getElementById('color_label');
    color_label.style['opacity'] = 0;
    TweenLite.to(color_label, 0.4, {'opacity':1, delay:delay+0.4+(n*.10)});

  }





  // Converts decimal to padded hex
  function decimal2hex(d) {
    var s = (+d).toString(16);
    if(s.length < 2) {
        s = '0' + s;
    }
    return s;
  }




  return {
    generateCircle: generateCircle
  };

})();




