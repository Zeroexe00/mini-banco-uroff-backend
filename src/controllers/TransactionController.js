
import models from '../models';


const {User, Transaction} = models

export const deposit = async (req,res,next) => {
  try {
    const { rut, amount } = req.body
    const user = User.findOne({
      where: rut
    })
    const result = await Transaction.create({
      senderId: user.id,
      receiverId: user.id,
      amount,
      type: 'deposit'
    });

    const updateUser = await user.update({
      currentBalance: currentBalance + amount
    })

    res.json({
      success,
      updateUser
    })

  } catch (err) {
    console.log(err)
    next(err)
  }
}

export const withdraw = async (req,res,next) => {
  try {
    const { rut, amount } = req.body
    const user = await User.findOne({
      where: rut
    })
    
    if((user.currentBalance - amount) < 0) {
      res.json({
        success: false,
        msg: 'Su cuenta no tiene dinero suficiente.'
      })
    }

    const userUpdated = await user.update({
      currentBalance: currentBalance - amount
    })

    await Transaction.create({
      senderId: user.id,
      receiverId: user.id,
      amount,
      tyoe: 'withdraw'
    })

    res.json({
      success: true,
      msg: 'El monto ha sido retirado de su cuenta',
      userUpdated
    })

  } catch (error) {
    console.log(error)
    next(error)
  }
}

export const transfer = async (req,res,next) => {
  try {
    const { rutSender, rutReceiver, amount } = req.body
    const users = User.findAll({
      where: {
        rut: {
          in: [rutSender,rutReceiver]
        }
      }
    })

    console.log(users.toJSON())

  } catch (error) {
    console.log(error)
  }
}