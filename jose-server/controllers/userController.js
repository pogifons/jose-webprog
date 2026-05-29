const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const sanitizeUser = (user) => {
  const userObject = user.toObject ? user.toObject() : user;
  const { password, __v, ...safeUser } = userObject;

  return {
    ...safeUser,
    id: String(safeUser._id),
    role: safeUser.type || safeUser.role || 'viewer',
  };
};

const normalizeUserPayload = (body) => {
  const role = String(body.role ?? body.type ?? 'viewer').trim().toLowerCase();

  return {
    firstName: String(body.firstName ?? '').trim(),
    lastName: String(body.lastName ?? '').trim(),
    age: String(body.age ?? '').trim(),
    gender: String(body.gender ?? '').trim().toLowerCase(),
    contactNumber: String(body.contactNumber ?? '').trim(),
    email: String(body.email ?? '').trim().toLowerCase(),
    type: role,
    username: String(body.username ?? '').trim().toLowerCase(),
    password: body.password,
    address: String(body.address ?? '').trim() || 'Not provided',
    isActive: typeof body.isActive === 'boolean' ? body.isActive : true,
  };
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).sort({ createdAt: -1 });
    res.json(users.map(sanitizeUser));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const payload = normalizeUserPayload(req.body);

    if (!payload.password) {
      return res.status(400).json({ message: 'Password is required' });
    }

    const existingUser = await User.findOne({
      $or: [{ email: payload.email }, { username: payload.username }],
    });

    if (existingUser) {
      return res.status(409).json({
        message:
          existingUser.email === payload.email
            ? 'Email address already exists.'
            : 'Username already exists.',
      });
    }

    const user = await User.create({
      ...payload,
      password: await bcrypt.hash(payload.password, 10),
    });

    res.status(201).json(sanitizeUser(user));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const payload = normalizeUserPayload(req.body);

    if (payload.password) {
      payload.password = await bcrypt.hash(payload.password, 10);
    } else {
      delete payload.password;
    }

    const user = await User.findByIdAndUpdate(req.params.id, payload, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(sanitizeUser(user));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const email = String(req.body.email ?? '').trim().toLowerCase();
    const password = String(req.body.password ?? '');

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.isActive) {
      return res.status(403).json({
        message: 'Your account is inactive. Please contact support.',
      });
    }

    const userRole = user.type || user.role;

    if (userRole === 'viewer') {
      return res.status(403).json({
        message: 'Viewer accounts cannot access the dashboard.',
      });
    }

    let isPasswordValid = await bcrypt.compare(password, user.password);

    // Development helper for users inserted manually in MongoDB Compass.
    if (!isPasswordValid && user.password === password) {
      user.password = await bcrypt.hash(password, 10);
      await user.save();
      isPasswordValid = true;
    }

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: userRole,
      },
      process.env.JWT_SECRET || 'sampleSecret',
      { expiresIn: '1h' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: sanitizeUser(user),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
};
