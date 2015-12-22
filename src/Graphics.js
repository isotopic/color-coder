/**
* Graphics
*
* This object takes care of dynamic graphics.
*/

var Graphics = (function() {


  // Generates (n) 'different' colors.
  // Actually this method leaves a chance of 1 in 16777215 for getting two identical colors on level 1.
  function generateColors(n){
    var colors = [];
    for(var a=0;a<n;a++){
      colors.push( '#'+ ('000000' + Math.floor(Math.random()*16777215).toString(16)).slice(-6) );
    }
    return colors;
  }


  /*
  * Draws a circle made of n different colored arcs.
  */
  function generateCircle(svg, n, delay){

    delay = (delay===undefined?0.3:delay);

    // The id of the target svg element
    var circle = document.getElementById(svg);

    // How many pieces?
    n = n||2;
    var colors = generateColors(n);

    // One of them is randomly choosen to be considered correct and have the hex displayed
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

    // How much time the animation must take. Don't forget to add the delay passed by parameter!
    var total_time = 0.6;

    // Finally, each one of the arcs
    for(var a=0; a<n; a++){
      // If you've forgotten how to define svg arcs, read this:
      // http://tutorials.jenkov.com/svg/path-element.html#arcs
      var newElement = document.createElementNS("http://www.w3.org/2000/svg", 'path');
      arc0 = radian*a - Math.PI/2;
      arc1 = radian*(a+1) - Math.PI/2 - (Math.PI/400); //This Math.PI/400 is to have a little gap between the arcs
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
      newElement.style.strokeWidth = "5px";
      newElement.style.fill = "none";
      newElement.id = "path"+a;
      circle.appendChild(newElement);

      // Animate the stroke dashoffset
      arc_size = newElement.getTotalLength();
      newElement.setAttribute('stroke-dasharray', arc_size + ' ' + arc_size);
      newElement.setAttribute('stroke-dashoffset', 3*arc_size);
      TweenLite.to(newElement, total_time/n, {'stroke-dashoffset':2*arc_size, delay: (a/n)*total_time + delay, ease: Power0.easeNone});
      // Animate the width a little later
      TweenLite.to(newElement, 0.4, {'strokeWidth':strokeWidth, delay: total_time + delay});
    }

    // Animate the white circle base
    TweenLite.to(white, 0.4, {'strokeWidth':whitestrokeWidth, delay: total_time + delay });

    // Animate the color label
    color_label = document.getElementById('color_label');
    color_label.style['opacity'] = 0;
    TweenLite.to(color_label, 0.4, {'opacity':1, delay: total_time + delay + 0.4});

  }

  // Converts decimal to padded hex
  function decimal2hex(d) {
    var s = (+d).toString(16);
    if(s.length < 2) {
        s = '0' + s;
    }
    return s;
  }




  // Draw and animates feedback graphics (when user has passed a level or not)
  function giveFeedback(svg, type, delay){

    delay = (delay===undefined?0.3:delay);

  	var feedback = document.getElementById(svg);
  	// Cleaning up
  	while (feedback.lastChild) {
      feedback.removeChild(feedback.lastChild);
    }
    // Little circle (green or red)
    var circle = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
    circle.setAttributeNS(null,"cx","50");
    circle.setAttributeNS(null,"cy","50");
    circle.setAttributeNS(null,"r","0");
    circle.setAttributeNS(null, "stroke", (type=="correct"?"#88dd99":"#dd9988"));
    circle.style.strokeWidth = "25px";
    circle.style.fill = "none";
    circle.id = "feedback_circle";
    feedback.appendChild(circle);

    // The path showing a 'V' or an 'X' sign
    var path = document.createElementNS("http://www.w3.org/2000/svg", 'path');
    if(type=='correct'){
	    path.setAttributeNS(null,"d","M36,48 L48,64 L64,40");
	    path.setAttributeNS(null, "stroke", "#77cc88");
    }else{
    	path.setAttributeNS(null,"d","M40,40 L60,60 M60,40 L40,60");
    	path.setAttributeNS(null, "stroke", "#cc7788");
    }
    path.setAttributeNS(null, "stroke-width", "5");
    path.setAttributeNS(null, "fill", "none");
    path.setAttributeNS(null, "stroke-linecap", "round");
    path.setAttributeNS(null, "stroke-linejoin", "round");
		feedback.appendChild(path);

    // Animate the little circle...
    TweenLite.to(circle, 0.2, {attr:{r:35}, 'strokeWidth':2, delay: delay });
    // ...and the path
    var path_size = path.getTotalLength()+4;
    path.setAttribute('stroke-dasharray', path_size + ',' + path_size);
    path.setAttribute('stroke-dashoffset', 3*path_size);
    TweenLite.to(path, 0.3, {'stroke-dashoffset': 2*path_size, delay: delay+0.2});

    // Bring some noise
		if(type=="correct"){
			Sounds.yes.play();
		}else{
			Sounds.no.play();
		}

  }










  return {
    generateCircle: generateCircle,
    giveFeedback: giveFeedback
  };

})();




