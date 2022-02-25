const knex = require('../Database/db');

// post
post_LikeDislike = (req,res)=>{

    if(!req.body.post_id || req.body.Like == undefined || req.body.Dislike == undefined){ 
        res.send({
            success : false,
            status : 400,
            message : 'All Information are Required...'
        })
        return " "
    }
    const user = {
    user_id : res.userToken.id,   
    post_id : req.body.post_id,
    Like : req.body.Like,
    Dislike : req.body.Dislike
    }
    // console.log(user);

    knex('Like_DisLike').insert(user).then(()=>{
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




get_LikeDislike = (req,res)=>{
        knex('Like_DisLike')
        .join('CreatePosts', 'Like_DisLike.id', 'CreatePosts.id')//.where("post_id", req.body.post_id)
        .select('*')
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


module.exports = {post_LikeDislike, get_LikeDislike};