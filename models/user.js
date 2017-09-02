var mongoose = require("mongoose");
var bcrypt = require("bcrypt");

var UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    passwordHashed: {
        type: Boolean,
        default: false
    },
    questionLists: {
        type: Array
    }
});

//authenticate input against database
UserSchema.statics.authenticate = function(email, password, callback) {
    User.findOne({email: email})
        .exec(function (error, user) {
            if(error) {
                return callback(error);
            } else if (!user) {
                var err = new Error("User not found");
                err.status = 401;
                return callback(err);
            }
            bcrypt.compare(password, user.password, function(err, result) {
                if (result === true) {
                    return callback(null, user);
                } else {
                    return callback();
                }
            })
        });
}


//hash password before saving to the database
UserSchema.pre("save", function(next) {
    var user = this;
    if (user.passwordHashed === false) {    
        bcrypt.hash(user.password, 10, function(err, hash) {
            // if (err) {
            //     return next(err)
            // }
            // create a user.passwordHashed boolean value to bypass this code if password is already hashed.
            user.password = hash;
            user.passwordHashed = true;
            next();
        });
    } else {
        next();
    }
});

var User = mongoose.model("User", UserSchema);
module.exports = User;