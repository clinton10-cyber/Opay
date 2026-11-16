function renderBettingPage(container) {
  const platforms = [
    { id: 'sportybet', name: 'SportyBet', color: '#00a651', textColor: 'white', letter: 'S' },
    { id: 'ilotbet',   name: 'iLOTBet',   color: '#1a1a2e', textColor: 'white', letter: 'i' },
    { id: '1xbet',     name: '1xBET',     color: '#1a5fa1', textColor: 'white', letter: '1' },
  ];

  // Amount grid matching screenshot: ₦100/200/300(Pay ₦270)/400/500/1000
  const quickAmounts = [
    { value: '100',  display: '₦100',  pay: null },
    { value: '200',  display: '₦200',  pay: null },
    { value: '300',  display: '₦300',  pay: '₦270' },
    { value: '400',  display: '₦400',  pay: '₦370' },
    { value: '500',  display: '₦500',  pay: '₦460' },
    { value: '1000', display: '₦1,000', pay: '₦930' },
  ];

  let selectedPlatform = platforms[0].id; // default SportyBet
  let accountId = '';
  let selectedAmount = '';
  let customAmount = '';

  function platformLogo(p, size) {
    return `<div style="width:${size}px;height:${size}px;border-radius:9999px;background:${p.color};color:${p.textColor};display:flex;align-items:center;justify-content:center;font-size:${size*0.4}px;font-weight:900;flex-shrink:0;">${p.letter}</div>`;
  }

  function render() {
    const { primaryColor } = Stores.customization.get();
    const activeP = platforms.find(p => p.id === selectedPlatform);
    const amount = selectedAmount || customAmount;
    const canPay = selectedPlatform && accountId.trim() && amount;

    const iconCls = { sportybet: 'icon-sporty', ilotbet: 'icon-ilot', '1xbet': 'icon-1x' };
    const iconTxt = { sportybet: 'S', ilotbet: 'iLOTBET', '1xbet': '1xBet' };
    container.innerHTML = `
    <div class="ui-bet"><div class="app-container">
      <header class="header">
        <div class="header-left" id="back-btn" style="cursor:pointer;"><svg viewBox="0 0 24 24"><path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"/></svg><span>Betting</span></div>
        <div class="header-right" id="history-btn" style="cursor:pointer;">History</div>
      </header>

      <div class="hot-offers-section">
        <div class="section-header">
          <div class="section-title">Hot Offers</div>
          <div class="section-link"><span class="tag-70">₦70</span> All ›</div>
        </div>
        <div class="offers-layout">
          <div class="ad-banner-left">
            <div class="ad-logo">iLOTBET</div>
            <div class="ad-opay-logo"><div class="opay-circle"></div> OPay</div>
            <div class="ad-text">Deposit &amp; Claim Up to 100% Coupon</div>
            <div class="ad-btn">Claim Now</div>
            <div class="ad-artwork"></div><div class="ad-badge">AD</div>
          </div>
          <div class="voucher-card">
            <div class="voucher-amount">₦100</div><div class="voucher-text">iLOTBET Voucher</div>
            <div class="voucher-divider"></div><div class="voucher-btn">Get</div>
          </div>
        </div>
        <div class="banner-dots"><div class="dot active"></div><div class="dot"></div><div class="dot"></div><div class="dot"></div><div class="dot"></div></div>
      </div>

      <div class="main-sheet" style="margin-top:0.75rem;">
        <div class="tabs-container">
          ${platforms.map(p => `
          <div class="tab-item ${selectedPlatform === p.id ? 'active' : ''}" data-platform="${p.id}" style="cursor:pointer;">
            <div class="tab-icon ${iconCls[p.id]}">${iconTxt[p.id]}</div><div class="tab-name">${p.name}</div>
          </div>`).join('')}
          <div class="tab-item"><div class="tab-icon icon-more">...</div><div class="tab-name">More</div></div>
        </div>

        <label class="input-label">User ID</label>
        <div class="user-id-box"><input id="account-input" type="text" inputmode="numeric" placeholder="Enter your User ID" value="${accountId}" style="border:none;outline:none;background:transparent;font:inherit;flex:1;min-width:0;" /></div>

        <label class="input-label">Select Amount</label>
        <div class="amount-grid">
          ${quickAmounts.map(a => `
          <div class="amount-card" data-amount="${a.value}" style="cursor:pointer;${selectedAmount === a.value ? `outline:2px solid ${primaryColor};` : ''}">
            <div class="amount-value"><span>₦</span>${a.display.replace('₦', '')}</div>
            ${a.pay ? `<div class="amount-discount">Pay ${a.pay}</div>` : ''}
          </div>`).join('')}
        </div>

        <div class="custom-amount-row">
          <div class="custom-input"><span class="currency">₦</span><input id="custom-amount" type="text" inputmode="numeric" placeholder="100-1,000,000" value="${customAmount}" /></div>
          <button id="pay-btn" class="pay-btn" style="${canPay ? 'opacity:1;' : ''}">Pay</button>
        </div>

        <div class="more-events-section">
          <label class="input-label" style="margin-bottom:15px;font-size:16px;">More Events</label>
          <div class="event-item"><div class="event-icon"></div><div class="event-details"><h4>Exclusive Bonus, New Users Only!</h4><p>Check-in 7 days and claim up to ₦7,150 bonus.</p></div></div>
          <div class="event-item"><div class="event-icon" style="background-color:#3b1d75;"></div><div class="event-details"><h4>Deposit &amp; Win Big</h4><p>Fund your wallet today and stand a chance to win.</p></div></div>
        </div>
      </div>
    </div></div>`;

    container.querySelector('#back-btn').addEventListener('click', () => navigate('/dashboard'));
    container.querySelector('#history-btn').addEventListener('click', () => navigate('/transaction-history'));

    container.querySelectorAll('[data-platform]').forEach(btn => {
      btn.addEventListener('click', () => { selectedPlatform = btn.dataset.platform; render(); });
    });

    const acctInput = container.querySelector('#account-input');
    acctInput.addEventListener('input', () => { accountId = acctInput.value; });

    container.querySelectorAll('[data-amount]').forEach(btn => {
      btn.addEventListener('click', () => { selectedAmount = btn.dataset.amount; customAmount = ''; render(); });
    });

    const custInput = container.querySelector('#custom-amount');
    custInput.addEventListener('input', () => { customAmount = custInput.value.replace(/[^\d]/g,''); selectedAmount = ''; });
    attachAmountKeypad(custInput, { decimal: false });

    const payBtn = container.querySelector('#pay-btn');
    payBtn.addEventListener('click', () => {
      if (!canPay) return;
      const amt = parseInt((selectedAmount || customAmount).replace(/,/g,''), 10);
      const { balance } = Stores.balance.get();
      if (amt > balance) { toast.error('Insufficient balance'); return; }
      const pName = platforms.find(p => p.id === selectedPlatform)?.name || '';
      showPinModal({
        amount: amt.toLocaleString(),
        recipientLabel: pName,
        onConfirm: () => {
          Stores.balance.set({ balance: balance - amt });
          const now = new Date();
          const fd = `${now.toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})} ${now.toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false})}`;
          const txId = '25'+Math.floor(Math.random()*1e18).toString().padStart(20,'0');
          Stores.transaction.addTransaction({ type: `${pName} Deposit`, amount: `-₦${amt.toLocaleString()}`, status: 'Successful', icon: 'activity' });
          showTransactionReceipt({
            amount: `₦${amt.toLocaleString()}`, success: true, date: fd,
            details: [
              { label: 'Betting Platform', value: pName },
              { label: 'User ID', value: accountId },
              { label: 'Transaction No.', value: txId },
            ],
            title: `${pName} Deposit`,
            footerText: 'Enjoy a better life with OPay.',
            onClose: () => { selectedAmount=''; customAmount=''; render(); },
          });
        },
      });
    });
  }

  render();
}

window.renderBettingPage = renderBettingPage;
