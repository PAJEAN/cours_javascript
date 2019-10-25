var canvas = document.getElementById("mycanvas")
var context = canvas.getContext("2d");
context.strokeStyle = "green";
context.beginPath();
context.moveTo(0, 0);
context.lineTo(100,0);
context.lineTo(100,100);
context.lineTo(0,100);
context.closePath();
context.strokeText("Centre", 50, 25);
context.fillText("Centre", 50, 100);
context.stroke();

context.beginPath();
context.arc(100,100,25,1.5*Math.PI,Math.PI);
context.stroke();

context.beginPath();
context.strokeStyle = "red";
context.moveTo(0,0);
context.bezierCurveTo(0,25,100,25,100,0);
context.stroke();