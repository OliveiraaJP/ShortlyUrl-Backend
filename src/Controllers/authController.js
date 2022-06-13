import jwt from 'jsonwebtoken';
import db from "../db.js";
import { nanoid } from 'nanoid';
import bcrypt from "bcrypt";

export const postSignin = async(req, res) => {
    try {
        res.sendStatus(200);
    } catch (error) {
        console.log('error post signin: ', error);
        res.sendStatus(500);
    }
}

export const postSignup = async(req, res) => {
    const {name, email, password} = req.body;
    let cryptoPassword = bcrypt(password,10);

    try {
        const query = await db.query(
            `INSERT INTO users (name, email, password) VALUES ($1,$2,$3)`,[name, email,cryptoPassword]
        )
        res.status(200).send('Cadastrado usuario no banco de dados');
    } catch (error) {
        console.log('error post signup: ', error);
        res.sendStatus(500);
    }
}