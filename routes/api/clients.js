const mongoose = require('mongoose');
const _ = require('lodash');
const requireLogin = require('../../middleware/requireLogin');

const Client = mongoose.model('clients');
const ClientNote = mongoose.model('clientNotes');

module.exports = (app) => {
  // @route   GET /api/clients
  // @desc    get all clients belonging to User (only name, id, nextAppt, nextApptReminders) that are not archived
  // @access  Private
  app.get('/api/clients', requireLogin, async (req, res) => {
    try {
      const clients = await Client.find({
        _user: req.user.id,
        archived: { $ne: true },
      })
        .sort({ name: 'asc' })
        .select({
          name: true,
          _id: true,
          nextAppt: true,
          nextApptReminders: true,
          phone: true,
          email: true,
        });
      res.json(clients);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

  // @route   GET /api/clients/archived
  // @desc    get all Archived clients belonging to User (only name, id, phone, email)
  // @access  Private
  app.get('/api/clients/archived', requireLogin, async (req, res) => {
    try {
      const clients = await Client.find({
        _user: req.user.id,
        archived: { $ne: false },
      }).select({
        name: true,
        _id: true,
        email: true,
        phone: true,
      });
      res.json(clients);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

  // @route   POST /api/clients
  // @desc    Add a client
  // @access  Private

  // NEEDS BACK END VALIDATION
  app.post('/api/clients', requireLogin, async (req, res) => {
    // extract data from req
    const {
      name,
      birthday,
      highRisk,
      address,
      phone,
      email,
      clientSince,
      alias,
      nextAppt,
      medication,
      doctor,
      doctorContact,
      diagnoses,
    } = req.body;

    // Build Client Object
    const clientFields = {};
    clientFields._user = req.user.id;
    clientFields.name = name;
    if (birthday) clientFields.birthday = birthday;
    if (highRisk) clientFields.highRisk = highRisk;
    if (address) clientFields.address = address;
    if (phone) clientFields.phone = phone;
    if (email) clientFields.email = email;
    if (alias) clientFields.alias = alias;
    if (nextAppt) clientFields.nextAppt = nextAppt;
    if (medication) clientFields.medication = medication;
    if (doctor) clientFields.doctor = doctor;
    if (doctorContact) clientFields.doctorContact = doctorContact;
    if (diagnoses) clientFields.diagnoses = diagnoses;

    try {
      const newClient = new Client(clientFields);
      await newClient.save();
      res.json(newClient);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

  // @route   POST /api/clients/:id
  // @desc    Updates a client
  // @access  Private

  // NEEDS BACK END VALIDATION
  app.post('/api/clients/:id', requireLogin, async (req, res) => {
    // extract data from req
    const {
      name,
      birthday,
      highRisk,
      address,
      phone,
      email,
      alias,
      clientSince,
      nextAppt,
      nextApptReminders,
      medication,
      doctor,
      doctorContact,
      diagnoses,
      archived,
    } = req.body;

    // Build Client Object
    const clientFields = {};
    clientFields._user = req.user.id;
    clientFields.name = name;
    birthday
      ? (clientFields.birthday = birthday)
      : (clientFields.birthday = null);
    highRisk
      ? (clientFields.highRisk = highRisk)
      : (clientFields.highRisk = false);
    address ? (clientFields.address = address) : (clientFields.address = '');
    phone ? (clientFields.phone = phone) : (clientFields.phone = '');
    email ? (clientFields.email = email) : (clientFields.email = '');
    alias ? (clientFields.alias = alias) : (clientFields.alias = '');
    nextAppt
      ? (clientFields.nextAppt = nextAppt)
      : (clientFields.nextAppt = null);
    archived
      ? (clientFields.archived = archived)
      : (clientFields.archived = false);
    medication
      ? (clientFields.medication = medication)
      : (clientFields.medication = null);
    doctor ? (clientFields.doctor = doctor) : (clientFields.doctor = '');
    doctorContact
      ? (clientFields.doctorContact = doctorContact)
      : (clientFields.doctorContact = '');
    diagnoses
      ? (clientFields.diagnoses = diagnoses)
      : (clientFields.diagnoses = '');
    clientSince
      ? (clientFields.clientSince = clientSince)
      : (clientFields.clientSince = null);
    nextApptReminders
      ? (clientFields.nextApptReminders = nextApptReminders)
      : (clientFields.nextApptReminders = null);

    try {
      const client = await Client.findById(req.params.id);

      if (client._user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'User not authroized' });
      }
      const updateClient = await Client.findByIdAndUpdate(
        { _id: req.params.id },
        { $set: clientFields },
        { new: true }
      );
      res.json(updateClient);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

  // @route   GET /api/clients/:id
  // @desc    Get client by ID
  // @access  Private
  app.get('/api/clients/:id', requireLogin, async (req, res) => {
    try {
      const client = await Client.findOne({
        _id: req.params.id,
        _user: req.user.id,
      });

      if (!client) {
        return res.status(404).json({ msg: 'Client not found' });
      }
      res.json(client);
    } catch (err) {
      console.error(err.message);
      if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'Client not found' });
      }
      res.status(500).send('Server Error');
    }
  });

  // @route   Delete /api/clients/:id
  // @desc    Delete client by ID
  // @access  Private
  app.delete('/api/clients/:id', requireLogin, async (req, res) => {
    try {
      const client = await Client.findOneAndDelete({
        _id: req.params.id,
        _user: req.user.id,
      });

      if (!client) {
        return res.status(404).json({ msg: 'Client not found' });
      }

      res.json({ msg: 'Client Removed' });
    } catch (err) {
      console.error(err.message);
      if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'Client not found' });
      }
      res.status(500).send('Server Error');
    }
  });

  // @route   Post /api/clients/archive/:id
  // @desc    Archive Client by id
  // @access  Private

  app.post('/api/clients/archive/:id', requireLogin, async (req, res) => {
    const client = await Client.updateOne(
      {
        _id: req.params.id,
      },
      {
        $set: { archived: true },
      }
    );
    if (!client) {
      return res.status(404).json({ msg: 'Client not found' });
    }
  });

  // @route   Post /api/unarchive/clients/:id
  // @desc    Unarchive Client by id
  // @access  Private

  app.post('/api/clients/unarchive/:id', requireLogin, async (req, res) => {
    const client = await Client.updateOne(
      {
        _id: req.params.id,
      },
      {
        $set: { archived: false },
      }
    );
    if (!client) {
      return res.status(404).json({ msg: 'Client not found' });
    }
  });

  // @route   POST /api/clients/:id/note
  // @desc    create or edit note for client
  // @access  Private
  app.post('/api/clients/:id/note', requireLogin, async (req, res) => {
    try {
      const client = await Client.findOne({
        _id: req.params.id,
        _user: req.user.id,
      });
      if (!client) {
        return res.status(404).json({ msg: 'Client not found' });
      }
      let note = await ClientNote.findById(req.body._id);

      if (note) {
        //  Update
        note = await ClientNote.findByIdAndUpdate(
          note._id,
          { $set: { note: req.body.note } },
          { new: true }
        );

        return res.json(note);
      }
      //   Create
      const newNote = new ClientNote({
        note: req.body.note,
        _user: req.user.id,
        _client: req.params.id,
      });

      await newNote.save();
      res.json(newNote);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

  // @route   GET /api/clientnotes
  // @desc    Get all client notes by user
  // @access  Private
  app.get('/api/clientnotes', requireLogin, async (req, res) => {
    try {
      const notes = await ClientNote.find({
        _user: req.user.id,
      });
      if (!notes) {
        return res.json({ msg: 'No notes to display' });
      }
      res.json(notes);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

  // @route   GET /api/clientnotes/client/:id
  // @desc    Get all clientnotes notes by user && client
  // @access  Private
  app.get('/api/clientnotes/client/:id', requireLogin, async (req, res) => {
    try {
      const notes = await ClientNote.find({
        _user: req.user.id,
        _client: req.params.id,
      }).sort({ dateCreated: 'asc' });
      if (!notes) {
        return res.json({ msg: 'No notes to display' });
      }
      res.json(notes);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

  // @route   GET /api/clientnote/:id
  // @desc    Get client note by id
  // @access  Private
  app.get('/api/clientnote/:id', requireLogin, async (req, res) => {
    try {
      const note = await ClientNote.findOne({
        _id: req.params.id,
        _user: req.user.id,
      });
      if (!note) {
        return res.status(404).json({ msg: 'Note not found' });
      }
      res.json(note);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

  // @route   DELETE /api/clientnote/:id
  // @desc    Delete client note by id
  // @access  Private
  app.delete('/api/clientnote/:id', requireLogin, async (req, res) => {
    try {
      const note = await ClientNote.findOneAndDelete({
        _id: req.params.id,
        _user: req.user.id,
      });
      if (!note) {
        return res.status(404).json({ msg: 'Note not found' });
      }
      res.json({ msg: 'Note deleted' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
};
