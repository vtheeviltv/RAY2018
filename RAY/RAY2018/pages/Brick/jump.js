
var game_canvas = null;
var game_context = null;
var game_loaded = false;
var myGamePiece;
var myObstacles = [];
var myScore;

 var title = "Jump";
 var backgroundColor = "black";
 var fontColor = "red";
 var currentPanel = 0;

var myGameArea = {
    canvas : document.getElementById ("gameCanvas"),
    start : function() {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        //document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
       //this.interval = setInterval(updateGameArea, 20);
        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}


function initGame () {

	game_canvas = document.getElementById("gameCanvas");
	game_context = game_canvas.getContext("2d");

	if (!game_loaded) {
        document.addEventListener('keydown', function(event) { 
            captureGameIputs (event);
        });

		setInterval(updateGame, 10);
		game_loaded = true;

        startGame();

    }

    console.log("juego cargando");
}

function startGame() {
    myGamePiece = new component(30, 30, "red", 10, 120);
    myGamePiece.gravity = 0.05;
    myScore = new component("30px", "Consolas", "black", 280, 40, "text");
    myGameArea.start();
}



function captureGameIputs (event) {
    switch(currentPanel) {
    case 0:
        splashScreenIputs (event);
        break;
    case 1:
        initScreenIputs(event);
        break;
    case 2:
        PauseScreenIputs(event);
        break;
    case 3: 
        break;
    case 4:
    startGame(event);//TODO
        break;
    case 5:
        break;
       default:
        console.log("sin definir");
        break; 
    }
}

function updateGameArea() {
    var x, height, gap, minHeight, maxHeight, minGap, maxGap;
    for (i = 0; i < myObstacles.length; i += 1) {
        if (myGamePiece.crashWith(myObstacles[i])) {
            return;
        } 
    }
    myGameArea.clear();
    myGameArea.frameNo += 1;
    if (myGameArea.frameNo == 1 || everyinterval(150)) {
        x = myGameArea.canvas.width;
        minHeight = 20;
        maxHeight = 200;
        height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
        minGap = 50;
        maxGap = 200;
        gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
        myObstacles.push(new component(10, height, "green", x, 0));
        myObstacles.push(new component(10, x - height - gap, "green", x, height + gap));
    }
    for (i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].x += -1;
        myObstacles[i].update();
    }
    myScore.text="SCORE: " + myGameArea.frameNo;
    myScore.update();
    myGamePiece.newPos();
    myGamePiece.update();
}
 
function updateGame (event) {
	game_context.clearRect(0, 0, game_canvas.width, game_canvas.height);

	switch(currentPanel) {
		case 0:
		      splashScreen();
		      break;
    	case 1:
    	     initScreen();
    	     break;
        case 2: 
    	     PauseScreen();
            break;
        case 3: 
            break;
            //TODO
        default:
            break;
    }
}

function splashScreen () {
    	
    	drawHeaderComponent();
        drawDescriptionComponent("HOLAAAAAAAAAAAAAAAAAAAAAAAAAA");
        drawFooterComponent();

}


function  splashScreenIputs (event) {

    if(event.keyCode == 83) {
        currentPanel = 1;
    }
}

function  splashGame (event) {
    drawPanel ( 0, 0, 0, 500, 400)
}


function initScreen () {
        
    drawHeaderComponent();
    drawPanel(25, 40, 420, 230)
    drawText(30, 60, "1.-Empezar");
    drawText(30, 80, "2.-Ayuda");
    drawText(30, 100, "3.-Creditos");
}


function  initScreenIputs (event) {

    if(event.keyCode == 83) {
        currentPanel = 2;
}
    if(event.keyCode == 49)    {
        currentPanel = 4;
    
    }
}

function PauseScreen () {
        
        drawHeaderComponent();
        drawDescriptionComponent("Quieto!");
        drawFooterComponent();

}

function  PauseScreenIputs (event) {

    if(event.keyCode == 83) {
        currentPanel = 0;
    }
}
      
function drawHeaderComponent () { 
        drawPanel(25, 10, 420, 230, backgroundColor);
        drawText(205, 25, title);
}
     
function drawDescriptionComponent (description) { 
        drawPanel(25, 40, 420, 230);
        drawText(30, 60, description);
}

function drawFooterComponent (description) { 
        drawPanel(25,
                  282,
                  420,
                  26,
                  backgroundColor);

        drawText(30,
                 300, 
                 "presiona 's' para continuar",
                 fontColor);
        
}
 
function drawPanel (posx, posy,
                         width, height, 
                         ColorIN = backgroundColor)  {

     game_context.fillStyle = ColorIN;
     game_context.fillRect = (posx, posy, width, height);
}
     
function drawText (posx, posy, text) {
     	game_context.fillStyle = fontColor;
     	game_context.fillText(text, posx, posy);

}


function component(width, height, color, x, y, type) {
    this.type = type;
    this.score = 0;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;
    this.gravity = 0;
    this.gravitySpeed = 0;
    this.update = function() {
        ctx = gameCanvas.context;
        if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function() {
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
        this.hitBottom();
    }
    this.hitBottom = function() {
        var rockbottom = updateGame.canvas.height - this.height;
        if (this.y > rockbottom) {
            this.y = rockbottom;
            this.gravitySpeed = 0;
        }
    }
    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
}

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
    return false;
}

function accelerate(n) {
    myGamePiece.gravity = n;
}
