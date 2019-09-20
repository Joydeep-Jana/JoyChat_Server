const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
});

userSchema.pre('save', async function(next)
{
    try 
    {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
    } catch (error) 
    {
        next(error);
    }
});

userSchema.methods.isValidPassword = async function (newPassword, next)
{
    try 
    {
        return await bcrypt.compare(newPassword, this.password);
    } 
    catch (error) 
    {
        throw new Error(error);
    }
}

const User = mongoose.model('User', userSchema);

module.exports = User;