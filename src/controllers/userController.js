import User from "../models/User.js";

const UserController = {
  getUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  },
  getUser: async (req, res) => {
    const { id } = req.params;

    try {
      const user = await User.findOne({ _id: id });

      if (!user) {
        res.status(422).json({ error: "User not found" });
        return;
      }

      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  },
  createUser: async (req, res) => {
    const { name, email } = req.body;

    if (!name) {
      res.status(422).json({ error: "Name is required" });
      return;
    }

    if (!email) {
      res.status(422).json({ error: "Email is required" });
      return;
    }

    const user = {
      name,
      email,
    };

    try {
      await User.create(user);
      res.status(201).json({ message: "User successfully registered" });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  },
  updateUser: async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;

    const user = {
      name,
      email,
    };

    try {
      const newUser = await User.updateOne({ _id: id }, user);

      if (newUser.matchedCount === 0) {
        res.status(422).json({ error: "User not found" });
        return;
      }

      res.status(200).json({ message: "User successfully updated" });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  },
  deleteUser: async (req, res) => {
    const { id } = req.params;

    const user = await User.findOne({ _id: id });

    if (!user) {
      res.status(422).json({ error: "User not found" });
      return;
    }

    try {
      await User.deleteOne({ _id: id });
      res.status(200).json({ message: "User successfully deleted" });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  },
};

export default UserController;
