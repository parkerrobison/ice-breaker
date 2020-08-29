const { User } = require('../models');

const userController = {
    create: function( { body }, res) {
        User.create(body)
        .then(dbUserdata => {
            res.json(dbUserdata)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
    }
}

module.exports = userController;