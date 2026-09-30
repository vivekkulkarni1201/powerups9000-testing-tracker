const cfg=window.P9K_CONFIG||{};
if(!cfg.SUPABASE_URL||!cfg.SUPABASE_ANON_KEY){document.body.innerHTML='<div style="padding:30px">config.js missing.</div>';throw new Error('config missing')}
const sb=window.supabase.createClient(cfg.SUPABASE_URL,cfg.SUPABASE_ANON_KEY);
const STAGE_LABEL={RECEIVED:'Received',UNDER_TESTING:'Under Testing',HEATRUN_PROGRESS:'Heatrun In Progress',HEATRUN_COMPLETED:'Heatrun Completed',FAT_PROGRESS:'FAT Testing In Progress',TO_FINISHING:'To Finishing / Completed'};
function dstr(v){if(!v)return '—';return new Date(v).toLocaleString([], {day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit'})}
function stagePill(s){let c=s==='HEATRUN_COMPLETED'||s==='TO_FINISHING'?'green':s==='HEATRUN_PROGRESS'?'red':s==='UNDER_TESTING'?'amber':s==='FAT_PROGRESS'?'purple':'';return `<span class="pill ${c}">${STAGE_LABEL[s]||s}</span>`}
function monthBounds(year,month){return [new Date(year,month-1,1),new Date(year,month,1)]}
function esc(v){return String(v??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;')}
function nav(active=''){return `<div class="brand">VERTIV<small>POWERUPS 9000 TESTING TRACKER</small></div><div class="nav">
<a class="${active==='dash'?'active':''}" href="pilot-dashboard.html">⌂ Dashboard</a>
<a class="${active==='active'?'active':''}" href="pilot-active.html">⚡ Active UPS / Live QR</a>
<a class="${active==='scan'?'active':''}" href="pilot-scanner.html">⌗ Scan QR</a>
<a class="${active==='qr'?'active':''}" href="pilot-qr-generator.html">▦ QR Generator</a>
<a class="${active==='input'?'active':''}" href="pilot-input.html">▥ Input Distribution</a>
<div class="navSep"></div><a class="${active==='admin'?'active':''}" href="pilot-admin.html">⚙ Admin</a></div><div class="sidefoot">Reliable Power<br>for a Smarter World</div>`}
function showToast(msg,good=true){let t=document.getElementById('globalToast');if(!t){t=document.createElement('div');t.id='globalToast';t.className='toast';document.body.appendChild(t)}t.textContent=(good?'✅ ':'❌ ')+msg;t.className='toast show '+(good?'ok':'bad');setTimeout(()=>t.classList.remove('show'),4200)}
function activeTracker(x){return !x.completed_at&&x.current_stage!=='TO_FINISHING'}
function trackerBadge(x){let faulty=x?.is_faulty;return `<span class="trackerBadge ${faulty?'faulty':''}">${faulty?'⚠ ':''}${esc(x?.tracker_id||'—')}${faulty?' · FAULTY/RTA':''}</span>`}
function validateQRId(id){return /^P9K-Q\d{4,6}$/.test(String(id||'').toUpperCase())}
function subscribeTrackers(cb){try{return sb.channel('p9k-trackers-ui').on('postgres_changes',{event:'*',schema:'public',table:'p9k_prod_trackers'},()=>cb()).subscribe()}catch(e){return null}}
