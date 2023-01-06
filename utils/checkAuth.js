import jwt from 'jsonwebtoken';

const checkAuth = (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

    if (token) {
        try {
            const decodedToken = jwt.verify(token, 'SECRET1q2w3e4r');

            req.userId = decodedToken._id;

            next();
        } catch (err) {
            res.status(403).json({ message: 'Have no access' });
        }
    } else {
        res.status(403).json({ message: 'Have no access' });
    }
};

export default checkAuth;
