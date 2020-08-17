'use strict';

const express = require('express');
const cors = require('cors'); //remove on production/live !
const nano = require('nano')('http://admin:admin@localhost:5984');
const parser = require('body-parser');

const dbName = 'questions';
const port = 80;
const server = express();
let questionsDB = nano.db.use(dbName);
server.use(express.static('public'));
server.use(cors());

console.log(
    // cors
);

server.use(parser.json());

nano.db.get(dbName).then(
    response => true,
    err => nano.db.create(dbName)
).catch(
    console.log
);

let corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
};

server.get('/products/:id', cors(corsOptions), function (req, res, next) {
    res.json({msg: 'This is CORS-enabled for all origins!'})
});


server.post('/send', (req, res) => {
    questionsDB.bulk({docs: req.body}
    ).then(
        () => {
            res.send(JSON.stringify({
                status: 'ok'
            }))
        }
    );
});




let dataArr = [];
// server.get('/result', (req, res) => {
    questionsDB.list({include_docs: true}).then(
        response => {
            response.rows.forEach(row => {
                console.log(row.doc);

                // dataArr.push(row.doc);
                // console.log(dataArr);
            })
        }).catch(console.log);
    // console.log(dataArr);
    // res.send(dataArr);
    dataArr = [];
// });

server.listen(port, function () {
    console.log('CORS-enabled web server listening on port 80')
});

