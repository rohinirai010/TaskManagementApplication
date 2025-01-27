// models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Employee', 'Admin'], required: true },
  subscriptionPlan: { 
    type: String, 
    enum: ['Starter', 'Premium', 'Super Pro'], 
    default: 'Starter' 
  },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }]
}, { timestamps: true });

// models/Task.js
const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  type: { type: String, enum: ['Post', 'Video', 'Mockup'], required: true },
  status: { 
    type: String, 
    enum: ['Pending', 'In Progress', 'Completed'], 
    default: 'Pending' 
  },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  deadline: { type: Date },
  subscriptionPlan: { 
    type: String, 
    enum: ['Starter', 'Premium', 'Super Pro']
  }
}, { timestamps: true });

module.exports = {
  User: mongoose.model('User', UserSchema),
  Task: mongoose.model('Task', TaskSchema)
};