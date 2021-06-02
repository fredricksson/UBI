const Contact = require('../models/Contact'); 

const add = async (request, response) =>{  
    const  {phone}  = request.body
    try{
        if(await Contact.findOne({phone: phone}))
            return response.status(200).send({error: true, message: 'Contact already exists'}); 
            const contact = await Contact.create(request.body);
            console.log(contact);
        return response.status(200).send({error: false, message: "Created", data: contact});
    }catch(err){
        console.log(err)
        return response.status(200).send({error:true, message: 'Unable to register Contact'});
    }
};

const readContact = async (request, response) =>{
    return response.status(200).send({error: false, message: "sucesso!", data: await Contact.find()})
 };
 const  readContactBynameOrContact= async (request, response) =>{
     const { value } = request.body;
      Contact.find({ $or:[{ame: value}, {phone: value}]}, (err, contacts) => {
        if(err) return response.status(204).send({error: true, message: 'Error updating user'});
        return response.status(200).send({data: contact, error: false, message: "updated"});
     })
    return response.status(200).send({error: false, message: "sucesso!", data: await Contact.find()})
 };
 const update = async (request, response) =>{
    const { _id, name, phone, image_url} = request.body;
    const contact = {
        _id,
        name,
        phone,
        image_url
        
    };


    Contact.findByIdAndUpdate({_id: id}, contact, {upsert: false} ,function(err, contact){
        if(err) return response.status(200).send({error: true, message: 'Error updating user'});
         return response.status(200).send({data: contact, error: false, message: "updated"});
     });
};

const deleteOne = async(request, response) =>{
    const {id} = request.params;

    
    Contact.findOneAndUpdate(
        {"_id" : id},
        {new : true},
        function(err){
            if(err === null) return response.status(400).send({err: 'Unable to delete'});
            return response.status(200).send({msg: 'successfuly deleted'});    
        }
    )
    }

module.exports =  {
    deleteOne,
    update,
    readContact,
    add,
    readContactBynameOrContact
}