import signUpValidation from "../Schemas/signUpSchema.js";
import db from "../db.js";

export default async function validSignUp (req, res, nexr){
    const {email} = req.body;
    const validation = signUpValidation.validate(req.body, {abortEarly: false});

    if(validation.error){
        return res.status(422).send(validation.error.details.map(detail => detail.message));
    }
    try {
        const user = await db.query(
            `SELECT id FROM users WHERE email = $1`,
            [email]
          );
          if (user.rows[0]) {
            return res.send('Email ja cadastrado').status(409);
          }
          next();
    } catch (error) {
        console.log('error valid signup: ', error);
        res.sendStatus(500);
    }
}