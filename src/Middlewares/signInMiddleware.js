import signInValidation from "../Schemas/signInSchema.js";
import db from "../db.js";

export default async function validSignIn (req, res, next){
    const {email} = req.body;
    const validation = signInValidation.validate(req.body, {abortEarly: false});

    if(validation.error){
        return res.status(422).send(validation.error.details.map(detail => detail.message));
    }
    try {
        const user = await db.query(
            `SELECT id FROM users WHERE email = $1`,
            [email]
          );
          if (user.rowCount === 0) {
            return res.send('Email não cadastrado ou não existe!').status(401);
          }
          next();
    } catch (error) {
        console.log('error valid signip: ', error);
        res.sendStatus(500);
    }
}