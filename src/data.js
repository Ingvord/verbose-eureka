import {open} from "sqlite";
import sqlite3 from "sqlite3";

const DB_PATH = './db.db';


// In-memory storage
let users = [];
let experiments = [];
let joint = [];

async function setup() {
    // Open the database
    const db = await open({
        filename: DB_PATH,
        driver: sqlite3.Database
    });
    // Read all users and experiments into memory
    users = await db.all("SELECT * FROM Users");

    experiments = await db.all("SELECT * FROM Experiments");

    joint = await db.all(`SELECT e.proposal_number,
                                 u.id   AS user_id,
                                 u.name AS user_name,
                                 u.orcid
                          FROM Experiments e
                                   JOIN
                               ExperimentUser eu ON e.proposal_number = eu.proposal_number
                                   JOIN
                               Users u ON eu.user_id = u.id;`);


    joint = joint.reduce((acc, row) => {
        let experiment = acc.find(e => e.proposal_number === row.proposal_number);
        if (!experiment) {
            experiment = {
                proposal_number: row.proposal_number,
                users: []
            };
            acc.push(experiment);
        }

        experiment.users.push({
            user_id: row.user_id,
            name: row.user_name,
            orcid: row.orcid
        });

        return acc;
    }, []);

    await db.close();
}

try {
    await setup();
} catch (e) {
    console.error(e);
}

export {
    users,
    experiments,
    joint
}