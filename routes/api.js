import express from "express";
import {experiments, joint, users} from "../src/data.js";

const router = express.Router();
/**
 * TODO
 */
router.get('/users', (req, res) => {
    res.json(users);
});

/**
 * @swagger
 * /api/users/{proposal_number}:
 *   get:
 *     summary: Returns users for a given proposal
 *     parameters:
 *       - in: path
 *         name: proposal_number
 *         required: true
 *         description: Number of the proposal to get users for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The user ID
 *                   name:
 *                     type: string
 *                     description: The user's name
 *                   orcid:
 *                     type: string
 *                     description: The user's ORCID
 */
router.get(`/users/:proposal_number`, (req, res) => {
    const proposal_number = req.params.proposal_number;
    const proposal = joint.find(proposal => proposal.proposal_number === proposal_number);
    if(!proposal) {
        return res.status(404).send({error:`Can not find proposal number: ${proposal_number}`})
    }
    res.json(proposal.users);
});

/**
 * TODO
 */
router.get('/proposals', (req, res) => {
    res.json(experiments);
});

export default router;