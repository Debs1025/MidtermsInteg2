import { validationResult } from 'express-validator';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import { getAllUsers, saveAllUsers, getTeacherCodes, saveTeacherCodes } from '../models/userStore.js';
import { sendVerificationEmail } from '../services/emailService.js';

// validators extracted to validators/authValidators.js

export async function register(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { firstName, lastName, email, password, userType, teacherCode } = req.body;

  const users = getAllUsers();
  const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    return res.status(409).json({ message: 'Email already registered' });
  }

  if (userType === 'Teacher') {
    const codes = getTeacherCodes();
    const code = codes.find(c => c.code === teacherCode);
    if (!code) {
      return res.status(400).json({ message: 'Invalid teacher code' });
    }
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const verificationToken = uuidv4();
  const user = {
    id: uuidv4(),
    firstName,
    lastName,
    email: email.toLowerCase(),
    passwordHash,
    userType,
    verified: false,
    verificationToken,
    profile: { avatarUrl: null, rank: 'Reader', streakDays: 0 },
    progress: { recentBooks: [], ongoingQuests: [] }
  };

  users.push(user);
  saveAllUsers(users);

  await sendVerificationEmail({ toEmail: user.email, verificationToken });

  res.status(201).json({ message: 'Registration successful. Check email to verify.' });
}

export async function verifyEmail(req, res) {
  const token = req.query.token;
  if (!token) return res.status(400).json({ message: 'Missing token' });
  const users = getAllUsers();
  const user = users.find(u => u.verificationToken === token);
  if (!user) return res.status(400).json({ message: 'Invalid token' });
  user.verified = true;
  user.verificationToken = null;

  if (user.userType === 'Teacher') {
    // Link teacher code to this teacher if present
    const codes = getTeacherCodes();
    const idx = codes.findIndex(c => c.teacherId === null);
    if (idx >= 0) {
      // Do not auto-assign arbitrary codes; keep as seeded unless matched later
    }
    saveTeacherCodes(codes);
  }

  saveAllUsers(users);
  res.json({ message: 'Email verified. You may now log in.' });
}


