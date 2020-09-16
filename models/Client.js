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
  nextApptReminders: {
    type: [String],
  },
  _user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

mongoose.model('clients', clientSchema);
