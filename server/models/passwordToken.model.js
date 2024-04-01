const mongoose = require("mongoose");
const { generateTempToken } = require("../util/generateToken");
const bcrypt = require("bcrypt");

const passwordTokenSchema = new mongoose.Schema(
    {
        token:{
            type: String,
            defaultValue: generateTempToken(6),
        },
        valid:{
            type: Boolean,
            defaultValue: true,    
        },
        user: {
            type: mongoose.Types.ObjectId,
            ref: "User"
        }
    }, {timestamps: true, versionKey: false}
)
passwordTokenSchema.pre('save', function (next) {
    bcrypt.hash(this.token, 10)
        .then(hash => {
            this.token = hash;
            next();
        });
});


const PasswordToken = new mongoose.model("PasswordToken", passwordTokenSchema);

module.exports = PasswordToken;