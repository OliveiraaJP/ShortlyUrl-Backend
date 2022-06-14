import { nanoid } from "nanoid";
import db from "../db.js";

export const getUrl = async (req, res) => {
  const { id } = req.params;

  try {
    const query = await db.query(
      `SELECT id ,url ,"shortURL" FROM urls WHERE id=$1`,
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
  const { shortURL } = req.params;

  try {
    const query = await db.query(
      `SELECT *
          FROM urls
          WHERE "shortURL"=$1`,
      [shortURL]
    );

    if (query.rowCount === 0) {
      return res.status(404).send("not found");
    }

    const getUrl = query.rows;

    await db.query(`UPDATE urls SET "countVisit" = "countVisit" + 1 WHERE id = $1`, [getUrl.id])

    res.redirect(getUrl.url)

  } catch (error) {
    console.log("error get open url: ", error);
  }
};

export const deleteUrl = async (req, res) => {
  const { id } = req.params;
  const { loggedUser } = res.locals;

  try {
    const query = await db.query(`SELECT * FROM users WHERE id=$1`, [id]);
    const user = query.rows[0];
    if (query.rowCount === 0) {
      return res.status(404).send("Usuário não encontrado");
    }

    if (user.id !== loggedUser.id) {
      return res.status("401").send("token nao valido");
    }

    await db.query(`DELETE FROM urls WHERE id=$1`, [id]);
  } catch (error) {
    console.log("delete url error: ", error);
  }
};

export const postUrl = async (req, res) => {
  const { id } = res.locals.loggedUser;
  const { url } = req.body;

  const shortURL = nanoid(8);

  try {
    const query = await db.query(
      `INSERT INTO urls ("userId", url, "shortURL")
        VALUES ($1,$2,$3)`,
      [id, url, shortURL]
    );

    res.status(201).send({ shortURL });
  } catch (error) {
    console.log("error post url: ", error);
  }
};
