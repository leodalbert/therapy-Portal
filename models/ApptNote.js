const mongoose = require('mongoose');
const { Schema } = mongoose;

const apptNoteSchema = new Schema({
  note: {
    type: String,
    required: true,
  },
  dateCreated: {
    type: Date,
    default: new Date(),
  },
  _user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  _client: {
    type: Schema.Types.ObjectId,
    ref: 'Client',
  },
  _appt: {
    type: Schema.Types.ObjectId,
    ref: 'Appt',
  },
});

mongoose.model('apptNotes', apptNoteSchema);
