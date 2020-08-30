const { Thought, Reaction, User } = require('../models');

const thoughtController = {
    addThought(req, res) {
        console.log(req.body);
        Thought.create(req.body)
        .then(( thoughtData ) => {
            console.log(thoughtData)
            return User.findOneAndUpdate(
                { _id: req.body.userId },
                { $push: { thoughts: thoughtData._id } },
                { new: true, runValidators: true }
            );
        })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id.' });
            }
            res.json({ message: 'You had a thought!'});
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        });
    }
}

module.exports = thoughtController;