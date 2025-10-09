const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: { 
    type: String,
    required: true,
    trim: true
  },
  description: { 
    type: String,
    trim: true
  },
  createdBy: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Subject', subjectSchema);