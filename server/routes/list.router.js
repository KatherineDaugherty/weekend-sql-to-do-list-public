const express = require("express");
const router = express.Router();
//server connection 

const pool = require("../modules/pools");

router.get('/', (req,res) => {
    console.log('inside GET');
    let queryText = `SELECT * FROM "list"
    ORDER BY "id"
    ;`;
    pool 
    .query(queryText)
    .then((result) => {
        res.send(result.rows);
    })
    .catch((err) => {
        console.log('ERROR in GET query', err);
        res.sendStatus(500);
    });
});








module.exports = router;