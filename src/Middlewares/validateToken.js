import db from "../db.js"

export async function validToken (req, res, next) {
    const {authorization} = req.headers;
    const token = authorization?.replace('Bearer', '');
    if(!token){
        return res.status(401).send('Token não valido');
    }

    try {
        const validUser = await db.query(`SELECT * FROM sessions WHERE token=$1`, [token])
        if(validUser.rowCount === 0){
            return res.status(401).send('Token não encontrado');
        };

        const queryLoggedUser = await db.query(
        `SELECT users.*
         FROM sessions s
         JOIN users u
         ON s."userId" = u.id
         WHERE token=$1`, [token])

         const loggedUser = queryLoggedUser[0]

         if(loggedUser.rowCount === 0){
            return res.status(401).send('Usuario não encontrado')
         }


        res.locals.loggedUser
        next()
    } catch (error) {
        console.log('error query server token: ', error);
    }
}