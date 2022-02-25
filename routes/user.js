const express = require('express');
const router = express.Router();
const middle = require('../Middleware/verification')
const {CreateUser, getUser, userLogin, UserLogout} = require('../controller/Registration');
const {postCreate, getCreated_Posts} = require('../controller/CreatePosts')
const {post_LikeDislike, get_LikeDislike} = require('../controller/like_Dislike');

router.post('/api/CreateInfo', CreateUser);
router.get('/api/getInfo', getUser);
router.post('/api/login',  userLogin);
router.get('/api/logout', UserLogout)


router.post('/api/post_createPosts',middle, postCreate);
router.get('/api/get_createPosts',  getCreated_Posts);


router.post('/api/post_LikeDislike',middle,  post_LikeDislike);
router.get('/api/get_LikeDislike', get_LikeDislike);


module.exports = router;