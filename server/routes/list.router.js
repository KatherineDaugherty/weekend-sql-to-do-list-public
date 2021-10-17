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
}); // END GET ROUTE --TESTED with postman - WORKS 

router.post(`/`, (req, res) => {
    const newList = req.body;
    let queryText = `INSERT INTO "list" ("item", "complete")
    VALUES ( $1, $2 );`;

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
}); //END POST ROUTE - Tested with postman WORKS! 

router.put("/:id", (req, res) => {
    let id = req.params.id;
    let queryText = `UPDATE "list"
    SET "complete" = TRUE
    WHERE "id" = $1;`;
    console.log(id);
    let values = [id];
    pool.query(queryText, values)
        .then((result) => {
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log(error);
            res.sendStatus(500);
        });
});  //END PUT ROUTE  - tested on POSTMAN WORKS

router.delete("/:id", (req, res) => {
    let id = req.params.id;
    console.log(id);

    let queryText = `DELETE FROM "list" 
    WHERE "id" = $1;`;

    let values = [id];

    pool.query(queryText, values)
        .then((result) => {
            console.log('Result of delete', result);
            res.sendStatus(201);
        })
        .catch((err) => {
            alert("error trying to delete");
            console.log('ERROR trying to delete', err);
            res.sendStatus(501)
        });
}); //END DELETE ROUTE - TESTED ON POSTMAN 

module.exports = router;