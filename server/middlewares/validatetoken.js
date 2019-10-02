// used for authentication check later.
const   JWT         =   require("jsonwebtoken")

const VALIDATE_JWT = (req, res) => {
    try {
        const DECODED = JWT.verify(req.query.token, process.env.SECRET_KEY);
        res.json({decoded: DECODED, success: true});
    }
    catch (err) {
        console.log("INVALID TOKEN", err);
        res.json({success: false});
    }
}

module.exports = VALIDATE_JWT;