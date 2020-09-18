const mongoose = require('mongoose');
const _ = require('lodash');
const requireLogin = require('../../middleware/requireLogin');

const Appt = mongoose.model('appts');
const Client = mongoose.model('clients');
const ApptNote = mongoose.model('apptNotes');

module.exports = (app) => {
  // @route   GET /api/appts
  // @desc    get all appointments for user
  // @access  Private
  app.get('/api/appts', requireLogin, async (req, res) => {
    try {
      const appts = await Appt.find({
        _user: req.user.id,
      });
      res.json(appts);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

  // @route   GET /api/appts/:id
  // @desc    get all appointments by id
  // @access  Private
  app.get('/api/appts/:id', requireLogin, async (req, res) => {
    try {
      const appt = await Appt.findOne({
        _id: req.params.id,
        _user: req.user.id,
      });
      res.json(appt);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

  // @route   GET /api/appts/client/:id
  // @desc    get all appointments by client
  // @access  Private
  app.get('/api/appts/client/:id', requireLogin, async (req, res) => {
    try {
      const appt = await Appt.find({
        _client: req.params.id,
        _user: req.user.id,
      });
      res.json(appt);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

  // @route   GET /api/appts/office
  // @desc    get all appointments without notes
  // @access  Private
  app.get('/api/appts/office', requireLogin, async (req, res) => {
    try {
      const appts = await Appt.find({}).select('-note');
      res.json(appts);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

  // @route   POST /api/appts
  // @desc    create an Apointment
  // @access  Private
  app.post('/api/appts', requireLogin, async (req, res) => {
    try {
      const clientId = await Client.findOne({ name: req.body.title }).select(
        'id'
      );
      const newAppt = new Appt({
        title: req.body.title,
        start: req.body.start,
        end: req.body.end,
        note: req.body.note,
        _user: req.user.id,
        _client: clientId._id,
      });

      const appt = await newAppt.save();

      res.json(appt);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

  // @route   POST /api/appts/:id
  // @desc    Updates an Apointment
  // @access  Private

  app.post('/api/appts/:id', requireLogin, async (req, res) => {
    const { title, start, end, note } = req.body;
    let updates = {
      title,
      start,
      end,
      note,
    };

    try {
      const updateAppt = await Appt.findOneAndUpdate(
        { _id: req.params.id, _user: req.user.id },
        { $set: updates },
        { new: true }
      );

      if (!updateAppt) {
        return res.status(404).json({ msg: 'Appointment not found' });
      }

      res.json(updateAppt);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

  // @route   DELETE /api/appts/:id
  // @desc    Deletes an Apointment
  // @access  Private
  app.delete('/api/appts/:id', requireLogin, async (req, res) => {
    try {
      const appt = await Appt.findOneAndDelete({
        _id: req.params.id,
        _user: req.user.id,
      });

      if (!appt) {
        return res.status(404).json({ msg: 'Appointment not found' });
      }

      res.json({ msg: 'Appointment Removed' });
    } catch (err) {
      console.error(err.message);
      if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'Client not found' });
      }
      res.status(500).send('Server Error');
    }
  });

  // @route   POST /api/appts/:id/cancel
  // @desc    Marks an appointment as canceled
  // @access  Private
  app.post('/api/appts/:id/cancel', requireLogin, async (req, res) => {
    try {
      const appt = await Appt.findOneAndUpdate(
        {
          _id: req.params.id,
          _user: req.user.id,
        },
        { $set: { status: 'canceled' } },
        { new: true }
      );
      res.json(appt);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

  // @route   POST /api/appts/:id/reschedule
  // @desc    Marks an appointment as rescheduled
  // @access  Private
  app.post('/api/appts/:id/reschedule', requireLogin, async (req, res) => {
    try {
      const appt = await Appt.findOneAndUpdate(
        {
          _id: req.params.id,
          _user: req.user.id,
        },
        { $set: { status: 'rescheduled' } },
        { new: true }
      );
      res.json(appt);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

  // @route   POST /api/appts/:id/noshow
  // @desc    Marks an appointment as noshowed
  // @access  Private
  app.post('/api/appts/:id/noshow', requireLogin, async (req, res) => {
    try {
      const appt = await Appt.findOneAndUpdate(
        {
          _id: req.params.id,
          _user: req.user.id,
        },
        { $set: { status: 'noshowed' } },
        { new: true }
      );
      res.json(appt);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

  // @route   POST /api/appts/:id/complete
  // @desc    Marks an appointment as completed
  // @access  Private
  app.post('/api/appts/:id/complete', requireLogin, async (req, res) => {
    try {
      const appt = await Appt.findOneAndUpdate(
        {
          _id: req.params.id,
          _user: req.user.id,
        },
        { $set: { status: 'completed' } },
        { new: true }
      );
      res.json(appt);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

  // @route   POST /api/appts/:id/note
  // @desc    create or edit note for appt
  // @access  Private
  app.post('/api/appts/:id/note', requireLogin, async (req, res) => {
    try {
      const appt = await Appt.findOne({
        _id: req.params.id,
        _user: req.user.id,
      });
      if (!appt) {
        return res.status(404).json({ msg: 'Appointment not found' });
      }
      let note = await ApptNote.findOne({ _appt: appt._id });

      if (note) {
        //  Update
        note = await ApptNote.findByIdAndUpdate(
          note._id,
          { $set: { note: req.body.note } },
          { new: true }
        );

        return res.json(note);
      }
      //   Create
      const newNote = new ApptNote({
        note: req.body.note,
        _user: req.user.id,
        _client: appt._client,
        _appt: appt._id,
      });

      await newNote.save();
      res.json(newNote);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

  // @route   GET /api/apptnotes
  // @desc    Get all appt notes by user
  // @access  Private
  app.get('/api/apptnotes', requireLogin, async (req, res) => {
    try {
      const appts = await ApptNote.find({
        _user: req.user.id,
      });
      if (!appts) {
        return res.json({ msg: 'No notes to display' });
      }
      res.json(appts);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

  // @route   GET /api/apptnotes/client/:id
  // @desc    Get all appt notes by user && client
  // @access  Private
  app.get('/api/apptnotes/client/:id', requireLogin, async (req, res) => {
    try {
      const appts = await ApptNote.find({
        _user: req.user.id,
        _client: req.params.id,
      });
      if (!appts) {
        return res.json({ msg: 'No notes to display' });
      }
      res.json(appts);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

  // @route   GET /api/apptnote/:id
  // @desc    Get appt note by id
  // @access  Private
  app.get('/api/apptnote/:id', requireLogin, async (req, res) => {
    try {
      const appt = await ApptNote.findOne({
        _id: req.params.id,
        _user: req.user.id,
      });
      if (!appt) {
        return res.status(404).json({ msg: 'Note not found' });
      }
      res.json(appt);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

  // @route   DELETE /api/apptnote/:id
  // @desc    Delete appt note by id
  // @access  Private
  app.delete('/api/apptnote/:id', requireLogin, async (req, res) => {
    try {
      const appt = await ApptNote.findOneAndDelete({
        _id: req.params.id,
        _user: req.user.id,
      });
      if (!appt) {
        return res.status(404).json({ msg: 'Note not found' });
      }
      res.json({ msg: 'Note deleted' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
};
