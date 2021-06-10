const express = require('express')
const Contact = require('../models/Contact')

exports.create = async (req, res) => {
    const { name, phone, image_url } = req.body
    const errors = []
    if (name === undefined)
        errors.push('name e obrigatorio')
    if (phone === undefined)
        errors.push('phone e obrigatorio')
    if (image_url === undefined)
        errors.push('image_url e obrigatorio')
    if (errors.length)
        return res.send({ error: true, status: 400, message: "campos ivalidos", data: errors})

    try {
        if( await Contact.findOne({name}))
          return res.send({ error: true, status: 400, message: "Usuario existente", data: [] })
        
        const contact = await Contact.create({name, phone, image_url})
        res.send({error: false, status: 201, message: 'successo!', data: {contact: contact}})
    } catch (error) {
        console.log(error);
        res.send({ error: true, status: 500, message: "erro interno reporte o erro", data: [] })
    }
}

exports.all = async (req, res) => {
    try {
        res.send({ error: false, status: 200, message: "Sucesso!", data: await Contact.find()})
    } catch (error) {
        res.send({ error: true, status: 500, message: "erro interno!", data: []})
    }
    
}
exports.update = async (req, res) =>{
    const { name, phone, image_url } = req.body
    const errors = []
    if (name === undefined)
        errors.push('name e obrigatorio')
    if (phone === undefined)
        errors.push('phone e obrigatorio')
    if (image_url === undefined)
        errors.push('image_url e obrigatorio')
    if (errors.length)
        return res.send({ error: true, status: 400, message: "campos ivalidos", data: errors})

    try {
       await Contact.findByIdAndUpdate(req.params.id, {
            "$set" :{
                "name": name,
                "phone": phone,
                "image_url": image_url
            }
        })
        res.send({ error: false, status: 200, message: "Sucesso!", data: await Contact.findById(req.params.id)})  
    } catch (error) {
        console.log(error);
        
        res.send({ error: true, status: 500, message: "erro interno!", data: []})
    }
}

exports.delete = async (req, res) => {
    try {
        if (! await Contact.findById(req.params.id))
          return  res.send({ error: true, status: 404, message: "Usuario inexistente", data: [] })
        
          res.send({ error: false, status: 200, message: "Sucesso!", data: await Contact.findByIdAndRemove(req.params.id)}) 
    } catch (error) {
        res.send({ error: true, status: 500, message: "erro interno!", data: []})
    }
}
exports.findByName = async (req, res) =>{
    res.send({ error: false, status: 200, message: "Sucesso!", data: await Contact.findOne({name: req.params.name})})
}