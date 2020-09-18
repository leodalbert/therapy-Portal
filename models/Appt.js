const mongoose = require('mongoose');
const { Schema } = mongoose;

const apptsSchema = new Schema({
  title: {
    type: String,
  },
  start: {
    type: Date,
  },
  end: {
    type: Date,
  },
  note: {
    type: String,
  },
  status: {
    type: String,
  },
  _user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  _client: {
    type: Schema.Types.ObjectId,
    ref: 'Client',
  },
});

mongoose.model('appts', apptsSchema);
