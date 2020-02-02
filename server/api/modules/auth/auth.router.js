const express = require('express');
const router = express.Router();
const service = require('./auth.service');

router.post('/register',async function(req,res){
    try{
        const data = await service.register(req.body);
        res.status(200).send({
            data:data,
        });
    }catch(err){
        res.status(500).send({
            error:err.message,
        });
    }
})

router.post('/login',async function(req,res){
    try{
        const data = await service.login(req.body);
        res.status(200).send(data);
    }catch(err){
        res.status(500).send({
            error:err.message,
        });
    }
})


module.exports = router;
