const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  /*una funcion de middleware es una funcion que tiene acceso a la respuesta y reque
    un next es un callback que debemos ejecutar para pasar a la siguiente parte del middleware */

  //traer el token del header
  const token = req.header('x-auth-token');

  //check if not token
  if (!token) {
    return res.status(401).json({ msg: 'No Token, auth denied' });
  }

  //verificar el token

  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
