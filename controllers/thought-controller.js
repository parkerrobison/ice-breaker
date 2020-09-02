const { Thought, Reaction, User } = require('../models');

const thoughtController = {
    //POST thought
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
    },

    // GET all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
        .sort({ _id: -1 })
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err)
            res.status(500).json(err);
        })
    },

    // GET thought by id
    getThoughtById( { params }, res) {
        Thought.findOne({ _id: params.id })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: "No thought found with this id." })
                return;
            }
            res.json(dbThoughtData)
        })
        .catch(err => {
            console.log(err) 
            res.status(400).json(err)
        })
    },

    //update thought
    updateThought( { params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(400).json({ message: 'No thought was found with this id.'})
                return;
            }
            res.json(dbThoughtData)
        })
        .catch(err => {
            console.log(err)
            res.status(400).json(err)
        })
    },
    //delete thought
    deleteThought( { params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(400).json({ message: 'No thought was found with this id.'})
                return;
            }
            res.json(dbThoughtData)
        })
        .catch(err => {
            console.log(err)
            res.status(400).json(err)
        })
    },

    addReaction({ params, body }, res) {
        console.log(body);
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: {reactions: body } },
            {new: true, runValidators: true}
            )
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: "No thought was found with this id." })
                    return;
                }
                res.json(dbThoughtData)
            })
            .catch(err => {
                console.log(err)
                res.status(400).json(err)
            })
    },

    removeReaction({params}, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: {reactions: { reactionsId: params.reactionsId } } },
            {new: true, runValidators: true}
            )
            .then(dbThoughtData => res.json(dbThoughtData)
            )
            .catch(err => {
                console.log(err)
                res.status(400).json(err)
            })
    }
}

module.exports = thoughtController;