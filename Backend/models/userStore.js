import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

const DATA_DIR = join(process.cwd(), 'Backend', 'data');
const USERS_FILE = join(DATA_DIR, 'users.json');
const TEACHER_CODES_FILE = join(DATA_DIR, 'teacherCodes.json');

function ensureDataFiles() {
  if (!existsSync(DATA_DIR)) {
    mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!existsSync(USERS_FILE)) {
    writeFileSync(USERS_FILE, JSON.stringify([], null, 2));
  }
  if (!existsSync(TEACHER_CODES_FILE)) {
    // Seed with example codes
    writeFileSync(TEACHER_CODES_FILE, JSON.stringify([{ code: 'CLASS-123', teacherId: null }], null, 2));
  }
}

function readJson(path) {
  return JSON.parse(readFileSync(path, 'utf8'));
}

function writeJson(path, data) {
  writeFileSync(path, JSON.stringify(data, null, 2));
}

export function getAllUsers() {
  ensureDataFiles();
  return readJson(USERS_FILE);
}

export function saveAllUsers(users) {
  ensureDataFiles();
  writeJson(USERS_FILE, users);
}

export function getTeacherCodes() {
  ensureDataFiles();
  return readJson(TEACHER_CODES_FILE);
}

export function saveTeacherCodes(codes) {
  ensureDataFiles();
  writeJson(TEACHER_CODES_FILE, codes);
}


