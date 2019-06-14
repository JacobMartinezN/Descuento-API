const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;
const saltRounds = 10;

const UserSchema = new Schema({
    code: { type: String, required: false },
    name: { type: String, required: false },
    email: { type: String, required: false },
    password: { type: String, required: false },
    active: { type: Boolean, required: false },
    birth_date: { type: Date, required: false },
    category: { type: String, required: false }
});

UserSchema.pre('save' , async next => {
    this.password = await bcrypt.hash(this.password, saltRounds);
    next();
    });

mongoose.model('User', UserSchema);