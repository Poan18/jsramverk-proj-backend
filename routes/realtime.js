const connections = new Set();
const db = require("../db/database.js");

const wsHandler = (ws) => {
    connections.add(ws);

    ws.on('message', (message) => {
        db.all("SELECT * FROM Objects",
            (err, objectInfo) => {
                connections.forEach((conn) => conn.send(JSON.stringify(objectInfo)));
            })
    });

    ws.on('close', () => {
        connections.delete(ws);
    })
}

module.exports = wsHandler;
