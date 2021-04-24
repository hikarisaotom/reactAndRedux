const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const gravatar = require('gravatar');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
//@route    POST api/users
//@desc     Register User
//@access   Public

//router.get('/',(req,res)=>res.send('User route'));

router.post(
  '/',
  [
    //Validaciones de los campos
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    check('password', 'enter a password con mas de 6 caracteres').isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    try {
      //see if a user exists
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'user already exist' }] });
      }

      //get users Gravatar
      const avatar = gravatar.url(email, {
        s: 200, //size
        r: 'pg',
        d: 'mm', //da una imagen por defecto
      });

      user = new User({ name, email, avatar, password });

      // Encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();

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
