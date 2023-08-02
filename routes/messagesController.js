const express = require('express')
const Message = require('../models/Message')
const router = express.Router()
const usersController = require('../controllers/usersController')
const User = require('../models/User')

router.get('/',usersController.get_users_msg, (req, res) => {
    res.render('messages')
})
router.get('/:id',usersController.get_users_msg, async (req, res) => {
  try{
    const userData = await User.find()
    const messageData = await Message.find({ username: req.user})
    const receiverId = req.params.id
    const messages = await Message.find({
      $or: [
        { sender: req.user._id, receiver: receiverId },
        { sender: receiverId, receiver: req.user._id }
      ],
    }).populate('sender')
    res.render('messages', { messages, receiverId, userData, messageData })
  } catch (error) {
    console.error(error)
  }
})

router.post('/:id/send', async (req, res) => {
  try {
    const  content  = req.body
    const receiverId = req.params.id
    const userId = await User.findOne( req.user )
    const sender = await User.findById(userId._id);
    const receiver = await User.findById(receiverId);

    if (!sender || !receiver) {
      return res.status(404).send('Sender or receiver not found');
    }

    const message = new Message({
      sender: sender,
      receiver: receiver,
      content: content["post-message"],
    });

    await message.save();
    
    // Redirect to the messages page for the receiver
    res.redirect(`/messages/${receiverId}`);
    
    // Alternatively, you can render the same messages template with updated data
    // const messages = await Message.find({ ... }); // Get the messages for the template
    // res.render('messages', { messages, receiverId, userData, messageData });
    
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// router.post('/:id/send', async (req, res) => {
//   try{
//     const receiverId = req.params.id
//     const { content } = req.body
//     const sender = await User.findById(req.user._id)
//     const receiver = await User.findById( receiverId )

//     const message = new Message({
//       sender: sender,
//       receiver: receiver,
//       content: content,
//     })

//     await message.save()
//     res.render(`/messages/${receiverId}`)
    
//   } catch (error) {
//     console.error(error)
//   }
// })
module.exports = router
