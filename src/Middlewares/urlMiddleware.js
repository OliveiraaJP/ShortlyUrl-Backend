import urlValidation from "../Schemas/urlSchema.js";

export async function validUrl (req, res, next) {
    const {url} = req.body;

    const validation = urlValidation.validate(req.body, {abortEarly: false});

    if(validation.error){
        return res.status(422).send(validation.error.details.map(detail => detail.message));
    }
    
    try {
        next()
    } catch (error) {
        console.log('url middleware error: ', error);
    }
}