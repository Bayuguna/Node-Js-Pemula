import User from "../models/User.js";

export const getUser = async (req, res) => {
    try{
        const users = await User.find();
        const authUser = users.filter(users => users.username == req.user.username);

        if(Object.keys(authUser).length === 0)return res.status(404).json({message: `Data user ${req.user.username} tidak ditemukan`})

        res.json(authUser);
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

export const findUser = async (req, res) => {
    const id = await User.findById(req.params.id);
    if(!id) return res.status(404).json({message: `Data dengan id : ${req.params.id} tidak ditemukan`})
    try{
        const users = await User.findById(req.params.id);
        res.json(users);
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

export const postUser = async (req, res) => {
    const user = new User();
    user.username = req.body.username;
    user.email = req.body.email;
    user.password = req.body.password;

    user.setPassword(req.body.password);
    try{
        const saveUser = await user.save();
        res.status(201).json(saveUser);
    }catch(error){
        res.status(400).json({message: error.message})
    }
}

export const updateUser = async (req, res) => {
    const id = await User.findById(req.params.id);
    if(!id) return res.status(404).json({message: `Data dengan id : ${req.params.id} tidak ditemukan`})
    try{
        const users = await User.updateOne({_id: req.params.id}, {$set: req.body});
        res.status(200).json(users);
    }catch(error){
        res.status(400).json({message: error.message})
    }
}

export const deleteUser = async (req, res) => {
    const id = await User.findById(req.params.id);
    if(!id) return res.status(404).json({message: `Data dengan id : ${req.params.id} tidak ditemukan`})
    try{
        const users = await User.deleteOne({_id: req.params.id});
        res.status(200).json(users);
    }catch(error){
        res.status(400).json({message: error.message})
    }
}