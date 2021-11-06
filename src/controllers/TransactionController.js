
import models from '../models';
import { sendEmail } from '../utilities/emailSender'
const {User, Transaction} = models

export const deposit = async (req,res,next) => {
  try {
    const { rut, amount } = req.body
    const user = await User.findOne({
      where: {
        rut: rut
      }
    })
    const currentBalance = user.currentBalance
    const result = await Transaction.create({
      senderId: user.id,
      receiverId: user.id,
      type: 'deposit',
      amount
    });

    const updateUser = await user.update({
      currentBalance: currentBalance + amount
    })

    res.json({
      success: true,
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
      where: {
        rut: rut
      }
    })
    
    const currentBalance = user.currentBalance

    if((currentBalance - amount) < 0) {
      res.json({
        success: false,
        msg: 'Su cuenta no tiene dinero suficiente.'
      })
    }

    const userUpdated = await user.update({
      currentBalance: amount - currentBalance 
    })

    await Transaction.create({
      senderId: user.id,
      receiverId: user.id,
      type: 'withdraw',
      amount
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
    const { rutSender, rutReceiver, amount, email } = req.body
    const users = await User.findAll({
      where: {
        rut: [rutSender,rutReceiver]
      }
    })
    
    const senderCurrentBalance = users[0].currentBalance 
    const receiverCurrentBalance = users[1].currentBalance

    if((senderCurrentBalance - amount) < 0) {
      res.json({
        success: false,
        msg:'Error no posee suficientes fondos'
      })
    }

    const usersUpdated = await users.update({
      currentBalance: senderCurrentBalance - amount
    },
    {
      currentBalance: receiverCurrentBalance + amount
    })
    
    res.json({
      success: true,
      senderUser: usersUpdated[0],
      receiverUser: usersUpdated[1]
    })

    // sendEmail(amount)
    next()

  } catch (error) {
    console.log(error)
    next()
  }
}

export const getTransactions = async (req, res, next) => {
  try {
    const { rut } = req.body
    if(rut) {
      const user = await User.findOne({
        where: rut
      })
      const trans = Transaction.findAll({
        where: {
          $or: {
            senderId: user.id,
            receiverId: user.id
          }
        }
      })
      res.json({
        success: true,
        transactions: trans,
      })
    }
  } catch (error) {
    next()
    console.log(error)
  }
}