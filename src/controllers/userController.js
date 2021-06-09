const express = require('express')
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth')

function generateToken (params = {} ) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: '180'
    })
}

exports.create = async (req, res) => {
    const { username, password } = req.body
    try {
        if( await User.findOne({username}))
          res.send({ error: true, status: 400, message: "Usuario existente", data: [] })
        
        const user = await User.create({username, password})
       
        res.send({ error: true, status: 400, message: "Senha invalida", data: {user: user, token: generateToken({id: user.id})} })
    } catch (error) {
        console.log(error);
        res.send({ error: true, status: 500, message: "erro interno reporte o erro", data: [] })
    }
}

exports.authenticate = async (req, res) => {
    const { username, password} = req.body
    const user = User.findOne({ username })

    if (!user) return res.send({ error: true, status: "400", message: "Usuario inexistente", data: [] })

    if (!await bcrypt.compare(password, user.password)) return res.send({ error: true, status: 400, message: "Senha invalida", data: [] })

    

    res.send({ error: false, status: 200, message: "Sucesso!", data: { user, token: generateToken({id: user.id}) }})
}
