(function() {
    'use strict';

    // ============================================================
    // LEVEL DATA
    // ============================================================

    const WORD_LIST = [
        // 2-letter
        'ad', 'ah', 'as', 'al', 'la', 'ha', 'sh', 'if', 'is', 'it',
        'in', 'on', 'or', 'of', 'up', 'to', 'do', 'go', 'no', 'so',
        'we', 'he', 'me', 'be', 'an', 'at', 'by', 'my',
        // 3-letter
        'add', 'ads', 'ash', 'ask', 'dad', 'fad', 'gag', 'gal', 'gas',
        'had', 'hag', 'has', 'jag', 'lag', 'lad', 'sad', 'sag', 'dal',
        'the', 'and', 'for', 'are', 'but', 'not', 'you', 'all', 'can',
        'her', 'was', 'one', 'our', 'out', 'run', 'hot', 'oil', 'sit',
        'top', 'red', 'big', 'new', 'old', 'put', 'let', 'his', 'few',
        'bin', 'van', 'man', 'ban', 'sun', 'fun', 'cup', 'cut', 'bus',
        'box', 'fix', 'mix', 'six', 'zip', 'web', 'vet', 'vim',
        // 4-letter
        'glad', 'half', 'hall', 'hash', 'lash', 'fall', 'dash', 'flask',
        'that', 'with', 'have', 'this', 'will', 'your', 'from', 'they',
        'been', 'call', 'come', 'each', 'make', 'like', 'long', 'look',
        'many', 'some', 'time', 'very', 'when', 'work', 'part', 'take',
        'help', 'hand', 'high', 'keep', 'last', 'left', 'life', 'live',
        'much', 'must', 'name', 'next', 'only', 'over', 'plan', 'read',
        'such', 'turn', 'want', 'word', 'just', 'back', 'give', 'most',
        'find', 'here', 'know', 'move', 'need', 'play', 'spin', 'jump',
        // 5-letter
        'salad', 'shall', 'flash', 'slash', 'glass', 'about', 'after',
        'again', 'began', 'below', 'bring', 'build', 'carry', 'clean',
        'climb', 'could', 'cover', 'dream', 'drink', 'drive', 'early',
        'earth', 'every', 'field', 'final', 'first', 'floor', 'found',
        'front', 'given', 'going', 'grand', 'great', 'green', 'group',
        'guard', 'happy', 'heart', 'horse', 'house', 'human', 'input',
        'known', 'large', 'later', 'learn', 'level', 'light', 'local',
        'might', 'money', 'month', 'music', 'never', 'night', 'north',
        'often', 'order', 'other', 'paper', 'party', 'place', 'plant',
        'point', 'power', 'press', 'price', 'quick', 'quite', 'river',
        'round', 'shown', 'since', 'small', 'sound', 'south', 'space',
        'stage', 'stand', 'start', 'state', 'still', 'stock', 'stone',
        'story', 'study', 'table', 'thing', 'think', 'those', 'three',
        'today', 'total', 'touch', 'track', 'trade', 'train', 'truth',
        'under', 'union', 'until', 'upper', 'using', 'usual', 'value',
        'voice', 'watch', 'water', 'where', 'which', 'while', 'white',
        'whole', 'world', 'write', 'young',
    ];

    function wordsForKeys(keys, maxLen) {
        return WORD_LIST.filter(function(w) {
            if (w.length > maxLen) return false;
            for (var i = 0; i < w.length; i++) {
                if (keys.indexOf(w[i]) === -1) return false;
            }
            return true;
        });
    }

    // Key group shortcuts
    var HOME = ['f', 'j', 'd', 'k', 's', 'l', 'a', ';', 'g', 'h'];
    var TOP  = HOME.concat(['r', 'u', 'e', 'i', 'w', 'o', 'q', 'p', 't', 'y']);
    var ALL  = TOP.concat(['v', 'n', 'b', 'm', 'c', ',', 'x', '.', 'z', '/']);

    const LEVELS = [
        // ===== HOME ROW =====
        {
            id: 1, name: "Home Base", description: "Just F and J",
            keys: ['f', 'j'], tileSpeed: 75, spawnInterval: 0.8,
            maxActiveTiles: 10, minWordLength: 1, maxWordLength: 1,
            totalTiles: 25, wordList: []
        },
        {
            id: 2, name: "Neighbors", description: "Just D and K",
            keys: ['d', 'k'], tileSpeed: 75, spawnInterval: 0.8,
            maxActiveTiles: 10, minWordLength: 1, maxWordLength: 1,
            totalTiles: 25, wordList: []
        },
        {
            id: 3, name: "Reaching Out", description: "Just S and L",
            keys: ['s', 'l'], tileSpeed: 75, spawnInterval: 0.8,
            maxActiveTiles: 10, minWordLength: 1, maxWordLength: 1,
            totalTiles: 25, wordList: []
        },
        {
            id: 4, name: "Pinky Start", description: "Just A and ;",
            keys: ['a', ';'], tileSpeed: 75, spawnInterval: 0.8,
            maxActiveTiles: 10, minWordLength: 1, maxWordLength: 1,
            totalTiles: 25, wordList: []
        },
        {
            id: 5, name: "Index Stretch", description: "Just G and H",
            keys: ['g', 'h'], tileSpeed: 75, spawnInterval: 0.8,
            maxActiveTiles: 10, minWordLength: 1, maxWordLength: 1,
            totalTiles: 25, wordList: []
        },
        {
            id: 6, name: "Home Row Letters", description: "All home row, single keys",
            keys: HOME, tileSpeed: 75, spawnInterval: 0.8,
            maxActiveTiles: 10, minWordLength: 1, maxWordLength: 1,
            totalTiles: 30, wordList: []
        },
        {
            id: 7, name: "Home Row Words", description: "All home row, words",
            keys: HOME, tileSpeed: 38, spawnInterval: 1.2,
            maxActiveTiles: 10, minWordLength: 2, maxWordLength: 3,
            totalTiles: 28, wordList: wordsForKeys(HOME, 3)
        },

        // ===== TOP ROW =====
        {
            id: 8, name: "Top Row Start", description: "Just R and U",
            keys: ['r', 'u'], tileSpeed: 78, spawnInterval: 0.8,
            maxActiveTiles: 10, minWordLength: 1, maxWordLength: 1,
            totalTiles: 25, wordList: []
        },
        {
            id: 9, name: "Expanding Reach", description: "Just E and I",
            keys: ['e', 'i'], tileSpeed: 78, spawnInterval: 0.8,
            maxActiveTiles: 10, minWordLength: 1, maxWordLength: 1,
            totalTiles: 25, wordList: []
        },
        {
            id: 10, name: "Top Mid Letters", description: "R, U, E, I + home, single keys",
            keys: HOME.concat(['r', 'u', 'e', 'i']), tileSpeed: 78, spawnInterval: 0.8,
            maxActiveTiles: 10, minWordLength: 1, maxWordLength: 1,
            totalTiles: 30, wordList: []
        },
        {
            id: 11, name: "Top Mid Words", description: "R, U, E, I + home, words",
            keys: HOME.concat(['r', 'u', 'e', 'i']), tileSpeed: 38, spawnInterval: 1.2,
            maxActiveTiles: 10, minWordLength: 2, maxWordLength: 3,
            totalTiles: 28, wordList: wordsForKeys(HOME.concat(['r', 'u', 'e', 'i']), 3)
        },
        {
            id: 12, name: "Wider Reach", description: "Just W and O",
            keys: ['w', 'o'], tileSpeed: 80, spawnInterval: 0.75,
            maxActiveTiles: 10, minWordLength: 1, maxWordLength: 1,
            totalTiles: 25, wordList: []
        },
        {
            id: 13, name: "Pinky Reach", description: "Just Q and P",
            keys: ['q', 'p'], tileSpeed: 80, spawnInterval: 0.75,
            maxActiveTiles: 10, minWordLength: 1, maxWordLength: 1,
            totalTiles: 25, wordList: []
        },
        {
            id: 14, name: "Top Complete", description: "Just T and Y",
            keys: ['t', 'y'], tileSpeed: 80, spawnInterval: 0.75,
            maxActiveTiles: 10, minWordLength: 1, maxWordLength: 1,
            totalTiles: 25, wordList: []
        },
        {
            id: 15, name: "Top Row Letters", description: "All top + home, single keys",
            keys: TOP, tileSpeed: 78, spawnInterval: 0.75,
            maxActiveTiles: 10, minWordLength: 1, maxWordLength: 1,
            totalTiles: 30, wordList: []
        },
        {
            id: 16, name: "Top Row Words", description: "All top + home, words",
            keys: TOP, tileSpeed: 38, spawnInterval: 1.2,
            maxActiveTiles: 10, minWordLength: 2, maxWordLength: 5,
            totalTiles: 28, wordList: wordsForKeys(TOP, 5)
        },

        // ===== BOTTOM ROW =====
        {
            id: 17, name: "Bottom Row Begins", description: "Just V and N",
            keys: ['v', 'n'], tileSpeed: 80, spawnInterval: 0.75,
            maxActiveTiles: 10, minWordLength: 1, maxWordLength: 1,
            totalTiles: 25, wordList: []
        },
        {
            id: 18, name: "More Bottom", description: "Just B and M",
            keys: ['b', 'm'], tileSpeed: 80, spawnInterval: 0.75,
            maxActiveTiles: 10, minWordLength: 1, maxWordLength: 1,
            totalTiles: 25, wordList: []
        },
        {
            id: 19, name: "Bottom Mid Letters", description: "V, N, B, M + above, single keys",
            keys: TOP.concat(['v', 'n', 'b', 'm']), tileSpeed: 78, spawnInterval: 0.75,
            maxActiveTiles: 10, minWordLength: 1, maxWordLength: 1,
            totalTiles: 30, wordList: []
        },
        {
            id: 20, name: "Bottom Mid Words", description: "V, N, B, M + above, words",
            keys: TOP.concat(['v', 'n', 'b', 'm']), tileSpeed: 38, spawnInterval: 1.2,
            maxActiveTiles: 10, minWordLength: 2, maxWordLength: 4,
            totalTiles: 28, wordList: wordsForKeys(TOP.concat(['v', 'n', 'b', 'm']), 4)
        },
        {
            id: 21, name: "Comma Country", description: "Just C and ,",
            keys: ['c', ','], tileSpeed: 82, spawnInterval: 0.7,
            maxActiveTiles: 10, minWordLength: 1, maxWordLength: 1,
            totalTiles: 25, wordList: []
        },
        {
            id: 22, name: "Dot and Cross", description: "Just X and .",
            keys: ['x', '.'], tileSpeed: 82, spawnInterval: 0.7,
            maxActiveTiles: 10, minWordLength: 1, maxWordLength: 1,
            totalTiles: 25, wordList: []
        },
        {
            id: 23, name: "Final Keys", description: "Just Z and /",
            keys: ['z', '/'], tileSpeed: 82, spawnInterval: 0.7,
            maxActiveTiles: 10, minWordLength: 1, maxWordLength: 1,
            totalTiles: 25, wordList: []
        },
        {
            id: 24, name: "Bottom Row Letters", description: "All keys, single keys",
            keys: ALL, tileSpeed: 78, spawnInterval: 0.75,
            maxActiveTiles: 10, minWordLength: 1, maxWordLength: 1,
            totalTiles: 30, wordList: []
        },
        {
            id: 25, name: "Bottom Row Words", description: "All keys, words",
            keys: ALL, tileSpeed: 38, spawnInterval: 1.2,
            maxActiveTiles: 10, minWordLength: 2, maxWordLength: 5,
            totalTiles: 28, wordList: wordsForKeys(ALL, 5)
        },

        // ===== FINAL =====
        {
            id: 26, name: "Full Keyboard", description: "All keys review, words",
            keys: ALL, tileSpeed: 42, spawnInterval: 1.0,
            maxActiveTiles: 10, minWordLength: 3, maxWordLength: 5,
            totalTiles: 35, wordList: wordsForKeys(ALL, 5)
        },
        {
            id: 27, name: "Word Pairs", description: "Two words with spaces",
            keys: ALL.concat([' ']), tileSpeed: 65, spawnInterval: 1.2,
            maxActiveTiles: 6, minWordLength: 1, maxWordLength: 1,
            totalTiles: 30, wordList: [
                'go up', 'is it', 'no we', 'do it', 'he is', 'to be',
                'if so', 'at me', 'my ad', 'on it', 'or he', 'an ok',
                'the end', 'run far', 'big one', 'let her', 'get out',
                'not yet', 'for you', 'can she', 'has all', 'his old',
                'red hot', 'new top', 'sit up', 'put on', 'cut it',
                'find it', 'help me', 'call in', 'take on', 'look up',
                'come in', 'give up', 'each one', 'just now', 'back up'
            ]
        },
        {
            id: 28, name: "Speed Demon", description: "Fast full keyboard",
            keys: ALL.concat([' ']), tileSpeed: 95, spawnInterval: 0.55,
            maxActiveTiles: 12, minWordLength: 1, maxWordLength: 1,
            totalTiles: 40, wordList: wordsForKeys(ALL, 5).concat([
                'go up', 'is it', 'do it', 'he is', 'to be',
                'the end', 'run far', 'big one', 'let her', 'get out',
                'not yet', 'for you', 'can she', 'find it', 'help me',
                'come in', 'give up', 'just now', 'back up', 'look up'
            ])
        },
        {
            id: 29, name: "Master Typist", description: "The final challenge",
            keys: ALL.concat([' ']), tileSpeed: 95, spawnInterval: 0.6,
            maxActiveTiles: 10, minWordLength: 1, maxWordLength: 1,
            totalTiles: 50, wordList: wordsForKeys(ALL, 5).concat([
                'go up', 'is it', 'do it', 'he is', 'to be',
                'the end', 'run far', 'big one', 'let her', 'get out',
                'not yet', 'for you', 'can she', 'find it', 'help me',
                'come in', 'give up', 'just now', 'back up', 'look up'
            ])
        },
        {
            id: 30, name: "SUPER TYPIST", description: "Only the fastest survive",
            keys: ALL.concat([' ']), tileSpeed: 135, spawnInterval: 0.5,
            maxActiveTiles: 12, minWordLength: 1, maxWordLength: 1,
            totalTiles: 50, wordList: wordsForKeys(ALL, 6).concat([
                'go up', 'is it', 'do it', 'no we', 'he is', 'to be',
                'the end', 'run far', 'big one', 'let her', 'get out',
                'not yet', 'for you', 'can she', 'find it', 'help me',
                'come in', 'give up', 'just now', 'back up', 'look up',
                'call in', 'take on', 'each one', 'hold on', 'move it'
            ])
        }
    ];

    // ============================================================
    // KEY INTRO DATA
    // ============================================================

    var KEYBOARD_ROWS = [
        ['q','w','e','r','t','y','u','i','o','p'],
        ['a','s','d','f','g','h','j','k','l',';'],
        ['z','x','c','v','b','n','m',',','.','/']
    ];

    var ROW_OFFSETS = [0, 12, 24];

    // Each key maps to [hand (0=L,1=R), fingerIndex (0=pinky..3=index), isHomeRow]
    var FINGER_MAP = {
        'q':[0,0,false],'w':[0,1,false],'e':[0,2,false],'r':[0,3,false],'t':[0,3,false],
        'y':[1,3,false],'u':[1,3,false],'i':[1,2,false],'o':[1,1,false],'p':[1,0,false],
        'a':[0,0,true],'s':[0,1,true],'d':[0,2,true],'f':[0,3,true],'g':[0,3,false],
        'h':[1,3,false],'j':[1,3,true],'k':[1,2,true],'l':[1,1,true],';':[1,0,true],
        'z':[0,0,false],'x':[0,1,false],'c':[0,2,false],'v':[0,3,false],'b':[0,3,false],
        'n':[1,3,false],'m':[1,3,false],',':[1,2,false],'.':[1,1,false],'/':[1,0,false]
    };

    var FINGER_COLORS = ['#e94560', '#2a9d8f', '#3b82f6', '#8b5cf6']; // pinky, ring, middle, index

    var KEY_INTRO_DATA = {
        1:  { newKeys: ['f','j'], fingerName: 'Index Fingers', homeKeys: ['f','j'] },
        2:  { newKeys: ['d','k'], fingerName: 'Middle Fingers', homeKeys: ['d','k'] },
        3:  { newKeys: ['s','l'], fingerName: 'Ring Fingers', homeKeys: ['s','l'] },
        4:  { newKeys: ['a',';'], fingerName: 'Pinky Fingers', homeKeys: ['a',';'] },
        5:  { newKeys: ['g','h'], fingerName: 'Index Fingers (stretch)', homeKeys: ['f','j'] },
        8:  { newKeys: ['r','u'], fingerName: 'Index Fingers (top row)', homeKeys: ['f','j'] },
        9:  { newKeys: ['e','i'], fingerName: 'Middle Fingers (top row)', homeKeys: ['d','k'] },
        12: { newKeys: ['w','o'], fingerName: 'Ring Fingers (top row)', homeKeys: ['s','l'] },
        13: { newKeys: ['q','p'], fingerName: 'Pinky Fingers (top row)', homeKeys: ['a',';'] },
        14: { newKeys: ['t','y'], fingerName: 'Index Fingers (top row)', homeKeys: ['f','j'] },
        17: { newKeys: ['v','n'], fingerName: 'Index Fingers (bottom row)', homeKeys: ['f','j'] },
        18: { newKeys: ['b','m'], fingerName: 'Index Fingers (bottom row)', homeKeys: ['f','j'] },
        21: { newKeys: ['c',','], fingerName: 'Middle Fingers (bottom row)', homeKeys: ['d','k'] },
        22: { newKeys: ['x','.'], fingerName: 'Ring Fingers (bottom row)', homeKeys: ['s','l'] },
        23: { newKeys: ['z','/'], fingerName: 'Pinky Fingers (bottom row)', homeKeys: ['a',';'] },
        27: { newKeys: [' '], fingerName: 'Thumbs (spacebar)', homeKeys: ['f','j'] }
    };

    function startLevel(stateManager, levelId, highestUnlocked) {
        if (KEY_INTRO_DATA[levelId]) {
            stateManager.change('keyIntro', { levelId: levelId, highestUnlocked: highestUnlocked });
        } else {
            stateManager.change('play', { levelId: levelId, highestUnlocked: highestUnlocked });
        }
    }

    // ============================================================
    // INPUT HANDLER
    // ============================================================

    class InputHandler {
        constructor() {
            this.keysPressed = [];
            document.addEventListener('keydown', (e) => {
                if (e.key === ' ') {
                    e.preventDefault();
                }
                if (e.key === '0') {
                    if (musicManager) musicManager.toggleMute();
                    return;
                }
                if (e.key.length === 1) {
                    this.keysPressed.push(e.key.toLowerCase());
                } else if (['Enter', 'Escape', 'ArrowUp', 'ArrowDown'].indexOf(e.key) !== -1) {
                    this.keysPressed.push(e.key);
                }
            });
        }
        getKeys() { return this.keysPressed; }
        flush() { this.keysPressed = []; }
    }

    // ============================================================
    // RENDERER
    // ============================================================

    class Renderer {
        constructor(ctx, width, height) {
            this.ctx = ctx;
            this.width = width;
            this.height = height;
        }

        clear() {
            this.ctx.clearRect(0, 0, this.width, this.height);
            this.ctx.fillStyle = '#1a1a2e';
            this.ctx.fillRect(0, 0, this.width, this.height);
        }

        drawMenuBackground() {
            if (!this.menuBgImage) return;
            var ctx = this.ctx;
            var img = this.menuBgImage;
            // Cover-fit: scale image to fill canvas, crop excess
            var imgRatio = img.width / img.height;
            var canvasRatio = this.width / this.height;
            var sx, sy, sw, sh;
            if (imgRatio > canvasRatio) {
                // Image is wider — crop sides
                sh = img.height;
                sw = img.height * canvasRatio;
                sx = (img.width - sw) / 2;
                sy = 0;
            } else {
                // Image is taller — crop top/bottom
                sw = img.width;
                sh = img.width / canvasRatio;
                sx = 0;
                sy = (img.height - sh) / 2;
            }
            ctx.drawImage(img, sx, sy, sw, sh, 0, 0, this.width, this.height);
            // Dark overlay so UI text is readable
            ctx.fillStyle = 'rgba(26, 26, 46, 0.7)';
            ctx.fillRect(0, 0, this.width, this.height);
        }

        drawGameBackground() {
            if (!this.gameBgImage) return;
            var ctx = this.ctx;
            var img = this.gameBgImage;
            var imgRatio = img.width / img.height;
            var canvasRatio = this.width / this.height;
            var sx, sy, sw, sh;
            if (imgRatio > canvasRatio) {
                sh = img.height;
                sw = img.height * canvasRatio;
                sx = (img.width - sw) / 2;
                sy = 0;
            } else {
                sw = img.width;
                sh = img.width / canvasRatio;
                sx = 0;
                sy = (img.height - sh) / 2;
            }
            ctx.drawImage(img, sx, sy, sw, sh, 0, 0, this.width, this.height);
            // Heavy dark overlay so tiles/text remain readable
            ctx.fillStyle = 'rgba(26, 26, 46, 0.75)';
            ctx.fillRect(0, 0, this.width, this.height);
        }

        drawText(text, x, y, opts) {
            opts = opts || {};
            this.ctx.fillStyle = opts.color || '#ffffff';
            this.ctx.font = (opts.size || 24) + 'px ' + (opts.font || 'monospace');
            this.ctx.textAlign = opts.align || 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText(text, x, y);
        }

        // ---- Fingertip drawing ----
        // Draws a single fingertip with skin pad, nail, and shine
        // x, y: center position
        // radius: size of the finger pad
        // alpha: opacity (0-1)
        // fingerColor: tint color for the border ring
        // isThumb: if true, draws wider/rounder
        // rotation: slight angle for the nail ellipse
        drawFingerTip(x, y, radius, alpha, fingerColor, isThumb, rotation) {
            var ctx = this.ctx;
            ctx.save();
            ctx.globalAlpha = alpha;

            var rot = rotation || 0;
            // Distal phalanx — rounded rectangle, taller than wide
            // radius controls the width; height is proportional
            var w = isThumb ? radius * 1.4 : radius; // half-width
            var h = isThumb ? radius * 1.1 : radius * 1.7; // half-height
            var rBot = w * 0.3; // corner rounding for bottom (joint end)

            ctx.translate(x, y);
            ctx.rotate(rot);

            // Finger segment shape — bulbous rounded top (fingertip), flatter at bottom (joint)
            ctx.beginPath();
            ctx.moveTo(-w + rBot, h); // bottom-left
            ctx.quadraticCurveTo(-w, h, -w, h - rBot); // bottom-left corner (flatter)
            ctx.lineTo(-w, -h * 0.3); // left edge up to where the bulge starts
            // Bulbous top — semicircular arc across the fingertip
            ctx.bezierCurveTo(-w, -h - w * 0.3, w, -h - w * 0.3, w, -h * 0.3);
            ctx.lineTo(w, h - rBot); // right edge down
            ctx.quadraticCurveTo(w, h, w - rBot, h); // bottom-right corner
            ctx.closePath();

            // Skin fill with gradient
            var skinGrad = ctx.createLinearGradient(-w, 0, w, 0);
            skinGrad.addColorStop(0, '#e8bc9a');
            skinGrad.addColorStop(0.3, '#f0ccb0');
            skinGrad.addColorStop(0.7, '#f0ccb0');
            skinGrad.addColorStop(1, '#e8bc9a');
            ctx.fillStyle = skinGrad;
            ctx.fill();

            // Colored border
            ctx.strokeStyle = fingerColor;
            ctx.lineWidth = 2;
            ctx.stroke();

            // Nail — sits on the upper 65% of the finger segment
            var nailW = w * 0.82;
            var nailH = h * 0.58;
            var nailY = -h * 0.15; // shifted up from center
            var nailR = nailW * 0.4; // nail tip rounding

            ctx.beginPath();
            ctx.moveTo(-nailW, nailY + nailH); // nail bottom-left (straight edge = cuticle)
            ctx.lineTo(-nailW, nailY - nailH + nailR); // left edge up
            ctx.quadraticCurveTo(-nailW, nailY - nailH, -nailW + nailR, nailY - nailH); // top-left round
            ctx.lineTo(nailW - nailR, nailY - nailH); // top edge
            ctx.quadraticCurveTo(nailW, nailY - nailH, nailW, nailY - nailH + nailR); // top-right round
            ctx.lineTo(nailW, nailY + nailH); // right edge down
            ctx.closePath(); // straight bottom = cuticle line

            var nailGrad = ctx.createLinearGradient(0, nailY - nailH, 0, nailY + nailH);
            nailGrad.addColorStop(0, '#fdf0e8');
            nailGrad.addColorStop(0.5, '#fce8dc');
            nailGrad.addColorStop(1, '#f4ddd0');
            ctx.fillStyle = nailGrad;
            ctx.fill();
            ctx.strokeStyle = 'rgba(180,150,130,0.4)';
            ctx.lineWidth = 0.7;
            ctx.stroke();

            // Cuticle — subtle arc along the nail's bottom edge
            ctx.beginPath();
            ctx.moveTo(-nailW * 0.7, nailY + nailH);
            ctx.quadraticCurveTo(0, nailY + nailH - nailH * 0.25, nailW * 0.7, nailY + nailH);
            ctx.strokeStyle = 'rgba(190,160,140,0.35)';
            ctx.lineWidth = 0.8;
            ctx.stroke();

            // Nail shine — long highlight near the top
            ctx.beginPath();
            ctx.ellipse(0, nailY - nailH * 0.35, nailW * 0.5, nailH * 0.15, 0, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255,255,255,0.35)';
            ctx.fill();

            // Joint crease at the bottom
            ctx.beginPath();
            ctx.moveTo(-w * 0.7, h - 1);
            ctx.quadraticCurveTo(0, h - 3, w * 0.7, h - 1);
            ctx.strokeStyle = 'rgba(170,130,100,0.3)';
            ctx.lineWidth = 0.8;
            ctx.stroke();

            ctx.restore();
        }

        // ---- Color helpers ----
        _hexToRgb(hex) {
            return [parseInt(hex.slice(1,3),16), parseInt(hex.slice(3,5),16), parseInt(hex.slice(5,7),16)];
        }
        _rgbStr(r,g,b) { return 'rgb('+Math.round(r)+','+Math.round(g)+','+Math.round(b)+')'; }
        _rgbaStr(r,g,b,a) { return 'rgba('+Math.round(r)+','+Math.round(g)+','+Math.round(b)+','+a+')'; }
        _dimHex(colorStr, f) {
            var c;
            if (colorStr.charAt(0) === '#') {
                c = this._hexToRgb(colorStr);
            } else {
                var m = colorStr.match(/\d+/g);
                c = [parseInt(m[0]), parseInt(m[1]), parseInt(m[2])];
            }
            return this._rgbStr(c[0]*f, c[1]*f, c[2]*f);
        }
        _lerpC(hex1, hex2, t) {
            var a = this._hexToRgb(hex1), b = this._hexToRgb(hex2);
            return this._rgbStr(a[0]+(b[0]-a[0])*t, a[1]+(b[1]-a[1])*t, a[2]+(b[2]-a[2])*t);
        }

        // ---- Drawing helpers ----
        _drawSparkle(x, y, size, color, alpha) {
            var ctx = this.ctx;
            ctx.save();
            ctx.globalAlpha = alpha;
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.moveTo(x, y-size); ctx.lineTo(x+size*0.25, y);
            ctx.lineTo(x, y+size); ctx.lineTo(x-size*0.25, y);
            ctx.closePath(); ctx.fill();
            ctx.beginPath();
            ctx.moveTo(x-size, y); ctx.lineTo(x, y+size*0.25);
            ctx.lineTo(x+size, y); ctx.lineTo(x, y-size*0.25);
            ctx.closePath(); ctx.fill();
            ctx.restore();
        }

        _drawNameplate(cx, y, text, typed, isTarget) {
            var ctx = this.ctx;
            var w = Math.max(80, text.length * 28);
            var px = cx - w/2 + 4;
            var pw = w - 8;
            ctx.beginPath();
            ctx.roundRect(px, y, pw, 34, 6);
            ctx.fillStyle = 'rgba(0,0,0,0.8)';
            ctx.fill();
            if (isTarget) {
                ctx.strokeStyle = 'rgba(255,255,255,0.35)';
                ctx.lineWidth = 1.5;
                ctx.stroke();
            }
            var fs = Math.min(26, (pw-8)/text.length*1.6);
            ctx.font = 'bold '+fs+'px monospace';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            if (typed > 0) {
                var tp = text.slice(0, typed);
                var rm = text.slice(typed);
                var full = ctx.measureText(text).width;
                var tw = ctx.measureText(tp).width;
                var sx = cx - full/2;
                ctx.textAlign = 'left';
                ctx.fillStyle = '#4ade80';
                ctx.fillText(tp, sx, y+17);
                ctx.fillStyle = '#ffffff';
                ctx.fillText(rm, sx+tw, y+17);
                ctx.textAlign = 'center';
            } else {
                ctx.fillStyle = isTarget ? '#ffffff' : '#999999';
                ctx.fillText(text, cx, y+17);
            }
        }

        // ---- Wraith body helper ----
        _drawWraithBody(cx, y, color, alpha) {
            var ctx = this.ctx;
            var rgb = this._hexToRgb(color);
            var grad = ctx.createLinearGradient(cx, y, cx, y+48);
            grad.addColorStop(0, this._rgbaStr(rgb[0], rgb[1], rgb[2], alpha));
            grad.addColorStop(1, this._rgbaStr(rgb[0], rgb[1], rgb[2], alpha*0.05));
            ctx.beginPath();
            ctx.moveTo(cx-20, y+45);
            ctx.quadraticCurveTo(cx-24, y+15, cx-14, y+5);
            ctx.quadraticCurveTo(cx, y-5, cx+14, y+5);
            ctx.quadraticCurveTo(cx+24, y+15, cx+20, y+45);
            ctx.quadraticCurveTo(cx+13, y+40, cx+7, y+46);
            ctx.quadraticCurveTo(cx, y+40, cx-7, y+46);
            ctx.quadraticCurveTo(cx-13, y+40, cx-20, y+45);
            ctx.closePath();
            ctx.fillStyle = grad;
            ctx.fill();
        }

        // ---- Flame body helper ----
        _drawFlameBody(cx, y, t, color, alpha) {
            var ctx = this.ctx;
            var offsets = [-12, -7, -2, 3, 8, 13];
            for (var i = 0; i < offsets.length; i++) {
                var ox = offsets[i];
                var tipX = cx + ox + Math.sin(t * 6 + i * 1.2) * 4;
                var tipY = y + 6 + Math.sin(t * 8 + i * 0.7) * 4;
                var baseL = cx + ox - 5;
                var baseR = cx + ox + 5;
                var bY = y + 44;
                var grad = ctx.createLinearGradient(cx, bY, cx, tipY);
                grad.addColorStop(0, 'rgba(255,244,79,' + alpha + ')');
                grad.addColorStop(0.4, color);
                grad.addColorStop(1, this._dimHex(color, 0.6));
                ctx.globalAlpha = alpha * 0.7;
                ctx.beginPath();
                ctx.moveTo(baseL, bY);
                ctx.bezierCurveTo(baseL - 2, y + 25, tipX - 3, tipY + 8, tipX, tipY);
                ctx.bezierCurveTo(tipX + 3, tipY + 8, baseR + 2, y + 25, baseR, bY);
                ctx.closePath();
                ctx.fillStyle = grad;
                ctx.fill();
            }
            ctx.globalAlpha = 1;
        }

        // ---- Crystal body helper ----
        _drawCrystalBody(cx, y, t, hexColor, isTarget) {
            var ctx = this.ctx;
            var holoHexes = ['#22d3ee', '#a78bfa', '#f472b6', '#22d3ee'];
            var hPhase = ((t * 0.4) % 1);
            var hIdx = Math.floor(hPhase * 3);
            var hFrac = (hPhase * 3) - hIdx;
            var holoStr = this._lerpC(holoHexes[hIdx], holoHexes[Math.min(hIdx+1,3)], hFrac);
            var ga = isTarget ? t * 0.7 : 0;

            // Diamond head
            var headGrad = ctx.createLinearGradient(
                cx + Math.cos(ga)*14, y+2, cx + Math.cos(ga+Math.PI)*14, y+24);
            if (isTarget) {
                headGrad.addColorStop(0, hexColor);
                headGrad.addColorStop(0.5, '#e0f4ff');
                headGrad.addColorStop(1, holoStr);
            } else {
                headGrad.addColorStop(0, this._dimHex(hexColor, 0.5));
                headGrad.addColorStop(1, this._dimHex(hexColor, 0.3));
            }
            ctx.beginPath();
            ctx.moveTo(cx, y+2); ctx.lineTo(cx+14, y+13);
            ctx.lineTo(cx, y+24); ctx.lineTo(cx-14, y+13);
            ctx.closePath();
            ctx.fillStyle = headGrad; ctx.fill();
            ctx.strokeStyle = isTarget ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.15)';
            ctx.lineWidth = 1; ctx.stroke();

            // Eyes
            if (isTarget) { ctx.shadowColor = hexColor; ctx.shadowBlur = 10; }
            ctx.fillStyle = '#ffffff';
            for (var ei = 0; ei < 2; ei++) {
                var ox = ei === 0 ? -7 : 7;
                ctx.beginPath();
                ctx.moveTo(cx+ox, y+10); ctx.lineTo(cx+ox+4, y+13);
                ctx.lineTo(cx+ox, y+16); ctx.lineTo(cx+ox-4, y+13);
                ctx.closePath(); ctx.fill();
            }
            ctx.shadowBlur = 0;
            ctx.fillStyle = hexColor;
            ctx.beginPath(); ctx.arc(cx-7, y+13, 1.5, 0, Math.PI*2); ctx.fill();
            ctx.beginPath(); ctx.arc(cx+7, y+13, 1.5, 0, Math.PI*2); ctx.fill();

            // Hexagonal body
            var bodyGrad = ctx.createLinearGradient(
                cx + Math.cos(ga)*16, y+22, cx + Math.cos(ga+Math.PI)*16, y+46);
            if (isTarget) {
                bodyGrad.addColorStop(0, holoStr);
                bodyGrad.addColorStop(0.5, this._lerpC(hexColor, '#ffffff', 0.35));
                bodyGrad.addColorStop(1, hexColor);
            } else {
                bodyGrad.addColorStop(0, this._dimHex(hexColor, 0.4));
                bodyGrad.addColorStop(1, this._dimHex(hexColor, 0.25));
            }
            var hexPts = [];
            for (var hi = 0; hi < 6; hi++) {
                var ha = (hi * 60 - 90) * Math.PI / 180;
                hexPts.push([cx + 16 * Math.cos(ha), y + 34 + 18 * Math.sin(ha)]);
            }
            ctx.beginPath();
            ctx.moveTo(hexPts[0][0], hexPts[0][1]);
            for (var hi2 = 1; hi2 < 6; hi2++) ctx.lineTo(hexPts[hi2][0], hexPts[hi2][1]);
            ctx.closePath();
            ctx.fillStyle = bodyGrad; ctx.fill();
            ctx.strokeStyle = isTarget ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.1)';
            ctx.lineWidth = 1; ctx.stroke();

            // Facet lines
            var facetAlpha = isTarget ? 0.2 + 0.15 * Math.sin(t * 6) : 0.08;
            ctx.strokeStyle = 'rgba(255,255,255,' + facetAlpha + ')';
            ctx.lineWidth = 0.5;
            for (var fi = 0; fi < 3; fi++) {
                ctx.beginPath(); ctx.moveTo(cx, y+34);
                ctx.lineTo(hexPts[fi*2][0], hexPts[fi*2][1]); ctx.stroke();
            }

            // Shine (target only)
            if (isTarget) {
                ctx.beginPath();
                ctx.moveTo(hexPts[0][0], hexPts[0][1]);
                for (var si = 1; si < 6; si++) ctx.lineTo(hexPts[si][0], hexPts[si][1]);
                ctx.closePath();
                var shineGrad = ctx.createRadialGradient(cx + Math.sin(t)*6, y+28, 2, cx, y+28, 16);
                shineGrad.addColorStop(0, 'rgba(255,255,255,0.25)');
                shineGrad.addColorStop(1, 'rgba(255,255,255,0)');
                ctx.fillStyle = shineGrad; ctx.fill();
            }
        }

        // ============== STYLE A: CHIBI ONI ==============
        _drawChibiOni(cx, baseY, t, state, dp) {
            var ctx = this.ctx;
            var color = '#ff2d78';
            var rgb = this._hexToRgb(color);
            var bob = (state === 'destroy') ? 0 : Math.sin(t * 3) * 3;
            var y = baseY + bob;

            if (state === 'destroy') {
                if (dp < 0.3) {
                    var s = 1 + dp * 0.7;
                    ctx.save();
                    ctx.translate(cx, y+24); ctx.scale(s, s); ctx.translate(-cx, -(y+24));
                    var fc = this._lerpC(color, '#ffffff', dp / 0.3);
                    ctx.beginPath(); ctx.arc(cx, y+24, 20, 0, Math.PI*2);
                    ctx.fillStyle = fc; ctx.fill();
                    ctx.strokeStyle = '#1a1a2e'; ctx.lineWidth = 2;
                    for (var xi = 0; xi < 2; xi++) {
                        var ox = xi === 0 ? -8 : 8;
                        ctx.beginPath(); ctx.moveTo(cx+ox-4, y+19); ctx.lineTo(cx+ox+4, y+27); ctx.stroke();
                        ctx.beginPath(); ctx.moveTo(cx+ox+4, y+19); ctx.lineTo(cx+ox-4, y+27); ctx.stroke();
                    }
                    ctx.restore();
                } else if (dp < 1) {
                    var pp = (dp - 0.3) / 0.7;
                    var angles = [0, 0.8, 1.6, 2.4, 3.2, 4.0, 4.8, 5.6];
                    for (var i = 0; i < angles.length; i++) {
                        var dist = pp * 40;
                        var px = cx + Math.cos(angles[i]) * dist;
                        var py = y + 24 + Math.sin(angles[i]) * dist;
                        ctx.globalAlpha = 1 - pp;
                        ctx.beginPath(); ctx.arc(px, py, 6 * (1 - pp), 0, Math.PI*2);
                        ctx.fillStyle = color; ctx.fill();
                    }
                    ctx.beginPath(); ctx.arc(cx, y+24, pp * 35, 0, Math.PI*2);
                    ctx.strokeStyle = this._rgbaStr(rgb[0], rgb[1], rgb[2], 1-pp);
                    ctx.lineWidth = 2; ctx.stroke();
                    ctx.globalAlpha = 1;
                }
                return;
            }

            var isTarget = state === 'target';
            if (!isTarget) ctx.globalAlpha = 0.45;
            if (isTarget) { ctx.shadowColor = color; ctx.shadowBlur = 15; }

            // Body
            var grad = ctx.createRadialGradient(cx, y+20, 2, cx, y+24, 22);
            grad.addColorStop(0, isTarget ? this._lerpC(color, '#ffffff', 0.3) : this._dimHex(color, 0.5));
            grad.addColorStop(1, isTarget ? color : this._dimHex(color, 0.35));
            ctx.beginPath(); ctx.arc(cx, y+24, 20, 0, Math.PI*2);
            ctx.fillStyle = grad; ctx.fill();
            ctx.strokeStyle = 'rgba(255,255,255,0.3)'; ctx.lineWidth = 1.5; ctx.stroke();
            ctx.shadowBlur = 0;

            // Horns
            var hornColor = isTarget ? this._lerpC(color, '#ffffff', 0.4) : this._dimHex(color, 0.5);
            ctx.fillStyle = hornColor;
            ctx.beginPath(); ctx.moveTo(cx-13, y+8); ctx.quadraticCurveTo(cx-22, y-6, cx-10, y+2); ctx.closePath(); ctx.fill();
            ctx.beginPath(); ctx.moveTo(cx+13, y+8); ctx.quadraticCurveTo(cx+22, y-6, cx+10, y+2); ctx.closePath(); ctx.fill();

            if (isTarget) {
                var ss = 3 + 2 * Math.sin(t * 4);
                this._drawSparkle(cx-17, y-2, ss, '#ffffff', 0.7 + 0.3*Math.sin(t*5));
                this._drawSparkle(cx+17, y-2, ss, '#ffffff', 0.7 + 0.3*Math.sin(t*5+1));
            }

            // Eyes
            var blink = Math.sin(t * 2.1) > 0.97;
            if (blink) {
                ctx.strokeStyle = '#1a1a2e'; ctx.lineWidth = 2;
                ctx.beginPath(); ctx.moveTo(cx-12, y+22); ctx.lineTo(cx-4, y+22); ctx.stroke();
                ctx.beginPath(); ctx.moveTo(cx+4, y+22); ctx.lineTo(cx+12, y+22); ctx.stroke();
            } else {
                ctx.fillStyle = '#ffffff';
                ctx.beginPath(); ctx.arc(cx-8, y+22, 6, 0, Math.PI*2); ctx.fill();
                ctx.beginPath(); ctx.arc(cx+8, y+22, 6, 0, Math.PI*2); ctx.fill();
                ctx.fillStyle = '#1a1a2e';
                ctx.beginPath(); ctx.arc(cx-8, y+23, 3, 0, Math.PI*2); ctx.fill();
                ctx.beginPath(); ctx.arc(cx+8, y+23, 3, 0, Math.PI*2); ctx.fill();
                ctx.fillStyle = '#ffffff';
                ctx.beginPath(); ctx.arc(cx-6, y+21, 1.5, 0, Math.PI*2); ctx.fill();
                ctx.beginPath(); ctx.arc(cx+6, y+21, 1.5, 0, Math.PI*2); ctx.fill();
                if (!isTarget) {
                    ctx.fillStyle = this._dimHex(color, 0.35);
                    ctx.fillRect(cx-14, y+16, 12, 4);
                    ctx.fillRect(cx+2, y+16, 12, 4);
                }
            }

            // Fangs
            ctx.fillStyle = '#ffffff';
            ctx.beginPath(); ctx.moveTo(cx-5, y+36); ctx.lineTo(cx-3, y+42); ctx.lineTo(cx-1, y+36); ctx.closePath(); ctx.fill();
            ctx.beginPath(); ctx.moveTo(cx+1, y+36); ctx.lineTo(cx+3, y+42); ctx.lineTo(cx+5, y+36); ctx.closePath(); ctx.fill();

            // Blush
            ctx.fillStyle = 'rgba(255,150,180,0.5)';
            ctx.beginPath(); ctx.ellipse(cx-14, y+28, 4, 2.5, 0, 0, Math.PI*2); ctx.fill();
            ctx.beginPath(); ctx.ellipse(cx+14, y+28, 4, 2.5, 0, 0, Math.PI*2); ctx.fill();

            // Arms
            var armAngle = Math.sin(t * 4) * 0.3;
            ctx.save();
            ctx.strokeStyle = isTarget ? this._dimHex(color, 0.8) : this._dimHex(color, 0.4);
            ctx.lineWidth = 2.5; ctx.lineCap = 'round';
            ctx.save(); ctx.translate(cx-20, y+30); ctx.rotate(armAngle);
            ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(-8, 8); ctx.stroke(); ctx.restore();
            ctx.save(); ctx.translate(cx+20, y+30); ctx.rotate(-armAngle);
            ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(8, 8); ctx.stroke(); ctx.restore();
            ctx.restore();

            ctx.globalAlpha = 1;
        }

        // ============== STYLE B: SHADOW WRAITH ==============
        _drawShadowWraith(cx, baseY, t, state, dp) {
            var ctx = this.ctx;
            var color = '#8b5cf6';
            var rgb = this._hexToRgb(color);
            var bob = (state === 'destroy') ? 0 : Math.sin(t * 2) * 4;
            var y = baseY + bob;

            if (state === 'destroy') {
                if (dp < 0.2) {
                    var s = 1 - dp * 0.5;
                    ctx.save();
                    ctx.translate(cx, y+22); ctx.scale(s, s); ctx.translate(-cx, -(y+22));
                    this._drawWraithBody(cx, y, color, 0.8);
                    ctx.shadowColor = '#ffffff'; ctx.shadowBlur = 20;
                    ctx.fillStyle = '#ffffff';
                    ctx.beginPath(); ctx.ellipse(cx-8, y+18, 6, 4, 0, 0, Math.PI*2); ctx.fill();
                    ctx.beginPath(); ctx.ellipse(cx+8, y+18, 6, 4, 0, 0, Math.PI*2); ctx.fill();
                    ctx.shadowBlur = 0;
                    ctx.restore();
                } else if (dp < 0.7) {
                    var pp = (dp - 0.2) / 0.5;
                    var sliceH = 3;
                    for (var sy = 0; sy < 50; sy += sliceH) {
                        var sliceRand = Math.sin(sy * 13.7 + t * 5) * 0.5 + 0.5;
                        if (sliceRand < pp) continue;
                        ctx.save();
                        ctx.beginPath(); ctx.rect(cx-30, y + sy, 60, sliceH); ctx.clip();
                        ctx.globalAlpha = (1 - pp) * 0.8;
                        this._drawWraithBody(cx, y, color, 0.6);
                        ctx.restore();
                    }
                    var ea = 1 - pp;
                    ctx.shadowColor = color; ctx.shadowBlur = 12 * ea;
                    ctx.fillStyle = this._rgbaStr(255,255,255, ea);
                    var esz = 5 * (1 - pp*0.5);
                    ctx.beginPath(); ctx.ellipse(cx-8, y+18, esz, esz*0.6, 0, 0, Math.PI*2); ctx.fill();
                    ctx.beginPath(); ctx.ellipse(cx+8, y+18, esz, esz*0.6, 0, 0, Math.PI*2); ctx.fill();
                    ctx.shadowBlur = 0;
                } else {
                    var pp2 = (dp - 0.7) / 0.3;
                    ctx.beginPath(); ctx.arc(cx, y+22, pp2 * 30, 0, Math.PI*2);
                    ctx.fillStyle = this._rgbaStr(rgb[0], rgb[1], rgb[2], 1-pp2);
                    ctx.fill();
                }
                return;
            }

            var isTarget = state === 'target';
            if (!isTarget) ctx.globalAlpha = 0.35;

            // Dark aura
            for (var ai = 0; ai < 3; ai++) {
                ctx.beginPath(); ctx.arc(cx, y+22, 28 - ai*4, 0, Math.PI*2);
                ctx.fillStyle = 'rgba(0,0,0,' + (0.1 + ai*0.05) + ')'; ctx.fill();
            }

            // Flickering copies
            if (isTarget) {
                for (var fi = 0; fi < 2; fi++) {
                    var ox = Math.sin(t * (fi===0?7.3:5.1)) * 3;
                    ctx.globalAlpha = 0.12;
                    this._drawWraithBody(cx+ox, y, color, 0.4);
                }
                ctx.globalAlpha = 1;
            }

            this._drawWraithBody(cx, y, color, isTarget ? 0.85 : 0.5);

            // Eyes
            var eyeR = 3 + Math.sin(t * 4) * (isTarget ? 1 : 0.3);
            if (isTarget) { ctx.shadowColor = color; ctx.shadowBlur = 12; }
            var eyeGrad = ctx.createRadialGradient(cx-8, y+18, 0, cx-8, y+18, eyeR+2);
            eyeGrad.addColorStop(0, '#ffffff'); eyeGrad.addColorStop(1, color);
            ctx.fillStyle = eyeGrad;
            ctx.beginPath(); ctx.ellipse(cx-8, y+18, eyeR+1, eyeR*0.7, 0, 0, Math.PI*2); ctx.fill();
            var eyeGrad2 = ctx.createRadialGradient(cx+8, y+18, 0, cx+8, y+18, eyeR+2);
            eyeGrad2.addColorStop(0, '#ffffff'); eyeGrad2.addColorStop(1, color);
            ctx.fillStyle = eyeGrad2;
            ctx.beginPath(); ctx.ellipse(cx+8, y+18, eyeR+1, eyeR*0.7, 0, 0, Math.PI*2); ctx.fill();
            ctx.shadowBlur = 0;

            // Wisps
            if (isTarget) {
                ctx.strokeStyle = this._rgbaStr(rgb[0], rgb[1], rgb[2], 0.35);
                ctx.lineWidth = 1;
                for (var wi = 0; wi < 4; wi++) {
                    var wx = cx + [-22,22,-18,18][wi] + Math.sin(t*2 + wi*1.5)*6;
                    var wy = y + [15,15,30,30][wi] + Math.cos(t*1.5 + wi*2)*5;
                    ctx.beginPath();
                    ctx.moveTo(cx + [-18,18,-14,14][wi], y + [18,18,28,28][wi]);
                    ctx.quadraticCurveTo(wx + Math.sin(t*3+wi)*4, wy - 5, wx, wy);
                    ctx.stroke();
                }
            }

            // Orbiting particles
            if (isTarget) {
                for (var oi = 0; oi < 4; oi++) {
                    var oa = t * 1.5 + oi * Math.PI/2;
                    ctx.beginPath();
                    ctx.arc(cx + Math.cos(oa)*28, y + 22 + Math.sin(oa)*28, 2, 0, Math.PI*2);
                    ctx.fillStyle = this._rgbaStr(rgb[0], rgb[1], rgb[2], 0.5); ctx.fill();
                }
            }

            ctx.globalAlpha = 1;
        }

        // ============== STYLE C: FLAME IMP ==============
        _drawFlameImp(cx, baseY, t, state, dp) {
            var ctx = this.ctx;
            var color = '#f97316';
            var rgb = this._hexToRgb(color);
            var sway = (state === 'destroy') ? 0 : Math.sin(t * 1.5) * 2;
            var y = baseY;
            var x = cx + sway;

            if (state === 'destroy') {
                if (dp < 0.2) {
                    var s = 1 + dp * 1.5;
                    ctx.save();
                    ctx.translate(cx, y+25); ctx.scale(s, s); ctx.translate(-cx, -(y+25));
                    this._drawFlameBody(cx, y, t, this._lerpC(color, '#ffffff', dp / 0.2), 1);
                    ctx.restore();
                } else {
                    var pp = (dp - 0.2) / 0.8;
                    for (var i = 0; i < 14; i++) {
                        var a = (i / 14) * Math.PI * 2 + i * 0.5;
                        var spd = 30 + (i % 3) * 15;
                        var px = cx + Math.cos(a) * spd * pp;
                        var py = y + 25 + Math.sin(a) * spd * pp;
                        ctx.globalAlpha = 1 - pp;
                        ctx.beginPath(); ctx.arc(px, py, (3 + (i%3)) * (1 - pp), 0, Math.PI*2);
                        ctx.fillStyle = i % 2 === 0 ? '#fff44f' : color; ctx.fill();
                    }
                    for (var si = 0; si < 3; si++) {
                        var sa = si * 2.1 + 0.5;
                        ctx.beginPath();
                        ctx.arc(cx + Math.cos(sa)*pp*20, y+25 + Math.sin(sa)*pp*20, 8*(1-pp*0.5), 0, Math.PI*2);
                        ctx.fillStyle = 'rgba(80,80,80,'+(0.3*(1-pp))+')'; ctx.fill();
                    }
                    if (pp < 0.3) {
                        ctx.beginPath(); ctx.arc(cx, y+25, 15*(1-pp/0.3), 0, Math.PI*2);
                        ctx.fillStyle = 'rgba(255,255,255,'+(1-pp/0.3)+')'; ctx.fill();
                    }
                    ctx.globalAlpha = 1;
                }
                return;
            }

            var isTarget = state === 'target';
            if (!isTarget) ctx.globalAlpha = 0.4;
            if (isTarget) { ctx.shadowColor = '#ff6600'; ctx.shadowBlur = 10; }

            // Wings
            var wingFlap = Math.sin(t * 5) * (isTarget ? 0.15 : -0.3);
            ctx.fillStyle = this._rgbaStr(rgb[0], rgb[1], rgb[2], isTarget ? 0.6 : 0.3);
            ctx.save(); ctx.translate(x-16, y+22); ctx.rotate(wingFlap);
            ctx.beginPath(); ctx.moveTo(0, 0);
            ctx.quadraticCurveTo(-12, -12, -20, -8); ctx.lineTo(-15, -2);
            ctx.quadraticCurveTo(-10, -6, -5, 5); ctx.closePath(); ctx.fill(); ctx.restore();
            ctx.save(); ctx.translate(x+16, y+22); ctx.rotate(-wingFlap);
            ctx.beginPath(); ctx.moveTo(0, 0);
            ctx.quadraticCurveTo(12, -12, 20, -8); ctx.lineTo(15, -2);
            ctx.quadraticCurveTo(10, -6, 5, 5); ctx.closePath(); ctx.fill(); ctx.restore();

            // Flame body
            this._drawFlameBody(x, y, t, isTarget ? color : this._dimHex(color, 0.5), isTarget ? 1 : 0.6);

            // Face
            if (isTarget) {
                ctx.fillStyle = '#1a1a2e';
                ctx.beginPath(); ctx.moveTo(x-10, y+17); ctx.lineTo(x-14, y+23); ctx.lineTo(x-6, y+23); ctx.closePath(); ctx.fill();
                ctx.beginPath(); ctx.moveTo(x+10, y+17); ctx.lineTo(x+14, y+23); ctx.lineTo(x+6, y+23); ctx.closePath(); ctx.fill();
                ctx.strokeStyle = '#1a1a2e'; ctx.lineWidth = 1.5;
                ctx.beginPath(); ctx.arc(x, y+29, 7, 0.1, Math.PI-0.1); ctx.stroke();
            }

            // Tail
            ctx.strokeStyle = isTarget ? this._dimHex(color, 0.8) : this._dimHex(color, 0.3);
            ctx.lineWidth = 2;
            ctx.beginPath(); ctx.moveTo(x+5, y+44);
            ctx.quadraticCurveTo(x+20, y+50, x+16, y+40); ctx.stroke();
            ctx.fillStyle = ctx.strokeStyle;
            ctx.beginPath(); ctx.moveTo(x+16, y+38); ctx.lineTo(x+19, y+42); ctx.lineTo(x+14, y+42); ctx.closePath(); ctx.fill();

            // Embers
            if (isTarget) {
                for (var ei = 0; ei < 6; ei++) {
                    var ep = (t * 0.5 + ei * 0.17) % 1.0;
                    var ex = x + [-10,-4,2,8,-7,5][ei] + Math.sin(t*2+ei)*2;
                    var ey = y + 10 - 25 * ep;
                    ctx.globalAlpha = (1 - ep) * 0.8;
                    ctx.beginPath(); ctx.arc(ex, ey, 1.5, 0, Math.PI*2);
                    ctx.fillStyle = ep < 0.5 ? '#fff44f' : color; ctx.fill();
                }
            }

            ctx.globalAlpha = 1;
            ctx.shadowBlur = 0;
        }

        // ============== STYLE D: CRYSTAL DEMON ==============
        _drawCrystalDemon(cx, baseY, t, state, dp) {
            var ctx = this.ctx;
            var color = '#22d3ee';
            var rgb = this._hexToRgb(color);
            var bob = (state === 'destroy') ? 0 : Math.sin(t * 2.5) * 2.5;
            var y = baseY + bob;

            if (state === 'destroy') {
                if (dp < 0.15) {
                    var wt = dp / 0.15;
                    ctx.save();
                    ctx.translate(cx, y+22); ctx.scale(1 + wt*0.3, 1 + wt*0.3); ctx.translate(-cx, -(y+22));
                    this._drawCrystalBody(cx, y, t, color, true);
                    ctx.globalAlpha = wt;
                    ctx.fillStyle = '#ffffff';
                    ctx.fillRect(cx-22, y-2, 44, 52);
                    ctx.globalAlpha = 1;
                    var sparkPos = [[-22,-6],[24,0],[-16,30],[20,28],[0,-12],[-27,16],[27,14],[0,38]];
                    for (var si = 0; si < sparkPos.length; si++) {
                        this._drawSparkle(cx+sparkPos[si][0], y+22+sparkPos[si][1], 6, '#ffffff', 1);
                    }
                    ctx.restore();
                } else if (dp < 0.7) {
                    var pp = (dp - 0.15) / 0.55;
                    var shardColors = [color, '#a78bfa', '#f472b6', '#ffffff', color, '#a78bfa', '#f472b6', '#22d3ee'];
                    var shards = [
                        {dx:-1.2,dy:-1.5,r:0.8}, {dx:1.3,dy:-1.2,r:-0.6},
                        {dx:-0.8,dy:0.5,r:1.1}, {dx:1.0,dy:0.8,r:-0.9},
                        {dx:-1.5,dy:0.2,r:0.5}, {dx:0.3,dy:-1.8,r:-1.2},
                        {dx:0.8,dy:1.5,r:0.7}, {dx:-0.5,dy:1.2,r:-0.4}
                    ];
                    for (var si2 = 0; si2 < shards.length; si2++) {
                        var sh = shards[si2];
                        var sx = cx + sh.dx * pp * 55;
                        var sy = y + 22 + sh.dy * pp * 55;
                        ctx.save();
                        ctx.translate(sx, sy); ctx.rotate(sh.r * pp * 4);
                        ctx.globalAlpha = 1 - pp;
                        ctx.fillStyle = shardColors[si2];
                        var ssz = 9 * (1 - pp*0.6);
                        ctx.beginPath(); ctx.moveTo(0, -ssz); ctx.lineTo(ssz*0.7, ssz*0.5);
                        ctx.lineTo(-ssz*0.7, ssz*0.5); ctx.closePath(); ctx.fill();
                        ctx.strokeStyle = 'rgba(255,255,255,0.5)'; ctx.lineWidth = 0.5; ctx.stroke();
                        ctx.restore();
                    }
                    var burstColors = ['#22d3ee','#ffffff','#f472b6','#a78bfa','#ffd700',
                                       '#22d3ee','#ffffff','#f472b6','#a78bfa','#ffd700',
                                       '#22d3ee','#ffffff','#f472b6','#a78bfa','#ffd700','#ffffff'];
                    for (var pi = 0; pi < 16; pi++) {
                        var pa = (pi/16)*Math.PI*2 + pp*0.5;
                        this._drawSparkle(cx + Math.cos(pa)*pp*50, y + 22 + Math.sin(pa)*pp*50,
                            4*(1-pp), burstColors[pi], 1-pp);
                    }
                    ctx.globalAlpha = 1;
                } else {
                    var pp3 = (dp - 0.7) / 0.3;
                    this._drawSparkle(cx, y+22, 18*(1-pp3), '#ffffff', 1-pp3);
                    this._drawSparkle(cx, y+22, 12*(1-pp3), color, (1-pp3)*0.6);
                }
                return;
            }

            var isTarget = state === 'target';
            if (!isTarget) ctx.globalAlpha = 0.4;

            // Crystal wings (target only)
            if (isTarget) {
                var wingA = Math.sin(t * 2) * 0.1;
                ctx.save();
                ctx.fillStyle = this._rgbaStr(rgb[0], rgb[1], rgb[2], 0.35);
                ctx.strokeStyle = 'rgba(255,255,255,0.3)'; ctx.lineWidth = 0.5;
                ctx.save(); ctx.translate(cx-16, y+24); ctx.rotate(wingA);
                ctx.beginPath(); ctx.moveTo(0,-2); ctx.lineTo(-16,-10); ctx.lineTo(-2,4); ctx.closePath(); ctx.fill(); ctx.stroke();
                ctx.beginPath(); ctx.moveTo(0,4); ctx.lineTo(-14,0); ctx.lineTo(-2,10); ctx.closePath(); ctx.fill(); ctx.stroke();
                ctx.restore();
                ctx.save(); ctx.translate(cx+16, y+24); ctx.rotate(-wingA);
                ctx.beginPath(); ctx.moveTo(0,-2); ctx.lineTo(16,-10); ctx.lineTo(2,4); ctx.closePath(); ctx.fill(); ctx.stroke();
                ctx.beginPath(); ctx.moveTo(0,4); ctx.lineTo(14,0); ctx.lineTo(2,10); ctx.closePath(); ctx.fill(); ctx.stroke();
                ctx.restore();
                ctx.restore();
            }

            this._drawCrystalBody(cx, y, t, color, isTarget);

            // Crown spikes
            ctx.fillStyle = isTarget ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.2)';
            ctx.strokeStyle = isTarget ? color : 'rgba(255,255,255,0.1)'; ctx.lineWidth = 0.5;
            ctx.beginPath(); ctx.moveTo(cx-3, y+4); ctx.lineTo(cx, y-10); ctx.lineTo(cx+3, y+4); ctx.closePath(); ctx.fill(); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(cx-10, y+7); ctx.lineTo(cx-13, y-3); ctx.lineTo(cx-7, y+7); ctx.closePath(); ctx.fill(); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(cx+7, y+7); ctx.lineTo(cx+13, y-3); ctx.lineTo(cx+10, y+7); ctx.closePath(); ctx.fill(); ctx.stroke();
            if (isTarget) {
                this._drawSparkle(cx, y-10, 2 + 2*Math.sin(t*5), '#ffffff', 0.8);
            }

            // Sparkle field
            var sparkPos2 = [[-22,-6],[24,0],[-16,30],[20,28],[0,-14],[-27,16],[27,14],[0,40]];
            var numSparkles = isTarget ? 8 : 2;
            for (var si3 = 0; si3 < numSparkles; si3++) {
                var sSize = 2 + 3 * Math.abs(Math.sin(t * 3 + si3 * 0.8));
                var sAlpha = 0.3 + 0.7 * Math.abs(Math.sin(t * 3 + si3 * 0.8));
                this._drawSparkle(cx + sparkPos2[si3][0], y + 22 + sparkPos2[si3][1],
                    sSize, '#ffffff', sAlpha * (isTarget?1:0.4));
            }

            // Aura ring (target)
            if (isTarget) {
                ctx.setLineDash([4, 4]); ctx.lineDashOffset = t * 20;
                ctx.beginPath(); ctx.arc(cx, y+22, 34, 0, Math.PI*2);
                ctx.strokeStyle = this._rgbaStr(rgb[0], rgb[1], rgb[2], 0.25);
                ctx.lineWidth = 1; ctx.stroke();
                ctx.setLineDash([]);
            }

            ctx.globalAlpha = 1;
            ctx.shadowBlur = 0;
        }

        // ============== MAIN TILE DRAWING ==============
        drawTile(tile, isTarget) {
            var ctx = this.ctx;
            ctx.save();
            var cx = tile.x + tile.width / 2;
            var baseY = tile.y;
            var t = tile.animTimer;
            var state = isTarget ? 'target' : 'nontarget';

            // Draw demon at 50% scale
            ctx.save();
            ctx.translate(cx, baseY + 22);
            ctx.scale(0.5, 0.5);
            ctx.translate(-cx, -(baseY + 22));
            switch (tile.demonStyle) {
                case 0: this._drawChibiOni(cx, baseY, t, state, -1); break;
                case 1: this._drawShadowWraith(cx, baseY, t, state, -1); break;
                case 2: this._drawFlameImp(cx, baseY, t, state, -1); break;
                case 3: this._drawCrystalDemon(cx, baseY, t, state, -1); break;
            }
            ctx.restore();

            // Draw nameplate below demon
            this._drawNameplate(cx, baseY + 36, tile.displayText, tile.typed.length, isTarget);
            ctx.restore();
        }

        drawTileDestroy(tile) {
            var ctx = this.ctx;
            ctx.save();
            var cx = tile.x + tile.width / 2;
            var baseY = tile.y;
            var t = tile.animTimer;
            var dp = Math.min(1, 1 - (tile.destroyTimer / 0.5));

            // Draw destroy at 50% scale
            ctx.save();
            ctx.translate(cx, baseY + 22);
            ctx.scale(0.5, 0.5);
            ctx.translate(-cx, -(baseY + 22));
            switch (tile.demonStyle) {
                case 0: this._drawChibiOni(cx, baseY, t, 'destroy', dp); break;
                case 1: this._drawShadowWraith(cx, baseY, t, 'destroy', dp); break;
                case 2: this._drawFlameImp(cx, baseY, t, 'destroy', dp); break;
                case 3: this._drawCrystalDemon(cx, baseY, t, 'destroy', dp); break;
            }
            ctx.restore();
            ctx.restore();
        }

        drawAcidVat(missCount, maxMisses, animTimer, bubbles) {
            var ctx = this.ctx;
            var panelX = this.width - 80;
            var vatX = this.width - 44;
            var vatW = 32;
            var vatTop = 50;
            var vatBottom = this.height - 30;
            var vatH = vatBottom - vatTop;
            var fill = Math.min(1, missCount / maxMisses);
            var fillH = vatH * fill;
            var fillTop = vatBottom - fillH;

            // --- Vertical divider line ---
            ctx.save();
            var divX = panelX - 6;
            var divGrad = ctx.createLinearGradient(0, 0, 0, this.height);
            divGrad.addColorStop(0, 'rgba(100,255,100,0)');
            divGrad.addColorStop(0.15, 'rgba(100,255,100,0.2)');
            divGrad.addColorStop(0.5, 'rgba(100,255,100,0.35)');
            divGrad.addColorStop(0.85, 'rgba(100,255,100,0.2)');
            divGrad.addColorStop(1, 'rgba(100,255,100,0)');
            ctx.strokeStyle = divGrad;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(divX, 0);
            ctx.lineTo(divX, this.height);
            ctx.stroke();

            // Subtle dark bg behind the panel
            ctx.fillStyle = 'rgba(0,0,0,0.15)';
            ctx.fillRect(divX + 1, 0, this.width - divX, this.height);

            // Vat outline (glass container)
            ctx.beginPath();
            ctx.roundRect(vatX, vatTop, vatW, vatH, 4);
            ctx.fillStyle = 'rgba(0,0,0,0.4)';
            ctx.fill();
            ctx.strokeStyle = 'rgba(100,255,100,0.3)';
            ctx.lineWidth = 1.5;
            ctx.stroke();

            // Acid fill with animated wave top
            if (fill > 0) {
                ctx.save();
                ctx.beginPath();
                ctx.roundRect(vatX, vatTop, vatW, vatH, 4);
                ctx.clip();

                // Wavy surface
                ctx.beginPath();
                ctx.moveTo(vatX, vatBottom);
                ctx.lineTo(vatX, fillTop);
                for (var wx = 0; wx <= vatW; wx += 2) {
                    var wave = Math.sin((wx * 0.3) + animTimer * 3) * 2 + Math.sin((wx * 0.5) + animTimer * 5) * 1;
                    ctx.lineTo(vatX + wx, fillTop + wave);
                }
                ctx.lineTo(vatX + vatW, vatBottom);
                ctx.closePath();

                // Acid gradient
                var acidGrad = ctx.createLinearGradient(0, fillTop, 0, vatBottom);
                var hue = 100 + Math.sin(animTimer * 2) * 15;
                acidGrad.addColorStop(0, 'hsla(' + hue + ', 100%, 60%, 0.85)');
                acidGrad.addColorStop(0.5, 'hsla(' + (hue - 20) + ', 100%, 45%, 0.9)');
                acidGrad.addColorStop(1, 'hsla(' + (hue - 30) + ', 100%, 35%, 0.95)');
                ctx.fillStyle = acidGrad;
                ctx.fill();

                // Glow on surface
                var glowGrad = ctx.createLinearGradient(0, fillTop - 4, 0, fillTop + 12);
                glowGrad.addColorStop(0, 'rgba(150,255,50,0)');
                glowGrad.addColorStop(0.5, 'rgba(150,255,50,0.4)');
                glowGrad.addColorStop(1, 'rgba(150,255,50,0)');
                ctx.fillStyle = glowGrad;
                ctx.fillRect(vatX, fillTop - 4, vatW, 16);

                ctx.restore();

                // Bubbles
                for (var i = 0; i < bubbles.length; i++) {
                    var b = bubbles[i];
                    var bx = vatX + 4 + b.x * (vatW - 8);
                    var by = fillTop - b.y;
                    if (by < vatTop) continue;
                    ctx.beginPath();
                    ctx.arc(bx, by, b.r, 0, Math.PI * 2);
                    ctx.fillStyle = 'rgba(150,255,50,' + (b.life * 0.5) + ')';
                    ctx.fill();
                }
            }

            // Tick marks
            ctx.strokeStyle = 'rgba(100,255,100,0.15)';
            ctx.lineWidth = 0.5;
            for (var m = 1; m < maxMisses; m++) {
                var my = vatBottom - (vatH * m / maxMisses);
                ctx.beginPath();
                ctx.moveTo(vatX, my);
                ctx.lineTo(vatX + 5, my);
                ctx.stroke();
            }

            // Miss count text
            ctx.font = 'bold 11px monospace';
            ctx.textAlign = 'center';
            ctx.fillStyle = fill >= 0.8 ? '#ff4444' : fill >= 0.5 ? '#ffaa00' : '#88cc44';
            ctx.fillText(missCount + '/' + maxMisses, vatX + vatW / 2, vatBottom + 14);

            // Label
            ctx.font = 'bold 9px monospace';
            ctx.fillStyle = 'rgba(100,255,100,0.5)';
            ctx.fillText('MISSES', vatX + vatW / 2, vatTop - 6);

            // Danger pulse
            if (fill >= 0.75) {
                var pulse = Math.sin(animTimer * 6) * 0.5 + 0.5;
                ctx.beginPath();
                ctx.roundRect(vatX - 2, vatTop - 2, vatW + 4, vatH + 4, 6);
                ctx.strokeStyle = 'rgba(255,50,50,' + (pulse * 0.4) + ')';
                ctx.lineWidth = 2;
                ctx.stroke();
            }

            // --- Female character face beside vat ---
            var worry = missCount < 5 ? 0 : missCount < 10 ? 1 : missCount < 15 ? 2 : 3;
            var charBaseY = vatBottom - fillH - 10;
            if (charBaseY < vatTop + 22) charBaseY = vatTop + 22;
            if (charBaseY > vatBottom - 14) charBaseY = vatBottom - 14;
            var charX = vatX - 24;

            // Tremble
            var tx = 0, ty = 0;
            if (worry === 1) { tx = Math.sin(animTimer * 6) * 0.3; }
            else if (worry === 2) { tx = Math.sin(animTimer * 14) * 1; }
            else if (worry === 3) { tx = Math.sin(animTimer * 22) * 2.5; ty = Math.cos(animTimer * 19) * 1.5; }
            var cx = charX + tx;
            var cy = charBaseY + ty;

            // -- Back hair (long, flows behind head) --
            ctx.fillStyle = '#2a1520';
            ctx.beginPath();
            ctx.moveTo(cx - 12, cy - 6);
            ctx.quadraticCurveTo(cx - 15, cy + 5, cx - 13, cy + 18);
            ctx.quadraticCurveTo(cx - 11, cy + 24, cx - 8, cy + 26);
            ctx.lineTo(cx + 8, cy + 26);
            ctx.quadraticCurveTo(cx + 11, cy + 24, cx + 13, cy + 18);
            ctx.quadraticCurveTo(cx + 15, cy + 5, cx + 12, cy - 6);
            ctx.closePath();
            ctx.fill();

            // -- Slim neck --
            ctx.fillStyle = worry >= 3 ? '#d4a8a8' : worry >= 2 ? '#e8c0a0' : worry >= 1 ? '#f0d0aa' : '#f5d5b5';
            ctx.beginPath();
            ctx.moveTo(cx - 3, cy + 10);
            ctx.quadraticCurveTo(cx - 3.5, cy + 16, cx - 2.5, cy + 18);
            ctx.lineTo(cx + 2.5, cy + 18);
            ctx.quadraticCurveTo(cx + 3.5, cy + 16, cx + 3, cy + 10);
            ctx.closePath();
            ctx.fill();

            // -- Head shape: softer, rounder jaw, pointed chin --
            ctx.beginPath();
            ctx.moveTo(cx - 10, cy - 4);
            ctx.quadraticCurveTo(cx - 11, cy - 14, cx - 6, cy - 18);
            ctx.quadraticCurveTo(cx, cy - 22, cx + 6, cy - 18);
            ctx.quadraticCurveTo(cx + 11, cy - 14, cx + 10, cy - 4);
            ctx.quadraticCurveTo(cx + 10, cy + 4, cx + 7, cy + 8);
            ctx.quadraticCurveTo(cx + 4, cy + 12, cx, cy + 13);
            ctx.quadraticCurveTo(cx - 4, cy + 12, cx - 7, cy + 8);
            ctx.quadraticCurveTo(cx - 10, cy + 4, cx - 10, cy - 4);
            ctx.closePath();
            var skinGrad = ctx.createLinearGradient(cx, cy - 22, cx, cy + 13);
            skinGrad.addColorStop(0, worry >= 3 ? '#e8b8b8' : worry >= 2 ? '#f5d8b0' : worry >= 1 ? '#f8e0be' : '#ffe8cc');
            skinGrad.addColorStop(1, worry >= 3 ? '#d0a0a0' : worry >= 2 ? '#e4c498' : worry >= 1 ? '#e8c09a' : '#f2ccaa');
            ctx.fillStyle = skinGrad;
            ctx.fill();
            ctx.strokeStyle = worry >= 3 ? '#b08080' : '#c0a080';
            ctx.lineWidth = 0.7;
            ctx.stroke();

            // -- Front hair: side-swept bangs + volume --
            ctx.fillStyle = '#2a1520';
            // Main hair volume
            ctx.beginPath();
            ctx.moveTo(cx - 11, cy - 6);
            ctx.quadraticCurveTo(cx - 13, cy - 16, cx - 7, cy - 21);
            ctx.quadraticCurveTo(cx - 3, cy - 25, cx + 1, cy - 23);
            ctx.quadraticCurveTo(cx + 5, cy - 26, cx + 8, cy - 21);
            ctx.quadraticCurveTo(cx + 13, cy - 16, cx + 11, cy - 6);
            // Inner hairline — side-swept bangs
            ctx.quadraticCurveTo(cx + 9, cy - 12, cx + 5, cy - 11);
            ctx.quadraticCurveTo(cx + 2, cy - 13, cx - 1, cy - 10);
            ctx.quadraticCurveTo(cx - 5, cy - 8, cx - 8, cy - 10);
            ctx.quadraticCurveTo(cx - 10, cy - 11, cx - 11, cy - 6);
            ctx.closePath();
            ctx.fill();
            // Hair strand over forehead
            ctx.strokeStyle = '#3a2030';
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.moveTo(cx + 2, cy - 22);
            ctx.quadraticCurveTo(cx - 4, cy - 16, cx - 6, cy - 9);
            ctx.stroke();
            // Side strands framing face
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(cx - 11, cy - 8);
            ctx.quadraticCurveTo(cx - 13, cy, cx - 12, cy + 10);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(cx + 11, cy - 8);
            ctx.quadraticCurveTo(cx + 13, cy, cx + 12, cy + 10);
            ctx.stroke();

            // -- Small nose (button-like) --
            ctx.strokeStyle = '#c0a088';
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(cx - 0.5, cy);
            ctx.quadraticCurveTo(cx + 1.5, cy + 2.5, cx - 0.5, cy + 2.5);
            ctx.stroke();

            // -- Eyes --
            var eyeY = cy - 4;
            var leX = cx - 5, reX = cx + 5;
            var eyeOpenL, eyeOpenR;
            if (worry === 0) {
                eyeOpenL = 3.2; eyeOpenR = 3.2;
                if (Math.sin(animTimer * 1.7) > 0.92) { eyeOpenL = 0.5; eyeOpenR = 0.5; }
            } else if (worry === 1) { eyeOpenL = 3.8; eyeOpenR = 3.6; }
            else if (worry === 2) { eyeOpenL = 4.5; eyeOpenR = 4.3; }
            else { eyeOpenL = 5.5; eyeOpenR = 5.5; }

            // Eye sockets
            ctx.fillStyle = 'rgba(180,140,160,0.08)';
            ctx.beginPath(); ctx.ellipse(leX, eyeY, 5.5, 4, 0, 0, Math.PI * 2); ctx.fill();
            ctx.beginPath(); ctx.ellipse(reX, eyeY, 5.5, 4, 0, 0, Math.PI * 2); ctx.fill();

            // Whites
            ctx.fillStyle = worry >= 3 ? '#fff5f5' : '#fffff8';
            ctx.beginPath(); ctx.ellipse(leX, eyeY, 4.5, eyeOpenL, 0, 0, Math.PI * 2); ctx.fill();
            ctx.beginPath(); ctx.ellipse(reX, eyeY, 4.5, eyeOpenR, 0, 0, Math.PI * 2); ctx.fill();
            ctx.strokeStyle = '#8a6a70';
            ctx.lineWidth = 0.5;
            ctx.beginPath(); ctx.ellipse(leX, eyeY, 4.5, eyeOpenL, 0, 0, Math.PI * 2); ctx.stroke();
            ctx.beginPath(); ctx.ellipse(reX, eyeY, 4.5, eyeOpenR, 0, 0, Math.PI * 2); ctx.stroke();

            // Iris + pupil
            var irisR = worry >= 2 ? 2 : 2.5;
            var pupilR = worry >= 3 ? 0.8 : 1.2;
            var lookX = 0, lookY = 0;
            if (worry === 1) { lookX = Math.sin(animTimer * 2) * 1; lookY = 0.3; }
            else if (worry === 2) { lookX = Math.sin(animTimer * 3) * 1.2; lookY = Math.cos(animTimer * 2.5) * 0.5; }
            else if (worry === 3) { lookX = Math.sin(animTimer * 7) * 2; lookY = Math.cos(animTimer * 6) * 1; }

            ctx.save();
            ctx.beginPath();
            ctx.ellipse(leX, eyeY, 4.5, eyeOpenL, 0, 0, Math.PI * 2);
            ctx.ellipse(reX, eyeY, 4.5, eyeOpenR, 0, 0, Math.PI * 2);
            ctx.clip();
            // Iris — deep brown
            ctx.fillStyle = '#5a3528';
            ctx.beginPath(); ctx.arc(leX + lookX, eyeY + lookY, irisR, 0, Math.PI * 2); ctx.fill();
            ctx.beginPath(); ctx.arc(reX + lookX, eyeY + lookY, irisR, 0, Math.PI * 2); ctx.fill();
            // Pupil
            ctx.fillStyle = '#111';
            ctx.beginPath(); ctx.arc(leX + lookX, eyeY + lookY, pupilR, 0, Math.PI * 2); ctx.fill();
            ctx.beginPath(); ctx.arc(reX + lookX, eyeY + lookY, pupilR, 0, Math.PI * 2); ctx.fill();
            // Catchlight (larger for expressive look)
            ctx.fillStyle = 'rgba(255,255,255,0.8)';
            ctx.beginPath(); ctx.arc(leX + lookX + 1, eyeY + lookY - 1, 0.8, 0, Math.PI * 2); ctx.fill();
            ctx.beginPath(); ctx.arc(reX + lookX + 1, eyeY + lookY - 1, 0.8, 0, Math.PI * 2); ctx.fill();
            ctx.restore();

            // -- Eyelashes (2-3 strokes per eye, flicked outward) --
            ctx.strokeStyle = '#2a1520';
            ctx.lineWidth = 0.8;
            // Left eye lashes
            ctx.beginPath(); ctx.moveTo(leX - 4.5, eyeY - eyeOpenL + 1); ctx.lineTo(leX - 6, eyeY - eyeOpenL - 1.5); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(leX - 3, eyeY - eyeOpenL + 0.3); ctx.lineTo(leX - 4, eyeY - eyeOpenL - 2); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(leX + 4.5, eyeY - eyeOpenL + 1); ctx.lineTo(leX + 5.5, eyeY - eyeOpenL - 1); ctx.stroke();
            // Right eye lashes
            ctx.beginPath(); ctx.moveTo(reX + 4.5, eyeY - eyeOpenR + 1); ctx.lineTo(reX + 6, eyeY - eyeOpenR - 1.5); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(reX + 3, eyeY - eyeOpenR + 0.3); ctx.lineTo(reX + 4, eyeY - eyeOpenR - 2); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(reX - 4.5, eyeY - eyeOpenR + 1); ctx.lineTo(reX - 5.5, eyeY - eyeOpenR - 1); ctx.stroke();

            // -- Eyebrows (thinner, more arched than male) --
            ctx.strokeStyle = '#3a2028';
            ctx.lineWidth = 1;
            if (worry === 0) {
                ctx.beginPath();
                ctx.moveTo(leX - 5, eyeY - eyeOpenL - 1); ctx.quadraticCurveTo(leX, eyeY - eyeOpenL - 3, leX + 5, eyeY - eyeOpenL - 0.5); ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(reX - 5, eyeY - eyeOpenR - 0.5); ctx.quadraticCurveTo(reX, eyeY - eyeOpenR - 3, reX + 5, eyeY - eyeOpenR - 1); ctx.stroke();
            } else if (worry === 1) {
                ctx.lineWidth = 1.1;
                ctx.beginPath();
                ctx.moveTo(leX - 5, eyeY - eyeOpenL); ctx.quadraticCurveTo(leX, eyeY - eyeOpenL - 3, leX + 5, eyeY - eyeOpenL - 3); ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(reX + 5, eyeY - eyeOpenR); ctx.quadraticCurveTo(reX, eyeY - eyeOpenR - 3, reX - 5, eyeY - eyeOpenR - 3); ctx.stroke();
            } else if (worry === 2) {
                ctx.lineWidth = 1.2;
                ctx.beginPath();
                ctx.moveTo(leX - 5.5, eyeY - eyeOpenL + 1); ctx.quadraticCurveTo(leX, eyeY - eyeOpenL - 3, leX + 5, eyeY - eyeOpenL - 4); ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(reX + 5.5, eyeY - eyeOpenR + 1); ctx.quadraticCurveTo(reX, eyeY - eyeOpenR - 3, reX - 5, eyeY - eyeOpenR - 4); ctx.stroke();
            } else {
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.moveTo(leX - 6, eyeY - eyeOpenL + 2); ctx.quadraticCurveTo(leX, eyeY - eyeOpenL - 3, leX + 5, eyeY - eyeOpenL - 6); ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(reX + 6, eyeY - eyeOpenR + 2); ctx.quadraticCurveTo(reX, eyeY - eyeOpenR - 3, reX - 5, eyeY - eyeOpenR - 6); ctx.stroke();
            }

            // -- Lips (fuller, colored) --
            var mY = cy + 5;
            if (worry === 0) {
                // Soft closed smile — upper lip bow + fuller lower lip
                ctx.fillStyle = '#c46070';
                ctx.beginPath();
                ctx.moveTo(cx - 4, mY);
                ctx.quadraticCurveTo(cx - 2, mY - 1.5, cx, mY - 0.5);
                ctx.quadraticCurveTo(cx + 2, mY - 1.5, cx + 4, mY);
                ctx.quadraticCurveTo(cx + 2, mY + 2.5, cx, mY + 3);
                ctx.quadraticCurveTo(cx - 2, mY + 2.5, cx - 4, mY);
                ctx.closePath();
                ctx.fill();
                // Lip shine
                ctx.fillStyle = 'rgba(255,255,255,0.2)';
                ctx.beginPath(); ctx.ellipse(cx, mY + 1.5, 2, 1, 0, 0, Math.PI * 2); ctx.fill();
                // Smile line
                ctx.strokeStyle = '#a04858';
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(cx - 4, mY); ctx.quadraticCurveTo(cx, mY + 0.5, cx + 4, mY);
                ctx.stroke();
            } else if (worry === 1) {
                // Visible frown — corners turned down, slight pout
                ctx.fillStyle = '#c06068';
                ctx.beginPath();
                ctx.moveTo(cx - 4.5, mY - 1);
                ctx.quadraticCurveTo(cx - 2, mY - 1.5, cx, mY - 1);
                ctx.quadraticCurveTo(cx + 2, mY - 1.5, cx + 4.5, mY - 1);
                ctx.quadraticCurveTo(cx + 3, mY + 2, cx, mY + 2.5);
                ctx.quadraticCurveTo(cx - 3, mY + 2, cx - 4.5, mY - 1);
                ctx.fill();
                // Frown line — corners clearly down
                ctx.strokeStyle = '#a04858';
                ctx.lineWidth = 0.8;
                ctx.beginPath();
                ctx.moveTo(cx - 5, mY - 1.5);
                ctx.quadraticCurveTo(cx, mY + 0.5, cx + 5, mY - 1.5);
                ctx.stroke();
                // Lower lip quiver
                var quiver = Math.sin(animTimer * 5) * 0.5;
                ctx.beginPath();
                ctx.moveTo(cx - 3, mY + 2.5 + quiver);
                ctx.quadraticCurveTo(cx, mY + 3.5 + quiver, cx + 3, mY + 2.5 + quiver);
                ctx.lineWidth = 0.4;
                ctx.stroke();
            } else if (worry === 2) {
                // Open grimace, teeth showing
                ctx.beginPath();
                ctx.moveTo(cx - 5, mY - 0.5);
                ctx.quadraticCurveTo(cx, mY - 2, cx + 5, mY - 0.5);
                ctx.quadraticCurveTo(cx + 3, mY + 4, cx, mY + 4.5);
                ctx.quadraticCurveTo(cx - 3, mY + 4, cx - 5, mY - 0.5);
                ctx.closePath();
                ctx.fillStyle = '#1a0a0a';
                ctx.fill();
                // Teeth
                ctx.fillStyle = '#f0f0f0';
                ctx.fillRect(cx - 3.5, mY - 0.5, 2, 1.8);
                ctx.fillRect(cx - 1, mY - 0.5, 2, 1.8);
                ctx.fillRect(cx + 1.5, mY - 0.5, 2, 1.8);
                // Lip outline
                ctx.strokeStyle = '#b05060';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(cx - 5, mY - 0.5);
                ctx.quadraticCurveTo(cx, mY - 2, cx + 5, mY - 0.5);
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(cx - 5, mY - 0.5);
                ctx.quadraticCurveTo(cx, mY + 5, cx + 5, mY - 0.5);
                ctx.stroke();
            } else {
                // Screaming — wide open
                var jawDrop = 2 + Math.sin(animTimer * 8) * 1;
                ctx.beginPath();
                ctx.moveTo(cx - 6, mY - 1);
                ctx.quadraticCurveTo(cx, mY - 3, cx + 6, mY - 1);
                ctx.quadraticCurveTo(cx + 5, mY + 5 + jawDrop, cx, mY + 6 + jawDrop);
                ctx.quadraticCurveTo(cx - 5, mY + 5 + jawDrop, cx - 6, mY - 1);
                ctx.closePath();
                ctx.fillStyle = '#1a0808';
                ctx.fill();
                // Teeth
                ctx.fillStyle = '#f0f0f0';
                ctx.fillRect(cx - 4, mY - 1.5, 2, 2);
                ctx.fillRect(cx - 1.5, mY - 1.5, 2, 2);
                ctx.fillRect(cx + 1, mY - 1.5, 2, 2);
                // Tongue
                ctx.fillStyle = '#c06068';
                ctx.beginPath();
                ctx.ellipse(cx, mY + 3 + jawDrop * 0.5, 3, 2, 0, 0, Math.PI);
                ctx.fill();
                // Lip color around mouth
                ctx.strokeStyle = '#b05060';
                ctx.lineWidth = 1.2;
                ctx.beginPath();
                ctx.moveTo(cx - 6, mY - 1);
                ctx.quadraticCurveTo(cx, mY - 3, cx + 6, mY - 1);
                ctx.quadraticCurveTo(cx + 5, mY + 5 + jawDrop, cx, mY + 6 + jawDrop);
                ctx.quadraticCurveTo(cx - 5, mY + 5 + jawDrop, cx - 6, mY - 1);
                ctx.stroke();
            }

            // -- Earrings (small dangling hoops) --
            ctx.strokeStyle = '#d4aa50';
            ctx.lineWidth = 0.8;
            var earringBob = Math.sin(animTimer * 2 + (worry >= 2 ? animTimer * 8 : worry >= 1 ? animTimer * 3 : 0)) * (worry >= 1 ? 1.5 : 1);
            ctx.beginPath(); ctx.arc(cx - 12, cy + 5 + earringBob, 2.5, 0, Math.PI * 2); ctx.stroke();
            ctx.beginPath(); ctx.arc(cx + 12, cy + 5 + earringBob, 2.5, 0, Math.PI * 2); ctx.stroke();

            // -- Sweat drops (worry >= 2) --
            if (worry >= 2) {
                var sd1y = cy - 12 + Math.sin(animTimer * 3) * 3;
                ctx.fillStyle = 'rgba(120,190,255,0.6)';
                ctx.beginPath();
                ctx.moveTo(cx + 12, sd1y);
                ctx.quadraticCurveTo(cx + 15, sd1y + 5, cx + 12, sd1y + 7);
                ctx.quadraticCurveTo(cx + 9, sd1y + 5, cx + 12, sd1y);
                ctx.fill();
            }
            if (worry >= 3) {
                var sd2y = cy - 6 + Math.sin(animTimer * 4 + 2) * 3;
                ctx.fillStyle = 'rgba(120,190,255,0.5)';
                ctx.beginPath();
                ctx.moveTo(cx - 13, sd2y);
                ctx.quadraticCurveTo(cx - 11, sd2y + 4, cx - 13, sd2y + 5.5);
                ctx.quadraticCurveTo(cx - 15, sd2y + 4, cx - 13, sd2y);
                ctx.fill();
            }

            // -- Blush --
            if (worry >= 1) {
                var blushAlpha = worry === 1 ? 0.15 : worry === 2 ? 0.22 : 0.35;
                ctx.fillStyle = 'rgba(230,100,120,' + blushAlpha + ')';
                ctx.beginPath(); ctx.ellipse(leX - 1, cy + 1, 4, 2, -0.1, 0, Math.PI * 2); ctx.fill();
                ctx.beginPath(); ctx.ellipse(reX + 1, cy + 1, 4, 2, 0.1, 0, Math.PI * 2); ctx.fill();
            }

            ctx.restore();
        }

        drawDangerZone(groundY) {
            var divX = this.width - 86 - 4;
            this.ctx.strokeStyle = '#e94560';
            this.ctx.lineWidth = 1;
            this.ctx.setLineDash([8, 4]);
            this.ctx.beginPath();
            this.ctx.moveTo(0, groundY);
            this.ctx.lineTo(divX, groundY);
            this.ctx.stroke();
            this.ctx.setLineDash([]);
        }

        drawHUD(levelNumber, tilesRemaining) {
            var divX = this.width - 86;
            this.drawText('Level ' + levelNumber, 70, 25, { size: 16, color: '#888888' });
            this.drawText(tilesRemaining + ' left', divX - 40, 25, { size: 16, color: '#888888' });
        }
    }

    // ============================================================
    // TILE
    // ============================================================

    class Tile {
        constructor(text, x, y, speed, color) {
            this.text = text;
            if (text === ' ') {
                this.displayText = 'Space';
            } else {
                this.displayText = text;
            }
            this.x = x;
            this.y = y;
            this.speed = speed;
            this.width = Math.max(80, this.displayText.length * 28);
            this.height = 70;
            this.demonStyle = Math.floor(Math.random() * 4);
            this.color = DEMON_COLORS[this.demonStyle];
            this.animTimer = Math.random() * 10;
            this.typed = '';
            this.alive = true;
            this.destroying = false;
            this.destroyTimer = 0;
        }

        update(dt) {
            this.animTimer += dt;
            if (this.destroying) {
                this.destroyTimer -= dt;
                if (this.destroyTimer <= 0) this.alive = false;
                return;
            }
            this.y += this.speed * dt;
        }

        hasReachedBottom(canvasHeight) {
            return this.y + this.height >= canvasHeight - 40;
        }

        typeChar(char) {
            var nextExpected = this.text[this.typed.length];
            if (char === nextExpected) {
                this.typed += char;
                if (this.typed === this.text) {
                    this.destroying = true;
                    this.destroyTimer = 0.5;
                    return 'completed';
                }
                return 'hit';
            }
            return 'miss';
        }
    }

    // ============================================================
    // TILE MANAGER
    // ============================================================

    var TILE_COLORS = ['#ff2d78', '#8b5cf6', '#22d3ee', '#f97316', '#84cc16'];
    var DEMON_COLORS = ['#ff2d78', '#8b5cf6', '#f97316', '#22d3ee'];

    class TileManager {
        constructor(levelData, canvasWidth, canvasHeight) {
            this.tiles = [];
            this.levelData = levelData;
            this.canvasWidth = canvasWidth;
            this.canvasHeight = canvasHeight;
            this.spawnTimer = 0;
            this.tilesSpawned = 0;
            this.tilesDestroyed = 0;
            this.margin = 60;
        }

        update(dt) {
            this.spawnTimer += dt;
            var activeTiles = 0;
            for (var i = 0; i < this.tiles.length; i++) {
                if (!this.tiles[i].destroying) activeTiles++;
            }
            if (this.spawnTimer >= this.levelData.spawnInterval
                && activeTiles < this.levelData.maxActiveTiles
                && this.tilesSpawned < this.levelData.totalTiles) {
                this.spawnTile();
                this.spawnTimer = 0;
            }

            for (var i = 0; i < this.tiles.length; i++) {
                this.tiles[i].update(dt);
            }

            var alive = [];
            for (var i = 0; i < this.tiles.length; i++) {
                if (this.tiles[i].alive) alive.push(this.tiles[i]);
            }
            this.tiles = alive;
        }

        spawnTile() {
            var text = this.generateTileText();
            var displayText = (text === ' ') ? 'Space' : text;
            var tileW = Math.max(80, displayText.length * 28);
            var minX = this.margin;
            var maxX = this.canvasWidth - this.margin - tileW;
            var x = minX + Math.random() * (maxX - minX);
            var color = TILE_COLORS[Math.floor(Math.random() * TILE_COLORS.length)];
            this.tiles.push(new Tile(text, x, -70, this.levelData.tileSpeed, color));
            this.tilesSpawned++;
        }

        generateTileText() {
            var level = this.levelData;
            var len = level.minWordLength + Math.floor(Math.random() * (level.maxWordLength - level.minWordLength + 1));

            // If wordList exists, try to pick from it
            if (level.wordList && level.wordList.length > 0) {
                // Try length-filtered candidates first
                var candidates = [];
                for (var i = 0; i < level.wordList.length; i++) {
                    if (level.wordList[i].length === len) candidates.push(level.wordList[i]);
                }
                if (candidates.length > 0) {
                    return candidates[Math.floor(Math.random() * candidates.length)];
                }
                // No candidates at that length — pick any word from the list
                return level.wordList[Math.floor(Math.random() * level.wordList.length)];
            }

            // No wordList — generate from individual keys
            if (len === 1) {
                return level.keys[Math.floor(Math.random() * level.keys.length)];
            }

            var result = '';
            for (var i = 0; i < len; i++) {
                result += level.keys[Math.floor(Math.random() * level.keys.length)];
            }
            return result;
        }

        getTargetTile() {
            var lowest = null;
            for (var i = 0; i < this.tiles.length; i++) {
                var t = this.tiles[i];
                if (t.destroying) continue;
                if (!lowest || (t.y + t.height) > (lowest.y + lowest.height)) {
                    lowest = t;
                }
            }
            return lowest;
        }

        handleKeypress(char) {
            var target = this.getTargetTile();
            if (!target) return 'no_target';
            var result = target.typeChar(char);
            if (result === 'completed') this.tilesDestroyed++;
            return result;
        }

        checkGameOver() {
            for (var i = 0; i < this.tiles.length; i++) {
                if (!this.tiles[i].destroying && this.tiles[i].hasReachedBottom(this.canvasHeight)) return true;
            }
            return false;
        }

        checkWin() {
            if (this.tilesDestroyed < this.levelData.totalTiles) return false;
            for (var i = 0; i < this.tiles.length; i++) {
                if (!this.tiles[i].destroying) return false;
            }
            return true;
        }

        get tilesRemaining() {
            return this.levelData.totalTiles - this.tilesDestroyed;
        }
    }

    // ============================================================
    // MUSIC DATA & MANAGER
    // ============================================================

    var NOTE_FREQS = {
        'C3': 130.81, 'D3': 146.83, 'Eb3': 155.56, 'E3': 164.81, 'F3': 174.61,
        'G3': 196.00, 'Ab3': 207.65, 'A3': 220.00, 'Bb3': 233.08, 'B3': 246.94,
        'C4': 261.63, 'D4': 293.66, 'Eb4': 311.13, 'E4': 329.63, 'F4': 349.23,
        'G4': 392.00, 'Ab4': 415.30, 'A4': 440.00, 'Bb4': 466.16, 'B4': 493.88,
        'C5': 523.25, 'D5': 587.33, 'Eb5': 622.25, 'E5': 659.25, 'F5': 698.46,
        'G5': 783.99, 'Ab5': 830.61, 'A5': 880.00, 'Bb5': 932.33, 'B5': 987.77,
        'C6': 1046.50
    };

    class MusicManager {
        constructor() {
            this.ctx = null;
            this.masterGain = null;
            this.muted = false;
            this.currentLoop = null;
            this.loopTimer = null;
            this.scheduledNodes = [];
            this.noiseBuffer = null;
            this.gameplayLevelId = 1;
            this._loopGen = 0;
            this._menuTrackBuffer = null;
            this._menuTrackSource = null;
            this._menuTrackLoading = false;
            this._gameTrackBuffer = null;
            this._gameTrackSource = null;
            this._gameTrackLoading = false;
            this._setupAutoplay();
        }

        _setupAutoplay() {
            var self = this;
            var hasRestarted = false;
            var activate = function() {
                if (!self.ctx) return;
                if (hasRestarted) {
                    if (self.ctx.state === 'suspended') self.ctx.resume();
                    return;
                }
                hasRestarted = true;
                var retrigger = function() {
                    var loop = self.currentLoop;
                    if (loop === 'menu') self.playMenu();
                    else if (loop === 'gameplay') self.playGameplay(self.gameplayLevelId);
                };
                if (self.ctx.state === 'suspended') {
                    self.ctx.resume().then(retrigger);
                } else {
                    retrigger();
                }
            };
            document.addEventListener('keydown', activate);
            document.addEventListener('click', activate);
        }

        _ensureContext() {
            if (!this.ctx) {
                this.ctx = new (window.AudioContext || window.webkitAudioContext)();
                this.masterGain = this.ctx.createGain();
                this.masterGain.gain.value = this.muted ? 0 : 0.5;
                this.masterGain.connect(this.ctx.destination);
            }
            if (this.ctx.state === 'suspended') {
                this.ctx.resume();
            }
        }

        toggleMute() {
            this._ensureContext();
            this.muted = !this.muted;
            this.masterGain.gain.linearRampToValueAtTime(
                this.muted ? 0 : 0.5,
                this.ctx.currentTime + 0.05
            );
        }

        playMenu() {
            this._ensureContext();
            this._stopAll();
            this.currentLoop = 'menu';
            this._loadMenuTrack();
            if (this.ctx.state !== 'running') return;
            if (this._menuTrackBuffer) {
                this._startMenuTrack();
            }
        }

        _loadMenuTrack() {
            if (this._menuTrackBuffer || this._menuTrackLoading) return;
            this._menuTrackLoading = true;
            var self = this;
            fetch(encodeURI('101 The Prelude.mp3'))
                .then(function(response) { return response.arrayBuffer(); })
                .then(function(arrayBuf) { return self.ctx.decodeAudioData(arrayBuf); })
                .then(function(audioBuf) {
                    self._menuTrackBuffer = audioBuf;
                    self._menuTrackLoading = false;
                    if (self.currentLoop === 'menu' && !self._menuTrackSource && self.ctx.state === 'running') {
                        self._startMenuTrack();
                    }
                })
                .catch(function(err) {
                    console.warn('Failed to load menu track:', err);
                    self._menuTrackLoading = false;
                });
        }

        _startMenuTrack() {
            if (!this._menuTrackBuffer || !this.ctx) return;
            if (this.ctx.state !== 'running') return;
            var src = this.ctx.createBufferSource();
            src.buffer = this._menuTrackBuffer;
            src.loop = true;
            src.connect(this.masterGain);
            src.start();
            this._menuTrackSource = src;
        }

        playGameplay(levelId) {
            this._ensureContext();
            this._stopAll();
            this.currentLoop = 'gameplay';
            this.gameplayLevelId = levelId;
            this._loadGameplayTrack();
            if (this.ctx.state !== 'running') return;
            if (this._gameTrackBuffer) {
                this._startGameTrack();
            }
        }

        playWin() {
            this._ensureContext();
            this._stopAll();
            this.currentLoop = null;
            var t = this.ctx.currentTime + 0.05;
            var winNotes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99];
            for (var i = 0; i < winNotes.length; i++) {
                this._playNote('square', winNotes[i], t + i * 0.15, 0.3, 0.08, this.masterGain);
            }
            var chordTime = t + winNotes.length * 0.15 + 0.1;
            this._playNote('square', 523.25, chordTime, 1.2, 0.07, this.masterGain);
            this._playNote('square', 659.25, chordTime, 1.2, 0.06, this.masterGain);
            this._playNote('square', 783.99, chordTime, 1.2, 0.06, this.masterGain);
            this._playNote('triangle', 130.81, chordTime, 1.2, 0.1, this.masterGain);
        }

        playLose() {
            this._ensureContext();
            this._stopAll();
            this.currentLoop = null;
            var t = this.ctx.currentTime + 0.05;
            // Descending minor notes — dramatic fail sting
            var loseNotes = [392.00, 311.13, 261.63, 196.00];
            for (var i = 0; i < loseNotes.length; i++) {
                this._playNote('sawtooth', loseNotes[i], t + i * 0.15, 0.2, 0.15, this.masterGain);
                this._playNote('square', loseNotes[i] * 0.5, t + i * 0.15, 0.2, 0.1, this.masterGain);
            }
            // Final low thud
            var thudTime = t + loseNotes.length * 0.15 + 0.05;
            this._playKick(thudTime, 0.6);
            this._playNote('triangle', 65.41, thudTime, 0.8, 0.2, this.masterGain);
            this._playSnare(thudTime + 0.05, 0.2);
        }

        _stopAll() {
            this._loopGen++;
            if (this.loopTimer) {
                clearTimeout(this.loopTimer);
                this.loopTimer = null;
            }
            if (this._menuTrackSource) {
                try { this._menuTrackSource.stop(); } catch (e) {}
                this._menuTrackSource = null;
            }
            if (this._gameTrackSource) {
                try { this._gameTrackSource.stop(); } catch (e) {}
                this._gameTrackSource = null;
            }
            for (var i = 0; i < this.scheduledNodes.length; i++) {
                try { this.scheduledNodes[i].stop(); } catch (e) {}
            }
            this.scheduledNodes = [];
            this.currentLoop = null;
        }

        _playNote(type, freq, start, dur, gain, dest) {
            if (dur < 0.02) dur = 0.02;
            var osc = this.ctx.createOscillator();
            var g = this.ctx.createGain();
            osc.type = type;
            osc.frequency.value = freq;
            g.gain.setValueAtTime(0, start);
            g.gain.linearRampToValueAtTime(gain, start + 0.005);
            g.gain.setValueAtTime(gain, start + dur - 0.005);
            g.gain.linearRampToValueAtTime(0, start + dur);
            osc.connect(g);
            g.connect(dest);
            osc.start(start);
            osc.stop(start + dur + 0.01);
            this.scheduledNodes.push(osc);
            return osc;
        }

        _playKick(time, gain) {
            gain = gain || 0.3;
            var osc = this.ctx.createOscillator();
            var g = this.ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(150, time);
            osc.frequency.exponentialRampToValueAtTime(40, time + 0.1);
            g.gain.setValueAtTime(gain, time);
            g.gain.exponentialRampToValueAtTime(0.001, time + 0.2);
            osc.connect(g);
            g.connect(this.masterGain);
            osc.start(time);
            osc.stop(time + 0.25);
            this.scheduledNodes.push(osc);
        }

        _playSnare(time, gain) {
            gain = gain || 0.15;
            if (!this.noiseBuffer) this._createNoiseBuffer();
            var src = this.ctx.createBufferSource();
            src.buffer = this.noiseBuffer;
            var filt = this.ctx.createBiquadFilter();
            filt.type = 'highpass';
            filt.frequency.value = 2000;
            var g = this.ctx.createGain();
            g.gain.setValueAtTime(gain, time);
            g.gain.exponentialRampToValueAtTime(0.001, time + 0.15);
            src.connect(filt);
            filt.connect(g);
            g.connect(this.masterGain);
            src.start(time);
            src.stop(time + 0.2);
            this.scheduledNodes.push(src);
        }

        _playHat(time, gain) {
            gain = gain || 0.06;
            if (!this.noiseBuffer) this._createNoiseBuffer();
            var src = this.ctx.createBufferSource();
            src.buffer = this.noiseBuffer;
            var filt = this.ctx.createBiquadFilter();
            filt.type = 'highpass';
            filt.frequency.value = 6000;
            var g = this.ctx.createGain();
            g.gain.setValueAtTime(gain, time);
            g.gain.exponentialRampToValueAtTime(0.001, time + 0.05);
            src.connect(filt);
            filt.connect(g);
            g.connect(this.masterGain);
            src.start(time);
            src.stop(time + 0.08);
            this.scheduledNodes.push(src);
        }

        playWhoosh() {
            if (!this.ctx) return;
            this._ensureContext();
            var time = this.ctx.currentTime;
            // Oscillator sweep for a light "pew" sound
            var osc = this.ctx.createOscillator();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(1200, time);
            osc.frequency.exponentialRampToValueAtTime(200, time + 0.15);
            var g = this.ctx.createGain();
            g.gain.setValueAtTime(0.3, time);
            g.gain.exponentialRampToValueAtTime(0.001, time + 0.2);
            osc.connect(g);
            g.connect(this.masterGain);
            osc.start(time);
            osc.stop(time + 0.25);
            this.scheduledNodes.push(osc);
        }

        _createNoiseBuffer() {
            var len = this.ctx.sampleRate * 2;
            this.noiseBuffer = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
            var data = this.noiseBuffer.getChannelData(0);
            for (var i = 0; i < len; i++) {
                data[i] = Math.random() * 2 - 1;
            }
        }

        _loadGameplayTrack() {
            if (this._gameTrackBuffer || this._gameTrackLoading) return;
            this._gameTrackLoading = true;
            var self = this;
            fetch(encodeURI('12. Kitty Fight Sequence.mp3'))
                .then(function(response) { return response.arrayBuffer(); })
                .then(function(arrayBuf) { return self.ctx.decodeAudioData(arrayBuf); })
                .then(function(audioBuf) {
                    self._gameTrackBuffer = audioBuf;
                    self._gameTrackLoading = false;
                    // If we're currently in gameplay state waiting for the track, auto-start
                    if (self.currentLoop === 'gameplay' && !self._gameTrackSource && self.ctx.state === 'running') {
                        self._startGameTrack();
                    }
                })
                .catch(function(err) {
                    console.warn('Failed to load gameplay track:', err);
                    self._gameTrackLoading = false;
                });
        }

        _startGameTrack() {
            if (!this._gameTrackBuffer || !this.ctx) return;
            if (this.ctx.state !== 'running') return;
            var src = this.ctx.createBufferSource();
            src.buffer = this._gameTrackBuffer;
            src.loop = true;
            var vol = this.ctx.createGain();
            vol.gain.value = 0.55;
            src.connect(vol);
            vol.connect(this.masterGain);
            src.start();
            this._gameTrackSource = src;
        }

        _scheduleLoop(generatorFn, loopDur) {
            var self = this;
            var gen = ++this._loopGen;
            var startTime = this.ctx.currentTime + 0.05;

            function scheduleNext(nextStart) {
                if (self._loopGen !== gen) return;
                generatorFn(nextStart);
                var delay = (nextStart + loopDur - self.ctx.currentTime - 0.25) * 1000;
                if (delay < 50) delay = 50;
                self.loopTimer = setTimeout(function check() {
                    if (self._loopGen !== gen) return;
                    if (!self.currentLoop) return;
                    if (self.ctx.state === 'suspended') {
                        self.loopTimer = setTimeout(check, 300);
                        return;
                    }
                    scheduleNext(nextStart + loopDur);
                }, delay);
            }

            scheduleNext(startTime);
        }

        _generateMenuLoop(startTime) {
            var beat = 60 / 128; // 128 BPM — upbeat energy

            // Melody (triangle, softer than square) — short staccato notes, bouncy rhythm
            var melody = [
                [0, 'C5', 0.4, 0.07], [0.75, 'Eb5', 0.3, 0.06], [1.5, 'G5', 0.4, 0.07],
                [2.5, 'F5', 0.3, 0.06], [3, 'Eb5', 0.5, 0.07],
                [4, 'G5', 0.4, 0.07], [4.75, 'F5', 0.3, 0.06], [5.5, 'Eb5', 0.4, 0.07],
                [6.5, 'C5', 0.3, 0.06], [7, 'Bb4', 0.5, 0.06],
                [8, 'C5', 0.4, 0.07], [8.75, 'Eb5', 0.3, 0.06], [9.5, 'F5', 0.4, 0.07],
                [10.5, 'G5', 0.3, 0.07], [11, 'Bb5', 0.5, 0.07],
                [12, 'G5', 0.4, 0.07], [12.75, 'F5', 0.3, 0.06], [13.5, 'Eb5', 0.3, 0.06],
                [14, 'C5', 0.4, 0.07], [15, 'G4', 0.5, 0.06],
                [16, 'Bb4', 0.4, 0.06], [16.75, 'C5', 0.3, 0.07], [17.5, 'Eb5', 0.4, 0.07],
                [18.5, 'G5', 0.3, 0.07], [19, 'F5', 0.5, 0.07],
                [20, 'Eb5', 0.4, 0.07], [20.75, 'C5', 0.3, 0.06], [21.5, 'Bb4', 0.4, 0.06],
                [22.5, 'G4', 0.3, 0.06], [23, 'C5', 0.5, 0.07],
                [24, 'Eb5', 0.3, 0.07], [24.5, 'F5', 0.3, 0.07], [25, 'G5', 0.3, 0.07],
                [25.5, 'Bb5', 0.3, 0.07], [26, 'G5', 0.4, 0.07],
                [27, 'F5', 0.3, 0.06], [27.5, 'Eb5', 0.3, 0.06], [28, 'C5', 0.5, 0.07],
                [29, 'Eb5', 0.3, 0.06], [29.5, 'C5', 0.3, 0.06], [30, 'G4', 0.5, 0.06],
                [31, 'Bb4', 0.3, 0.05], [31.5, 'C5', 0.3, 0.06]
            ];
            for (var i = 0; i < melody.length; i++) {
                var m = melody[i];
                this._playNote('triangle', NOTE_FREQS[m[1]],
                    startTime + m[0] * beat, m[2] * beat, m[3], this.masterGain);
            }

            // Bass (triangle) — short punchy eighth notes
            var bass = [
                [0, 'C3', 0.5], [1, 'C3', 0.5], [2, 'Eb3', 0.5], [3, 'G3', 0.5],
                [4, 'F3', 0.5], [5, 'F3', 0.5], [6, 'G3', 0.5], [7, 'F3', 0.5],
                [8, 'Ab3', 0.5], [9, 'Ab3', 0.5], [10, 'Bb3', 0.5], [11, 'G3', 0.5],
                [12, 'Eb3', 0.5], [13, 'Eb3', 0.5], [14, 'F3', 0.5], [15, 'G3', 0.5],
                [16, 'C3', 0.5], [17, 'C3', 0.5], [18, 'Eb3', 0.5], [19, 'G3', 0.5],
                [20, 'F3', 0.5], [21, 'F3', 0.5], [22, 'Eb3', 0.5], [23, 'C3', 0.5],
                [24, 'Ab3', 0.5], [25, 'Bb3', 0.5], [26, 'G3', 0.5], [27, 'Eb3', 0.5],
                [28, 'F3', 0.5], [29, 'G3', 0.5], [30, 'Bb3', 0.5], [31, 'C3', 0.5]
            ];
            for (var i = 0; i < bass.length; i++) {
                var b = bass[i];
                this._playNote('triangle', NOTE_FREQS[b[1]],
                    startTime + b[0] * beat, b[2] * beat, 0.1, this.masterGain);
            }

            // Fast arpeggios (sine, light) — 16th note runs every 8 beats
            var arpSets = [
                [0, ['C4', 'Eb4', 'G4', 'C5', 'G4', 'Eb4']],
                [8, ['F4', 'Ab4', 'C5', 'F5', 'C5', 'Ab4']],
                [16, ['Eb4', 'G4', 'Bb4', 'Eb5', 'Bb4', 'G4']],
                [24, ['G4', 'Bb4', 'C5', 'Eb5', 'C5', 'Bb4']]
            ];
            for (var i = 0; i < arpSets.length; i++) {
                var arpBeat = arpSets[i][0];
                var arpNotes = arpSets[i][1];
                for (var j = 0; j < arpNotes.length; j++) {
                    this._playNote('sine', NOTE_FREQS[arpNotes[j]],
                        startTime + (arpBeat + j * 0.25) * beat,
                        0.2 * beat, 0.04, this.masterGain);
                }
            }

            // Hi-hats — every beat with accents on off-beats
            for (var i = 0; i < 32; i++) {
                var vol = (i % 2 === 1) ? 0.05 : 0.03;
                this._playHat(startTime + i * beat, vol);
            }

            // Snare on 2 and 4 (backbeat)
            for (var i = 0; i < 8; i++) {
                this._playSnare(startTime + (i * 4 + 2) * beat, 0.1);
            }
        }

    }

    // ============================================================
    // STATE MANAGER
    // ============================================================

    class StateManager {
        constructor() {
            this.states = {};
            this.currentState = null;
        }
        register(name, state) { this.states[name] = state; }
        change(name, params) {
            if (this.currentState && this.currentState.exit) this.currentState.exit();
            this.currentState = this.states[name];
            if (this.currentState.enter) this.currentState.enter(params || {});
        }
    }

    // ============================================================
    // MENU STATE
    // ============================================================

    class MenuState {
        constructor() {
            this.selectedIndex = 0;
            this.highestUnlocked = 99;
            this.animTimer = 0;
            // Floating sparkle particles
            this.sparkles = [];
            for (var i = 0; i < 25; i++) {
                this.sparkles.push({
                    x: Math.random() * 800,
                    y: Math.random() * 600,
                    speed: 8 + Math.random() * 18,
                    size: 2 + Math.random() * 5,
                    phase: Math.random() * Math.PI * 2,
                    color: ['#ff2d78','#8b5cf6','#22d3ee','#f97316'][Math.floor(Math.random()*4)]
                });
            }
        }

        enter(params) {
            if (params.highestUnlocked !== undefined) {
                this.highestUnlocked = Math.max(this.highestUnlocked, params.highestUnlocked);
            }
            if (musicManager && musicManager.currentLoop !== 'menu') musicManager.playMenu();
        }

        update(dt, input, stateManager) {
            this.animTimer += dt;
            // Drift sparkles upward
            for (var i = 0; i < this.sparkles.length; i++) {
                var sp = this.sparkles[i];
                sp.y -= sp.speed * dt;
                sp.x += Math.sin(this.animTimer * 0.5 + sp.phase) * 0.3;
                if (sp.y < -10) {
                    sp.y = 610;
                    sp.x = Math.random() * 800;
                }
            }

            var keys = input.getKeys();
            for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                if (key === 'ArrowUp') {
                    this.selectedIndex = Math.max(0, this.selectedIndex - 1);
                } else if (key === 'ArrowDown') {
                    this.selectedIndex = Math.min(LEVELS.length - 1, this.selectedIndex + 1);
                } else if (key === 'Enter') {
                    var level = LEVELS[this.selectedIndex];
                    if (level.id <= this.highestUnlocked) {
                        startLevel(stateManager, level.id, this.highestUnlocked);
                    }
                }
            }
        }

        draw(renderer) {
            var t = this.animTimer;
            var ctx = renderer.ctx;

            // Background image
            renderer.drawMenuBackground();

            // Background sparkles
            for (var i = 0; i < this.sparkles.length; i++) {
                var sp = this.sparkles[i];
                var alpha = 0.2 + 0.4 * Math.abs(Math.sin(t * 2 + sp.phase));
                renderer._drawSparkle(sp.x, sp.y, sp.size, sp.color, alpha);
            }

            // Decorative demons on sides
            ctx.save();
            ctx.globalAlpha = 0.5;
            renderer._drawChibiOni(70, 180, t, 'target', -1);
            ctx.restore();
            ctx.save();
            ctx.globalAlpha = 0.5;
            renderer._drawFlameImp(70, 360, t, 'target', -1);
            ctx.restore();
            ctx.save();
            ctx.globalAlpha = 0.5;
            renderer._drawShadowWraith(730, 180, t, 'target', -1);
            ctx.restore();
            ctx.save();
            ctx.globalAlpha = 0.5;
            renderer._drawCrystalDemon(730, 360, t, 'target', -1);
            ctx.restore();

            // Title glow
            ctx.save();
            ctx.shadowColor = '#ff2d78';
            ctx.shadowBlur = 25;
            renderer.drawText('DEMON HUNTER', renderer.width / 2, 42, { size: 40, color: '#ff2d78' });
            ctx.shadowBlur = 0;
            ctx.restore();
            // Subtitle
            renderer.drawText('— Type to Slay —', renderer.width / 2, 78, { size: 16, color: '#c4b5fd' });
            renderer.drawText('Arrow keys to select, Enter to start', renderer.width / 2, 100, { size: 12, color: '#9999bb' });

            // Level list
            var startY = 125;
            var lineHeight = 36;
            var maxVisible = 11;
            var scrollTop = 0;
            if (this.selectedIndex >= maxVisible) {
                scrollTop = this.selectedIndex - maxVisible + 1;
            }
            var scrollBottom = Math.min(scrollTop + maxVisible, LEVELS.length);

            if (scrollTop > 0) {
                renderer.drawText('^ more above ^', renderer.width / 2, startY - 14, { size: 11, color: '#9999bb' });
            }

            for (var i = scrollTop; i < scrollBottom; i++) {
                var level = LEVELS[i];
                var y = startY + (i - scrollTop) * lineHeight;
                var isSelected = i === this.selectedIndex;
                var isLocked = level.id > this.highestUnlocked;

                if (isSelected && !isLocked) {
                    // Glowing selection bar
                    ctx.save();
                    var selGrad = ctx.createLinearGradient(200, y-12, 600, y-12);
                    selGrad.addColorStop(0, 'rgba(255,45,120,0)');
                    selGrad.addColorStop(0.3, 'rgba(255,45,120,0.2)');
                    selGrad.addColorStop(0.7, 'rgba(255,45,120,0.2)');
                    selGrad.addColorStop(1, 'rgba(255,45,120,0)');
                    ctx.fillStyle = selGrad;
                    ctx.fillRect(200, y - 12, 400, 24);
                    ctx.restore();
                }

                var color, prefix;
                if (isLocked) {
                    color = '#555577';
                    prefix = '  ';
                } else if (isSelected) {
                    color = '#ff4d8e';
                    prefix = '> ';
                } else {
                    color = '#c0c0dd';
                    prefix = '  ';
                }
                var lock = isLocked ? ' [locked]' : '';
                var text = prefix + level.id + '. ' + level.name + lock;

                if (isSelected && !isLocked) {
                    ctx.save();
                    ctx.shadowColor = '#ff2d78';
                    ctx.shadowBlur = 8;
                    renderer.drawText(text, renderer.width / 2, y, { size: 18, color: color });
                    ctx.shadowBlur = 0;
                    ctx.restore();
                    renderer.drawText(level.description, renderer.width / 2, y + 16, { size: 11, color: '#a78bfa' });
                } else {
                    renderer.drawText(text, renderer.width / 2, y, { size: 16, color: color });
                }
            }

            if (scrollBottom < LEVELS.length) {
                var bottomY = startY + (scrollBottom - scrollTop) * lineHeight;
                renderer.drawText('v more below v', renderer.width / 2, bottomY, { size: 11, color: '#9999bb' });
            }

            // Selected level keys
            var sel = LEVELS[this.selectedIndex];
            if (sel && sel.id <= this.highestUnlocked) {
                renderer.drawText('Keys: ' + sel.keys.join('  ').toUpperCase(), renderer.width / 2, renderer.height - 40, { size: 13, color: '#8888aa' });
            }

            // Sound indicator
            if (musicManager) {
                var soundLabel = musicManager.muted ? 'Sound: OFF  [press 0]' : 'Sound: ON  [press 0]';
                var soundColor = musicManager.muted ? '#e94560' : '#4ade80';
                renderer.drawText(soundLabel, renderer.width / 2, renderer.height - 15, { size: 13, color: soundColor });
            }
        }

        exit() {}
    }

    // ============================================================
    // PLAY STATE
    // ============================================================

    class PlayState {
        constructor() {
            this.tileManager = null;
            this.levelData = null;
            this.levelId = 1;
            this.highestUnlocked = 1;
            this.missFlashTimer = 0;
        }

        enter(params) {
            this.levelId = params.levelId || 1;
            this.highestUnlocked = params.highestUnlocked || 1;
            this.levelData = null;
            this.missFlashTimer = 0;
            this.missCount = 0;
            this.maxMisses = 20;
            this.acidAnimTimer = 0;
            this.acidBubbles = [];

            for (var i = 0; i < LEVELS.length; i++) {
                if (LEVELS[i].id === this.levelId) {
                    this.levelData = LEVELS[i];
                    break;
                }
            }
            if (!this.levelData) { this.levelData = LEVELS[0]; this.levelId = 1; }

            this.tileManager = new TileManager(this.levelData, 800, 600);
            if (musicManager) musicManager.playGameplay(this.levelId);
        }

        update(dt, input, stateManager) {
            var keys = input.getKeys();
            for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                if (key === 'Escape') {
                    stateManager.change('menu', { highestUnlocked: this.highestUnlocked });
                    return;
                }
                if (key.length === 1) {
                    var result = this.tileManager.handleKeypress(key);
                    if (result === 'completed' && musicManager) musicManager.playWhoosh();
                    if (result === 'miss') {
                        this.missFlashTimer = 0.2;
                        this.missCount++;
                    }
                }
            }

            if (this.missFlashTimer > 0) this.missFlashTimer -= dt;

            this.acidAnimTimer += dt;
            // Spawn acid bubbles
            var fill = this.missCount / this.maxMisses;
            if (Math.random() < fill * 0.3) {
                this.acidBubbles.push({ x: Math.random(), y: 0, r: 2 + Math.random() * 4, speed: 10 + Math.random() * 20, life: 1 });
            }
            for (var b = this.acidBubbles.length - 1; b >= 0; b--) {
                this.acidBubbles[b].y += this.acidBubbles[b].speed * dt;
                this.acidBubbles[b].life -= dt * 0.8;
                if (this.acidBubbles[b].life <= 0 || this.acidBubbles[b].y > 80) this.acidBubbles.splice(b, 1);
            }

            this.tileManager.update(dt);

            if (this.missCount >= this.maxMisses) {
                stateManager.change('lose', { levelId: this.levelId, highestUnlocked: this.highestUnlocked, acidDeath: true });
                return;
            }

            if (this.tileManager.checkGameOver()) {
                stateManager.change('lose', { levelId: this.levelId, highestUnlocked: this.highestUnlocked });
                return;
            }

            if (this.tileManager.checkWin()) {
                stateManager.change('win', {
                    levelId: this.levelId,
                    highestUnlocked: Math.max(this.highestUnlocked, this.levelId + 1)
                });
            }
        }

        draw(renderer) {
            renderer.drawGameBackground();
            renderer.drawDangerZone(560);

            var target = this.tileManager.getTargetTile();
            for (var i = 0; i < this.tileManager.tiles.length; i++) {
                var tile = this.tileManager.tiles[i];
                if (tile.destroying) {
                    renderer.drawTileDestroy(tile);
                } else {
                    renderer.drawTile(tile, tile === target);
                }
            }

            if (this.missFlashTimer > 0) {
                var alpha = this.missFlashTimer / 0.2 * 0.15;
                renderer.ctx.fillStyle = 'rgba(233, 69, 96, ' + alpha + ')';
                renderer.ctx.fillRect(0, 0, renderer.width, renderer.height);
            }

            renderer.drawHUD(this.levelId, this.tileManager.tilesRemaining);
            renderer.drawAcidVat(this.missCount, this.maxMisses, this.acidAnimTimer, this.acidBubbles);

            var keysStr = this.levelData.keys.join(' ').toUpperCase();
            renderer.drawText(keysStr, renderer.width / 2, renderer.height - 15, { size: 12, color: '#333355' });
        }

        exit() { this.tileManager = null; }
    }

    // ============================================================
    // WIN STATE
    // ============================================================

    class WinState {
        constructor() { this.levelId = 1; this.highestUnlocked = 1; }

        enter(params) {
            this.levelId = params.levelId || 1;
            this.highestUnlocked = params.highestUnlocked || 1;
            if (musicManager) musicManager.playWin();
        }

        update(dt, input, stateManager) {
            var keys = input.getKeys();
            for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                if (key === 'Enter' || key === 'n') {
                    var nextId = this.levelId + 1;
                    if (nextId <= LEVELS.length) {
                        startLevel(stateManager, nextId, this.highestUnlocked);
                    } else {
                        stateManager.change('menu', { highestUnlocked: this.highestUnlocked });
                    }
                    return;
                } else if (key === 'm') {
                    stateManager.change('menu', { highestUnlocked: this.highestUnlocked });
                    return;
                } else if (key === 'r') {
                    stateManager.change('play', { levelId: this.levelId, highestUnlocked: this.highestUnlocked });
                    return;
                }
            }
        }

        draw(renderer) {
            renderer.drawText('LEVEL COMPLETE!', renderer.width / 2, renderer.height / 2 - 60, { size: 36, color: '#4ade80' });
            renderer.drawText('Press Enter or N for next level', renderer.width / 2, renderer.height / 2 + 40, { size: 16, color: '#aaaaaa' });
            renderer.drawText('Press R to replay', renderer.width / 2, renderer.height / 2 + 65, { size: 16, color: '#aaaaaa' });
            renderer.drawText('Press M for menu', renderer.width / 2, renderer.height / 2 + 90, { size: 16, color: '#aaaaaa' });
        }

        exit() {}
    }

    // ============================================================
    // LOSE STATE
    // ============================================================

    class LoseState {
        constructor() { this.levelId = 1; this.highestUnlocked = 1; }

        enter(params) {
            this.levelId = params.levelId || 1;
            this.highestUnlocked = params.highestUnlocked || 1;
            this.acidDeath = params.acidDeath || false;
            if (musicManager) musicManager.playLose();
        }

        update(dt, input, stateManager) {
            var keys = input.getKeys();
            for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                if (key === 'Enter' || key === 'r') {
                    stateManager.change('play', { levelId: this.levelId, highestUnlocked: this.highestUnlocked });
                    return;
                } else if (key === 'm') {
                    stateManager.change('menu', { highestUnlocked: this.highestUnlocked });
                    return;
                }
            }
        }

        draw(renderer) {
            renderer.drawText('GAME OVER', renderer.width / 2, renderer.height / 2 - 60, { size: 36, color: '#e94560' });
            if (this.acidDeath) {
                renderer.drawText('Too many misses! The acid overflowed!', renderer.width / 2, renderer.height / 2 - 15, { size: 18, color: '#88cc44' });
            } else {
                renderer.drawText('A demon reached the bottom!', renderer.width / 2, renderer.height / 2 - 15, { size: 18, color: '#888888' });
            }
            renderer.drawText('Press Enter or R to retry', renderer.width / 2, renderer.height / 2 + 40, { size: 16, color: '#aaaaaa' });
            renderer.drawText('Press M for menu', renderer.width / 2, renderer.height / 2 + 65, { size: 16, color: '#aaaaaa' });
        }

        exit() {}
    }

    // ============================================================
    // KEY INTRO STATE
    // ============================================================

    class KeyIntroState {
        constructor() {
            this.levelId = 1;
            this.highestUnlocked = 1;
            this.animTimer = 0;
            this.introData = null;
            this.keyPositions = {};
        }

        enter(params) {
            this.levelId = params.levelId || 1;
            this.highestUnlocked = params.highestUnlocked || 1;
            this.animTimer = 0;
            this.introData = KEY_INTRO_DATA[this.levelId] || null;

            // Precompute key positions for the keyboard display
            var keySize = 44;
            var gap = 4;
            var totalRowWidth = 10 * keySize + 9 * gap;
            var startX = (800 - totalRowWidth) / 2;
            var startY = 200;

            this.keyPositions = {};
            for (var r = 0; r < KEYBOARD_ROWS.length; r++) {
                var row = KEYBOARD_ROWS[r];
                for (var c = 0; c < row.length; c++) {
                    var kx = startX + ROW_OFFSETS[r] + c * (keySize + gap);
                    var ky = startY + r * (keySize + gap);
                    this.keyPositions[row[c]] = { x: kx, y: ky, row: r, col: c };
                }
            }
        }

        update(dt, input, stateManager) {
            this.animTimer += dt;
            var keys = input.getKeys();
            for (var i = 0; i < keys.length; i++) {
                if (keys[i] === 'Enter') {
                    stateManager.change('play', { levelId: this.levelId, highestUnlocked: this.highestUnlocked });
                    return;
                } else if (keys[i] === 'Escape') {
                    stateManager.change('menu', { highestUnlocked: this.highestUnlocked });
                    return;
                }
            }
        }

        draw(renderer) {
            var data = this.introData;
            if (!data) return;

            var keySize = 44;
            var gap = 4;

            // Level title
            var levelName = '';
            for (var i = 0; i < LEVELS.length; i++) {
                if (LEVELS[i].id === this.levelId) { levelName = LEVELS[i].name; break; }
            }
            renderer.drawText('Level ' + this.levelId + ': ' + levelName, renderer.width / 2, 40, { size: 28, color: '#e94560' });
            renderer.drawText(data.fingerName, renderer.width / 2, 75, { size: 18, color: '#aaaaaa' });

            var newKeyLabels = data.newKeys.map(function(k) { return k === ' ' ? 'SPACE' : k === ';' ? ';' : k.toUpperCase(); });
            renderer.drawText('New keys: ' + newKeyLabels.join(' and '), renderer.width / 2, 105, { size: 16, color: '#ffffff' });

            // Draw keyboard
            var homeRowKeys = ['a','s','d','f','j','k','l',';'];
            var isHomeRowLevel = this.levelId <= 4;

            for (var r = 0; r < KEYBOARD_ROWS.length; r++) {
                var row = KEYBOARD_ROWS[r];
                for (var c = 0; c < row.length; c++) {
                    var key = row[c];
                    var pos = this.keyPositions[key];
                    var fm = FINGER_MAP[key];
                    var isNewKey = data.newKeys.indexOf(key) !== -1;
                    var isHome = homeRowKeys.indexOf(key) !== -1;
                    var fingerColor = FINGER_COLORS[fm[1]];

                    // Key background
                    var bgColor, borderColor, textColor;
                    if (isNewKey) {
                        // Pulsing bright
                        var pulse = 0.6 + 0.4 * Math.sin(this.animTimer * 4);
                        renderer.ctx.globalAlpha = pulse;
                        bgColor = fingerColor;
                        borderColor = '#ffffff';
                        textColor = '#ffffff';
                    } else if (isHome) {
                        renderer.ctx.globalAlpha = 0.3;
                        bgColor = fingerColor;
                        borderColor = '#555555';
                        textColor = '#888888';
                    } else {
                        renderer.ctx.globalAlpha = 0.15;
                        bgColor = '#333344';
                        borderColor = '#444444';
                        textColor = '#555555';
                    }

                    renderer.ctx.fillStyle = bgColor;
                    renderer.ctx.fillRect(pos.x, pos.y, keySize, keySize);
                    renderer.ctx.strokeStyle = borderColor;
                    renderer.ctx.lineWidth = isNewKey ? 2 : 1;
                    renderer.ctx.strokeRect(pos.x, pos.y, keySize, keySize);
                    renderer.ctx.globalAlpha = 1.0;

                    // Key label
                    var label = key === ';' ? ';' : key.toUpperCase();
                    renderer.drawText(label, pos.x + keySize / 2, pos.y + keySize / 2, {
                        size: 16, color: textColor
                    });
                }
            }

            // Draw spacebar below the bottom row
            var spaceBarY = 200 + 3 * (keySize + gap);
            var spaceBarW = 260;
            var spaceBarX = (800 - spaceBarW) / 2;
            var isSpaceNew = data.newKeys.indexOf(' ') !== -1;
            if (isSpaceNew) {
                var sPulse = 0.6 + 0.4 * Math.sin(this.animTimer * 4);
                renderer.ctx.globalAlpha = sPulse;
                renderer.ctx.fillStyle = '#f59e0b';
                renderer.ctx.fillRect(spaceBarX, spaceBarY, spaceBarW, keySize);
                renderer.ctx.strokeStyle = '#ffffff';
                renderer.ctx.lineWidth = 2;
                renderer.ctx.strokeRect(spaceBarX, spaceBarY, spaceBarW, keySize);
                renderer.ctx.globalAlpha = 1.0;
                renderer.drawText('SPACE', spaceBarX + spaceBarW / 2, spaceBarY + keySize / 2, {
                    size: 12, color: '#ffffff'
                });
            } else {
                renderer.ctx.globalAlpha = 0.15;
                renderer.ctx.fillStyle = '#333344';
                renderer.ctx.fillRect(spaceBarX, spaceBarY, spaceBarW, keySize);
                renderer.ctx.strokeStyle = '#444444';
                renderer.ctx.lineWidth = 1;
                renderer.ctx.strokeRect(spaceBarX, spaceBarY, spaceBarW, keySize);
                renderer.ctx.globalAlpha = 1.0;
                renderer.drawText('SPACE', spaceBarX + spaceBarW / 2, spaceBarY + keySize / 2, {
                    size: 12, color: '#555555'
                });
            }

            // Fingertip positions
            var homeRowY = 200 + (keySize + gap);
            var tipY = homeRowY + keySize / 2;
            var tipRadii = [12, 14, 15, 14]; // pinky, ring, middle, index
            var thumbRadius = 15;
            // Vertical offsets to suggest hand arc: pinky=2x, ring=x, middle=0, index=x
            var fingerYOff = [10, 5, 0, 5]; // pinky, ring, middle, index

            // Home key mappings
            var lHomeKeys = ['a','s','d','f'];
            var rHomeKeys = [';','l','k','j'];

            // Thumb positions on spacebar
            var spaceBarCY = spaceBarY + keySize / 2;
            var lThumbHome = { x: spaceBarX + spaceBarW * 0.35, y: spaceBarCY };
            var rThumbHome = { x: spaceBarX + spaceBarW * 0.65, y: spaceBarCY };

            // Press animation cycle
            var loopDur = 2.0;
            var t = (this.animTimer % loopDur) / loopDur;
            var pressAmt = t < 0.3 ? t / 0.3 : t < 0.5 ? 1 : t < 0.8 ? 1 - (t - 0.5) / 0.3 : 0;
            pressAmt = Math.max(0, Math.min(1, pressAmt));
            pressAmt = pressAmt * pressAmt * (3 - 2 * pressAmt);

            // Determine which finger/thumb is pressing
            var activeKeyIdx = data.newKeys.length > 1 ? Math.floor(this.animTimer / loopDur) % data.newKeys.length : 0;
            var activeKey = data.newKeys[activeKeyIdx];

            var pressedHand = -1;   // 0=left, 1=right
            var pressedFinger = -1; // 0-3 for fingers, 4 for thumb
            var pressTargetX = 0, pressTargetY = 0;
            var hlColor = null;

            if (activeKey === ' ') {
                // Spacebar: alternate thumbs each cycle
                pressedHand = Math.floor(this.animTimer / loopDur) % 2;
                pressedFinger = 4;
                pressTargetX = spaceBarX + spaceBarW / 2;
                pressTargetY = spaceBarCY;
                hlColor = '#f59e0b';
            } else {
                var akPos = this.keyPositions[activeKey];
                var akFm = FINGER_MAP[activeKey];
                if (akFm && akPos) {
                    pressedHand = akFm[0];
                    pressedFinger = akFm[1];
                    pressTargetX = akPos.x + keySize / 2;
                    pressTargetY = akPos.y + keySize / 2;
                    hlColor = FINGER_COLORS[akFm[1]];
                }
            }

            // Draw all 10 fingertips
            // Left hand fingers (pinky=0, ring=1, middle=2, index=3)
            for (var li = 0; li < 4; li++) {
                var lkp = this.keyPositions[lHomeKeys[li]];
                var fx = lkp.x + keySize / 2;
                var fy = tipY + fingerYOff[li];
                var isActive = (pressedHand === 0 && pressedFinger === li);
                if (isActive && pressAmt > 0) {
                    fx += (pressTargetX - fx) * pressAmt;
                    fy += (pressTargetY - (tipY + fingerYOff[li])) * pressAmt;
                }
                var fAlpha = isActive ? 0.85 : 0.35;
                renderer.drawFingerTip(fx, fy, tipRadii[li], fAlpha, FINGER_COLORS[li], false, 0);
            }

            // Right hand fingers
            for (var ri = 0; ri < 4; ri++) {
                var rkp = this.keyPositions[rHomeKeys[ri]];
                var fx = rkp.x + keySize / 2;
                var fy = tipY + fingerYOff[ri];
                var isActive = (pressedHand === 1 && pressedFinger === ri);
                if (isActive && pressAmt > 0) {
                    fx += (pressTargetX - fx) * pressAmt;
                    fy += (pressTargetY - (tipY + fingerYOff[ri])) * pressAmt;
                }
                var fAlpha = isActive ? 0.85 : 0.35;
                renderer.drawFingerTip(fx, fy, tipRadii[ri], fAlpha, FINGER_COLORS[ri], false, 0);
            }

            // Left thumb
            var ltx = lThumbHome.x, lty = lThumbHome.y;
            var ltActive = (pressedHand === 0 && pressedFinger === 4);
            if (ltActive && pressAmt > 0) {
                ltx += (pressTargetX - ltx) * pressAmt;
                lty += (pressTargetY - lty) * pressAmt;
            }
            renderer.drawFingerTip(ltx, lty, thumbRadius, ltActive ? 0.85 : 0.35, '#f59e0b', true, 0.3);

            // Right thumb
            var rtx = rThumbHome.x, rty = rThumbHome.y;
            var rtActive = (pressedHand === 1 && pressedFinger === 4);
            if (rtActive && pressAmt > 0) {
                rtx += (pressTargetX - rtx) * pressAmt;
                rty += (pressTargetY - rty) * pressAmt;
            }
            renderer.drawFingerTip(rtx, rty, thumbRadius, rtActive ? 0.85 : 0.35, '#f59e0b', true, -0.3);

            // Instructions below
            renderer.drawText('Place your fingers on the home row', renderer.width / 2, renderer.height - 80, { size: 14, color: '#888888' });

            // Pulsing "Press Enter to start"
            var enterPulse = 0.5 + 0.5 * Math.sin(this.animTimer * 3);
            var enterColor = 'rgba(74, 222, 128, ' + enterPulse + ')';
            renderer.drawText('Press Enter to start', renderer.width / 2, renderer.height - 45, { size: 18, color: enterColor });
        }

        exit() {}
    }

    // ============================================================
    // GAME (entry point)
    // ============================================================

    var canvas = document.getElementById('gameCanvas');
    var ctx = canvas.getContext('2d');
    var renderer = new Renderer(ctx, canvas.width, canvas.height);

    // Load background images
    var menuBgImg = new Image();
    menuBgImg.onload = function() { renderer.menuBgImage = menuBgImg; };
    menuBgImg.src = 'Focused trio in a high-tech hub.png';
    var gameBgImg = new Image();
    gameBgImg.onload = function() { renderer.gameBgImage = gameBgImg; };
    gameBgImg.src = 'Bad-Guy.jpg';
    var input = new InputHandler();
    var musicManager = new MusicManager();
    var states = new StateManager();

    states.register('menu', new MenuState());
    states.register('play', new PlayState());
    states.register('win', new WinState());
    states.register('lose', new LoseState());
    states.register('keyIntro', new KeyIntroState());
    states.change('menu', {});

    var previousTime = 0;

    function loop(currentTime) {
        var dt = (currentTime - previousTime) / 1000;
        previousTime = currentTime;
        if (dt > 0.1) dt = 0.1;

        if (states.currentState) {
            states.currentState.update(dt, input, states);
        }

        renderer.clear();
        if (states.currentState) {
            states.currentState.draw(renderer);
        }

        if (musicManager) {
            var muteText = musicManager.muted ? 'MUTED (press 0)' : '0 = mute';
            var muteColor = musicManager.muted ? '#e94560' : '#333355';
            renderer.drawText(muteText, 70, renderer.height - 15, { size: 12, color: muteColor, align: 'left' });
        }

        input.flush();
        requestAnimationFrame(loop);
    }

    requestAnimationFrame(loop);

})();
