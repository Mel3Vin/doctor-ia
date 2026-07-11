import {Router} from 'express'; import db from '../database/db.js'; import {analyze} from '../services/diagnosisService.js';
const r=Router(); r.get('/symptoms',(_,res)=>res.json(db.prepare('SELECT * FROM symptoms ORDER BY category,name').all())); r.post('/diagnose',(req,res)=>res.json(analyze(req.body)));
r.get('/history',(req,res)=>res.json(db.prepare('SELECT * FROM consultations ORDER BY created_at DESC').all().map(x=>({...x,symptoms:JSON.parse(x.symptoms),results:JSON.parse(x.results)}))));
r.delete('/history/:id',(req,res)=>{db.prepare('DELETE FROM consultations WHERE id=?').run(req.params.id);res.sendStatus(204)}); export default r;
