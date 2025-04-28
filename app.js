const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();
app.use(express.json());
const {JWT_SECRET} = process.env;
const USER = ({username: 'admin', password: 'password123'});

app.get('/',(req,res)=>{
    res.send("Welcome to portal. Use /login to access the details");
});

app.post('/login',(req,res)=>{
    const {userName,passcode}=req.body;
    if(userName!==USER.username || passcode!==USER.password)
        return res.status(401).json({msg: 'invalid'});
    const token = jwt.sign({userName},JWT_SECRET,{expiresIn: '10m'});
    res.json({token});
});

app.get('/dashboard',(req,res)=>{
    const token = ({userName},JWT_SECRET,{passcode});
    if(!token) return res.status(401).json({msg: 'Unauthorized'})
    jwt.verify({userName},JWT_SECRET,{passcode},(err,decoded)=>{
        if(err) return res.status(401).json({msg: 'Unauthorized'})
        res.json({msg: `Welcome to your dashboard!, userName: ${decoded.userName}`})
    })
});
app.listen(3000,()=>console.log('server is running in https://localhost:3000'));

