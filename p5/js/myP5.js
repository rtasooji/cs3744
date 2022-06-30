/*eslint no-undef: 0*/
let x = 0
let y = 0
let px = 0
let py = 0
let dirX = 1
let easing = 0.1
let angle = 0
let myDots = []

function setup(){
    let canvas = createCanvas(500, 500)
    canvas.parent("canvasContainer")
    ellipseMode(RADIUS)
    frameRate(60)
    for (let i = 1; i<=height/5; i+=1){
        let myDot = new MyDot(sin(i)*5, 10*i, 5, 5)
        myDot.render()
        myDots.push(myDot)

    }
    // ortho(-width / 2, width / 2, height / 2, -height / 2, 0, 500);
   // exploringPers()
}

function easingExample(){
    let targetX = mouseX
    let targetY = mouseY
    x += (targetX - x) * easing
    y += (targetY - y) * easing
    ellipse(x, 40, 25, 25)
    ellipse(500 - 50, 500 - y, 25, 25)
}

function coolStroke(){
    let targetX = mouseX
    x += (targetX - x) * easing
    let targetY = mouseY
    y += (targetY - y) * easing
    let weight = dist(x, y, px, py)
    strokeWeight(weight)
    line(x, y, px, py)
    px = x
    py = y
}

function buildTriangle(){
    fill(0, 0, 200)
    beginShape()
    vertex(-10, 100, -1)
    vertex(100, -100, -1)
    vertex(100, 100, -1)
    endShape()
}

function tranformation(){
    box()  // build the box at the center
    translate(100, 100,-100) // translate always called to the object after building
    rotateZ(30)
    box()

}

function cameraPanning(){
    camera(mouseX, height/2, (height/2) / tan(PI/6), mouseX, height/2, 0, 0, 1, 0);
    translate(width/2, height/2, -100);
    stroke(255);
    noFill();
    box(200);
}

function exploringPers(){
    let fov = PI/3;
    let cameraZ = (height/2.0) / tan(fov/2.0);
    perspective(fov, float(width)/float(height), cameraZ/10.0, cameraZ*10.0);

}

function displayBox(){
    stroke(255);
    noFill();
    box(200);
}

function exploreTranformation(){
    let tempX = mouseX
    let tempY = mouseY
    x += (tempX - x) * easing
    y += (tempY - y) * easing
    translate(x, y)  // Applies to all drawing functions that follows
                     // Even though
    rect(0, 0, 30, 30)
    let weight = dist(x, y, px, py)
    strokeWeight(weight)
    line(x, y, px, py)

    px = x
    py = y
}

function transThenRot(){
    translate(mouseX, mouseY)
    rotate(angle)
    rect(0, 0, 30, 30)
    angle += .1
}

function rotThenTrans(){
    rotate(angle)
    translate(mouseX, mouseY)
    rect(0, 0, 10, 10)
    angle += .1
}

function drawEllipse(offset, counter){
    //x += dirX*exp((1 - counter/100))
    let speed = dirX*2.8
    ellipse(speed , offset, 5, 5)
    if (x > width || x < 0){
        dirX *= -1
    }

}

class MyDot {
    constructor(speed, offset, width, height) {
        this.speed = speed
        this.offset = offset
        this.loc = 0
        this.width = width
        this.height = height
        this.dir = 1
    }
    render(){

        this.loc += this.speed * this.dir
        ellipse(this.loc, this.offset, this.width, this.height)
        if (this.loc > width || this.loc < 0){
            this.dir *= -1
        }
    }
}

function Box(){
    push()
    translate(100, 0)
    ellipse(5, 5, 10, 10)
    pop()
    translate(10, 10)
    ellipse(5, 5, 10, 10)

}

function draw(){
    background(100)
    Box()
    // drawEllipse(10, 1)
    // drawEllipse(20, 1)



}
