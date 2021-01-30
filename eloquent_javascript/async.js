// Chapter 11 Eloquent JavaScript: Asynchronous JavaScript

// callbacks:
setTimeout(() => console.log('tick'), 500);
// expect 'tick' after about half a second


import {bigOak} from './crow-tech';
bigOak.readStorage('food caches', caches => {
    let firstCache = caches[0];
    bigOak.readStorage(firstCache, info => {
        console.log(info);
    });
});

bigOak.send('cow pasture', 'note', 'let\'s caw loudly at 7pm', () => console.log('note delivered'));
defineRequestType('note', (nest, content, source, done) => {
    console.log(`${nest.name} received note: ${content}`);
    done();
})

let fifteen = Promise.resolve(15);
fifteen.then(value => console.log(`Got: ${value}`));

function storage(nest, name) {
    return new Promise(resolve => {
        nest.readStorage(name, result => resolve(result));
    });
}

storage(bigOak, "enemies")
    .then(value => console.log('Got', value));

new Promise((_, reject) => reject(new Error('fail'))) // note resolve is left as "_", forcing rejection
    .then(value => console.log("Handler 1")) // never resolved, therefore this line never runs
    .catch(reason => {
        console.log("caught failure:", reason); // expect "caught failure: Error: fail"
        return "nothing";
    })
    .then(value => console.log("Handler 2", value)); // chained to catch, so this WILL run
    // after the error details above, expect: "Handler 2 nothing"

// more crow stuff

class Timeout extends Error {}; 
// extending Error allows us to make a specific return under certain failure conditions

function request(nest, target, type, content) {
    return new Promise((resolve, reject) => {
        let done = false;
        function attempt(n) {
            nest.send(target, type, content, (failed, value) => {
                done = true;
                if (failed) reject(failed);
                else resolve(value);
            });
        setTimeout(() => { // note that the 250ms wait is first, even though it's the second argument
            if (done) return; 
            else if (n < 3) attempt(n+1); // Note: regular loop wouldn't allow us to wait for async action
            else reject(new Timeout('timed out'));
        }, 250) // arbitrary - could get multiple deliveries, so handlers must make sure duplicates are harmless
        }
        attempt(1);
    })
}

function requestType(name, handler) {
    defineRequestType(name, (nest, content, source, callback) => {
        try {
            Promise.resolve(handler(next, content, source)) // Promise.resolve converts return value of handler to promise if not already
                .then(response => callback(null, response),
                      failure => callback(failure));
        } catch(exception) {
            callback(exception);
        }
    })
}

// Promise.all and 'ping' requests

requestType('ping', () => 'pong');

function availableNeighbors(nest) {
    let request = nest.neighbors.map(neighbor => {
        return request(neighbor, nest, 'ping')
            .then(() => true, () => false); 
    });
    return Promise.all(requests).then(result => {
        return nest.neighbors.filter((_, i) => result[i]);
    });
}

import {everywhere} from './crow-tech';

everywhere(nest => {
    nest.state.gossip = [];
});

function sendGossip(nest, message, exceptFor = null) {
    nest.state.gossip.push(message); // add this to the current nest's gossip array
    for (let neighbor of nest.neighbors) { 
        if (neighbor == exceptFor) continue; // skip over exceptions
        request(nest, neighbor, 'gossip', message); // send a gossip-type request to each neighbor
    }
}

requestType('gossip', (nest, message, source) => { // defines 'gossip' type request
    if (nest.state.gossip.includes(message)) return; // they already have the gossip
    console.log(`nest ${nest.name} received gossip ${message} from ${source}`); 
    sendGossip(nest, message, source); // otherwise send it to their neighbors (except for source)
})

// this style of network communication is called flooding - it blindly sends the gossip everywhere
// except for the source - and it ignores messages it has already received

requestType("connections", (nest, {name, neighbors}, source) => {
    let connections = nest.state.connections; // each nest has an internal state including connections array
    if (JSON.stringify(connections.get(name)) == JSON.stringify(neighbors)) return; // compare strings
    connections.set(name, neighbors); // 
    broadcastConnections(nest, name, source);
});

function broadcastConnections(nest, name, exceptFor = null) {
    for (let neighbor of nest.neighbors) {
        if (neighbor == exceptFor) continue; // skip over sender
        request(nest, neighbor, "connections", { // connections type request includes connection object
            name,
            neighbors: nest.state.connections.get(name)
        });
    }
}

everywhere(nest => {
    nest.state.connections = new Map();
    nest.state.connections.set(nest.name, nest.neighbors);
    broadcastConnections(nest, nest.name)
})

function findRoute(from, to, connections) {
    let work = [{at: from, via: null}]; // work is a list of objects starting with an at: from and via: null
    for (let i = 0; i < work.length; i++) { // iterate through the work list
        let {at, via} = work[i]; // destructure the current work object
            for (let next of connections.get(at) || []) { // iterate through the connections Map
                if (next == to) return via; // if there is a direct connection, return it
                if (!work.some(w => w.at == next)) { // if there are no work objects with an at property equal to the next value
                    work.push({at: next, via: via || next}); // push the next value onto work
                }
            }
    }
    return null;
}

function routeRequest(nest, target, type, content) {
    if (nest.neighbors.includes(target)) {
        return request(nest, target, type, content); // if its target is a neighbor, send a regular request
    } else {
        let via = findRoute(nest.name, target, nest.state.connections); // findRoute to identify next stop
        if (!via) throw new Error(`No route to ${target}`); // if findroute returns null, there is no route
        return request(nest, via, "route", {target, type, content}); // send new request of type "route"
    }
}

requestType("route", (nest, {target, type, content}) => {
    return routeRequest(nest, target, type, content); 
}); // the "route" type request calls routeRequest at the next nest

requestType("storage", (nest, name) => storage(nest, name));

// function findInStorage(nest, name) {
//     return storage(nest, name).then(found => {
//         if (found != null) return found;
//         else return findInRemoteSTorage(nest, name);
//     });
// }

function network(nest) {
    return Array.from(nest.state.connections.keys()); // connections is a Map, so Object.keys won't work - it has a keys method that returns an iterator
} // however, since it returns an iterator, it can be converted into an array with the Array.from function

function findInRemoteStorage(nest, name) {
    let sources = network(nest).filter(n => n != nest.name); 
    function next() {
        if (sources.length == 0) {
            return Promise.reject(new Error("Not found")); // iterated through all the nests and did not found what we were looking for
        } else {
            let source = sources[Math.floor(Math.random() * sources.length)]; // weird that this is just a random item on the array... 
            return routeRequest(nest, source, "storage", name) 
                .then(value => value != null ? value : next(), next); 
        }
    }
    return next();
}

async function findInStorage(nest, name) { // note that methods can be made async the same way, by writing the keyword before their name
    let local = await storage(nest, name);
    if (local != null) return local;

    let sources = network(nest).filter(n => n != nest.name);
    while (sources.length > 0) {
        let source = sources[Math.floor(Math.random() * sources.length)];
        sources = sources.filter(n => n != source);
        try {
            let found = await routeRequest(nest, source, 'storage', name);
            if (found != null) return found;
        } catch (_) {}
    }
    throw new Error("Not found");
}