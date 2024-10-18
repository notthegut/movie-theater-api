const express = require("express");
const { Show, User } = require('../models/index')
const router = express.Router();
const { body, validationResult } = require('express-validator');

router.get("/", async (req,res) =>{
    const shows = await Show.findAll();
    res.status(200).json(shows);
});

router.get("/:id", async (req,res) =>{
    const show = await Show.findByPk(req.params.id);
    res.status(200).json(show);
});

router.get("/:id/users", async (req,res) =>{
    const show = await Show.findByPk(req.params.id);
    if(show){
        const user = await show.getUsers();
        res.status(200).json(user)
    } else {
        res.status(404).json({message: "not found"})
    }
});

router.put("/:id", async (req,res) =>{
    if (show) {
        show.avaliable = req.body.avaliable;
        await show.save();
        res.status(200).json({message: "Avaliability updated" });
    } else{
        res.status(404).json({error :"Show not here"});
    }
});

router.delete("/:id", async (req,res) =>{
    const show = await Show.findByPk(req.params.id);
    if (show){
        await show.destroy();
        res.status(200).json({message : "Show Deleted"});
    } else {
        res.status(404).json({error: "Show not here"});
    }
});

router.get("/shows", async (req,res) =>{
    const genre = req.query.genre;
    const shows = await Show.findAll({where:{genre}});
    res.status(200).json(shows)
});

module.exports = router;