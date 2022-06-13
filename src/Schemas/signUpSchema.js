import joi from "joi";

const signUpValidation = joi.object({
    name: joi.string().min(1).required(),
    email: joi.string().email().required(),
    password: joi.string().min(1).required(),
    confirmPassword: joi.ref("password")
});

export default signUpValidation;