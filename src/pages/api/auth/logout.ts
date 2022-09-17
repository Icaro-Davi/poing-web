import Cookies from "cookies";
import { NextApiHandler } from "next";
import CookieKeys from "../../../utils/cookies/keys";

const logout: NextApiHandler = async (req, res) => {
    const cookie = new Cookies(req, res);
    cookie.set(CookieKeys.AUTH_TOKEN, '', { maxAge: 1 });
    res.status(200);
}

export default logout;