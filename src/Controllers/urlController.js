import { nanoid } from "nanoid";
import db from "../db.js";

export const getUrl = async (req, res) => {
  const { id } = req.params;

  try {
    const query = await db.query(
      `SELECT id ,url ,"shortUrl" FROM urls WHERE id=$1`,
      [id]
    );

    if (query.rowCount === 0) {
      return res.status(404).send("urls não encontradas");
    }
    const url = query.rows[0];

    res.send(url);
  } catch (error) {
    console.log("get url error: ", error);
    res.sendStatus(500);
  }
};

export const getOpenUrl = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
};

export const deleteUrl = async (req, res) => {
  const { id } = req.params;
  const { loggedUser } = req.locals;

  try {
    const query = await db.query(`SELECT * FROM users WHERE id=$1`, [id])
    const user = query.rows[0];
    if(query.rowCount ===0 ){
        return res.status(404).send('Usuário não encontrado')
    }
  } catch (error) {
    console.log('delete url error: ', error);
  }
};

export const postUrl = async (req, res) => {
  const { id } = res.locals.loggedUser;
  const { url } = req.body;

  const shortUrl = nanoid(8);

  try {
    const query = await db.query(
      `INSERT INTO urls ("userId", url, "shortUrl")
        VALUES ($1,$2,$3)`,
      [id, url, shortUrl]
    );

    res.status(201).send({ shortUrl });
  } catch (error) {
    console.log("error post url: ", error);
  }
};
