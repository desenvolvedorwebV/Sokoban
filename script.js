const gameBoard = document.getElementById('gameBoard');
const controls = {
    left:  document.getElementById('left'),
    up:    document.getElementById('up'),
    right: document.getElementById('right'),
    down:  document.getElementById('down')
};

const movimentosElement = document.getElementById('movimentos');
const debugElement      = document.getElementById('debug');
const nivelElement      = document.getElementById('nivel');
const empurroesElement  = document.getElementById('empurroes');
let tempoInterval;

function secondsToTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return [
        String(hours).padStart(2, '0'),
        String(minutes).padStart(2, '0'),
        String(secs).padStart(2, '0')
    ].join(':');
}

function timeToSeconds(time) {
    const [hours, minutes, seconds] = time.split(':').map(Number);
    return hours * 3600 + minutes * 60 + seconds;
}

function startCronometro() {
    const tempoElement  = document.getElementById('tempo');
    tempoInterval = setInterval(function() {
        var tempo = timeToSeconds(tempoElement.innerHTML) + 1;
        tempoElement.innerHTML = secondsToTime(tempo);
    }, 1000);
    return tempoInterval;
}
tempoInterval = startCronometro();
/*
function parseSokobanLevel(level) {
    const walls = [];
    const boxes = [];
    const targets = [];
    const emptySpaces = [];
    let player = null;

    const lines = level.split('\n');
    lines.forEach((line, y) => {
        [...line].forEach((char, x) => {
            //alert(x+','+y);
            if (char === '#') {
                walls.push({ x, y });
            } else if (char === '$') {
                boxes.push({ x, y });
            } else if (char === '.') {
                targets.push({ x, y });
            } else if (char === '@') {
                player = { x, y };
            } else if (char === ' ') {
                emptySpaces.push({ x, y });
            }
        });
    });

    return { walls, boxes, targets, player, emptySpaces };
}

const levelString = `
########
#  .   #
#  $   #
#  $   #
#..@.. #
#  $   #
#  $   #
#  .   #
########

`;

const { walls: walls1, boxes: boxes1, targets: targets1, player: player1, emptySpaces: emptySpaces1 } = parseSokobanLevel(levelString);

const fases = {
    fase1: {
        player: player1,
        boxes: boxes1,
        destinations: targets1,
        walls: walls1
    }
};*/

const fases = {
    fase1: {
        player: {x:4, y:2},
        boxes: [{x:3, y:4}, {x:4, y:4}],
        destinations: [{x:3, y:5}, {x:4, y:5}],
        walls: [{x:1, y:1}, {x:1, y:2}, {x:1, y:3}, {x:1, y:4}, {x:1, y:5}, {x:1, y:6}, {x:2, y:1}, {x:2, y:6}, {x:3, y:1}, {x:3, y:6}, {x:4, y:1}, {x:4, y:6}, {x:5, y:1}, {x:5, y:6}, {x:6, y:1}, {x:6, y:2}, {x:6, y:3}, {x:6, y:4}, {x:6, y:5}, {x:6, y:6}]
    },
    fase2: {
        player: {x:3, y:4},
        boxes: [{x:5, y:4}],
        destinations: [{x:4, y:4}],
        walls: [{x:2, y:2}, {x:2, y:3}, {x:2, y:4}, {x:2, y:5}, {x:2, y:6}, {x:3, y:2}, {x:3, y:6}, {x:4, y:2}, {x:4, y:5}, {x:4, y:6}, {x:5, y:2}, {x:5, y:5}, {x:6, y:2}, {x:6, y:5}, {x:7, y:2}, {x:7, y:3}, {x:7, y:4}, {x:7, y:5}]
    },
    fase3: {
        player: {x:4, y:5},
        boxes: [{x:5, y:4}],
        destinations: [{x:3, y:5}],
        walls: [{x:2, y:2}, {x:2, y:3}, {x:2, y:4}, {x:2, y:5}, {x:2, y:6}, {x:3, y:2}, {x:3, y:6}, {x:4, y:2}, {x:4, y:6}, {x:5, y:2}, {x:5, y:3}, {x:5, y:6}, {x:6, y:3}, {x:6, y:6}, {x:7, y:3}, {x:7, y:4}, {x:7, y:5}, {x:7, y:6}]
    },
    fase4: {
        player: {x:3, y:4},
        boxes: [{x:3, y:5}, {x:4, y:3}],
        destinations: [{x:4, y:5}, {x:5, y:5}],
        walls:[{x:1, y:3},{x:1, y:4}, {x:1, y:5}, {x:1, y:6}, {x:2, y:1}, {x:2, y:2}, {x:2, y:3}, {x:2, y:6}, {x:3, y:1}, {x:3, y:6}, {x:4, y:1}, {x:4, y:6}, {x:5, y:1}, {x:5, y:2}, {x:5, y:6}, {x:6, y:2}, {x:6, y:3}, {x:6, y:4}, {x:6, y:5}, {x:6, y:6}]
    },
    fase5: {
        player: {x:5, y:4},
        boxes: [{x:4, y:3}, {x:3, y:5}],
        destinations: [{x:4, y:5}, {x:5, y:3}],
        walls: [{x:1, y:2}, {x:1, y:3}, {x:1, y:4}, {x:1, y:5}, {x:2, y:2}, {x:2, y:5}, {x:2, y:6}, {x:2, y:7}, {x:3, y:1}, {x:3, y:2}, {x:3, y:7}, {x:4, y:1}, {x:4, y:7}, {x:5, y:1}, {x:5, y:7}, {x:6, y:1}, {x:6, y:2}, {x:6, y:3}, {x:6, y:4}, {x:6, y:5}, {x:6, y:6}, {x:6, y:7}]
    },
    fase6: {
        player: {x:4, y:3},
        boxes: [{x:7, y:8}, {x:3, y:7}],
        destinations: [{x:3, y:4}, {x:6, y:8}],
        walls:[{x:2, y:3}, {x:2, y:4}, {x:2, y:5}, {x:2, y:6}, {x:2, y:7}, {x:2, y:8}, {x:2, y:9}, {x:3, y:2}, {x:3, y:3}, {x:3, y:9}, {x:4, y:9}, {x:5, y:9}, {x:4, y:2}, {x:5, y:2}, {x:5, y:3}, {x:5, y:4}, {x:5, y:5}, {x:5, y:6}, {x:5, y:8}, {x:6, y:6}, {x:7, y:6}, {x:8, y:6}, {x:9, y:6}, {x:6, y:9}, {x:7, y:9}, {x:8, y:9}, {x:9, y:7}, {x:9, y:8}, {x:9, y:9}]
    },
    fase7: {
        player: {x:6, y:3},
        boxes: [{x:4, y:3}, {x:5, y:4}, {x:5, y:5}],
        destinations: [{x:4, y:4}, {x:4, y:5}, {x:5, y:3}],
        walls: [{x:2, y:2}, {x:2, y:3}, {x:2, y:4}, {x:2, y:5}, {x:2, y:6}, {x:2, y:7}, {x:3, y:2}, {x:3, y:7}, {x:4, y:2}, {x:4, y:7}, {x:5, y:2}, {x:5, y:7}, {x:6, y:2}, {x:6, y:6}, {x:6, y:7}, {x:7, y:2}, {x:7, y:3}, {x:7, y:4}, {x:7, y:5}, {x:7, y:6}]
    },
    fase8: {
        player: { x: 7, y: 3 },
        boxes: [{x:5, y:6}, {x:5, y:7}, {x:3, y:8}],
        destinations: [{ x: 8, y: 4 }, { x: 7, y: 5}, {x:7, y:8}],
        walls: [{x: 2, y:6}, {x:1, y:6}, {x:1, y:7}, {x:1, y:8}, {x:1, y:9}, {x:2, y:9}, {x:3, y:4}, {x:3, y:5}, {x:3, y:6}, {x:3, y:9}, {x:4, y:3}, {x:4, y:4}, {x:4, y:9}, {x:4, y:10}, {x:5, y:3}, {x:5, y:10}, {x:6, y:2}, {x:6, y:3}, {x:6, y:10}, {x:7, y:2}, {x:7, y:9}, {x:7, y:10}, {x:8, y:2}, {x:8, y:3}, {x:8, y:5}, {x:8, y:6}, {x:8, y:7}, {x:8, y:8}, {x:8, y:9}, {x:9, y:3}, {x:9, y:4}, {x:9, y:5}, {x:9, y:6}]
    },
    fase9: {
        player: {x: 4, y: 5},
        boxes: [{x: 4, y: 3}, {x:4, y:4}, {x:4, y:6}, {x:4, y:7}],
        destinations: [{x:3, y:5}, {x: 4, y:2}, {x:4, y:8}, {x:5, y:5}],
        walls: [{x:1, y:1}, {x:1, y:2}, {x:1, y:3}, {x:1, y:4}, {x:1, y:5}, {x:1, y:6}, {x:1, y:7}, {x:1, y:8}, {x:1, y:9}, {x:2, y:1}, {x:2, y:9}, {x:3, y:1}, {x:3, y:9}, {x:4, y:1}, {x:4, y:9}, {x:5, y:1}, {x:5, y:9}, {x:6, y:1}, {x:6, y:9}, {x:7, y:1}, {x:7, y:2}, {x:7, y:3}, {x:7, y:4}, {x:7, y:5}, {x:7, y:6}, {x:7, y:7}, {x:7, y:8}, {x:7, y: 9}]
    },
    fase10: {
        player: {x:8, y:3},
        boxes: [{x:4, y:4}, {x:4, y:9}, {x:7, y:3}, {x:9, y:4}],
        destinations: [{x:3, y:8}, {x:4, y:6}, {x:5, y:7}, {x:6, y:5}],
        walls: [{x:2, y:4}, {x:2, y:5}, {x:2, y:6}, {x:2, y:7}, {x:2, y:8}, {x:2, y:9}, {x:2, y:10}, {x:2, y:11}, {x:3, y:2}, {x:3, y:3}, {x:3, y:4}, {x:3, y:11}, {x:4, y:1}, {x:4, y:2}, {x:4, y:7}, {x:4, y:11}, {x:5, y:1}, {x:5, y:10}, {x:5, y:11}, {x:6, y:1}, {x:6, y:6}, {x:6, y:7}, {x:6, y:8}, {x:6, y:9}, {x:6, y:10}, {x:7, y:1}, {x:7, y:2}, {x:7, y:5}, {x:8, y:2}, {x:8, y:5}, {x:9, y:2}, {x:9, y:5}, {x:10, y:2}, {x:10, y:5}, {x:11, y:2}, {x:11, y:3}, {x:11, y:4}, {x:11, y:5}]
    },
    fase11: {
        player: {x:8, y:8},
        boxes: [{x:4, y:8}, {x:4, y:9}, {x:6, y:9}, {x:7, y:4}],
        destinations: [{x:3, y:5}, {x:7, y:5}, {x:8, y:6}, {x:9, y:8}],
        walls: [{x:2, y:4}, {x:2, y:5}, {x:2, y:6}, {x:2, y:7}, {x:2, y:8}, {x:2, y:9}, {x:2, y:10}, {x:2, y:11}, {x:3, y:4}, {x:3, y:11}, {x:4, y:4}, {x:4, y:5}, {x:4, y:6}, {x:4, y:7}, {x:4, y:11}, {x:5, y:3}, {x:5, y:4}, {x:5, y:5}, {x:5, y:6}, {x:5, y:7}, {x:5, y:10}, {x:5, y:11}, {x:6, y:2}, {x:6, y:3}, {x:6, y:7}, {x:6, y:10}, {x:7, y:2}, {x:7, y:10}, {x:7, y:11}, {x:8, y:2}, {x:8, y:7}, {x:8, y:11}, {x:9, y:2}, {x:9, y:3}, {x:9, y:4}, {x:9, y:5}, {x:9, y:6}, {x:9, y:7}, {x:9, y:11}, {x:10, y:7}, {x:10, y:8}, {x:10, y:9}, {x:10, y:10}, {x:10, y:11}]
    },
    fase12: {
        player: {x:3, y:3},
        boxes: [{x:3, y:4}, {x:4, y:4}, {x:6, y:3}, {x:7, y:5}],
        destinations: [{x:4, y:3}, {x:5, y:5}, {x:5, y:7}, {x:6, y:6}],
        walls: [{x:1, y:3}, {x:1, y:4}, {x:1, y:5}, {x:1, y:6}, {x:2, y:2}, {x:2, y:3}, {x:2, y:6}, {x:3, y:2}, {x:3, y:6}, {x:4, y:1}, {x:4, y:2}, {x:4, y:6}, {x:4, y:7}, {x:4, y:8}, {x:5, y:1}, {x:5, y:6}, {x:5, y:8}, {x:6, y:1}, {x:6, y:8}, {x:7, y:1}, {x:7, y:2}, {x:7, y:3}, {x:7, y:8}, {x:8, y:3}, {x:8, y:4}, {x:8, y:5}, {x:8, y:8}, {x:9, y:5}, {x:9, y:6}, {x:9, y:7}, {x:9, y:8}]
    },
    fase13: {
        player: {x:7, y:2},
        boxes: [{x:5, y:5}, {x:5, y:7}, {x:6, y:6}, {x:6, y:7}],
        destinations: [{x:3, y:2}, {x:4, y:2}, {x:4, y:3}, {x:4, y:6}],
        walls: [{x:1, y:1}, {x:1, y:2}, {x:1, y:3}, {x:1, y:4}, {x:2, y:1}, {x:2, y:4}, {x:2, y:5}, {x:2, y:6}, {x:2, y:7}, {x:2, y:8}, {x:2, y:9}, {x:3, y:1}, {x:3, y:9}, {x:4, y:1}, {x:4, y:5}, {x:4, y:9}, {x:5, y:1}, {x:5, y:2}, {x:5, y:9}, {x:6, y:1}, {x:6, y:2}, {x:6, y:4}, {x:6, y:5}, {x:6, y:8}, {x:6, y:9}, {x:7, y:1}, {x:7, y:8}, {x:8, y:1}, {x:8, y:2}, {x:8, y:3}, {x:8, y:4}, {x:8, y:5}, {x:8, y:6}, {x:8, y:7}, {x:8, y:8}]
    },
    fase14: {
        player: {x:3, y:6},
        boxes: [{x:3, y:5}, {x:3, y:7}, {x:4, y:8}, {x:6, y:8}],
        destinations: [{x:3, y:8}, {x:5, y:5}, {x:6, y:6}, {x:8, y:5}],
        walls: [{x:1, y:5}, {x:1, y:6}, {x:1, y:7}, {x:1, y:8}, {x:2, y:2}, {x:2, y:3}, {x:2, y:4}, {x:2, y:5}, {x:2, y:8}, {x:2, y:9}, {x:2, y:10}, {x:3, y:2}, {x:3, y:10}, {x:4, y:2}, {x:4, y:3}, {x:4, y:10}, {x:5, y:3}, {x:5, y:4}, {x:5, y:9}, {x:5, y:10}, {x:6, y:4}, {x:6, y:5}, {x:6, y:9}, {x:7, y:4}, {x:7, y:5}, {x:7, y:6}, {x:7, y:9}, {x:8, y:4}, {x:8, y:9}, {x:9, y:4}, {x:9, y:5}, {x:9, y:6}, {x:9, y:7}, {x:9, y:8}, {x:9, y:9} ]
    },
    fase15: {
        player: {x:4, y:5},
        boxes: [{x:3, y:3}, {x:5, y:3}, {x:5, y:5}, {x:8, y:6}],
        destinations: [{x:3, y:7}, {x:6, y:3}, {x:8, y:4}, {x:8, y:5}],
        walls: [{x:2, y:1}, {x:2, y:2}, {x:2, y:3}, {x:2, y:4}, {x:2, y:5}, {x:2, y:6}, {x:2, y:7}, {x:2, y:8}, {x:3, y:1}, {x:3, y:8}, {x:4, y:1}, {x:4, y:6}, {x:4, y:7}, {x:4, y:8}, {x:5, y:1}, {x:5, y:2}, {x:5, y:4}, {x:5, y:6}, {x:6, y:2}, {x:6, y:6}, {x:6, y:7}, {x:6, y:8}, {x:7, y:2}, {x:7, y:3}, {x:7, y:8}, {x:8, y:3}, {x:8, y:8}, {x:9, y:3}, {x:9, y:7}, {x: 9, y:8}, {x:10, y:3}, {x:10, y:4}, {x:10, y:5}, {x:10, y:6}, {x:10, y:7}]
    },
    fase16: {
        player: {x:7, y:6},
        boxes: [{x:3, y:7}, {x:5, y:4}, {x:6, y:6}, {x:8, y:3}],
        destinations: [{x:3, y:5}, {x:5, y:5}, {x:8, y:5}, {x:8, y:8}],
        walls: [{x:2, y:4}, {x:2, y:5}, {x:2, y:6}, {x:2, y:7}, {x:2, y:8}, {x:2, y:9}, {x:3, y:4}, {x:3, y:9}, {x:4, y:1}, {x:4, y:2}, {x:4, y:3}, {x:4, y:4}, {x:4, y:9}, {x:5, y:1}, {x:5, y:7}, {x:5, y:8}, {x:5, y:9}, {x:6, y:1}, {x:6, y:8}, {x:7, y:1}, {x:7, y:2}, {x:7, y:4}, {x:7, y:8}, {x:7, y:9}, {x:8, y:2}, {x:8, y:4}, {x:8, y:9}, {x:9, y:2}, {x:9, y:7}, {x:9, y:8}, {x:9, y:9}, {x:10, y:2}, {x:10, y:3}, {x:10, y:4}, {x:10, y:5}, {x:10, y:6}, {x:10, y:7}]
    },
    fase17: {
        player: {x:3, y:7},
        boxes: [{x:3, y:4}, {x:3, y:5}, {x:4, y:8}, {x:6, y:7}],
        destinations: [{x:2, y:2}, {x:4, y:4}, {x:6, y:2}, {x:7, y:8}],
        walls: [{x:1, y:1}, {x:1, y:2}, {x:1, y:3}, {x:1, y:4}, {x:1, y:5}, {x:1, y:6}, {x:1, y:7}, {x:1, y:8}, {x:2, y:1}, {x:2, y:8}, {x:2, y:9}, {x:2, y:10}, {x:3, y:1}, {x:3, y:2}, {x:3, y:10}, {x:4, y:2}, {x:4, y:3}, {x:4, y:10}, {x:5, y:1}, {x:5, y:2}, {x:5, y:3}, {x:5, y:4}, {x:5, y:6}, {x:5, y:9}, {x:5, y:10}, {x:6, y:1}, {x:6, y:9}, {x:7, y:1}, {x:7, y:2}, {x:7, y:3}, {x:7, y:4}, {x:7, y:5}, {x:7, y:6}, {x:7, y:9}, {x:8, y:6}, {x:8, y:7}, {x:8, y:8}, {x:8, y:9}]
    },
    fase18: {
        player: {x:6, y:6},
        boxes: [{x:3, y:3}, {x:4, y:3}, {x:4, y:5}, {x:5, y:7}],
        destinations: [{x:3, y:5}, {x:4, y:8}, {x:5, y:5}, {x:7, y:7}],
        walls: [{x:1, y:1}, {x:1, y:2}, {x:1, y:3}, {x:1, y:4}, {x:1, y:5}, {x:1, y:6}, {x:1, y:7}, {x:2, y:1}, {x:2, y:7}, {x:2, y:8}, {x:2, y:9}, {x:3, y:1}, {x:3, y:7}, {x:3, y:9}, {x:4, y:1}, {x:4, y:4}, {x:4, y:7}, {x:4, y:9}, {x:5, y:1}, {x:5, y:4}, {x:5, y:9}, {x:6, y:1}, {x:6, y:2}, {x:6, y:3}, {x:6, y:4}, {x:6, y:9}, {x:7, y:4}, {x:7, y:8}, {x:7, y:9}, {x:8, y:4}, {x:8, y:5}, {x:8, y:6}, {x:8, y:7}, {x:8, y:8}]
    },
    fase19: {
        player: {x:5, y:5},
        boxes: [{x:3, y:8}, {x:6, y:10}, {x:7, y:6}, {x:8, y:5}],
        destinations: [{x:3, y:3}, {x:6, y:3}, {x:6, y:5}, {x:7, y:9}],
        walls: [{x:1, y:4}, {x:1, y:5}, {x:1, y:6}, {x:1, y:7}, {x:2, y:2}, {x:2, y:3}, {x:2, y:4}, {x:2, y:7}, {x:2, y:8}, {x:2, y:9}, {x:2, y:10}, {x:3, y:2}, {x:3, y:10}, {x:3, y:11}, {x:3, y:12}, {x:4, y:2}, {x:4, y:3}, {x:4, y:12}, {x:5, y:2}, {x:5, y:3}, {x:5, y:6}, {x:5, y:7}, {x:5, y:9}, {x:5, y:10}, {x:5, y:12}, {x:6, y:2}, {x:6, y:6}, {x:6, y:7}, {x:6, y:12}, {x:7, y:2}, {x:7, y:3}, {x:7, y:4}, {x:7, y:10}, {x:7, y:11}, {x:7, y:12}, {x:8, y:4}, {x:8, y:7}, {x:8, y:8}, {x:8, y:9}, {x:8, y:10}, {x:9, y:4}, {x:9, y:7}, {x:10, y:4}, {x:10, y:5}, {x:10, y:6}, {x:10, y:7}]
    },
    fase20: {
        player: {x:4, y:7},
        boxes: [{x:3, y:4}, {x:4, y:10}, {x:5, y:7}, {x:8, y:8}, {x:10, y:3}],
        destinations: [{x:4, y:5}, {x:4, y:9}, {x:6, y:7}, {x:7, y:8}, {x:9, y:5}],
        walls: [{x:1, y:2}, {x:1, y:3}, {x:1, y:4}, {x:1, y:5}, {x:1, y:6}, {x:1, y:7}, {x:1, y:8}, {x:2, y:2}, {x:2, y:8}, {x:3, y:2}, {x:3, y:8}, {x:3, y:9}, {x:3, y:10}, {x:3, y:11}, {x:3, y:12}, {x:4, y:2}, {x:4, y:3}, {x:4, y:4}, {x:4, y:12}, {x:5, y:4}, {x:5, y:5}, {x:5, y:12}, {x:6, y:5}, {x:6, y:10}, {x:6, y:11}, {x:6, y:12}, {x:7, y:5}, {x:7, y:6}, {x:7, y:10}, {x:8, y:4}, {x:8, y:5}, {x:8, y:6}, {x:8, y:7}, {x:8, y:10}, {x:9, y:1}, {x:9, y:2}, {x:9, y:3}, {x:9, y:4}, {x:9, y:10}, {x:10, y:1}, {x:10, y:9}, {x:10, y:10}, {x:11, y:1}, {x:11, y:5}, {x:11, y:6}, {x:11, y:9}, {x:12, y:1}, {x:12, y:2}, {x:12, y:3}, {x:12, y:4}, {x:12, y:5}, {x:12, y:6}, {x:12, y:7}, {x:12, y:8}, {x:12, y:9}]
    }
};
/*fase17: {
        player: {x:10, y:10},
        boxes: [{x:20, y:20}],
        destinations: [{x:19, y:19}],
        walls: [{x:18, y:18}, {x:1, y:1}]
    },
    fase18: {
        player: {x:10, y:10},
        boxes: [{x:20, y:20}],
        destinations: [{x:19, y:19}],
        walls: [{x:18, y:18}, {x:1, y:1}]
    },
    fase19: {
        player: {x:10, y:10},
        boxes: [{x:20, y:20}],
        destinations: [{x:19, y:19}],
        walls: [{x:18, y:18}, {x:1, y:1}]
    },
    fase20: {
        player: {x:10, y:10},
        boxes: [{x:20, y:20}],
        destinations: [{x:19, y:19}],
        walls: [{x:18, y:18}, {x:1, y:1}]
    }*/

let faseAtual = 'fase1'; // Começa na fase 1

let player = { ...fases[faseAtual].player };
let boxes = [...fases[faseAtual].boxes];
let destinations = [...fases[faseAtual].destinations];
let walls = [...fases[faseAtual].walls];
let movimentos = 0;
let empurroes = 0;
let moveHistory = [];

function drawBoard() {
    gameBoard.innerHTML = "";
    walls.forEach(e => {
        let a = document.createElement("div");
        a.style.gridRowStart = e.y;
        a.style.gridColumnStart = e.x;
        a.classList.add("obstacle");
        gameBoard.appendChild(a);
    });
    destinations.forEach(e => {
        let a = document.createElement("div");
        a.style.gridRowStart = e.y;
        a.style.gridColumnStart = e.x;
        a.classList.add("destination");
        gameBoard.appendChild(a);
    });
    boxes.forEach(e => {
        let a = document.createElement("div");
        a.style.gridRowStart = e.y;
        a.style.gridColumnStart = e.x;
        a.classList.add("box");
        if (isDestination(e.x, e.y)) {
            a.classList.add("box-on-destination");
        }
        gameBoard.appendChild(a);
    });
    let e = document.createElement("div");
    e.style.gridRowStart = player.y;
    e.style.gridColumnStart = player.x;
    e.classList.add("player");
    gameBoard.appendChild(e);
    //checkCompletion();
}

function isDestination(x, y) {
    return destinations.some(dest => dest.x === x && dest.y === y);
}

function checkCompletion() {
    const allBoxesOnDestinations = boxes.every(box => isDestination(box.x, box.y));
    if (allBoxesOnDestinations) {
        //alert("Nível concluído!");
        const nextFaseInfo = getNextFase();
        if (nextFaseInfo) {
            /*loadFase(nextFaseInfo);*/
            setTimeout(function() {
                loadFase(nextFaseInfo,'passarDeFase');
            }, 150);
        } else {
            alert("Você completou todas as fases!");
        }
    }
}

function getNextFase() {
    const faseKeys = Object.keys(fases);
    const currentFaseIndex = faseKeys.indexOf(faseAtual);
    if (currentFaseIndex >= 0 && currentFaseIndex < faseKeys.length - 1) {
        //alert("teste");
        faseAtual = faseKeys[currentFaseIndex + 1];
        return { fase: faseAtual, numero: currentFaseIndex+1}; // +2 porque o índice é 0-based
    }
    return null;
}

function getFase() {
    const faseKeys = Object.keys(fases);
    const currentFaseIndex = faseKeys.indexOf(faseAtual);
    if (currentFaseIndex >= 0 && currentFaseIndex < faseKeys.length - 1) {
        //alert("teste");
        faseAtual = faseKeys[currentFaseIndex];
        return { fase: faseAtual, numero: currentFaseIndex};
    }
    return null;
}

function loadFase(nextFaseInfo,operacao) {
    clearInterval(tempoInterval);
    const tempoElement = document.getElementById('tempo');
    tempoElement.innerHTML = "00:00:00";
    tempoInterval = startCronometro();
    const { fase, numero } = nextFaseInfo;
    player = { ...fases[fase].player };
    boxes = [...fases[fase].boxes];
    destinations = [...fases[fase].destinations];
    walls = [...fases[fase].walls];
    movimentos = 0;
    movimentosElement.innerHTML = movimentos;
    empurroes  = 0;
    empurroesElement.innerHTML  = empurroes;
    novoNivel = parseInt(nivelElement.innerHTML);
    if (operacao !== 'faseAtual')
    {
        novoNivel += 1;
        nivelElement.innerHTML = novoNivel;
    }
    drawBoard();
    debugPositions();
    moveHistory = []; // Limpa o histórico de movimentos ao carregar uma nova fase
}

function movePlayer(e, t) {
    let n = document.getElementById("pause");
    if ("Despausar" === n.textContent) return; // Verifica se o jogo está pausado

    let o = player.x + e,
        s = player.y + t;

    if (isWall(o, s)) return; // Verifica se a nova posição é uma parede

    let a = boxes.findIndex(e => e.x === o && e.y === s);
    if (-1 !== a) { // Verifica se a nova posição contém uma caixa
        let r = o + e,
            l = s + t;
        if (isWall(r, l) || isBox(r, l)) return; // Verifica se a posição para onde a caixa será movida é válida

        // Salva o estado atual antes de mover a caixa
        moveHistory.push({ player: { ...player }, boxes: [...boxes], empurroes: empurroes });
        redoHistory = []; // Limpa o redoHistory quando um novo movimento é feito

        boxes[a] = { x: r, y: l };
        empurroes += 1;
        empurroesElement.innerHTML = empurroes;
    } else {
        // Salva o estado atual antes de mover o jogador
        moveHistory.push({ player: { ...player }, boxes: [...boxes], empurroes: empurroes });
        redoHistory = []; // Limpa o redoHistory quando um novo movimento é feito
    }

    player = { x: o, y: s };
    movimentos += 1;
    movimentosElement.innerHTML = movimentos;
    drawBoard();
    debugPositions();
    checkCompletion();
}

let redoHistory = []; // Histórico de movimentos desfeitos

// Função para desfazer o movimento (undo)
function undoMove() {
    let n = document.getElementById("pause");
    if ("Despausar" === n.textContent) return; // Verifica se o jogo está pausado
    
    if (moveHistory.length > 0) {
        // Seleciona todos os elementos com a classe 'quantifyUndoMove'
        const elements = document.querySelectorAll('.quantifyUndoMove');

        // Filtra os elementos que também possuem a classe 'quantifyActive'
        const activeElements = Array.from(elements).filter(element => element.classList.contains('quantifyActive'));

        // Verifica se há elementos com a classe 'quantifyActive'
        if (activeElements.length > 0) {
            // Remove a classe 'quantifyActive' do último elemento
            const lastActiveElement = activeElements[activeElements.length - 1];
            lastActiveElement.classList.remove('quantifyActive');
            console.log('Último elemento com a classe "quantifyActive" removido.');
            let e = moveHistory.pop();
            redoHistory.push({ player: { ...player }, boxes: [...boxes], empurroes: empurroes });
            player = e.player;
            boxes = e.boxes;
            empurroes = e.empurroes;
            empurroesElement.innerHTML = empurroes;
            movimentos -= 1;
            movimentosElement.innerHTML = movimentos;
            drawBoard();
            debugPositions();
        }
        else {
            console.log('Nenhum elemento com a classe "quantifyActive" encontrado.');
        }
    }
}


// Função para refazer o movimento (redo)
function redoMove() {
    let n = document.getElementById("pause");
    if ("Despausar" === n.textContent) return; // Verifica se o jogo está pausado
    
    if (redoHistory.length > 0) {
        // Seleciona todos os elementos com a classe 'quantifyRedoMove'
        const elements = document.querySelectorAll('.quantifyRedoMove');

        // Filtra os elementos que também possuem a classe 'quantifyActive'
        const activeElements = Array.from(elements).filter(element => element.classList.contains('quantifyActive'));

        // Verifica se há elementos com a classe 'quantifyActive'
        if (activeElements.length > 0) {
            // Remove a classe 'quantifyActive' do último elemento
            const lastActiveElement = activeElements[activeElements.length - 1];
            lastActiveElement.classList.remove('quantifyActive');
            console.log('Último elemento com a classe "quantifyActive" removido.');
            let e = redoHistory.pop();
            moveHistory.push({ player: { ...player }, boxes: [...boxes], empurroes: empurroes });
            player = e.player;
            boxes = e.boxes;
            empurroes = e.empurroes;
            empurroesElement.innerHTML = empurroes;
            movimentos += 1;
            movimentosElement.innerHTML = movimentos;
            drawBoard();
            debugPositions();
        }
        else {
            console.log('Nenhum elemento com a classe "quantifyActive" encontrado.');
        }
    }
}


function pauseGame()
{
    clearInterval(tempoInterval);
    const pauseButton = document.getElementById('pause');
    pauseButton.innerHTML = "Despausar";
    pauseButton.removeEventListener("click", pauseGame);
    pauseButton.addEventListener("click", unpauseGame);
    document.getElementById("textoPausa").style.display = "block";
    const resetButton = document.getElementById('reset');
    resetButton.removeEventListener("click", resetLevel);
}

function unpauseGame()
{
    const pauseButton = document.getElementById('pause');
    pauseButton.innerHTML = "Pausar";
    pauseButton.removeEventListener("click", unpauseGame);
    pauseButton.addEventListener("click", pauseGame);
    tempoInterval = startCronometro();
    document.getElementById("textoPausa").style.display = "none";
    const resetButton = document.getElementById('reset');
    resetButton.addEventListener("click", resetLevel);
}

function resetLevel()
{
    // Seleciona todos os elementos com a classe 'quantifyResetNivel'
    const elements = document.querySelectorAll('.quantifyResetNivel');

    // Filtra os elementos que também possuem a classe 'quantifyActive'
    const activeElements = Array.from(elements).filter(element => element.classList.contains('quantifyActive'));

    // Verifica se há elementos com a classe 'quantifyActive'
    if (activeElements.length > 0) {
        let resposta = confirm("Você tem certeza que deseja reiniciar o nível?");
        if (resposta) {
            // Remove a classe 'quantifyActive' do último elemento
            const lastActiveElement = activeElements[activeElements.length - 1];
            lastActiveElement.classList.remove('quantifyActive');
            console.log('Último elemento com a classe "quantifyActive" removido.');
            const faseAtualInfo = getFase();
            if (faseAtualInfo) {
                /*loadFase(faseAtualInfo);*/
                setTimeout(function() {
                    loadFase(faseAtualInfo,'faseAtual');
                }, 150);
            }
        } else {
            console.log("Usuário clicou em Cancelar.");
        }
    }
}

let jaUtilizadoAtualizarResetLevel = false;
function atualizarResetLevel() {
    var contador = 0;
    // Seleciona todos os elementos com a classe 'quantifyResetNivel'
    const elements = document.querySelectorAll('.quantifyResetNivel');
    
    // Filtra os elementos que também possuem a classe 'quantifyActive'
    const activeElements = Array.from(elements).filter(element => element.classList.contains('quantifyActive'));
    activeElements.forEach(element => {
        contador++;
    });
    if (contador !== 0)
    {
        return;
    }
    if (jaUtilizadoAtualizarResetLevel) {
        alert("Esta funcionalidade só pode ser utilizada uma vez. Se não, o jogo seria muito fácil. Concorda?");
        return;
    }
    
    alert("Funcionalidade secreta descoberta. Seus resets de nível foram atualizados.");
    
    // Remove a classe 'quantifyActive' dos elementos filtrados
    activeElements.forEach(element => {
        element.classList.remove('quantifyActive');
    });

    // Adiciona a classe 'quantifyActive' a todos os elementos com a classe 'quantifyResetNivel'
    elements.forEach(element => {
        element.classList.add('quantifyActive');
    });
    jaUtilizadoAtualizarResetLevel = true;
}

function isWall(x, y) {
    return walls.some(wall => wall.x === x && wall.y === y);
}

function isBox(x, y) {
    return boxes.some(box => box.x === x && box.y === y);
}

function debugPositions() {
    let debugText = `Jogador - X: ${player.x}, Y: ${player.y}<br>`;
    boxes.forEach((box, index) => {
        debugText += `Caixa ${index + 1} - X: ${box.x}, Y: ${box.y}<br>`;
    });
    debugElement.innerHTML = debugText;
}

controls.left.addEventListener('click', () => movePlayer(-1, 0));
controls.up.addEventListener('click', () => movePlayer(0, -1));
controls.right.addEventListener('click', () => movePlayer(1, 0));
controls.down.addEventListener('click', () => movePlayer(0, 1));
const undoButton = document.getElementById('undo');
undoButton.addEventListener('click', undoMove);
const pauseButton = document.getElementById('pause');
pauseButton.addEventListener('click', pauseGame);
const resetButton = document.getElementById('reset');
resetButton.addEventListener('click', resetLevel);
const redoButton = document.getElementById('redo');
redoButton.addEventListener('click', redoMove);
const logoButton = document.getElementById('logo');
logoButton.addEventListener('click', atualizarResetLevel);

drawBoard(); // Desenha o tabuleiro inicial
debugPositions(); // Exibe as posições iniciais no HTML
loadFase(faseAtual,'faseAtual');
