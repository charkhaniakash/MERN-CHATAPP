import Room from "../models/room.model.js";

export const createRoom = async (req, res) => {
  try {
    const { name, participants, description } = req.body;
    const newRoom = new Room({
      name,
      creator: req.user._id,
      participants: [...participants, req.user._id],
      description
    });
    const room = await newRoom.save();
    res.status(201).json(room);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find({
      participants: { $in: [req.user._id] }
    }).populate("participants", "username");
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addParticipant = async (req, res) => {
  try {
    const { roomId, userId } = req.body;
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }
    if (!room.participants.includes(userId)) {
      room.participants.push(userId);
      await room.save();
    }
    res.status(200).json(room);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};