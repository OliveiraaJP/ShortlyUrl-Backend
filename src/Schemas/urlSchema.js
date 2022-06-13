import joi from "joi";

const urlValidation = joi.object({
url: joi.string().required()
});

export default urlValidation;