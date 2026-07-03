"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const team_1 = require("../models/team");
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    const teams = await team_1.Team.find({}).populate('members').populate('captain').lean();
    res.json({ message: 'Teams route', teams });
});
router.post('/', async (req, res) => {
    const team = await team_1.Team.create(req.body);
    res.status(201).json({ message: 'Team created', team });
});
exports.default = router;
