//bring in our modules 
const express = require("express");
const router = express.Router();
const pool = require("../modules/pools");

router.get('/', (req, res) => {
    console.log('inside GET');
    let queryText = `SELECT * FROM "list";`;
    pool.query(queryText)
        .then((result) => {
            res.send(result.rows);
        })
        .catch((err) => {
            console.log('ERROR in GET query', err);
            res.sendStatus(500);
        });
}); // END GET ROUTE --TESTED >>> NOT WORKING  NOT FOUND 

router.post(`/`, (req, res) => {
    const newList = req.body;
    let queryText = `INSERT INTO "list" ("item", "complete")
    VALUES ( 'shower', false );`;

    pool.query(queryText, [
        newList.item,
        newList.complete
    ])
        .then((results) => {
            res.sendStatus(201);
        })
        .catch((err) => {
            console.log('ERROR making POST to DB ');
            res.sendStatus(500);
        });
}); //END POST ROUTE 







module.exports = router;