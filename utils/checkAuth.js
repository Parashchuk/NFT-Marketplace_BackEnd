import jwt from 'jsonwebtoken';

const checkAuth = (req, res, next) => {
  const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

  if (token) {
    try {
      //Verify if token fit sercet key
      const decodedToken = jwt.verify(token, 'SECRET1q2w3e4r');

      //Save variable id in global variable
      req.userId = decodedToken._id;

      //Call next funciton
      next();
    } catch (err) {
      res.status(403).json({ message: 'Have no access' });
    }
  } else {
    res.status(403).json({ message: 'Have no access' });
  }
};

export default checkAuth;
