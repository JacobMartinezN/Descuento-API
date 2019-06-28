const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = mongoose.model('User');
const jwt = require('../services/jwt.service');

const Register = async(req, res) => {
    const { code, name, email, password, activate, birth_date, category } = req.body;
    try {
        const user = new User({
            code,
            name,
            email,
            password,
            activate,
            birth_date,
            category
        });
        await user.save();
        return res.status(201).send({
            success: true,
            message: 'Created user!'
        });
    } catch (err) {
        return res.status(500).send({
            success: false,
            message: err.message
        });
    };  
};

const Authenticate = async(req,res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({email});
        if(bcrypt.compareSync(password, user.password)) {
            const token = jwt.createSessionToken(user);
            return res.status(200).send({
                success: true,
                user,
                token
            })
        } else{
            return res.status(404).send({
                success: false,
                message: 'User not found!'
            })
        }
        
    } catch (err) {
        return res.status(500).send({
            success: false,
            message: err.message
        });
    };
};

const Edit = async(req,res) => {
    const { code, name, email, password, activate, birth_date, category } = req.body;
    const id = req.params.id;
    try {
        const user = await User.findById(id);
        user.code = code;
        user.name = name;
        user.email = email;
        user.password = password;
        user.activate = activate;
        user.birth_date = birth_date;
        user.category = category;
        await user.save();

        return res.status(200).send({
            success: true,
            message: 'User update successfully'
        });
    } catch (err) {
        return res.status(500).send({
            success: false,
            message: err.message
        });
    };
};


module.exports = {
    Register,
    Authenticate,
    Edit
};