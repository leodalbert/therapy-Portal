const mongoose = require('mongoose');
const { Schema } = mongoose;

const clientNoteSchema = new Schema({
  note: String,
  dateCreated: { type: Date, default: new Date() },
  _user: { type: Schema.Types.ObjectId, ref: 'User' },
  _client: { type: Schema.Types.ObjectId, ref: 'Client' },
});

mongoose.model('clientNotes', clientNoteSchema);
