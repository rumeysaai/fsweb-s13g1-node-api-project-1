//IMPORTS
const express = require('express');
const User = require('./users/model');

//instance of express
const server = express();

//GLOBAL MIDDLEWARE
server.use(express.json());

//ENDPOINTS: CRUD
server.get('/api/users', (req, res) => {
    //returns all users

    User.find()
        .then((response) => {
            res.status(200).json(response);
        })
        .catch((error) => {
            res.status(500).json({ message: "Kullanıcı bilgileri alınamadı" })
        });

})

server.post('/api/users', async (req, res) => {
    //creates a new user

    try {
        let user = req.body;
        if (!user.name || !user.bio) {

            res.status(400).json({ message: "Lütfen kullanıcı için bir name ve bio sağlayın" })
        }
        else {
            let inserted = await User.insert(user);
            res.status(201).json(inserted);
        }
    } catch (error) {
        res.status(500).json({ message: "Veritabanına kaydedilirken bir hata oluştu" })
    }

})

server.get('/api/users/:id', (req, res) => {
    //gets user by id

    User.findById(req.params.id)
        .then((resp) => {
            if (!resp) {
                res
                    .status(404).json({ message: "Belirtilen ID'li kullanıcı bulunamadı" });
            }
            res.status(200).json(resp);
        })
        .catch((err) => {
            res.status(500).json({ message: "Kullanıcı bilgisi alınamadı" });
        });
})

server.delete('/api/users/:id', async(req, res) => {
    //deletes user by id
    try {
        let id = req.params.id;
        let userById=await User.findById(id);
        if(!userById){
            res.status(404).json({message:"Belirtilen ID'li kullanıcı bulunamadı"});
        }
        else{
            let deletedUser = await User.remove(id);
            res.json(deletedUser);
        }
    } catch (error) {
        res.status(500).json({message:"Kullanıcı bilgileri alınamadı"});
    }
})

server.put("/api/users/:id",async(req,res)=>{
    try {
        let id = req.params.id;
        let userById = await User.findById(id);
        if(!userById){
            res.status(404).json({message:"Belirtilen ID'li kullanıcı bulunamadı"});
        }else{
            let user = req.body;
            if(!user.name || !user.bio){
                res.status(400).json({message: "Lütfen kullanıcı için bir name ve bio sağlayın"});
            }else{
                let updatedUser = await User.update(req.params.id,user);
                res.json(updatedUser);
            }
        }
    } catch (error) {
        res.status(500).json({message:"Kullanıcı bilgileri güncellenemedi"});
    }
});

//EXPORT the server
module.exports = server; // SERVERINIZI EXPORT EDİN {}
