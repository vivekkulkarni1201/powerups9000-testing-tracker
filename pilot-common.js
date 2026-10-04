(()=>{if(!document.querySelector('link[href="premium-v3141.css"]')){let l=document.createElement('link');l.rel='stylesheet';l.href='premium-v3141.css?v=3141';document.head.appendChild(l)}})();
const cfg=window.P9K_CONFIG||{};
if(!cfg.SUPABASE_URL||!cfg.SUPABASE_ANON_KEY){document.body.innerHTML='<div style="padding:30px">config.js missing.</div>';throw new Error('config missing')}
const sb=window.supabase.createClient(cfg.SUPABASE_URL,cfg.SUPABASE_ANON_KEY);
const STAGE_LABEL={RECEIVED:'Received',UNDER_TESTING:'Legacy Under Testing',TESTING_PROGRESS:'Testing — In Progress',TESTING_COMPLETED:'Testing — Completed',HEATRUN_PROGRESS:'Heatrun — In Progress',HEATRUN_COMPLETED:'Heatrun — Completed',FAT_PROGRESS:'FAT Testing — In Progress',FAT_COMPLETED:'FAT Testing — Completed',FAULTY_RTA:'Faulty / RTA',TO_FINISHING:'To Finishing / Completed'};
function dstr(v){if(!v)return '—';return new Date(v).toLocaleString([], {day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit'})}
function stagePill(s){let c=(s==='TESTING_COMPLETED'||s==='HEATRUN_COMPLETED'||s==='FAT_COMPLETED'||s==='TO_FINISHING')?'green':s==='TESTING_PROGRESS'?'amber':s==='HEATRUN_PROGRESS'?'red':s==='FAT_PROGRESS'?'purple':'';return `<span class="pill ${c}">${STAGE_LABEL[s]||s}</span>`}
function monthBounds(year,month){return [new Date(year,month-1,1),new Date(year,month,1)]}
function esc(v){return String(v??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;')}
function nav(active=''){return `<div class="brand brandV314">
  <img class="vertivIntegratedLogo" src="vertiv-integrated-logo.jpg" alt="VERTIV">
  <div class="trackerTitleV314"><strong>POWERUPS 9000</strong><span>TESTING TRACKER</span></div>
</div><div class="nav navV37">
<a class="${active==='dash'?'active':''}" href="pilot-dashboard.html">⌂ Dashboard</a>
<a class="${active==='active'?'active':''}" href="pilot-active.html">⚡ Active UPS / Live QR</a>
<a class="${active==='scan'?'active':''}" href="pilot-scanner.html">⌗ Scan QR</a>
<a class="${active==='qr'?'active':''}" href="pilot-qr-generator.html">▦ QR Generator</a>
<a class="${active==='input'?'active':''}" href="pilot-input.html">▥ Input Distribution</a>
<div class="navSep"></div><a class="${active==='admin'?'active':''}" href="pilot-admin.html">⚙ Admin</a></div>
<div class="sidefoot sidefootV314"><b>VERTIV</b><span>Keep it humming.</span></div>`}
function showToast(msg,good=true){let t=document.getElementById('globalToast');if(!t){t=document.createElement('div');t.id='globalToast';t.className='toast';document.body.appendChild(t)}t.textContent=(good?'✅ ':'❌ ')+msg;t.className='toast show '+(good?'ok':'bad');setTimeout(()=>t.classList.remove('show'),4200)}
function activeTracker(x){return !x.completed_at&&x.current_stage!=='TO_FINISHING'}
function trackerBadge(x){let faulty=x?.is_faulty;return `<span class="trackerBadge ${faulty?'faulty':''}">${faulty?'⚠ ':''}${esc(x?.tracker_id||'—')}${faulty?' · FAULTY/RTA':''}</span>`}
function validateQRId(id){return /^P9K-Q\d{4,6}$/.test(String(id||'').toUpperCase())}
function subscribeTrackers(cb){try{return sb.channel('p9k-trackers-ui').on('postgres_changes',{event:'*',schema:'public',table:'p9k_prod_trackers'},()=>cb()).subscribe()}catch(e){return null}}

function startLiveClock(el){const tick=()=>{if(el)el.textContent=new Date().toLocaleString([],{weekday:'short',day:'2-digit',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit',second:'2-digit'})};tick();return setInterval(tick,1000)}
async function getSessionUser(){try{const {data}=await sb.auth.getSession();return data?.session?.user||null}catch(e){return null}}
async function getMyRole(){try{const {data,error}=await sb.rpc('p9k_prod_my_role');return error?'ANON':(data||'ANON')}catch(e){return 'ANON'}}
async function signOutP9K(){try{await sb.auth.signOut()}catch(e){}location.href='pilot-login.html'}


/* ==========================================================
   V3.15.1 — Portal update notifier
   Checks version.json every 30 seconds. No forced refresh while
   an engineer may be entering data; user confirms Refresh Now.
   ========================================================== */
const P9K_BUILD_VERSION='3.15.1';
let p9kUpdateNoticeShown=false;
function p9kShowUpdateNotice(serverVersion){
  if(p9kUpdateNoticeShown) return;
  p9kUpdateNoticeShown=true;
  const wrap=document.createElement('div');
  wrap.id='p9kUpdateNotice';
  wrap.style.cssText='position:fixed;inset:0;z-index:2147483647;background:rgba(1,15,27,.62);display:flex;align-items:center;justify-content:center;padding:18px;backdrop-filter:blur(3px)';
  wrap.innerHTML=`<div style="width:min(430px,94vw);background:#062b49;border:1px solid rgba(88,185,238,.5);border-radius:16px;box-shadow:0 22px 70px rgba(0,0,0,.45);padding:22px;color:#fff;font-family:inherit">
    <div style="font-size:12px;letter-spacing:1.4px;color:#8fd4fa;font-weight:800;margin-bottom:8px">POWERUPS 9000 PORTAL UPDATE</div>
    <div style="font-size:20px;font-weight:900;line-height:1.2;margin-bottom:8px">New version available</div>
    <div style="font-size:13px;line-height:1.5;color:#d5e9f6;margin-bottom:18px">A new portal patch has been deployed. Refresh once to continue with the latest version.</div>
    <button id="p9kRefreshNow" style="width:100%;border:0;border-radius:10px;padding:12px 16px;background:#ef6c25;color:#fff;font-weight:900;font-size:14px;cursor:pointer">Refresh Now</button>
    <div style="margin-top:10px;text-align:center;font-size:10px;color:#89aec6">Current ${P9K_BUILD_VERSION} · New ${String(serverVersion||'')}</div>
  </div>`;
  document.body.appendChild(wrap);
  document.getElementById('p9kRefreshNow').onclick=()=>{
    const u=new URL(window.location.href);
    u.searchParams.set('_portalv',String(serverVersion||Date.now()));
    window.location.replace(u.toString());
  };
}
async function p9kCheckPortalVersion(){
  try{
    const r=await fetch(`version.json?_=${Date.now()}`,{cache:'no-store'});
    if(!r.ok) return;
    const j=await r.json();
    const v=String(j?.version||'').trim();
    if(v && v!==P9K_BUILD_VERSION) p9kShowUpdateNotice(v);
  }catch(e){}
}
function p9kStartUpdateWatch(){
  p9kCheckPortalVersion();
  setInterval(p9kCheckPortalVersion,30000);
}
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',p9kStartUpdateWatch,{once:true});
else p9kStartUpdateWatch();
