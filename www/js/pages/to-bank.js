function renderToBankPage(container) {
  let selectedBank = "";
  let selectedBankCode = "";
  let accountNumber = "";
  let accountName = "";
  let amount = "";
  let verifiedAccount = null;

  function getRecents() {
    return Stores.recentTransfers.get().bank || [];
  }

  function bankBadge(bankName) {
    const n = String(bankName || '').toLowerCase().replace(/[^a-z]/g, '');
    if (n.includes('palmpay')) return `<div class="bank-logo" style="background:#fff;border:1px solid #e8d5f7;"><svg viewBox="0 0 100 100" width="26" height="26"><circle cx="50" cy="50" r="50" fill="#f8f9fa"/><path d="M30,40 L60,40 Q70,40 70,50 Q70,60 60,60 L45,60 L45,75 L35,75 L35,40 Z" fill="none" stroke="#7b3fe4" stroke-width="8" stroke-linejoin="round"/><path d="M45,50 L60,50" stroke="#7b3fe4" stroke-width="8" stroke-linecap="round"/></svg></div>`;
    if (n.includes('firstbank')) return `<div class="bank-logo" style="background:#003b71;"><svg viewBox="0 0 24 24" width="24" height="24"><path d="M12,2 L14,6 L18,7 L17,12 C17,16 14,20 12,22 C10,20 7,16 7,12 L6,7 L10,6 Z" fill="#d4af37"/><path d="M10,10 Q12,8 14,10 Q14,12 12,14 Q10,12 10,10 Z" fill="#003b71"/></svg></div>`;
    if (n.includes('monie')) return `<div class="bank-logo" style="background:#0357ee;font-style:italic;font-size:18px;">M</div>`;
    if (n === 'opay') return `<div class="bank-logo" style="background:#fff;border:1px solid #d1fae5;"><svg viewBox="0 0 40 40" width="26" height="26"><circle cx="20" cy="20" r="11" fill="none" stroke="#00b875" stroke-width="6"/><rect x="9" y="18" width="9" height="4" fill="#0e2a3b"/></svg></div>`;
    const colors = { gtbank:'#FF6600', gtb:'#FF6600', accessbank:'#D41159', uba:'#EC1C24', zenithbank:'#001E6C', fcmb:'#004B93', stanbicibtc:'#003478', wemabank:'#01aeef', fidelitybank:'#008000' };
    return `<div class="bank-logo" style="background:${colors[n] || '#6b7280'};">${bankName ? String(bankName)[0].toUpperCase() : 'B'}</div>`;
  }

  function renderRecentItem(r, idx) {
    return `
    <div class="list-item" data-recent-idx="${idx}">
      <div class="item-info"><div class="item-name">${r.name}</div><div class="item-details">${r.account_number} ${r.bank}</div></div>
      ${bankBadge(r.bank)}
    </div>`;
  }

  function render() {
    const { primaryColor, adBanners } = Stores.customization.get();
    const recents = getRecents();

    function adCarouselHtml() {
      if (!adBanners || adBanners.length === 0) return '';
      return `
      <div style="position:relative;overflow:hidden;border-radius:0.875rem;margin-bottom:1rem;">
        <div id="ad-carousel-inner" style="display:flex;transition:transform 0.35s ease;">
          ${adBanners.map(url => `
          <div style="min-width:100%;border-radius:0.875rem;overflow:hidden;">
            <img src="${url}" style="width:100%;height:auto;display:block;" />
          </div>`).join('')}
        </div>
        ${adBanners.length > 1 ? `<div style="display:flex;justify-content:center;gap:5px;margin-top:0.5rem;">
          ${adBanners.map((_, i) => `<div class="ad-dot" data-idx="${i}" style="width:6px;height:6px;border-radius:9999px;background:${i === 0 ? primaryColor : '#d1d5db'};"></div>`).join('')}
        </div>` : ''}
      </div>`;
    }

    container.innerHTML = `
    <div class="ui-bank">
      <header class="header">
        <div class="header-left" id="back-btn"><svg viewBox="0 0 24 24"><path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"/></svg><span>Transfer to Bank Account</span></div>
        <div class="header-right" id="hist-btn">History</div>
      </header>
      <main class="main-content" style="padding-bottom:6rem;">
        ${adBanners && adBanners.length > 0 ? adCarouselHtml() : `
        <div class="ad-banner">
          <div class="ad-top"><div class="ilotbet-logo">iLOTBET<span>.</span></div><div class="opay-logo"><div class="opay-dot"></div> Pay</div></div>
          <div class="ad-text">Deposit &amp; Claim up to 100% Coupon</div>
          <div class="claim-btn">Claim Now</div>
          <div class="ad-artwork"><svg viewBox="0 0 160 110" xmlns="http://www.w3.org/2000/svg"><path d="M110,110 L100,80 L115,70 L125,85 L130,110 Z" fill="#e0a96d"/><path d="M115,70 L130,60 L140,75 L125,85 Z" fill="#d29656"/><rect x="100" y="50" width="50" height="25" rx="3" fill="#00b875" transform="rotate(-25 100 50)"/><text x="108" y="65" font-size="8" fill="white" font-weight="bold" transform="rotate(-25 100 50)">100% COUPON</text><rect x="100" y="50" width="50" height="8" rx="3" fill="#00d26a" transform="rotate(-25 100 50)"/><rect x="70" y="20" width="20" height="10" fill="#00d26a" transform="rotate(15 70 20)" opacity="0.9"/><rect x="80" y="40" width="18" height="8" fill="#00b875" transform="rotate(-40 80 40)" opacity="0.8"/><rect x="120" y="20" width="22" height="10" fill="#00d26a" transform="rotate(45 120 20)" opacity="0.9"/><rect x="60" y="60" width="15" height="8" fill="#00b875" transform="rotate(-10 60 60)" opacity="0.7"/><rect x="130" y="40" width="18" height="8" fill="#00d26a" transform="rotate(70 130 40)" opacity="0.8"/></svg></div>
          <div class="ad-bottom"><div class="badge-18">18+</div><div class="badge-ad">AD</div></div>
          <div class="dots"><div class="dot active"></div><div class="dot"></div><div class="dot"></div></div>
        </div>`}

        <div class="free-transfer-banner"><svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg><div>Free transfers for the day: <span>3</span></div></div>

        <div class="card">
          <div class="card-title">Recipient Account</div>
          <div class="input-field"><input id="account-input" type="text" inputmode="numeric" pattern="[0-9]*" placeholder="Enter 10 digits Account Number" value="${accountNumber}" /></div>
          <div class="input-field select-bank" id="bank-select">
            <span style="color:${selectedBank ? '#111827' : '#b0b0b0'};">${selectedBank || 'Select Bank'}</span>
            <svg viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>
          </div>
          ${verifiedAccount ? `
          <div style="background:#ecfdf5;border:1px solid #86efac;border-radius:10px;padding:0.875rem 1rem;margin-top:15px;">
            <p style="font-size:0.75rem;color:#6b7280;margin:0 0 0.375rem;font-weight:500;">VERIFIED ACCOUNT NAME</p>
            <p style="font-size:0.9375rem;font-weight:700;color:#111827;margin:0;">${verifiedAccount.account_name}</p>
          </div>` : ''}
          <button id="next-btn" class="next-btn ${verifiedAccount ? 'on' : ''}">Next</button>
        </div>

        <div class="card monitor-card">
          <div class="monitor-left"><div class="monitor-icon">${Icon('bar-chart',{size:16})}</div><div class="monitor-text">Bank Transfer Success Rate Monitor</div></div>
          ${Icon('chevron-right',{size:16,color:'#ccc'})}
        </div>

        <div class="card list-card">
          <div class="list-header">
            <div class="tabs"><div class="tab active" id="tab-recents">Recents</div><div class="tab" id="tab-favs">Favourites</div></div>
            <div style="color:#00b875;display:flex;">${Icon('search',{size:20})}</div>
          </div>
          <div id="recents-list">
            ${recents.length === 0
              ? `<p style="color:#9ca3af;font-size:0.875rem;text-align:center;padding:1.5rem 0;margin:0;">No recent bank transfers yet</p>`
              : recents.slice(0, 5).map((r, i) => renderRecentItem(r, i)).join('')}
          </div>
        </div>
      </main>
    </div>`;
    const hb = document.getElementById("hist-btn"); if (hb) hb.addEventListener("click", () => navigate("/transaction-history"));

    document.getElementById("back-btn").addEventListener("click", () => navigate("/dashboard"));
    document.getElementById("bank-select").addEventListener("click", () => {
      showBankSelector((bank) => {
        selectedBank = bank;
        const bankData = NIGERIAN_BANKS.find(b => b.name === bank);
        selectedBankCode = bankData ? bankData.code : "";
        render();
      });
    });

    document.getElementById("account-input").addEventListener("input", (e) => {
      accountNumber = e.target.value;
      verifiedAccount = null;
    });

    // Ad carousel
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

    // Click a recent to prefill
    container.querySelectorAll('[data-recent-idx]').forEach(btn => {
      btn.addEventListener('click', () => {
        const r = getRecents()[parseInt(btn.dataset.recentIdx)];
        if (!r) return;
        accountNumber = r.account_number;
        selectedBank = r.bank;
        const bankData = NIGERIAN_BANKS.find(b => b.name === r.bank);
        selectedBankCode = bankData ? bankData.code : '';
        verifiedAccount = { account_name: r.name };
        render();
      });
    });

    document.getElementById("next-btn").addEventListener("click", async () => {
      if (!accountNumber || accountNumber.length < 10) {
        toast.error('Enter a 10-digit account number'); return;
      }
      if (!selectedBank) {
        toast.error('Select a bank'); return;
      }
      if (!verifiedAccount) {
        // Verify
        const btn = document.getElementById("next-btn");
        btn.textContent = 'Verifying...'; btn.disabled = true;
        try {
          const res = await fetch(
            `/api/verify-account?account_number=${encodeURIComponent(accountNumber)}&bank_code=${encodeURIComponent(selectedBankCode)}`,
            { credentials: 'include' }
          );
          const data = await res.json();
          btn.textContent = 'Next'; btn.disabled = false;
          if (data.ok) {
            verifiedAccount = data;
            accountName = data.account_name;
            render();
          } else {
            toast.error(data.error || 'Could not verify account');
          }
        } catch (e) {
          btn.textContent = 'Next'; btn.disabled = false;
          toast.error('Verification failed. Enter name manually.');
          verifiedAccount = { account_name: accountName || 'Unknown' };
          render();
        }
      } else {
        showAmountStep();
      }
    });
  }

  function showAmountStep() {
    const { primaryColor } = Stores.customization.get();
    const recName = verifiedAccount.account_name;
    container.innerHTML = `
    <div style="display:flex;flex-direction:column;min-height:100vh;background:#f9fafb;">
      <div style="display:flex;align-items:center;justify-content:space-between;padding:1rem 1.25rem;background:white;border-bottom:1px solid #e5e7eb;">
        <div style="display:flex;align-items:center;gap:0.75rem;">
          <button id="back-btn" style="background:none;border:none;color:#111827;cursor:pointer;">${Icon('chevron-left',{size:22})}</button>
          <h1 style="font-size:1.0625rem;font-weight:700;margin:0;">Transfer to Bank Account</h1>
        </div>
        <button style="background:none;border:none;color:${primaryColor};font-weight:600;cursor:pointer;">History</button>
      </div>
      <div style="padding:1.25rem;">
        <div style="background:white;border-radius:0.875rem;padding:1.25rem;box-shadow:0 1px 3px rgba(0,0,0,0.06);margin-bottom:1rem;">
          <div style="display:flex;align-items:center;gap:0.75rem;padding-bottom:0.875rem;border-bottom:1px solid #f3f4f6;margin-bottom:0.875rem;">
            <div style="width:40px;height:40px;border-radius:9999px;background:#e0f2fe;display:flex;align-items:center;justify-content:center;">
              ${Icon('user',{size:20,color:'#0369a1'})}
            </div>
            <div>
              <p style="font-weight:700;font-size:0.9375rem;color:#111827;margin:0;">${recName}</p>
              <p style="font-size:0.8125rem;color:#6b7280;margin:0.2rem 0 0;">${accountNumber} · ${selectedBank}</p>
            </div>
          </div>

          <label style="font-size:0.8125rem;color:#6b7280;font-weight:600;display:block;margin-bottom:0.5rem;">Amount</label>
          <div style="display:flex;align-items:center;border:1.5px solid #e5e7eb;border-radius:0.75rem;padding:0.875rem 1rem;gap:0.5rem;">
            <span style="font-size:1.25rem;font-weight:700;color:#6b7280;">₦</span>
            <input id="amount-input" type="text" inputmode="numeric" placeholder="0"
              value="${amount}"
              style="flex:1;border:none;outline:none;font-size:1.375rem;font-weight:700;color:#111827;font-family:inherit;" />
          </div>
          <div id="amount-err" style="color:#ef4444;font-size:0.8rem;min-height:1.2em;margin-top:0.375rem;"></div>
        </div>

        <button id="send-btn" style="width:100%;background:${primaryColor};color:white;border:none;padding:0.9rem;border-radius:9999px;font-weight:700;font-size:1rem;cursor:pointer;">Send</button>
      </div>
    </div>`;

    document.getElementById('back-btn').addEventListener('click', () => render());

    const amountInput = document.getElementById('amount-input');
    const sendBtn = document.getElementById('send-btn');
    const errEl = document.getElementById('amount-err');

    sendBtn.addEventListener('click', async () => {
      const amt = parseFloat(amountInput.value.replace(/,/g,'') || '0');
      errEl.textContent = '';
      if (!amt || amt <= 0) { errEl.textContent = 'Enter an amount'; return; }
      amount = amountInput.value;
      showBankTransactionSuccess(accountNumber, selectedBank, verifiedAccount.account_name, amt);
    });
  }

  function showBankTransactionSuccess(account, bank, name, amt) {
    const txId = Date.now().toString().slice(-12);
    const sessionId = 'sess_' + Math.random().toString(36).substr(2, 9).toUpperCase();
    const bankData = NIGERIAN_BANKS.find(b => b.name === bank);
    const bankLogo = bankData ? bankData.logo : null;

    // Save to recent transfers
    Stores.recentTransfers.addBank({
      name,
      account_number: account,
      bank,
    });

    Stores.transaction.addTransaction({
      type: `Transfer to ${name}`,
      amount: `-₦${formatMoney(amt)}`,
      status: 'Successful',
      icon: 'building-2'
    });
    Stores.balance.set(s => ({ balance: s.balance - parseFloat(amt) }));
    showTransactionReceipt({
      title: `${bank}`,
      amount: `-₦${formatMoney(amt)}`,
      success: true,
      date: new Date().toLocaleString(),
      details: [
        { label: 'Recipient Details', value: `${name}<br/>${bank} | ${account}` },
        { label: 'Transaction No.', value: txId },
        { label: 'Payment Method', value: 'OWealth' },
        { label: 'Transaction Date', value: new Date().toLocaleString() },
        { label: 'Session ID', value: sessionId }
      ],
      variant: 'tracker',
      recipientIcon: bankLogo,
      onClose: () => navigate('/dashboard')
    });
  }

  render();
}

window.renderToBankPage = renderToBankPage;
