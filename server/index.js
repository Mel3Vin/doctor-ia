import 'dotenv/config'; import express from 'express'; import { createServer as createViteServer } from 'vite'; import './database/seed.js';
import diagnosisRoutes from './routes/diagnosisRoutes.js'; import adminRoutes from './routes/adminRoutes.js';
const app=express(); app.use(express.json({limit:'1mb'})); app.use('/api',diagnosisRoutes); app.use('/api/admin',adminRoutes);
const vite=await createViteServer({server:{middlewareMode:true},appType:'spa'}); app.use(vite.middlewares);
app.listen(process.env.PORT||5173,()=>console.log('Doctor IA en http://localhost:5173'));
