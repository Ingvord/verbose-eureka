const express = require('express');
const router = express.Router();
const users = require("../test/mock/data").users;
const experiments = require("../test/mock/data").experiments;
const joint = require("../test/mock/data").joint;


router.get('/users', (req, res) => {
    res.json(users);
});

router.get(`/users/:proposal_number`, (req, res) => {
    const proposal_number = req.params.proposal_number;
    const proposal = joint.find(proposal => proposal.proposal_number === proposal_number);
    if(!proposal) {
        //TODO 403
    }
    const proposalUsers = proposal.users.map(outer => users.find(user => user.id === outer.id));
    res.json(proposalUsers);
});

router.get('/proposals', (req, res) => {
    res.json(experiments);
});

module.exports = router;