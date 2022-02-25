const res = require('express/lib/response');
const knex = require('../Database/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

const saltRounds = 10;

//Create data 
CreateUser = (req,res)=>{
    // const {password} =req.body;
    // const hash = bcrypt.hashSync(password, saltRounds)
    if(!req.body.email || !req.body.password){
        res.send({statement : false,
            status :201,
            message : 'Fill All Information'
        })
        return ""
    }
    const userData = {
        email : req.body.email,
        password : bcrypt.hashSync(req.body.password, saltRounds)       
    }
    console.log(userData);
    knex('Registeration').insert(userData).then((count)=>{
    res.send({success : 'Successfull',
        message : `${count} information inserted`
    })
    })
    .catch((err)=>{
        res.send({massage : err});
        console.log('Data Is Not Inserted');
    })
};




// get data
getUser = (req,res)=>{
    knex('Registeration').select('*').then((data)=>{
        res.send({statement : true,
        status : 200,
    'Information' : [data]
    })
    })
    .catch((err)=>{
        res.send({message : err});
        console.log(err);
    })
};




//login
userLogin = (req,res)=>{
    if(!req.body.email || !req.body.password){
        res.send({statement : false,
            status :201,
            message : 'Email and Password Both Are Required'
        })
        return ""
    }
    else{
        knex.select("*").from('Registeration').where('email', '=', req.body.email, 'password', '=', req.body.password)
        .then((data)=>{
            const token = jwt.sign({"id": data[0].id}, "KarunaJaiswal");
            res.cookie('user',token);
            console.log({message : data});
            bcrypt.compare(req.body.password, data[0].password, (err, result)=>{
                if(result){
                    res.send({
                        statement : true,
                        status : 200,
                        message : 'Login successfully',
                        'token' : token
                    })
                }
                else{
                    res.json({
                        success : false,
                        message : 'passwords do not match'
                    });
                }
                })
        })
        .catch((err)=>{
            res.json({message : 'Your Email Id Is Wrong '});
            console.log(err);
        })
    }
}




//UserLogout
UserLogout = (req,res)=>{
    res.clearCookie('user')
    res.json({message:'logout successfully'})
  }



module.exports = {CreateUser, getUser, userLogin, UserLogout};