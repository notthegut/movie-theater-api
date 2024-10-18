const express = require("express");
const { User, Show } = require('../models/index'); 
const router = express.Router();
const { body, validationResult } = require('express-validator');

router.get("/", async (req,res) =>{
    const users = await User.findAll();
    res.status(200).json(users);
});

router.get("/:id", async (req,res) =>{
    const user = await User.findByPk(req.params.id);
    res.status(200).json(user)
});

router.get("/:id/shows", async (req,res) =>{
    const user = await User.findByPk(req.params.id);
    if(user) {
        const show = await user.getShows();
        res.status(200).json(show)
    } else {
        res.status(404).json({message: "not found"})
    }
});

router.put("/:id/shows:showId", async (req,res) =>{
    const user = await User.findByPk(req.params.id);
    const show = await Show.findByPk(req.params.showId);
    
    if (user && show){
        await user.addShow(show);
        res.json({message : "Show added to the user"})
    }
});

module.exports = router;

