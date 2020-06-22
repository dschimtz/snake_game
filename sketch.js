var snake;
var snake_color = "#0B132B";
var fruit;
var fruit_color = "#6FFFE9";
var w = 10; // width of snake and fruit

var snake_speed = 10;

const dirs = {
	UP: 0,
	DOWN: 1,
	LEFT: 2,
	RIGHT: 3
};

function setup() {
	createCanvas(600, 600);
	frameRate(30);
	snake = new Snake(int(random(200,400)/10)*10, int(random(200,400)/10)*10, snake_color, w);
	fruit = new Fruit(fruit_color, w);
}

function draw() {
	background("#3A506B");
	snake.update();

	if (!fruit.is_alive && snake.dirs != -1) {
		fruit.spawn();
	}

	if (fruit.is_alive) {
		fruit.show();
	}

	// check if the snake and fruit are colliding
	if (snake.snek_arr[0].x     == fruit.x     && snake.snek_arr[0].y     == fruit.y ||
		snake.snek_arr[0].x + w == fruit.x + w && snake.snek_arr[0].y == fruit.y + w) {
		fruit.spawn();
		snake.nom();
		console.log(snake);
	}

}

function keyPressed() {
	if (keyCode == LEFT_ARROW && snake.dirs != dirs.RIGHT) {
		snake.dirs = dirs.LEFT;
	}	
	else if (keyCode == RIGHT_ARROW && snake.dirs != dirs.LEFT) {
		snake.dirs = dirs.RIGHT;
	}
	else if (keyCode == UP_ARROW && snake.dirs != dirs.DOWN) {
		snake.dirs = dirs.UP;
	}
	else if (keyCode == DOWN_ARROW && snake.dirs != dirs.UP) {
		snake.dirs = dirs.DOWN;
	}
}

function Snake(xc, yc, color, size) {
	this.color = color;
	this.size = size;

	this.snek_arr = [];
	this.snek_arr.push({x: xc, y: yc});

	this.dirs = -1;

	this.setDirection = function(direction) {
		this.dirs = direction;
	}

	this.nom = function() {
		var x = this.snek_arr[this.snek_arr.length - 1].x;
		var y = this.snek_arr[this.snek_arr.length - 1].y;
		this.snek_arr.push({x: x, y: y});
	}

	this.show = function() {
		for (var i=0; i<this.snek_arr.length; i++) {
			fill(this.color);
			noStroke();
			rect(this.snek_arr[i].x, this.snek_arr[i].y, this.size, this.size);
		}
	}

	this.update = function() {
		headx = this.snek_arr[0].x;
		heady = this.snek_arr[0].y;
		if (this.dirs == -1) {
			this.show();
		}
		else if (this.dirs == dirs.LEFT) {
			this.snek_arr.unshift({x: headx - size, y: heady})
			this.snek_arr.pop();
			this.show();
		}
		else if (this.dirs == dirs.RIGHT) {
			this.snek_arr.unshift({x: headx + size, y: heady})
			this.snek_arr.pop();
			this.show();
		}
		else if (this.dirs == dirs.UP) {
			this.snek_arr.unshift({x: headx, y: heady - size})
			this.snek_arr.pop();
			this.show();
		}
		else if (this.dirs == dirs.DOWN) {
			this.snek_arr.unshift({x: headx, y: heady + size})
			this.snek_arr.pop();
			this.show();
		}
	}
}

function Fruit(color, size) {
	this.color = color;
	this.size = size;

	this.x = null;
	this.y = null;

	this.is_alive = false;

	this.spawn = function() {
		this.is_alive = true;
		this.x = int(random(0,width)/10) * 10;
		this.y = int(random(0,height)/10) * 10;
		this.show();
	}

	this.show = function() {
		fill(this.color);
		noStroke();
		rect(this.x, this.y, this.size, this.size);
	}
}
