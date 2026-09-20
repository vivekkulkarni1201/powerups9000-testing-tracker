
const cfg=window.P9K_CONFIG||{};
if(!cfg.SUPABASE_URL||!cfg.SUPABASE_ANON_KEY){document.body.innerHTML='<div style="padding:30px">config.js missing.</div>';throw new Error('config missing')}
const sb=window.supabase.createClient(cfg.SUPABASE_URL,cfg.SUPABASE_ANON_KEY);
const STAGE_LABEL={RECEIVED:'Received',UNDER_TESTING:'Under Testing',HEATRUN_PROGRESS:'Heatrun In Progress',HEATRUN_COMPLETED:'Heatrun Completed',FAT_PROGRESS:'FAT Testing In Progress',TO_FINISHING:'To Finishing / Completed'};
function dstr(v){if(!v)return '—';return new Date(v).toLocaleString([], {day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit'})}
function stagePill(s){let c=s==='HEATRUN_COMPLETED'||s==='TO_FINISHING'?'green':s==='HEATRUN_PROGRESS'?'red':s==='UNDER_TESTING'?'amber':s==='FAT_PROGRESS'?'purple':'';return `<span class="pill ${c}">${STAGE_LABEL[s]||s}</span>`}
function monthBounds(year,month){let a=new Date(year,month-1,1),b=new Date(year,month,1);return [a,b]}
