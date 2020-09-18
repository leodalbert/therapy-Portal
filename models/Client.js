const mongoose = require('mongoose');
const { Schema } = mongoose;

const clientSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  birthday: {
    type: Date,
  },
  highRisk: {
    type: Boolean,
    default: false,
  },
  address: {
    type: String,
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
  },
  alias: {
    type: String,
  },
  clientSince: {
    type: Date,
    default: new Date(),
  },
  nextAppt: {
    type: Date,
  },
  nextApptReminders: {
    type: [String],
  },
  archived: {
    type: Boolean,
    default: true,
  },
  _user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

mongoose.model('clients', clientSchema);
