class Population {
    constructor(cities, maxPop, mutationRate) {
        this.cities = cities;
        this.genes = [];
        this.generations = 0;
        this.mutationRate = mutationRate;
        this.best;
        this.bestFitness = Infinity;
        this.finished = false;
        this.maxPop = maxPop;

        this.init();
        this.fitness();
    }

    init() {
        for (let i = 0; i < this.maxPop; i++)
            this.genes.push(new DNA(cities));
    }

    naturalSelection() {
        this.matingPool = [];
        this.genes.forEach(p => {
            let percentage = p.fitness * 100;
            for (var i = 0; i < percentage; i++)
                this.matingPool.push(p);
        });
    }

    newGeneration() {
        this.genes = [];
        for (let i = 0; i < this.cities.length; i++) {
            let parent1Index = floor(random(this.matingPool.length));
            let parent2Index = floor(random(this.matingPool.length));
            let parent1 = this.matingPool[parent1Index];
            let parent2 = this.matingPool[parent2Index];
            let child = parent1.crossover(parent2);
            child.mutate(this.mutationRate);
            this.genes.push(child);
        }
        this.generations++;
    }

    fitness() {
        this.genes.forEach((e) => {
            e.calcFitness();
        });
        let total = this.getTotalFitness();
        this.genes.forEach((e) => {
            e.fitness /= total;
        });
    }

    evaluate() {
        this.genes.forEach(p => {
            if (p.fitness <= this.bestFitness) {
                this.bestFitness = p.fitness;
                this.best = p;
            }
            if (p.fitness <= 0.01)
                this.finished = true;
        });
    }

    getTotalFitness() {
        var sum = 0;
        this.genes.forEach((e) => {
            sum += floor(e.fitness);
        });
        return sum;
    }

    getBestPath() {
        return this.best.getDistance();
    }

    bestPoints() {
        return this.best.indexes;
    }

    isFinished() {
        return this.finished;
    }
}
