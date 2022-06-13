import { nanoid } from "nanoid";
import db from "../db.js";

export const getUrl = async (req, res) => {};

export const getOpenUrl = async (req, res) => {};

export const deleteUrl = async (req, res) => {};

export const postUrl = async (req, res) => {
  const { id } = res.locals.loggedUser;
  const { url } = req.body;

  const shortUrl = nanoid(8)

  try {
    const query = await db.query(
        `INSERT INTO urls ("userId", url, "shortUrl")
        VALUES ($1,$2,$3)`, [id, url, shortUrl]
        )
    
        res.status(201).send({shortUrl})
  } catch (error) {
    console.log('error post url: ', error);
  }
};
