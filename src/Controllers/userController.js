import db from "../db.js";

export const getUsersId = async (req, res) => {
  const { id } = req.params;
  const { loggedUser } = res.locals;

  if (id !== loggedUser.id) {
    return res.status(401).send("sem autorização");
  }

  try {
    const queryVisit = await db.query(`SELECT SUM(urls."countVisit") FROM urls WHERE urls."userId"=$1`, [id])
    const visitors = queryVisit.rows; 

    const queryUrl = await db.query(`SELECT * FROM urls WHERE "userId"=$1`, [id])
    const usersUrl = queryUrl.rows;

    res.send({
        id: loggedUser.id,
        name: loggedUser.name,
        countVisit: countVisit.sum || 0,
        shortURL: usersUrl
    })
  } catch (error) {
    console.log('get user id error: ', error);
  }
};

export const getRanking = async (req, res) => {};
