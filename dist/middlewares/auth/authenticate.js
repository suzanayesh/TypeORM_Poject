import jwt from 'jsonwebtoken';
import { User } from '../../db/entities/User.js';
//protected-resource route. If the user has a valid JWT token, the res.locals.user variable will contain the user's information
const authenticate = async (req, res, next) => {
    const token = req.headers['authorization'] || '';
    let tokenIsValid;
    try {
        //for validation. If the verification fails or an error occurs, it sets tokenIsValid to false
        tokenIsValid = jwt.verify(token, process.env.SECRET_KEY || '');
    }
    catch (error) { }
    if (tokenIsValid) {
        const decoded = jwt.decode(token, { json: true });
        const user = await User.findOneBy({ email: decoded?.email || '' });
        res.locals.user = user;
        // calls next() to continue processing the request.
        next();
    }
    else {
        res.status(401).send("You are Unauthorized!");
    }
};
export { authenticate };
