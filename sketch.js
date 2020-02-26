let nbCities = 11;
let mutationRate = 0.01;
let maxPop = nbCities * nbCities;
let cities = [];
let labelsPlaced = false;

let width = 600;
let height = 400;

/* UI */
let generationslabel;
let fitnesslabel;
let mutationratelabel;
let bestpointslabel;
let shortestpathlabel;

function setup() {
  createCanvas(500, 500, WEBGL);
  noStroke();
  fill(255, 102, 204);
  generationslabel = createP();
  fitnesslabel = createP();
  bestpointslabel = createP();
  mutationratelabel = createP();
  shortestpathlabel = createP();

  generateCities();
  population = new Population(cities, maxPop, mutationRate);
}

/* Program loop */
function draw() {
  background(255);
  genetic();
  drawCities();
  disp();

  if (!labelsPlaced)
    drawLabels();
  if (population.isFinished())
      noLoop();
}

function drawLabels() {
    labelsPlaced = true;
    var i = 65;
    population.bestPoints().forEach((e) => {
        let city = cities[e];
        let cityChar = createP(String.fromCharCode(i));
        cityChar.class("cityLabel");
        cityChar.position(city.x + (width/2) + 5, city.y + (height/2) + 20);
        i++;
    });
}

function drawCities() {
    beginShape(LINES);
    fill(220);
    stroke(70);

    population.bestPoints().forEach((e) => {
        let city = cities[e];
        ellipse(city.x, city.y, 13, 13);
    });
    endShape();
}

/* Main algorithm */
function genetic() {
    population.naturalSelection();
    population.newGeneration();
    population.fitness();
    population.evaluate();
}

function disp() {
    strokeWeight(3);
    stroke(237, 34, 93);
    beginShape(LINES);
    let p = population.bestPoints();
    for (let i = 0; i < population.bestPoints().length - 1; i++) {
        let curr = cities[p[i]];
        let next =cities[p[i+1]];
        line(curr.x, curr.y, next.x, next.y);
    }
    endShape();
    bestpointslabel.html("Best points: " + population.bestPoints());
    fitnesslabel.html("Best fit: " + population.bestFitness);
    mutationratelabel.html("Mutation rate: " + population.mutationRate * 100 + "%");
    generationslabel.html("Generations: " + population.generations);
    shortestpathlabel.html("Shortest path: " + population.getBestPath());
}

/* Initial points generation */
function generateCities() {
    var arr = [];
    for (let i = 0; i < nbCities; i++) {
        let x = floor(random(-width/3, width/3));
        let y = floor(random(-height/2, height/2));
        arr.push({x: x, y: y});
    }
    cities = arr;
}