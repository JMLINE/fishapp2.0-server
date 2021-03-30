const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
let logModel = require('../db.js').import('../models/fish');
const validateSession = require('../middleware/validate-session');

//change from 'log'
router.get('/fished', validateSession, function (req, res) {
    let userid = req.user.id;
    logModel.findAll({
        where: {
            owner: userid
        }
    }).then(
        function findAllSuccess(data) {
            res.json(data);
        },
        function findAllError(err) {
            res.send(500, err);
        }
    )
})

router.post('/createpost', validateSession, function (req, res) {
    let species = req.body.fished.species;
    let size = req.body.fished.size;
    let fly = req.body.fished.fly;
    let location = req.body.fished.location;
    let owner = req.user.id;
    let photo = req.body.fished.photo
    logModel.create({
        species: species,
        size: size,
        fly: fly,
        location: location,
        owner: owner,
        photo: photo

    }).then(
        function createSuccess(response) {
            res.json({
                message: 'success',
                added: response
            })
        },
        function createError(err) {
            res.send(500, err.message)
        }
    )
})
//Update this endpoint to include delete.  Delete if breaks

router.delete('/fished/delete/:id', validateSession, function (req, res) {
    let primaryKey = req.params.id;
    let userid = req.user.id;
    logModel.destroy({
        where: {
            id: primaryKey,
            owner: userid
        }
    }).then(
        data => {
            return data > 0 ?
                res.send('Item was deleted') :
                res.send('Nothing deleted')
        }), err => res.send(500, err.message);
});


router.get('/fished/:id', validateSession, function (req, res) {
    let primaryKey = req.params.id;
    let userid = req.user.id;
    logModel.findOne({
            where: {
                id: primaryKey,
                owner: userid
            }
        }).then(data => {
            data ? res.json(data) : res.send('Not Authorized to view item');
        }),
        err => res.send(500, err.message);
});


router.put('/fished/update/:id', validateSession, function (req, res) {
    let userid = req.user.id;
    let primaryKey = req.params.id;
    let species = req.body.fished.species;
    let size = req.body.fished.size;
    let fly = req.body.fished.fly;
    let location = req.body.fished.location;
    let photo = req.body.fished.photo
    logModel.update({
            species: species,
            size: size,
            fly: fly,
            location: location,
            photo: photo

        }, {
            where: {
                id: primaryKey,
                owner: userid
            }
        }).then(
            data => {
                return data > 0 ?
                    res.send("Item updated!") :
                    res.send("No updates where made.")
            }),
        err => res.send(500, err.message)
})
module.exports = router