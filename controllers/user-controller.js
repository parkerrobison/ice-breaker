const { User } = require('../models');

const userController = {
    getAllUsers(req, res) {
        User.find({})
        .then(dbUserdata => {
            res.json(dbUserdata)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
    },

    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
        .then(dbUserdata => {
            if (!dbUserdata) {
                res.status(404).json({ message: 'No user was found with this id.' });
                return;
            }
            res.json(dbUserdata)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    },

    createUser( { body }, res) {
        User.create(body)
        .then(dbUserdata => {
            res.json(dbUserdata)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
    },

    updateUser( { params, body }, res) {
        User.findOneAndUpdate({ _id: params.id}, body, { new: true, runValidators: true })
        .then(dbUserdata => {
            if (!dbUserdata) {
                res.status(404).json({ message: 'No user with the id was found.'})
            }
            res.json(dbUserdata);
        })
        .catch(err => {
            console.log(err)
            res.status(400).json(err)
        })
    }
}

module.exports = userController;