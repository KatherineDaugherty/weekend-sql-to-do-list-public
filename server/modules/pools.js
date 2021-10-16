//Database connection 
const pg = require("pg");

const config = {
    database: `list`,
    host: `weekend_to_do_app`,
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000,
};

const pool = new pg.Pool(config);

pool.on(`connect`, () => {
    console.log('PostgreSQL connected');
});

pool.on(`error`, (error) => {
    console.log('ERROR connecting to postgreSql', error);
}); 

module.exports = pool;