function spawn() {
    const PILLARS = [
        { color: 'rgb(253, 162, 40)' },
        { color: 'rgb(254, 229, 65)' },
        { color: 'rgb(35, 224, 64)' },
        { color: 'rgb(52, 175, 252)' },
        { color: 'rgb(33, 53, 121)' },
        { color: 'rgb(125, 39, 83)' },
        { color: 'rgb(253, 121, 168)' },
        { color: 'rgb(255, 0, 77)' }
    ];

    const RADIUS = 5;

    PILLARS.forEach(function (p, index, arr) {
        let angle = index * (2 * Math.PI / arr.length);
        let x = Math.cos(angle) * RADIUS;
        let z = Math.sin(angle) * RADIUS;

        let el = document.createElement('a-cylinder');
        el.setAttribute('position', `${x} 0 ${z}`);
        el.setAttribute('color', p.color);

        document.querySelector('a-scene').appendChild(el);
    });
}

window.onload = function () {
    spawn();
};
