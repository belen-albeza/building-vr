function spawn() {
    const PILLARS = [
        { chord: 'C4', color: 'rgb(253, 162, 40)', dur: 2500 },
        { chord: 'D4', color: 'rgb(254, 229, 65)' },
        { chord: 'E4', color: 'rgb(35, 224, 64)', dur: 1500},
        { chord: 'F4', color: 'rgb(52, 175, 252)', dur: 2500 },
        { chord: 'G4', color: 'rgb(33, 53, 121)', },
        { chord: 'A4', color: 'rgb(125, 39, 83)', dur: 1500 },
        { chord: 'B4', color: 'rgb(253, 121, 168)' },
        { chord: 'C5', color: 'rgb(255, 0, 77)' }
    ];

    const RADIUS = 5;

    PILLARS.forEach(function (p, index, arr) {
        let angle = index * (2 * Math.PI / arr.length);
        let x = Math.cos(angle) * RADIUS;
        let z = Math.sin(angle) * RADIUS;

        let el = document.createElement('a-cylinder');
        el.setAttribute('position', `${x} 0 ${z}`);
        el.setAttribute('color', p.color);
        el.setAttribute('pipe', `chord: ${p.chord}; ${p.dur ? 'dur: ' + p.dur : '' }`);

        document.querySelector('a-scene').appendChild(el);
    });
}

window.onload = function () {
    AFRAME.registerComponent('pipe', {
        schema: {
            chord: { type: 'string', default: 'C4' },
            dur: { type: 'number', default: 2000 }
        },
        init: function () {
            this.el.appendChild(this.system.createAnimation(this.data));
        },
    });

    AFRAME.registerSystem('pipe', {
        createAnimation: function (data) {
            let anim = document.createElement('a-animation');

            anim.setAttribute('attribute', 'scale');
            anim.setAttribute('from', '1 1 1');
            anim.setAttribute('to', '1 4 1');
            anim.setAttribute('dur', data.dur / 3);
            anim.setAttribute('direction', 'alternate');
            anim.setAttribute('repeat', 1);
            anim.setAttribute('begin', 'sound');

            return anim;
        }
    });

    spawn();

    // temporary to check whether the animation works
    window.addEventListener('click', function (e) {
        let pillar = document.querySelector('[pipe]');
        pillar.emit('sound');
    });
};
