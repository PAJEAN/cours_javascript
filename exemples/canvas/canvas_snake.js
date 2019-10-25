let canvas = document.getElementById("mycanvas")
let context = canvas.getContext("2d");

let unit = 32;

context.fillStyle = "rgb(46,184,46)";
context.fillRect(0,0,unit*18,unit*18);
context.fillStyle = "rgb(133,224,133)";
context.fillRect(unit,unit*2,unit*16,unit*15);
context.fillStyle = "rgb(0,0,0)";
context.font = unit/2 + "px serif";
context.fillText("High score: " + 0, unit, unit);
context.stroke();
