const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Comments, Expenses, Day, Places, Post, Story, Trip, User, userTrip } = require('../models');
//insert cons for password package


// get all 
router.get('/', (req, res) => {
    console.log('======================');
    Posts.findAll({
        attributes: [
            'id',
            'content',
            'user_id',
            'story_id',
            'created_at',
            //[sequelize.literal('(SELECT COUNT(*) FROM vote WHERE posts.id = vote.posts_id)'), 'vote_count']
        ],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbPostsData => res.json(dbPostsData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});



//get one

router.get('/:id', (req, res) => {
    Posts.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'content',
            'user_id',
            'story_id',
            'created_at',
            //[sequelize.literal('(SELECT COUNT(*) FROM vote WHERE posts.id = vote.posts_id)'), 'vote_count']
        ],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbPostsData => {
            if (!dbPostsData) {
                res.status(404).json({ message: 'No matching data found with this id' });
                return;
            }
            res.json(dbPostsData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});





// create new entries


router.post('/', (req, res) => {
    Posts.create({
        content: req.body.content,
        user_id: req.session.user_id,
        story_id: req.body.story_id
    })
        .then(dbPostsData => res.json(dbPostsData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


// Update 

router.put('/:id', (req, res) => {
    Posts.update(
        {
            content: req.body.content
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
        .then(dbPostsData => {
            if (!dbPostsData) {
                res.status(404).json({ message: 'No matching data found with this id' });
                return;
            }
            res.json(dbPostsData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});



//delete


router.delete('/:id', (req, res) => {
    console.log('id', req.params.id);
    Posts.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbPostsData => {
            if (!dbPostsData) {
                res.status(404).json({ message: 'No matching data found with this id' });
                return;
            }
            res.json(dbPostsData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;
