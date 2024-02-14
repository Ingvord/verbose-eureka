import {verbose} from "sqlite3";
import {randomExperiments, randomUsers} from "./test/mock/data";
import {range} from "./src/utils";

const sqlite3 = verbose();

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const DB_PATH = './db.db'; // Path to DB file

const db = new sqlite3.Database(DB_PATH, (err) => {
    if (err) {
        console.error('Error opening database', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        const users = randomUsers();
        const experiments = randomExperiments();
        initialize(users, experiments);
    }
});



function initialize(users, experiments) {
    db.serialize(() => {
        // Create Users table
        db.run(`CREATE TABLE IF NOT EXISTS Users (
                                                     id INTEGER PRIMARY KEY AUTOINCREMENT,
                                                     name TEXT NOT NULL,
                                                     orcid TEXT UNIQUE NOT NULL
                )`);

        // Create Experiments table
        db.run(`CREATE TABLE IF NOT EXISTS Experiments (
                                                           id INTEGER PRIMARY KEY AUTOINCREMENT,
                                                           proposal_number TEXT UNIQUE NOT NULL,
                                                           abstract TEXT NOT NULL,
                                                           begin_date TEXT NOT NULL,
                                                           end_date TEXT NOT NULL
                )`);

        // Create ExperimentUser junction table
        db.run(`CREATE TABLE IF NOT EXISTS ExperimentUser (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            proposal_number TEXT NOT NULL,
            user_id INTEGER NOT NULL,
            FOREIGN KEY (proposal_number) REFERENCES Experiments (proposal_number),
            FOREIGN KEY (user_id) REFERENCES Users (id),
            UNIQUE (proposal_number, user_id) ON CONFLICT IGNORE
        )`);

        // Insert sample data into Users
        const insertUser = db.prepare('INSERT INTO Users (name, orcid) VALUES (?, ?)');
        users.forEach(user => {
            insertUser.run(user.name, user.orcid);
        });
        insertUser.finalize();

        // Insert sample data into Experiments
        const insertExperiment = db.prepare('INSERT INTO Experiments (proposal_number, abstract, begin_date, end_date) VALUES (?, ?, ?, ?)');
        experiments.forEach(exp => {
            insertExperiment.run(exp.proposal_number, exp.abstract, exp.begin_date, exp.end_date);
        });
        insertExperiment.finalize();

        // Insert sample associations into ExperimentUser
        db.serialize(() => {
            const insertAssociation = db.prepare('INSERT INTO ExperimentUser (proposal_number, user_id) VALUES (?, ?)');

            range(1,100)
                .flatMap(expNumber => Array.from(
                    new Set(
                        range(1, getRandomInt(1,5))
                            .map(() => getRandomInt(1, 20))))
                    .map(userId => ({
                        expNumber,
                        userId
                })))
                .forEach(pair => insertAssociation.run(`EXP-${String(pair.expNumber).padStart(3, '0')}`, pair.userId))


            insertAssociation.finalize();
        });
    });
}

// Close the database connection for clean shutdown
process.on('SIGINT', () => {
    db.close(() => {
        console.log('Closed the database connection.');
        process.exit(0);
    });
});