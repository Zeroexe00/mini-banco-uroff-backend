import models from '../models';
import { signToken } from '../utilities/tokenization'
import createHash from '../utilities/hash'
const { User } = models;

export const register = async (req,res,next) => {
  try {
    const { body } = req;
    const userData = body
    const isUserExist = await User.findOne({
      where: {
        rut: body.rut,
      },
    });

    if(isUserExist) {
      res.status(401)
      const error = new Error('Error el usuario ya existe');
      next(error);
      return;
    }

    userData.password = createHash(body.password);

    const user = await User.create(userData);

    const token = signToken({password: 'password', ...user});

    res.json({
      user,
      token
    })

  } catch (er) {
    next(er)
  }
}

export const login = async (req,res,next) => {
  try {
    const { body } = req;
    
    const user = await User.findOne({
      where: {
        rut: body.rut,
      },
    });

    console.log(user)
    
    if(user) {
      if(createHash(body.password) === user.password) {
        
        const token = signToken({password: 'password', ...user});
        
        return res.json({
          success: true,
          token,
        });
      }
    }
    
    res.status(400);
    const err = new Error(
      'El Rut o la contraseña son incorrectos.'
    );
    return next(err);

  } catch (er) {
    return next(er);
  }
}