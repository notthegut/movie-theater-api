const express = require("express");
const {User, Show} = require('../models');
const router = express.Router();

router.get("/users", async (req,res) =>{
    const users = await User.findAll();
    res.status(200).json(users);
});

router.get("/users:id", async (req,res) =>{
    const user = await User.findByPk(req.params.id);
    res.status(200).json(user)
});

router.get("/users:id/shows", async (req,res) =>{
    const user = await User.findByPk(req.params.id, {include : Show});
    res.status(200).json(user.Shows);
});

router.put('/users:id/shows:showId', async (req,res) =>{
    const user = await User.findByPk(req.params.id);
    const show = await Show.findByPk(req.params.showId);
    
    if (user && show){
        await user.addShow(show);
        res.json({message : "Show added to the user"})
    }
});

module.exports = router;

