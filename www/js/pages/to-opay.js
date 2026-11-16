// ── Transfer to OPay User (P2P) ───────────────────────────────────────────────
function renderToOpayPage(container) {
  let step = 'find';
  let recipient = null;
  let amount = 0;
  let note = '';

  function getBalance() {
    if (AuthState.isAdmin) return Stores.balance.get().balance;
    return AuthState.balance;
  }

  function fmt(n) {
    return '₦' + Number(n || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  // ── STEP 1: Find recipient ────────────────────────────────────────────────
  function renderFind() {
    const { primaryColor, adBanners } = Stores.customization.get();
    const recents = (Stores.recentTransfers.get().opay || []);

    function adCarouselHtml() {
      const banners = adBanners && adBanners.length > 0 ? adBanners : [];
      if (banners.length === 0) return '';
      return `
      <div style="margin:0 0 0;position:relative;overflow:hidden;border-radius:0.875rem;">
        <div id="ad-carousel-inner" style="display:flex;transition:transform 0.35s ease;will-change:transform;">
          ${banners.map(url => `
          <div style="min-width:100%;border-radius:0.875rem;overflow:hidden;">
            <img src="${url}" style="width:100%;height:auto;display:block;border-radius:0.875rem;" />
          </div>`).join('')}
        </div>
        ${banners.length > 1 ? `<div style="display:flex;justify-content:center;gap:5px;margin-top:0.5rem;">
          ${banners.map((_, i) => `<div class="ad-dot" data-idx="${i}" style="width:6px;height:6px;border-radius:9999px;background:${i === 0 ? primaryColor : '#d1d5db'};transition:background 0.2s;"></div>`).join('')}
        </div>` : ''}
      </div>`;
    }

    function recentItemHtml(r) {
      const initial = (r.full_name || r.username || '?')[0].toUpperCase();
      return `
      <div class="contact-item" data-recent-id="${r.id}" style="cursor:pointer;">
        <div class="avatar-container">
          ${r.profile_photo ? `<img src="${r.profile_photo}" class="avatar" />` : `<div class="avatar-placeholder" style="font-weight:700;color:#6b7280;">${initial}</div>`}
        </div>
        <div class="contact-info">
          <div class="contact-name">${(r.full_name || r.username || '').toUpperCase()}</div>
          <div class="contact-phone">${r.phone || r.account_number || ''}</div>
        </div>
      </div>`;
    }

    container.innerHTML = `
    <div class="ui-to"><div class="app-container">
      <header class="header">
        <div class="header-left" id="back-btn" style="cursor:pointer;"><svg viewBox="0 0 24 24"><path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"/></svg><span>Transfer to OPay Account</span></div>
        <div class="header-right" id="hist-btn" style="cursor:pointer;">History</div>
      </header>
      <div class="content-wrapper">
        ${adBanners && adBanners.length > 0 ? `<div style="margin-bottom:12px;">${adCarouselHtml()}</div>` : `
        <div class="ad-banner">
          <div class="ad-top-logos"><div class="bangbet-logo">BANGBET</div><span style="color:#ccc;font-size:10px;">|</span><div class="opay-logo-small"><div class="opay-circle-small"></div> OPay</div></div>
          <div class="ad-title">TOP 5 LEAGUES <span>15% CASHBACK</span> DAILY!</div>
          <div class="ad-subtitle">New Users Get ₦2,350 Bonus</div>
          <div class="ad-btn">Claim Now</div>
          <div class="ad-artwork"><svg viewBox="0 0 140 110" xmlns="http://www.w3.org/2000/svg">
                    <!-- Background Elements (Floating Coins) -->
                    <circle cx="115" cy="85" r="10" fill="#ffc107" opacity="0.9"/>
                    <circle cx="115" cy="85" r="7" fill="#ffd54f"/>
                    <circle cx="80" cy="80" r="8" fill="#ffc107" opacity="0.9"/>
                    <circle cx="80" cy="80" r="5" fill="#ffd54f"/>
                    
                    <!-- Woman's Hair -->
                    <path d="M55,40 Q50,20 70,15 Q85,10 95,25 Q105,40 95,55 Q85,50 75,60 Q65,50 55,40 Z" fill="#1a1a1a"/>
                    
                    <!-- Face & Body -->
                    <circle cx="75" cy="35" r="12" fill="#8c5a3a"/>
                    <!-- Hair front -->
                    <path d="M63,30 Q75,25 87,30 Q85,20 75,20 Q65,20 63,30 Z" fill="#1a1a1a"/>
                    <!-- Smile -->
                    <path d="M70,40 Q75,45 80,40" stroke="white" stroke-width="1.5" fill="none"/>
                    
                    <!-- Black T-shirt -->
                    <path d="M55,55 Q65,45 75,50 L90,50 Q100,55 105,75 L50,75 Z" fill="#222"/>
                    <!-- "JACKIE" text on shirt -->
                    <text x="65" y="65" font-size="5" fill="white" font-weight="bold" transform="rotate(10 65 65)">JACKIE</text>
                    
                    <!-- Denim Shorts -->
                    <path d="M50,75 L105,75 L100,90 L55,90 Z" fill="#4a7c9d"/>
                    
                    <!-- Left Arm holding Gift Box -->
                    <path d="M55,55 L40,70 L50,85 L60,75 Z" fill="#8c5a3a"/>
                    
                    <!-- Gift Box -->
                    <rect x="30" y="60" width="25" height="20" rx="2" fill="#d32f2f" transform="rotate(-15 30 60)"/>
                    <!-- Ribbon -->
                    <rect x="40" y="58" width="5" height="24" fill="#ffc107" transform="rotate(-15 40 58)"/>
                    <rect x="28" y="68" width="29" height="5" fill="#ffc107" transform="rotate(-15 28 68)"/>
                    <!-- Bow -->
                    <path d="M42,58 Q35,50 40,45 Q45,50 42,58 Z" fill="#ffc107" transform="rotate(-15 42 58)"/>
                    <path d="M42,58 Q45,48 52,50 Q48,55 42,58 Z" fill="#ffc107" transform="rotate(-15 42 58)"/>

                    <!-- Right Arm holding Soccer Ball -->
                    <path d="M90,55 L110,65 L105,80 L95,70 Z" fill="#8c5a3a"/>
                    
                    <!-- Soccer Ball -->
                    <circle cx="115" cy="60" r="18" fill="white" stroke="#222" stroke-width="1.5"/>
                    <!-- Ball Pentagons -->
                    <path d="M115,50 L120,54 L118,60 L112,60 L110,54 Z" fill="#222"/>
                    <path d="M103,58 L108,60 L110,66 L105,69 L100,64 Z" fill="#222"/>
                    <path d="M127,58 L122,60 L120,66 L125,69 L130,64 Z" fill="#222"/>
                    <path d="M107,72 L112,68 L118,68 L123,72 L115,78 Z" fill="#222"/>
                    <!-- Lines connecting patches -->
                    <path d="M115,50 L115,42 M110,54 L103,58 M120,54 L127,58 M112,60 L107,72 M118,60 L123,72 M110,66 L115,78 M120,66 L115,78" stroke="#222" stroke-width="1.5"/>
                </svg></div>
          <div class="ad-badge-18">18+</div><div class="ad-badge-ad">AD</div>
          <div class="ad-dots"><div class="dot active"></div><div class="dot"></div><div class="dot"></div><div class="dot"></div><div class="dot"></div></div>
        </div>`}

        <div class="instant-banner"><div class="instant-icon">${Icon('check',{size:14})}</div><div class="instant-text">Instant, Zero Issues, Free</div></div>

        <div class="card">
          <div class="card-title">Recipient Account</div>
          <div class="input-box">
            <input id="recipient-input" type="text" placeholder="Phone No./OPay Account No./Name" autocomplete="off" autocorrect="off" autocapitalize="none" spellcheck="false" inputmode="text" />
            <button id="scan-btn" style="background:none;border:none;padding:0;color:#6b7280;">${Icon('qr-code',{size:20})}</button>
          </div>
          <div id="search-err" style="color:#ef4444;font-size:0.8rem;margin-top:0.5rem;min-height:1.2em;"></div>
          <div id="search-result" style="margin-top:0.5rem;"></div>
          <div class="help-text">Don't know the recipient's OPay account number? <a href="#" id="ask-them-btn">Ask them &gt;</a></div>
        </div>

        <div class="card">
          <div class="tabs"><div class="tab active" id="tab-recents">Recents</div><div class="tab" id="tab-favs">Favourites</div></div>
          <div class="contact-list" id="recents-list">
            ${recents.length === 0
              ? `<p style="color:#9ca3af;font-size:0.875rem;text-align:center;padding:1.5rem 0;margin:0;">No recent transfers yet</p>`
              : recents.slice(0, 3).map(r => recentItemHtml(r)).join('')}
          </div>
          ${recents.length > 3 ? `<div class="view-all-btn" id="view-all-btn" style="cursor:pointer;">View All ›</div>` : ''}
        </div>

        <div class="card opay-banner">
          <div class="opay-banner-left">
            <div class="opay-banner-icon">${Icon('users',{size:20})}</div>
            <div class="opay-banner-text"><h4>See who else is using OPay</h4><p>Send money to your contacts for free</p></div>
          </div>
          <div class="opay-banner-arrow">${Icon('chevron-right',{size:18})}</div>
        </div>
      </div>
    </div></div>`;
    const hb = container.querySelector('#hist-btn'); if (hb) hb.addEventListener('click', () => navigate('/transaction-history'));

    container.querySelector('#back-btn').addEventListener('click', () => navigate('/dashboard'));

    const input = container.querySelector('#recipient-input');
    const errEl = container.querySelector('#search-err');
    const resultEl = container.querySelector('#search-result');

    input.addEventListener('keydown', e => { if (e.key === 'Enter') doSearch(); });
    input.addEventListener('input', () => { if (input.value.trim()) doSearch(); });

    container.querySelectorAll('[data-recent-id]').forEach(btn => {
      btn.addEventListener('click', () => {
        const r = recents.find(x => String(x.id) === btn.dataset.recentId);
        if (r) { recipient = r; step = 'amount'; renderAmount(); }
      });
    });

    // Ad carousel auto-slide
    const inner = container.querySelector('#ad-carousel-inner');
    if (inner && adBanners && adBanners.length > 1) {
      let cur = 0;
      const dots = container.querySelectorAll('.ad-dot');
      setInterval(() => {
        cur = (cur + 1) % adBanners.length;
        inner.style.transform = `translateX(-${cur * 100}%)`;
        dots.forEach((d, i) => d.style.background = i === cur ? primaryColor : '#d1d5db');
      }, 3500);
    }

    async function doSearch() {
      const q = input.value.trim();
      errEl.textContent = '';
      resultEl.innerHTML = '';
      if (!q) { errEl.textContent = 'Enter a username, account number, or phone'; return; }

      try {
        const res = await fetch(`/api/users/lookup?q=${encodeURIComponent(q)}`, { credentials: 'include' });
        const data = await res.json();

        if (data.ok) {
          const u = data.user;
          resultEl.innerHTML = `
          <div style="background:#f0fdf4;border:1.5px solid #86efac;border-radius:0.75rem;padding:1rem;">
            <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:0.75rem;">
              <div style="width:44px;height:44px;border-radius:9999px;background:#00B875;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                ${Icon('user',{size:22,color:'white'})}
              </div>
              <div>
                <div style="font-weight:700;color:#111827;">${u.full_name}</div>
                <div style="font-size:0.75rem;color:#6b7280;">@${u.username}</div>
                ${u.account_number ? `<div style="font-size:0.75rem;color:#6b7280;margin-top:1px;">Acct: ${u.account_number}</div>` : ''}
              </div>
              <div style="margin-left:auto;">${Icon('check-circle',{size:20,color:'#059669'})}</div>
            </div>
            <button id="select-recipient" style="width:100%;padding:0.7rem;background:#00B875;color:white;border:none;border-radius:0.6rem;font-weight:700;font-size:0.9rem;cursor:pointer;">Continue to Amount</button>
          </div>`;

          resultEl.querySelector('#select-recipient').addEventListener('click', () => {
            recipient = u;
            step = 'amount';
            renderAmount();
          });
        } else {
          errEl.textContent = data.error || 'User not found';
        }
      } catch (e) {
        errEl.textContent = 'Network error. Please try again.';
      }
    }
  }

  // ── STEP 2: Enter amount ──────────────────────────────────────────────────
  function renderAmount() {
    const { primaryColor } = Stores.customization.get();
    const balance = getBalance();
    const quickAmts = [500, 1000, 2000, 5000, 10000, 9999];
    let selectedQuick = null;
    let inputVal = amount > 0 ? String(amount) : '';

    function renderInner() {
      const canConfirm = parseFloat(inputVal || '0') > 0;
      const recipientPhone = recipient.phone || recipient.account_number || '';
      container.innerHTML = `
      <div class="ui-amt"><div class="app-container" style="min-height:100vh;padding-bottom:6rem;">
        <header class="header">
          <div class="header-left" id="back-btn" style="cursor:pointer;"><svg viewBox="0 0 24 24"><path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"/></svg><span>Transfer to OPay Account</span></div>
          <div class="header-right" id="records-btn" style="cursor:pointer;">Records</div>
        </header>
        <div class="content-area">
          <div class="recipient-section">
            <div class="avatar-placeholder" style="overflow:hidden;">${recipient.profile_photo ? `<img src="${recipient.profile_photo}" style="width:100%;height:100%;object-fit:cover;" />` : Icon('user',{size:22,color:'#9ca3af'})}</div>
            <div class="recipient-info">
              <div class="recipient-name">${(recipient.full_name||'').toUpperCase()}</div>
              <div class="recipient-phone">${recipientPhone.replace(/(\d{3})(\d{3})(\d{4})/,'$1 $2 $3')}</div>
            </div>
          </div>
          <div class="card">
            <div class="no-fees-badge">No Transaction Fees</div>
            <div class="card-title">Amount</div>
            <div class="amount-input-row">
              <span class="naira-symbol">₦</span>
              <input id="amount-input" type="text" inputmode="none" readonly value="${inputVal ? Number(inputVal).toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2}) : ''}" placeholder="0.00 - 5,000,000.00" style="flex:1;border:none;outline:none;background:transparent;font:inherit;font-size:${inputVal ? '1.6rem' : '1rem'};font-weight:${inputVal ? '700' : '400'};min-width:0;" />
              ${inputVal ? `<button id="clear-amt" style="background:#d1d5db;border:none;width:22px;height:22px;border-radius:9999px;color:#fff;line-height:1;">&times;</button>` : ''}
            </div>
            <div class="amount-grid">
              ${quickAmts.map(v => `<button class="amount-btn quick-amt" data-val="${v}" style="${selectedQuick===v ? `background:rgba(0,184,117,0.12);color:${primaryColor};` : ''}">&#x20A6;${v.toLocaleString()}</button>`).join('')}
            </div>
          </div>
          <div class="card remark-card">
            <div class="card-title">Remark</div>
            <input id="remark-input" type="text" class="remark-input" placeholder="What's this for?(Optional)" value="${note}" maxlength="100" />
            <div class="remark-tags">
              <button class="remark-tag remark-chip" data-remark="Purchase">Purchase</button>
              <button class="remark-tag remark-chip" data-remark="Personal">Personal</button>
            </div>
          </div>
        </div>
        <div class="bottom-action" style="position:fixed;left:0;right:0;bottom:0;background:#f7f9fa;">
          <button id="confirm-btn" class="confirm-btn" style="${canConfirm ? `background:${primaryColor};color:#fff;` : ''}">Confirm</button>
        </div>
      </div></div>`;

      container.querySelector('#back-btn').addEventListener('click', () => { step='find'; renderFind(); });
      container.querySelector('#records-btn').addEventListener('click', () => navigate('/transaction-history'));
      const amtInput = container.querySelector('#amount-input');
      attachAmountKeypad(amtInput, { decimal: true });
      amtInput.addEventListener('input', (e) => { inputVal = e.target.value.replace(/,/g,''); selectedQuick = null; renderInner(); });
      const clearBtn = container.querySelector('#clear-amt');
      if (clearBtn) clearBtn.addEventListener('click', () => { inputVal=''; selectedQuick=null; renderInner(); });
      container.querySelectorAll('.quick-amt').forEach(btn => {
        btn.addEventListener('click', () => { selectedQuick = parseInt(btn.dataset.val); inputVal = String(selectedQuick); renderInner(); });
      });
      container.querySelector('#remark-input').addEventListener('input', (e) => { note = e.target.value; });
      container.querySelectorAll('.remark-chip').forEach(btn => {
        btn.addEventListener('click', () => { note = btn.dataset.remark; container.querySelector('#remark-input').value = note; });
      });
      container.querySelector('#confirm-btn').addEventListener('click', () => {
        const val = parseFloat(inputVal || '0');
        if (!val || val <= 0) { toast.error('Enter an amount'); return; }
        if (val > balance) { toast.error('Insufficient balance'); return; }
        amount = val;
        showReminderSheet();
      });
    }

    function showReminderSheet() {
      const pc = primaryColor;
      const overlay = document.createElement('div');
      overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.45);z-index:200;display:flex;align-items:flex-end;justify-content:center;';
      const acctNo = (recipient.account_number || recipient.phone || '').replace(/\s/g,'');
      overlay.innerHTML = `
      <div id="rem-sheet" style="background:white;border-radius:1.25rem 1.25rem 0 0;padding:1.5rem 1.25rem 2rem;width:100%;max-width:420px;transform:translateY(100%);transition:transform 0.28s cubic-bezier(.22,.8,.28,1);">
        <div style="display:flex;justify-content:flex-end;"><button id="rem-x" style="background:none;border:none;font-size:1.25rem;color:#9ca3af;cursor:pointer;">&#10005;</button></div>
        <h2 style="font-size:1.125rem;font-weight:800;color:#111827;text-align:center;margin:0 0 0.75rem;">Reminder</h2>
        <p style="font-size:0.875rem;color:#6b7280;text-align:center;line-height:1.5;margin:0 0 1.25rem;">Double check the transfer details before you proceed. Please note that successful transfers cannot be reversed.</p>
        <div style="background:#f9fafb;border-radius:0.875rem;padding:1rem 1.25rem;margin-bottom:1.5rem;">
          <p style="font-size:0.875rem;font-weight:700;color:#111827;margin:0 0 0.875rem;">Transaction Details</p>
          ${[['Name',(recipient.full_name||'').toUpperCase()],['Account No.',acctNo],['Bank','OPay'],['Amount',`&#x20A6;${amount.toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})}`]].map(([l,v])=>`
          <div style="display:flex;justify-content:space-between;padding:0.625rem 0;border-bottom:1px solid #f3f4f6;">
            <span style="font-size:0.875rem;color:#9ca3af;">${l}</span>
            <span style="font-size:0.875rem;font-weight:700;color:#111827;">${v}</span>
          </div>`).join('')}
        </div>
        <div style="display:flex;gap:0.75rem;">
          <button id="rem-recheck" style="flex:1;padding:0.875rem;background:white;border:1.5px solid ${pc};color:${pc};border-radius:9999px;font-weight:700;cursor:pointer;">Recheck</button>
          <button id="rem-continue" style="flex:2;padding:0.875rem;background:${pc};color:white;border:none;border-radius:9999px;font-weight:700;cursor:pointer;">Continue</button>
        </div>
      </div>`;
      document.body.appendChild(overlay);
      requestAnimationFrame(() => { overlay.querySelector('#rem-sheet').style.transform='translateY(0)'; });
      const close = (cb) => { overlay.querySelector('#rem-sheet').style.transform='translateY(100%)'; setTimeout(() => { overlay.remove(); if(cb) cb(); }, 280); };
      overlay.addEventListener('click', (e) => { if(e.target===overlay) close(); });
      overlay.querySelector('#rem-x').addEventListener('click', () => close());
      overlay.querySelector('#rem-recheck').addEventListener('click', () => close());
      overlay.querySelector('#rem-continue').addEventListener('click', () => close(() => showPaySheet()));
    }

    function showPaySheet() {
      const pc = primaryColor;
      const bal = getBalance();
      const overlay = document.createElement('div');
      overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.45);z-index:200;display:flex;align-items:flex-end;justify-content:center;';
      const acctNo = (recipient.account_number || recipient.phone || '').replace(/\s/g,'');
      const fmtAcct = acctNo.replace(/(\d{3})(\d{3})(\d{4})/,'$1 $2 $3');
      overlay.innerHTML = `
      <div id="pay-sheet" style="background:white;border-radius:1.25rem 1.25rem 0 0;padding:1.5rem 1.25rem 2rem;width:100%;max-width:420px;transform:translateY(100%);transition:transform 0.28s cubic-bezier(.22,.8,.28,1);">
        <button id="pay-x" style="background:none;border:none;font-size:1.125rem;color:#9ca3af;cursor:pointer;padding:0;margin-bottom:0.75rem;">&#10005;</button>
        <p style="font-size:2rem;font-weight:800;color:#111827;margin:0 0 1.25rem;text-align:center;">&#x20A6;${amount.toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})}</p>
        <div style="display:flex;justify-content:space-between;padding:0.75rem 0;border-bottom:1px solid #f3f4f6;">
          <span style="font-size:0.875rem;color:#9ca3af;">Account Number</span>
          <span style="font-size:0.875rem;font-weight:600;color:#111827;">${fmtAcct}</span>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;padding:0.75rem 0;border-bottom:1px solid #f3f4f6;">
          <span style="font-size:0.875rem;color:#9ca3af;">Name</span>
          <div style="display:flex;align-items:center;gap:0.375rem;">
            <div style="width:20px;height:20px;border-radius:9999px;background:#e5e7eb;display:flex;align-items:center;justify-content:center;overflow:hidden;">${recipient.profile_photo?`<img src="${recipient.profile_photo}" style="width:100%;height:100%;object-fit:cover;">`:`${Icon('user',{size:12,color:'#9ca3af'})}`}</div>
            <span style="font-size:0.875rem;font-weight:600;color:#111827;">${(recipient.full_name||'').toUpperCase()}</span>
          </div>
        </div>
        <div style="display:flex;justify-content:space-between;padding:0.75rem 0;border-bottom:1px solid #f3f4f6;">
          <span style="font-size:0.875rem;color:#9ca3af;">Amount</span>
          <span style="font-size:0.875rem;font-weight:700;color:#111827;">&#x20A6;${amount.toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})}</span>
        </div>
        <div style="margin-top:1rem;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.625rem;">
            <span style="font-size:0.9375rem;font-weight:700;color:#111827;">Payment Method</span>
            <span style="font-size:0.875rem;color:#9ca3af;">All &gt;</span>
          </div>
          <div style="border:1px solid #e5e7eb;border-radius:0.875rem;overflow:hidden;">
            <div style="display:flex;justify-content:space-between;align-items:center;padding:0.875rem 1rem;border-bottom:1px dashed #e5e7eb;">
              <div style="display:flex;align-items:center;gap:0.5rem;">
                <span style="font-size:0.875rem;font-weight:700;color:#111827;">Available Balance</span>
                <span style="font-size:0.875rem;color:#374151;">(&#x20A6;${bal.toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})})</span>
              </div>
              <span style="color:${pc};">${Icon('check',{size:18})}</span>
            </div>
            <div style="padding:0.625rem 1rem;border-bottom:1px solid #f3f4f6;"><span style="font-size:0.8125rem;color:#9ca3af;">Wallet (&#x20A6;0.00)</span></div>
            <div style="display:flex;justify-content:space-between;padding:0.625rem 1rem;">
              <span style="font-size:0.8125rem;color:#374151;">OWealth (&#x20A6;${bal.toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})})</span>
              <span style="font-size:0.8125rem;font-weight:600;color:#111827;">-&#x20A6;${amount.toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})}</span>
            </div>
          </div>
        </div>
        <button id="do-pay" style="width:100%;background:${pc};color:white;border:none;border-radius:9999px;padding:1rem;font-weight:700;font-size:1.0625rem;cursor:pointer;margin-top:1.5rem;">Pay</button>
      </div>`;
      document.body.appendChild(overlay);
      requestAnimationFrame(() => { overlay.querySelector('#pay-sheet').style.transform='translateY(0)'; });
      const close = (cb) => { overlay.querySelector('#pay-sheet').style.transform='translateY(100%)'; setTimeout(() => { overlay.remove(); if(cb) cb(); }, 280); };
      overlay.addEventListener('click', (e) => { if(e.target===overlay) close(); });
      overlay.querySelector('#pay-x').addEventListener('click', () => close());
      overlay.querySelector('#do-pay').addEventListener('click', () => {
        close(() => {
          showPinModal({ amount: amount.toLocaleString(), recipientLabel: recipient.full_name, onConfirm: async () => {
            try {
              const res = await fetch('/api/transfer/opay', { method:'POST', headers:{'Content-Type':'application/json'}, credentials:'include', body: JSON.stringify({ recipient_id: recipient.id, amount, note }) });
              const data = await res.json();
              if (data.ok) {
                if (AuthState.isAdmin) { Stores.balance.set({ balance: data.new_balance }); } else { AuthState.balance = data.new_balance; Stores.balance.set({ balance: data.new_balance }); }
                Stores.recentTransfers.addOpay({ id: recipient.id, full_name: recipient.full_name, username: recipient.username, account_number: recipient.account_number||'', phone: recipient.phone||'', profile_photo: recipient.profile_photo||'' });
                Stores.transaction.addTransaction({ type: `Transfer to ${recipient.full_name}`, amount: `-&#x20A6;${amount.toLocaleString()}`, status: 'Successful', icon: 'send' });
                step = 'success'; renderSuccess(data);
              } else { toast.error(data.error || 'Transfer failed'); }
            } catch(e) { toast.error('Network error. Please try again.'); }
          }});
        });
      });
    }

    renderInner();
  }

  // ── STEP 4: Success ───────────────────────────────────────────────────────
  function renderSuccess(data) {
    container.innerHTML = `
    <div style="min-height:100vh;background:#f9fafb;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:2rem;">
      <div style="width:100%;max-width:20rem;text-align:center;">
        <div style="width:80px;height:80px;border-radius:9999px;background:#d1fae5;border:3px solid #34d399;display:flex;align-items:center;justify-content:center;margin:0 auto 1.5rem;">
          ${Icon('check',{size:40,color:'#059669'})}
        </div>
        <h2 style="font-size:1.5rem;font-weight:800;color:#111827;margin:0 0 0.5rem;">Transfer Successful</h2>
        <p style="color:#6b7280;font-size:0.9rem;margin:0 0 2rem;">Your transfer has been sent successfully.</p>

        <div style="background:white;border-radius:1rem;padding:1.25rem;box-shadow:0 1px 3px rgba(0,0,0,0.06);text-align:left;margin-bottom:1.5rem;">
          <div style="font-size:2rem;font-weight:800;color:#059669;text-align:center;margin-bottom:1rem;">${fmt(amount)}</div>
          ${[
            ['Sent to', data.recipient.full_name],
            ['Account', data.recipient.account_number || 'OPay Account'],
            ['Status', 'Successful'],
            ['New Balance', fmt(data.new_balance)],
            ...(note ? [['Note', note]] : []),
          ].map(([label, value]) => `
          <div style="display:flex;justify-content:space-between;padding:0.5rem 0;border-bottom:1px solid #f3f4f6;font-size:0.875rem;">
            <span style="color:#6b7280;">${label}</span>
            <span style="font-weight:600;color:${label === 'Status' ? '#059669' : '#111827'};">${value}</span>
          </div>`).join('')}
        </div>

        <button id="home-btn" style="width:100%;padding:0.85rem;background:#00B875;color:white;border:none;border-radius:0.6rem;font-weight:700;font-size:0.95rem;cursor:pointer;margin-bottom:0.75rem;">Back to Home</button>
        <button id="send-again-btn" style="width:100%;padding:0.85rem;background:white;color:#00B875;border:1.5px solid #00B875;border-radius:0.6rem;font-weight:600;font-size:0.9rem;cursor:pointer;">Send to Another User</button>
      </div>
    </div>`;

    container.querySelector('#home-btn').addEventListener('click', () => navigate('/dashboard'));
    container.querySelector('#send-again-btn').addEventListener('click', () => {
      step = 'find'; recipient = null; amount = 0; note = '';
      renderFind();
    });
  }

  renderFind();
}

window.renderToOpayPage = renderToOpayPage;
