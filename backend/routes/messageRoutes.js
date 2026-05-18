const express = require('express');
const router = express.Router();
const { users, conversations, messages } = require('../db');
const auth = require('../middleware/auth');
const crypto = require('crypto');

// Get all conversations for user
router.get('/conversations', auth, (req, res) => {
  try {
    const userConvos = conversations.filter(c => c.members.includes(req.user.id));
    
    // Populate members
    const populated = userConvos.map(c => {
      const populatedMembers = c.members.map(memberId => {
        const u = users.find(user => user._id === memberId);
        return u ? { _id: u._id, fullName: u.fullName, profilePicture: u.profilePicture, username: u.username } : { _id: memberId };
      });
      return { ...c, members: populatedMembers };
    });
    
    // Sort by updatedAt descending
    populated.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    
    res.json(populated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get or Create conversation with another user
router.post('/conversation/:userId', auth, (req, res) => {
  try {
    let conversation = conversations.find(c => 
      c.members.includes(req.user.id) && c.members.includes(req.params.userId) && c.members.length === 2
    );

    if (!conversation) {
      conversation = {
        _id: crypto.randomBytes(16).toString('hex'),
        members: [req.user.id, req.params.userId],
        updatedAt: new Date().toISOString()
      };
      conversations.push(conversation);
    }
    
    const populatedMembers = conversation.members.map(memberId => {
      const u = users.find(user => user._id === memberId);
      return u ? { _id: u._id, fullName: u.fullName, profilePicture: u.profilePicture, username: u.username } : { _id: memberId };
    });
    
    res.json({ ...conversation, members: populatedMembers });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get messages for a conversation
router.get('/:conversationId', auth, (req, res) => {
  try {
    const convMessages = messages.filter(m => m.conversationId === req.params.conversationId);
    
    // Populate sender
    const populated = convMessages.map(m => {
      const u = users.find(user => user._id === m.sender);
      return { 
        ...m, 
        sender: u ? { _id: u._id, fullName: u.fullName, profilePicture: u.profilePicture } : { _id: m.sender } 
      };
    });
    
    res.json(populated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Send a message
router.post('/', auth, (req, res) => {
  try {
    const { conversationId, text } = req.body;
    
    const newMessage = {
      _id: crypto.randomBytes(16).toString('hex'),
      conversationId,
      sender: req.user.id,
      text,
      createdAt: new Date().toISOString()
    };
    
    messages.push(newMessage);
    
    // Update conversation updatedAt
    const convIdx = conversations.findIndex(c => c._id === conversationId);
    if (convIdx !== -1) {
      conversations[convIdx].updatedAt = new Date().toISOString();
    }
    
    const u = users.find(user => user._id === req.user.id);
    const populatedMessage = {
      ...newMessage,
      sender: u ? { _id: u._id, fullName: u.fullName, profilePicture: u.profilePicture } : { _id: req.user.id }
    };
    
    res.json(populatedMessage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
