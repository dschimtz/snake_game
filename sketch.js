var snake;
var snake_color = "#0B132B";
var fruit;
var fruit_color = "#6FFFE9";
var w = 10; // width of snake and fruit

var img;
var sel;

var snake_speed = 10;

const dirs = {
	UP: 0,
	DOWN: 1,
	LEFT: 2,
	RIGHT: 3
};

const imgs = {
	"zach": "https://i.imgur.com/grFNCmU.png",
	"jc1": "https://media.discordapp.net/attachments/566799815569178628/724665325072810135/image0.jpg",
	"jc2": "https://i.imgur.com/xMu7yVk.jpg",
	"dennis": "https://i.imgur.com/oZSe6FW.png",
}

function setup() {
	createCanvas(600, 600);
	frameRate(30);
	snake = new Snake(int(random(200,400)/10)*10, int(random(200,400)/10)*10, snake_color, w);
	fruit = new Fruit(fruit_color, w);

	img = loadImage(imgs.jc1);
	sel = createSelect();
	sel.option('jc1');
	sel.option('jc2');
	sel.option('zach');
	sel.option('dennis');
	sel.changed(selectEvent);
}

function draw() {
	background("#3A506B");
	img.resize(width, height);
	image(img, 0, 0);

	snake.update();

	// check if snake is out of bounds
	if (snake.snek_arr[0].x < 0 || snake.snek_arr[0].x > width || snake.snek_arr[0].y < 0 || snake.snek_arr[0].y > height) {
		snake = new Snake(int(random(200,400)/10)*10, int(random(200,400)/10)*10, snake_color, w);
	}

	// check if the snake and fruit are colliding
	if ((snake.snek_arr[0].x + w) / 2 == (fruit.x + w) / 2 && (snake.snek_arr[0].y) + w / 2 == (fruit.y) + w / 2) {
		fruit.spawn();
		snake.nom();
		snake.update();
		console.log(snake);
	}


	// check if snake is colliding with itself
	var snake_head = snake.snek_arr[0];
	var hx = (snake_head.x + w) / 2;
	var hy = (snake_head.y + w) / 2;

	for (var i=0; i<snake.snek_arr.length; i++) {
		if (i == 0) {
			continue;
		}
		var bx = (snake.snek_arr[i].x + w) / 2;
		var by = (snake.snek_arr[i].y + w) / 2;

		if (hx == bx && hy == by) {
			snake = new Snake(int(random(200,400)/10)*10, int(random(200,400)/10)*10, snake_color, w);
		}
	}

	if (!fruit.is_alive && snake.dirs != -1) {
		fruit.spawn();
	}

	if (fruit.is_alive) {
		fruit.show();
	}

	// display score
	textSize(32);
	fill('red');
	var a = 5;
	var b = 4;
	text('Score: ' + (snake.snek_arr.length - 1), width - 155, 50);
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

function selectEvent() {
	var value = sel.value();
	img = loadImage(imgs[value]);
}

function Snake(xc, yc, color, size) {
	this.color = color;
	this.size = size;

	this.snek_arr = [];
	this.snek_arr.push({x: xc, y: yc});
	this.snake_head = this.snek_arr[0];

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
