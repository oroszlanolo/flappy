const WIDTH = 800;
const HEIGHT = 600;
let xVel = 5;
let myBird;
let gates = [];
let tmp = 0;
let running = false;
let score = 0;
function setup() {
	createCanvas(WIDTH,HEIGHT);
		background(200);
		fill(255,0,0);
		stroke(255,0,0);
		myBird = new Bird(WIDTH/2,HEIGHT/2,30);
		textSize(30);
}

function draw() {
	background(200);
	if(running){
		tmp++;
		if(tmp > 100){
			spawnGate();
			tmp = 0;
		}
		myBird.move();
		moveGates();
		xVel += 0.005;
	}
	myBird.draw();
	drawGates();
	stroke(0,0,0);
	fill(0,0,0);
	text(score,20,30);
}

function mouseClicked(){
	if(!running){
		start();
	}else{
		myBird.tapped();
	}
}

function start(){
	myBird.x = WIDTH/2;
	myBird.y = HEIGHT/2;
	myBird.yVel = 0;
	gates = [];
	score = 0;
	xVel = 5;
	running = true;
}

function spawnGate(){
	var gate = new Gate();
	gates.push(gate);
}
function moveGates(){
	for(let gate of gates){
		gate.move();
		if(checkCrash(gate.x,gate.top,gate.bot)){
			running = false;
		}
		if(!gate.crossed && gate.x < WIDTH/2){
			gate.crossed = true;
			score++;
		}
	}
	if(gates.length > 0 && gates[0].x < -100){
		gates.shift();
	}
}

function drawGates(){
	for(let gate of gates){
		gate.draw();
	}
}

function checkCrash(x,top,bot){
	if(abs(x-myBird.x) > myBird.r){
		return false;
	}
	if(myBird.y < bot || myBird.y > top){
		return true;
	}
	var dist = pow(myBird.x-x,2) + pow(myBird.y-top,2);
	if(myBird.r*myBird.r > dist){
		return true;
	}
	var dist = pow(myBird.x-x,2) + pow(myBird.y-bot,2);
	if(myBird.r*myBird.r > dist){
		return true;
	}
	return false;
}


function drawBird(xPos,yPos,r, flap){
fill(255,255,0);
stroke(255,255,0);
triangle(xPos,yPos+r/2,xPos,yPos-r/2,xPos+r*1.5,yPos);
fill(255,0,0);
stroke(255,0,0);
	ellipse(xPos,yPos,r*2);
	fill(0);
	stroke(0);
		ellipse(xPos+r/3,yPos-r/3,r/4);
		var wingY;
		if(flap){
			wingY = yPos-r/2;
		}else{
			wingY = yPos+r/2
		}
		line(xPos-r/4,yPos,xPos-r/5,wingY);
		line(xPos+r/2,yPos,xPos-r/5,wingY);
}

function drawGate(xPos,top,bot){
	line(xPos,0,xPos,top);
	line(xPos,bot,xPos,HEIGHT);
}

class Bird{
	constructor(x,y,r){
		this.x = x;
		this.y = y;
		this.r = r;
		this.yVel = 0;
		this.g = -0.4;
		this.flap = false;
	}

	tapped(){
		this.yVel = 8;
		this.flap = true;
	}

	move(){
		this.y += this.yVel;
		this.yVel += this.g;
		if(this.y <= this.r){
			this.yVel = 0;
		}
		if(this.yVel < 1){
			this.flap = false;
		}
	}
	draw(){
		drawBird(this.x,HEIGHT-this.y,this.r, this.flap);
	}
}

class Gate{
	constructor(){
		this.x = WIDTH;
		var length = random(150,230);
		this.top = random(length+10,HEIGHT-10);
		this.bot = this.top-length;
		this.crossed = false;
	}
	move(){
		this.x -= xVel;
	}
	draw(){
		drawGate(this.x,HEIGHT-this.top,HEIGHT-this.bot);
	}
}
