import joi from "joi";

const signIpValidation = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(1).required(),
});

export default signIpValidation;