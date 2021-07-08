const express = require('express')
const UserModel = require('../models').User;
const jwt = require('jsonwebtoken');
const authorize = require('../_helpers/authorize');
const Role = require('../_helpers/role');
var router = express.Router();

router.post('/register',  async (req, res)=> {
    const { email, password, name } = req.body;
    if (!email) return res.status(400).send({ error: '`email` is required' });
    if (!password) return res.status(400).send({ error: '`password` is required' });
    if (!name) return res.status(400).send({ error: '`name` is required' });
    try {
        // check email exist
        const user =  await UserModel.checEmailIdExist(email)
        if (user) return res.status(400).send({ message: "email id alreday exist" });
        //register user
        await  UserModel.create({name,email,password})
        return res.status(200).send({code: 200,status: 'User Registered Successfully'});
    } catch (err) {
        console.log(err);
    }
})
router.post('/login', async(req, res) => {
    const {email,password} = req.body;
    if (!email) return res.status(400).send({error: '`email` is required'});
    if (!password) return res.status(400).send({error: '`password` is required'});
    try{
        const userData =  await UserModel.getUserForLogin({email,password})
        if(userData){
              const tokenPayload = {
                id: userData.id,
                email: userData.email,
                roles: userData.role
            };
            const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 12 });
            return res.status(200).send({code: 200,status: 'success',token});
        }
        else {
            return res.status(400).send({code: 200,status: 'failed'});
        }
    }catch(err){
        console.error(err)
    }
});
router.get('/user-Profile', authorize([Role.User]), (req, res) => {
    return UserModel.getProfile().then(newAgent => {
        if (newAgent) {
            return res.status(200).send({
                code: 200,
                status: 'success',
                newAgent
            });
        }
    });
});
module.exports = router;
