import Database from 'better-sqlite3'; import fs from 'fs'; import path from 'path';
const file=process.env.DB_PATH||path.resolve('server/database/doctor-ia.db'); fs.mkdirSync(path.dirname(file),{recursive:true});
const db=new Database(file); db.pragma('journal_mode = WAL');
db.exec(`CREATE TABLE IF NOT EXISTS symptoms(id INTEGER PRIMARY KEY,name TEXT UNIQUE,category TEXT);
CREATE TABLE IF NOT EXISTS diseases(id INTEGER PRIMARY KEY,name TEXT UNIQUE,description TEXT,symptoms TEXT,severity TEXT,specialty TEXT,treatment TEXT,recommendations TEXT,otc TEXT,prescription TEXT,risk_factors TEXT,recovery TEXT);
CREATE TABLE IF NOT EXISTS consultations(id INTEGER PRIMARY KEY,created_at TEXT DEFAULT CURRENT_TIMESTAMP,age INTEGER,sex TEXT,symptoms TEXT,results TEXT);
CREATE TABLE IF NOT EXISTS disease_views(disease_id INTEGER PRIMARY KEY,count INTEGER DEFAULT 0);`);
export default db;
