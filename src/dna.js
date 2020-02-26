class DNA {
    constructor(cities) {
        this.cities = cities;
        this.indexes = [];
        this.fitness;
        this.init();
        this.calcFitness();
    }

    init() {
        var arr = [];
        for (let i = 0; i < cities.length; i++)
            arr[i] = i;
        this.indexes = shuffle(arr);
    }

    calcFitness() {
        var score = 0;
        for (var i = 0; i < this.cities.length - 1; i++) {
            let curr = this.cities[this.indexes[i]];
            let next = this.cities[this.indexes[i + 1]];
            score += dist(curr.x, curr.y, next.x, next.y)
        }
        this.fitness = score;
    }

    crossover(partner) {
        var child = new DNA(this.cities);
        let rate = floor(random(this.indexes.length));
        var cpt = 0;
        var i = 0;
        while (i < this.indexes.length) {
            if (random(1) < 0.5)
                if (!contains(child.indexes, partner.indexes[i]))
                {
                    child.indexes.push(partner.indexes[i]);
                    cpt++;
                }
            else if (!contains(child.indexes, this.indexes[i]))
            {
                child.indexes.push(this.indexes[i]);
                cpt++;
            }
            i++;
            if (cpt == this.indexes.length - 1 && cpt < this.indexes.length)
                i--;
        }
        console.log(this.indexes);
        return child;
    }

    mutate(mutationRate) {
        if (random(1) < mutationRate) {
            let a = floor(random(this.indexes.length));
            let b = floor(random(this.indexes.length));

            let tmp = this.indexes[a];
            this.indexes[a] = this.indexes[b];;
            this.indexes[b] = tmp;
        }
    }

    getDistance() {
        var total = 0;
        var curr, next;
        for (let i = 0; i < this.indexes.length -1; i++)
        {
            curr = this.cities[this.indexes[i]];
            next = this.cities[this.indexes[i+1]];
            total += dist(curr.x, curr.y, next.x, next.y);
        }
        return floor(total);
    }
}

function contains(arr, e) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == e)
            return true;
    }
    return false;
}
