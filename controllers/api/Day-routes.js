const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Places, Stories, Expenses, Users, Vote } = require('../models');
//insert cons for password package


// get all 
router.get('/', (req, res) => {
    console.log('======================');
    Day.findAll({
        attributes: [
            'id',
            'date',
            'trip_id',
            'created_at',
            //[sequelize.literal('(SELECT COUNT(*) FROM vote WHERE day.id = vote.day_id)'), 'vote_count']
        ],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbDayData => res.json(dbDayData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});



//get one

router.get('/:id', (req, res) => {
    Day.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'date',
            'trip_id',
            'created_at',
            //[sequelize.literal('(SELECT COUNT(*) FROM vote WHERE day.id = vote.day_id)'), 'vote_count']
        ],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbDayData => {
            if (!dbDayData) {
                res.status(404).json({ message: 'No matching data found with this id' });
                return;
            }
            res.json(dbDayData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});





// create new entries


router.post('/', (req, res) => {
    Day.create({
        date: req.body.date,
        trip_id: req.body.trip_id
    })
        .then(dbDayData => res.json(dbDayData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


// Update 

router.put('/:id', (req, res) => {
    Day.update(
        {
            title: req.body.title
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
        .then(dbDayData => {
            if (!dbDayData) {
                res.status(404).json({ message: 'No matching data found with this id' });
                return;
            }
            res.json(dbDayData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});



//delete


router.delete('/:id', (req, res) => {
    console.log('id', req.params.id);
    Day.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbDayData => {
            if (!dbDayData) {
                res.status(404).json({ message: 'No matching data found with this id' });
                return;
            }
            res.json(dbDayData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;
