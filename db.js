var Pool = require('pg').Pool;
var pool = new Pool({
    user: process.env['DB_USER'], //env var: PGUSER 
    database: process.env['DB_DATABASE'], //env var: PGDATABASE 
    password: process.env['DB_PASSWORD'], //env var: PGPASSWORD 
    host: process.env['DB_HOST'], // Server hosting the postgres database 
    max: process.env['DB_MAX_CLIENTS'], // max number of clients in pool
    idleTimeoutMillis: 1000, // close & remove clients which have been idle > 1 second
});

pool.on('error', function(e, client) {
// console.log(e.message, e.trace);
});

function getSegments(bbox) {
    return pool.query('SELECT segment_id, ST_AsGeoJson(segment), segmentnumber, segmenttime FROM tracks');
}

function getPoints(limit) {
    return pool.query('SELECT * FROM positions where time is not null order by time desc limit $1', [limit]);
}

function getTracks(bbox) {
    if (bbox) {

    }
    return pool.query('SELECT segment_id, ST_AsGeoJson(segment), segmentnumber, segmenttime FROM prebuild_temporalsegment');
}


exports.getTracks = getTracks;
exports.getPoints = getPoints;