import { symptoms, diseases as catalog } from '../data/medicalData';
const emergency=['dolor intenso en el pecho','pérdida del conocimiento','dificultad severa para respirar','convulsiones','sangrado abundante'];
const read=(key,fallback=[])=>JSON.parse(localStorage.getItem(key)||JSON.stringify(fallback));
const write=(key,value)=>localStorage.setItem(key,JSON.stringify(value));
export async function api(path,options={}){
 const body=options.body?JSON.parse(options.body):{};
 if(path==='/symptoms')return[...symptoms,...read('doctor-extra-symptoms')];
 if(path==='/diagnose'){const selected=body.symptoms||[],trigger=selected.find(s=>emergency.includes(s));if(trigger)return{emergency:true,trigger};const results=read('doctor-diseases',catalog).map(d=>{const matching=d.symptoms.filter(s=>selected.includes(s)),missing=d.symptoms.filter(s=>!selected.includes(s)),score=Math.round(matching.length/d.symptoms.length*100);return{...d,matching,missing,score,probability:score>=65?'Alta':score>=35?'Media':'Baja'}}).filter(d=>d.score).sort((a,b)=>b.score-a.score).slice(0,12);const history=read('doctor-history');history.unshift({id:Date.now(),created_at:new Date().toISOString(),age:body.age,sex:body.sex,symptoms:selected,results});write('doctor-history',history);return{emergency:false,results}}
 if(path==='/history')return read('doctor-history');
 if(path.startsWith('/history/')){write('doctor-history',read('doctor-history').filter(x=>x.id!==Number(path.split('/').pop())));return null}
 if(path==='/admin/login'){if(body.username==='admin'&&body.password==='admin123')return{ok:true};throw new Error('Credenciales incorrectas')}
 if(path==='/admin/diseases'&&options.method==='POST'){const ds=read('doctor-diseases',catalog);ds.push({...body,id:Date.now(),description:'Información orientativa.',severity:'Baja',specialty:'Medicina familiar',treatment:'Consultar a un profesional.',recommendations:'Vigile la evolución.',otc:'Según prospecto.',prescription:'Requiere receta médica.',recovery:'Variable'});write('doctor-diseases',ds);return{ok:true}}
 if(path==='/admin/diseases')return read('doctor-diseases',catalog);
 if(path==='/admin/stats'){const h=read('doctor-history'),freq={};h.forEach(x=>x.results.forEach(d=>freq[d.name]=(freq[d.name]||0)+1));return{total:h.length,diseases:Object.entries(freq).map(([name,count])=>({name,count})).sort((a,b)=>b.count-a.count).slice(0,8),sex:h.reduce((a,x)=>(a[x.sex||'No indicado']=(a[x.sex||'No indicado']||0)+1,a),{})}}
 if(path.startsWith('/admin/diseases/')){write('doctor-diseases',read('doctor-diseases',catalog).filter(d=>d.id!==Number(path.split('/').pop())));return null}
 throw new Error('Ruta no disponible');
}
