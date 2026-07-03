"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/', (_req, res) => {
    res.json({ message: 'Teams route', teams: [] });
});
router.post('/', (_req, res) => {
    res.status(201).json({ message: 'Team created', team: {} });
});
exports.default = router;
