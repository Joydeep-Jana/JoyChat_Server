const joi = require('joi');

module.exports = 
{
    validateBody: schema => 
    {
        return ((req, res, next)=>
        {
            const result = joi.validate(req.body, schema);

            //if validation failed
            if (result.error)
            {
                return res.status(400).json(((message)=>({message, isOk: false}))(result.error.message));
            }

            //if request does not have value
            if (!req.value)
            {
                req.value = {};
            }

            // replace with validated value
            req.value["body"] = result.value;

            next();
        });
    },
    schemas: 
    {
        signUpAuthSchema: joi.object().keys(
        {
            name: joi.string().required(),
            email: joi.string().email().required(),
            password: joi.string().min(6).required(),    
            confirmPassword: joi.string().valid(joi.ref('password')).required()
        }),
        signInAuthSchema: joi.object().keys(
        {
            email: joi.string().email().required(),
            password: joi.string().min(6).required()   
        })
    }
}