let enemyvalues = {
    army: {
        inf: 100,
        art: 100,
        cav: 100
    },
    workers: {
        miners: 100,
        carpenters: 100,
        officials: 100
    },
    resources: {
        wood: 100,
        stone: 100,
        metal: 100,
        glass: 100,
        gold: 100,
        population: 100
    }
};

let enemyweights = {
    armyweight: 100,
    workersweight: 100,
};

let enemycities = 100;
let possiblecitynames = ["Evershield", "Warlock's End", "Latchway", "Tan Springs", "Apple Down", "Southfield", "Low Belcot", "Buckvale", "Exwith", "Brimhof"];

function enemyInit() {
    enemyvalues.resources.wood = 100;
    enemyvalues.resources.stone = 100;
    enemyvalues.resources.metal = 100;
    enemyvalues.resources.glass = 100;
    enemyvalues.resources.gold = 100;
    enemyvalues.resources.population = 100;
}

function calculateWeights() {
    enemyweights.armyweight = Math.abs(
        (enemyvalues.army.inf - army.inf) +
        (enemyvalues.army.art - army.art) +
        (enemyvalues.army.cav - army.cav)
    );
    
    enemyweights.workersweight = Math.abs(
        (enemyvalues.workers.carpenters - workers.carpenters) +
        (enemyvalues.workers.miners - workers.miners) +
        (enemyvalues.workers.officials - workers.officials)
    );
}

function needscity() {
    let x = Math.floor(Math.random() * 9);
    let y = Math.floor(Math.random() * 9);
    let checkedtile = document.getElementsByClassName("Xtile_" + x + "_" + y)[0]?.classList;

    if (checkedtile) {
        let checktile = checkedtile.contains('X');
        let coords = {
            x: x,
            y: y
        };
        return coords;
    }
    return null;
}

function getblockedtiles() {
    let blockedtiles = {
        x: [],
        y: [],
    };
    
    let firstcitytiles = document.getElementsByClassName("first_city");
    let citytiles = document.getElementsByClassName("city");

    for (let tile of [...firstcitytiles, ...citytiles]) {
        let tiles = tile.className;
        let tileindex = tiles.indexOf('X');
        if (tileindex !== -1) {
            blockedtiles.x.push(parseInt(tiles[tileindex + 6]));
            blockedtiles.y.push(parseInt(tiles[tileindex + 8]));
        }
    }
    return blockedtiles;
}

function enemyAction() {
    updateEnemyResources();
    calculateWeights();

    if (enemyweights.armyweight > enemyweights.workersweight) {
        let chance = Math.floor(Math.random() * 3);
        if (chance === 0) enemyvalues.army.inf++;
        else if (chance === 1) enemyvalues.army.art++;
        else enemyvalues.army.cav++;
    } else {
        let chance = Math.floor(Math.random() * 3);
        if (chance === 0) enemyvalues.workers.carpenters++;
        else if (chance === 1) enemyvalues.workers.miners++;
        else enemyvalues.workers.officials++;
    }

    console.log("Enemy values:", enemyvalues);
}

function updateEnemyResources() {
    enemyvalues.resources.wood += Math.floor(Math.random() * 5);
    enemyvalues.resources.stone += Math.floor(Math.random() * 5);
    enemyvalues.resources.metal += Math.floor(Math.random() * 5);
    enemyvalues.resources.glass += Math.floor(Math.random() * 5);
    enemyvalues.resources.gold += Math.floor(Math.random() * 5);
    enemyvalues.resources.population += Math.floor(Math.random() * 2);

    console.log(`Resurse inamic:`, enemyvalues.resources);
}



function buildEnemyCity() {
    if (enemyvalues.resources.wood >= 5 && enemyvalues.resources.stone >= 5) {

        enemyvalues.resources.wood -= 5;
        enemyvalues.resources.stone -= 5;

        let x, y;
        let isValidLocation = false;
        for (let attempt = 0; attempt < 10; attempt++) {
            x = Math.floor(Math.random() * 10);
            y = Math.floor(Math.random() * 10);
            let cell = document.getElementById(`cell${x}${y}`);

            if (cell && !cell.classList.contains('city')) {
                isValidLocation = true;
            }
        }

        if (isValidLocation) {
            let cell = document.getElementById(`cell${x}${y}`);
            cell.classList.add('city');
            cell.style.backgroundColor = 'orange';

            console.log(`Inamicul a construit un oraș la coordonatele (${x}, ${y})`);
        }
    } else {
        console.log("Inamicul nu are suficiente resurse pentru a construi un oraș.");
    }
}

