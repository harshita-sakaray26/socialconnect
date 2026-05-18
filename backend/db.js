const bcrypt = require('bcryptjs');

const users = [];
const hangouts = [];
const conversations = [];
const messages = [];
const friendRequests = [];

const seedDB = async () => {
  if (users.length > 0) return; // Already seeded

  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash('password123', salt);

  const dummyUsers = [
    { _id: '1', fullName: 'Alice Johnson', username: 'alicej', email: 'alice@test.com', password, city: 'New York', interests: ['Coding', 'Coffee'], age: 25, profilePicture: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150', isVerified: true },
    { _id: '2', fullName: 'Bob Smith', username: 'bobsmith', email: 'bob@test.com', password, city: 'San Francisco', interests: ['Hiking', 'Photography'], age: 28, profilePicture: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150' },
    { _id: '3', fullName: 'Charlie Davis', username: 'charlied', email: 'charlie@test.com', password, city: 'Austin', interests: ['Music', 'Gaming'], age: 22, profilePicture: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150' },
    { _id: '4', fullName: 'Diana Prince', username: 'dianap', email: 'diana@test.com', password, city: 'Chicago', interests: ['Art', 'Museums'], age: 26, profilePicture: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150' },
    { _id: '5', fullName: 'Ethan Hunt', username: 'ethanh', email: 'ethan@test.com', password, city: 'Seattle', interests: ['Tech', 'Running'], age: 30, profilePicture: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150' }
  ];

  users.push(...dummyUsers);

  const dummyHangouts = [
    { _id: 'h1', title: 'Weekend Coffee Chat', description: 'Let us meet for coffee and chat about tech.', category: 'Networking', location: 'Downtown Cafe', dateTime: new Date(Date.now() + 86400000).toISOString(), seatLimit: 5, creator: '1', participants: ['1', '2'] },
    { _id: 'h2', title: 'Morning Hike', description: 'Early morning hike at the local trail.', category: 'Fitness', location: 'Muir Woods', dateTime: new Date(Date.now() + 172800000).toISOString(), seatLimit: 10, creator: '2', participants: ['2', '4'] }
  ];

  hangouts.push(...dummyHangouts);
  
  // Seed some dummy conversations and messages
  const dummyConversations = [
    { _id: 'c1', members: ['1', '2'], updatedAt: new Date().toISOString() },
    { _id: 'c2', members: ['1', '3'], updatedAt: new Date().toISOString() }
  ];
  conversations.push(...dummyConversations);

  const dummyMessages = [
    { _id: 'm1', conversationId: 'c1', sender: '2', text: 'Hey there! Are you coming to the coffee meetup?', createdAt: new Date(Date.now() - 3600000).toISOString() },
    { _id: 'm2', conversationId: 'c1', sender: '1', text: 'Yes! I will be there in about 20 minutes.', createdAt: new Date(Date.now() - 3500000).toISOString() }
  ];
  messages.push(...dummyMessages);
  
  console.log('In-memory cache seeded with dummy data.');
};

module.exports = { users, hangouts, conversations, messages, seedDB };
