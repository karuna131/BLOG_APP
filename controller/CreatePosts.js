const knex = require('../Database/db');


//post
postCreate = (req, res)=>{
    if(!req.body.Title || !req.body.Description){
        res.send({success : false,
            status : 400,
            message : 'All Information are Required'
        })
        return ""
    }
    console.log(res.userToken);
    const user = {
        user_id :res.userToken.id,
        Title : req.body.Title,
        Description : req.body.Description
    }

    knex('CreatePosts').insert(user).then(()=>{
        res.json({ "success": true,
        "status": 200,
        "message": "Data Sended successfully"
        })
    })
    .catch((err)=>{
        console.log(err);
        res.send({message : err});
    })
};



//get
getCreated_Posts = (req,res)=>{
    knex('CreatePosts').select('*')
    .then((data)=>{
        res.json({"success": true,
        "status": 200,
        'data' : data
        })
    })
    .catch((err)=>{
        console.log(err);
        res.send({message : err});
    })
};



module.exports = {postCreate, getCreated_Posts};