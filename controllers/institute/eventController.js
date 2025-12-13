import { pool } from "../../config/db.js";  // ✅ CORRECT


// ADD Event
export const addEvent = async (req, res) => {
  try {
    const event = await Event.create({
      title: req.body.title,
      description: req.body.description,
      date: req.body.date,
      venue: req.body.venue
    });

    res.json({ success: true, message: "Event added successfully", event });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET all events
export const getEvents = async (req, res) => {
  try {
    const events = await Event.findAll();
    res.json(events);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// UPDATE event
export const updateEvent = async (req, res) => {
  try {
    await Event.update(req.body, { where: { id: req.params.id } });

    res.json({ success: true, message: "Event updated successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE event
export const deleteEvent = async (req, res) => {
  try {
    await Event.destroy({ where: { id: req.params.id } });

    res.json({ success: true, message: "Event deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
