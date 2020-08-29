const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    username: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+\@.+\..+/]
    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'Thought'
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
})

//friendCount virtual
UserSchema.virtual('friendCount')
.get(function() {
    return this.friendCount;
})
.set(function(value) {
    this.friendCount= value;
})

//create the User model using UserSchema
const User = model('User', UserSchema);

module.exports= User;