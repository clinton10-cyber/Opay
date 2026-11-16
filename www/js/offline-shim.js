// Offline stand-in for the old backend: fakes /api/* so the UI runs as a pure static app.
window.AuthState = { isAdmin:false,isLoggedIn:true,userId:1,username:"clinton",fullName:"CLINTON EJIOFOR BENJAMIN",accountNumber:"8160881049",
  balance:0,safeboxBalance:0,tier:1,tierUpgradeRequested:false,nickname:"",gender:"Male",dob:"",address:"",email:"",profilePhoto:"" };
window.Auth = { init: async () => true, logout: async () => { AuthState.isLoggedIn = false; navigate("/"); }, isAdminUser: () => false };
function _readFile(file){ return new Promise((res)=>{ const r=new FileReader(); r.onload=()=>res(r.result); r.onerror=()=>res(""); r.readAsDataURL(file); }); }
window.Api = Object.assign(window.Api || {}, { uploadImage: async (file) => ({ ok:true, url: await _readFile(file) }) });
window.API = { get: async () => ({ ok:true }), post: async () => ({ ok:true }) };
const _realFetch = window.fetch ? window.fetch.bind(window) : null;
const _json = (o) => new Response(JSON.stringify(o), { status:200, headers:{ "Content-Type":"application/json" } });
window.fetch = async function (url, opts) {
  const u = typeof url === "string" ? url : (url && url.url) || "";
  if (!u.startsWith("/api/")) return _realFetch ? _realFetch(url, opts) : Promise.reject(new Error("offline"));
  opts = opts || {};
  let body = {}; try { if (typeof opts.body === "string") body = JSON.parse(opts.body); } catch (e) {}
  if (u.startsWith("/api/upload")) { const f = opts.body && opts.body.get && opts.body.get("file"); return _json({ ok:true, url: f ? await _readFile(f) : "" }); }
  if (u.startsWith("/api/users/lookup")) { const q = decodeURIComponent((u.split("q=")[1] || "")).trim(); return _json({ ok:true, user:{ id:Date.now(), full_name:q.toUpperCase(), username:q, account_number:q.replace(/\D/g,"") || q, phone:q.replace(/\D/g,"") } }); }
  if (u.startsWith("/api/verify-account")) { const m = u.match(/account_number=(\d+)/); return _json({ ok:true, account_name:"OPAY CUSTOMER", account_number:m?m[1]:"", bank_name:"", bank_code:"" }); }
  if (u.startsWith("/api/transfer/opay")) { const bal = Stores.balance.get().balance - (parseFloat(body.amount) || 0); return _json({ ok:true, new_balance:bal, reference:"25" + Date.now(), date:new Date().toISOString() }); }
  if (u.startsWith("/api/user/tier/request")) { return _json({ ok:true }); }
  return _json({ ok:true });
};
