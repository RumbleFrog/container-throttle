const { Throttle }  = require('../dist');

function r() {
    let t = new Throttle();

    console.log(t.throttle({
        container: '1',
        id: 'fishy',
        usages: 2,
        duration: 5
    }));

    console.log(t.throttle({
        container: '1',
        id: 'fishy',
        usages: 2,
        duration: 5
    }));

    console.log(t.throttle({
        container: '1',
        id: 'fishy',
        usages: 2,
        duration: 5
    }));

    setTimeout(() => {
        console.log(t.throttle({
            container: '1',
            id: 'fishy',
            usages: 2,
            duration: 5
        }));
    }, 1000 * 6);

    console.log(t.throttle({
        container: '2',
        id: 'fishy',
        usages: 2,
        duration: 5
    }));
}

r();