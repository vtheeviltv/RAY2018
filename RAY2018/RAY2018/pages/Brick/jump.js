
var game_canvas;
var game_contet;

var cloudx;

var texto = "hola";
var current = 0;
var initTime
var currentTime
var current = currentTime -initTime
setInterval(updateGame, 10);

function initGame () {
	game_canvas = document.getElementById("gameCanvas");
	game_context = game_canvas.getContext("2d");

     //setInterval(updateGame, 10);
	cloudx = game_canvas.width
}
 
function updateGame () {
	game_context.clearRect(0, 0, game_canvas.width, game_canvas.height);

	game_context.fillStyle = "red";

	game_context.fillRect(50, 50, 100, 100);

	game_context.fillStyle = "green";

	game_context.fillRect(40,(game_canvas.height - 100), 50, 100);

	game_context.fillStyle = "blue";

	game_context.fillRect((game_canvas.width/2) + 50,(game_canvas.height/2), 75, 75);

	game_context.fillStyle = "white";

	game_context.fillRect((cloudx), 0, 100, 50);
	cloudx = cloudx - 3;

	game_context.fillStyle = "black";

	game_context.fillRect((game_canvas.width -75),0 , 75, 30);

	initTime = getTime ()
	update()
	current = getTime () - initTime
 
	initTime = getTime ()
	game_context.fillStyle = "white";
	game_context.font = "16px Arial";
	game_context.fillText((texto), game_canvas.width -75, 15)


}