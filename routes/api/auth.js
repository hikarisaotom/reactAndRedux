const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');

const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');
//@route    GET api/auth
//@desc     Test route
//@access   Public

//simplemente con añadir el auth como 2do patametro ya hacemos esto prpotegido
router.get('/', auth, async (req, res) => {
  try {
    //traemos toda la info menos el password
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route    POST api/auth
//@desc     Authenticate user and get token
//@access   Public

router.post(
  '/',
  [
    //Validaciones de los campos
    check('email', 'Email is required').isEmail(),
    check('password', 'password is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      //see if a user exists
      let user = await User.findOne({ email });
      if (!user) {
        //si no es un usuario
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      //return jsonwebtoken
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          //aqui se regresa el webtoken
          res.json({ token });
        }
      );

      /*res.send('User Registered');*/
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Servr Error');
    }
  }
);

module.exports = router;
