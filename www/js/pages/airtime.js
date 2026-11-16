function renderAirtimePage(container) {
  const amounts = [
    { amount: '100',   cashbackLabel: '₦1 Cashback',   cashbackVal: 1 },
    { amount: '200',   cashbackLabel: '₦2 Cashback',   cashbackVal: 2 },
    { amount: '300',   cashbackLabel: '₦3 Cashback',   cashbackVal: 3 },
    { amount: '500',   cashbackLabel: '₦4.5 Cashback', cashbackVal: 4.5 },
    { amount: '1,000', cashbackLabel: '₦9 Cashback',   cashbackVal: 9 },
    { amount: '2,000', cashbackLabel: '₦18 Cashback',  cashbackVal: 18 },
  ];

  // Inline SVG logos matching real OPay app (screenshot 1)
  const networkSVGs = {
    mtn:      `<svg width="40" height="40" viewBox="0 0 40 40"><circle cx="20" cy="20" r="20" fill="#FFCB05"/><text x="50%" y="56%" dominant-baseline="middle" text-anchor="middle" font-size="10" font-weight="900" fill="#111" font-family="Arial">MTN</text></svg>`,
    airtel:   `<svg width="40" height="40" viewBox="0 0 40 40"><circle cx="20" cy="20" r="20" fill="#FF0000"/><text x="50%" y="56%" dominant-baseline="middle" text-anchor="middle" font-size="9" font-weight="900" fill="white" font-family="Arial">airtel</text></svg>`,
    glo:      `<svg width="40" height="40" viewBox="0 0 40 40"><circle cx="20" cy="20" r="20" fill="#00A651"/><text x="50%" y="56%" dominant-baseline="middle" text-anchor="middle" font-size="12" font-weight="900" fill="white" font-family="Arial">glo</text></svg>`,
    t2mobile: `<svg width="40" height="40" viewBox="0 0 40 40"><circle cx="20" cy="20" r="20" fill="#fff3e0"/><path d="M10 14h20M20 14v12" stroke="#F97316" stroke-width="3" stroke-linecap="round"/></svg>`,
    vitel:    `<svg width="40" height="40" viewBox="0 0 40 40"><circle cx="20" cy="20" r="20" fill="#0EA5E9"/><text x="50%" y="56%" dominant-baseline="middle" text-anchor="middle" font-size="9" font-weight="900" fill="white" font-family="Arial">VITEL</text></svg>`,
  };

  function netSvg(netId, size) {
    const { networkImages } = Stores.customization.get();
    const img = networkImages && networkImages[netId];
    if (img) return `<img src="${img}" style="width:${size}px;height:${size}px;border-radius:9999px;object-fit:cover;" />`;
    const svg = networkSVGs[netId];
    if (!svg) return `<div style="width:${size}px;height:${size}px;border-radius:9999px;background:#e5e7eb;"></div>`;
    // Scale the 40×40 SVG
    return `<span style="display:inline-flex;width:${size}px;height:${size}px;flex-shrink:0;">${svg.replace('width="40" height="40"', `width="${size}" height="${size}"`)}</span>`;
  }

  let selectedNetwork = 'mtn';
  let showNetworkPicker = false;
  let phoneNumber = '0816 0881 049';
  let selectedAmount = '';
  let customAmount = '';

  function render() {
    const { primaryColor, adBanners } = Stores.customization.get();
    const amount = selectedAmount || customAmount;
    const canPay = selectedNetwork && phoneNumber.trim() && amount;
    const nets = window.NETWORKS || [];

    function adCarouselHtml() {
      if (!adBanners || adBanners.length === 0) return `
        <div style="background:linear-gradient(135deg,#e8f5e9,#f0fdf4);border-radius:0.875rem;padding:1rem 1.25rem;margin-bottom:0.875rem;display:flex;align-items:center;justify-content:space-between;overflow:hidden;position:relative;">
          <div style="flex:1;">
            <div style="display:flex;align-items:center;gap:0.375rem;margin-bottom:0.375rem;">
              <span style="font-size:0.625rem;color:#6b7280;background:rgba(0,0,0,0.08);padding:1px 5px;border-radius:2px;">AD</span>
              <span style="font-size:0.625rem;color:#6b7280;">OPay × WAJE</span>
            </div>
            <p style="color:#111827;font-weight:800;font-size:0.9375rem;margin:0 0 4px;line-height:1.3;">New here? <span style="color:${primaryColor};">₦600 Sports Offer</span></p>
            <p style="color:#374151;font-size:0.75rem;margin:0 0 0.5rem;">A welcome bonus for new users</p>
            <button style="background:#111827;color:white;border:none;border-radius:0.375rem;padding:5px 12px;font-size:0.75rem;font-weight:700;cursor:pointer;">Get Started</button>
          </div>
          <div style="opacity:0.6;display:flex;">${Icon("trophy", { size: 40 })}</div>
        </div>`;
      return `
        <div style="position:relative;overflow:hidden;border-radius:0.875rem;margin-bottom:0.875rem;">
          <div id="ad-inner" style="display:flex;transition:transform 0.35s ease;">
            ${adBanners.map(url => `<div style="min-width:100%;border-radius:0.875rem;overflow:hidden;"><img src="${url}" style="width:100%;display:block;" /></div>`).join('')}
          </div>
          ${adBanners.length > 1 ? `<div style="display:flex;justify-content:center;gap:5px;margin-top:0.375rem;">${adBanners.map((_,i)=>`<div class="ad-dot" data-i="${i}" style="width:6px;height:6px;border-radius:9999px;background:${i===0?primaryColor:'#d1d5db'};"></div>`).join('')}</div>` : ''}
        </div>`;
    }

    const chev = '<svg viewBox="0 0 24 24"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/></svg>';
    container.innerHTML = `
    <div class="ui-air"><div class="app-container"><div class="scrollable-content">
      <header class="header">
        <div class="header-left" id="back-btn" style="cursor:pointer;">
          <svg viewBox="0 0 24 24"><path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"/></svg>
          <span>Airtime</span>
        </div>
        <div class="header-right" id="history-btn" style="cursor:pointer;">History</div>
      </header>

      ${adBanners && adBanners.length ? `<div style="padding:0.5rem 1rem 0;">${adCarouselHtml()}</div>` : window.UI_PROMO_BANNER}

      <div class="user-section">
        <div class="user-left">
          <div id="network-toggle" style="display:flex;align-items:center;gap:6px;cursor:pointer;">
            ${netSvg(selectedNetwork, 34)}
            <div class="${showNetworkPicker ? "dropdown-arrow-up" : "dropdown-arrow-down"}"></div>
          </div>
          <input id="phone-input" type="tel" value="${phoneNumber}" class="phone-number" style="border:none;outline:none;background:transparent;font-family:inherit;width:11.5rem;" />
        </div>
        <div class="profile-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg></div>
      </div>
      <div class="divider"></div>

      ${showNetworkPicker ? `
      <div class="dropdown-modal">
        ${nets.map(n => `
        <div class="network-item" data-net="${n.id}" style="cursor:pointer;">
          <div class="network-info">
            <div style="display:flex;">${netSvg(n.id, 34)}</div>
            <div class="network-name">${n.name}</div>
          </div>
          <div class="radio-btn ${selectedNetwork === n.id ? "checked" : ""}"></div>
        </div>`).join("")}
      </div>
      <div class="overlay"></div>` : ""}

      <div class="background-content">
        <div style="background:#fff;margin:0.75rem 1rem 0;border-radius:12px;padding:1rem;">
          <p style="font-size:0.9375rem;font-weight:700;margin:0 0 0.75rem;">Top up</p>
          <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:0.5rem;">
            ${amounts.map(item => `
            <button data-amount="${item.amount}" style="border:1.5px solid ${selectedAmount === item.amount ? primaryColor : "#e5e7eb"};background:${selectedAmount === item.amount ? primaryColor + "12" : "#f7f8fa"};border-radius:8px;padding:0.6rem 0.25rem;text-align:center;">
              <p style="font-size:0.65rem;color:${primaryColor};font-weight:700;margin:0 0 3px;white-space:nowrap;">${item.cashbackLabel}</p>
              <p style="font-size:0.9375rem;font-weight:700;color:#111827;margin:0;">₦${item.amount}</p>
            </button>`).join("")}
          </div>
        </div>

        <div class="amount-section">
          ${customAmount ? '<div class="hundreds-tooltip">' + (customAmount.length > 3 ? "Thousands" : "Hundreds") + "</div>" : ""}
          <div class="input-row">
            <div class="input-field" style="display:flex;align-items:center;gap:4px;">
              <span>₦</span>
              <input id="custom-amount" type="text" inputmode="numeric" placeholder="50-500,000" value="${customAmount}" style="border:none;outline:none;background:transparent;font-size:inherit;font-weight:inherit;width:100%;font-family:inherit;" />
              ${customAmount ? '<button id="clear-custom" style="border:none;background:#d1d5db;color:#fff;width:18px;height:18px;border-radius:9999px;line-height:1;font-size:13px;">&times;</button>' : ""}
            </div>
            <button id="pay-btn" class="pay-btn" style="${canPay ? "" : "opacity:.55;"}">${canPay && customAmount ? "Pay ₦" + Number(customAmount).toLocaleString() : "Pay"}</button>
          </div>
        </div>

        <div class="more-events">
          <h3>More Events</h3>
          <div class="event-card">
            <div class="event-logo"><span class="event-logo-ilot">iLOTBET</span></div>
            <div class="event-text"><h4>Don't Just Watch the World Cup</h4><p>Join the promo, stake on iLOTBet, and stand a chance to win a ₦150M house and massive cash prizes.</p></div>
          </div>
          <div class="event-card">
            <div class="event-logo"><div class="event-logo-voucher"></div></div>
            <div class="event-text"><h4>Super Voucher Package</h4><p>Claim 15 Discounts with ₦99 on any Bill</p></div>
          </div>
        </div>
      </div>
    </div></div></div>`;

    // ── Event binding ────────────────────────────────────────────────────────
    container.querySelector('#back-btn').addEventListener('click', () => navigate('/dashboard'));
    container.querySelector('#history-btn').addEventListener('click', () => navigate('/transaction-history'));

    container.querySelector('#network-toggle').addEventListener('click', (e) => {
      e.stopPropagation();
      showNetworkPicker = !showNetworkPicker;
      render();
    });

    if (showNetworkPicker) {
      container.querySelectorAll('[data-net]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          selectedNetwork = btn.dataset.net;
          showNetworkPicker = false;
          render();
        });
      });
      document.addEventListener('click', function closeOnClickOut() {
        showNetworkPicker = false;
        render();
        document.removeEventListener('click', closeOnClickOut);
      }, { once: true });
    }

    const phoneInput = container.querySelector('#phone-input');
    phoneInput.addEventListener('input', () => { phoneNumber = phoneInput.value; });

    container.querySelectorAll('[data-amount]').forEach(btn => {
      btn.addEventListener('click', () => {
        selectedAmount = btn.dataset.amount;
        customAmount = '';
        render();
      });
    });

    const custInput = container.querySelector('#custom-amount');
    custInput.addEventListener('input', () => {
      customAmount = custInput.value.replace(/[^\d]/g, '');
      selectedAmount = '';
      render();
    });
    attachAmountKeypad(custInput, { decimal: false });

    const clearBtn = container.querySelector('#clear-custom');
    if (clearBtn) clearBtn.addEventListener('click', () => { customAmount = ''; selectedAmount = ''; render(); });

    // Ad carousel
    const adInner = container.querySelector('#ad-inner');
    if (adInner) {
      const dots = container.querySelectorAll('.ad-dot');
      const { adBanners: banners } = Stores.customization.get();
      if (banners && banners.length > 1) {
        let cur = 0;
        setInterval(() => {
          cur = (cur + 1) % banners.length;
          adInner.style.transform = `translateX(-${cur * 100}%)`;
          dots.forEach((d, i) => d.style.background = i === cur ? primaryColor : '#d1d5db');
        }, 3500);
      }
    }

    container.querySelector('#pay-btn').addEventListener('click', () => {
      if (!canPay) return;
      const rawAmt = (selectedAmount || customAmount).replace(/,/g, '');
      const amtNum = parseFloat(rawAmt);
      const { balance } = Stores.balance.get();
      if (amtNum > balance) { toast.error('Insufficient balance'); return; }
      const cashItem = amounts.find(a => a.amount.replace(/,/g,'') === rawAmt);
      const cashbackEarned = cashItem ? cashItem.cashbackVal : +(amtNum * 0.01).toFixed(2);
      const netName = (window.NETWORKS && window.NETWORKS.find(n => n.id === selectedNetwork)?.name) || 'Airtime';
      const { totalCashback } = Stores.cashback.get();

      showConfirmationModal({
        amount: amtNum,
        productName: netName + ' Airtime',
        productIcon: selectedNetwork,
        recipientMobile: phoneNumber,
        cashbackAmount: cashbackEarned,
        useCashback: false,
        availableCashback: totalCashback,
        balance: balance,
        onConfirm: (usedCashback) => {
          const cashbackDeduct = usedCashback ? Math.min(totalCashback, amtNum) : 0;
          const toPay = amtNum - cashbackDeduct;
          showPinModal({
            amount: amtNum.toLocaleString(),
            recipientLabel: phoneNumber,
            onConfirm: () => {
              Stores.balance.set({ balance: balance - toPay });
              if (cashbackDeduct > 0) Stores.cashback.useCashback(cashbackDeduct);
              Stores.cashback.addCashback(cashbackEarned);
              const now = new Date();
              const fd = `${now.toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})} ${now.toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false})}`;
              const txId = '25'+Math.floor(Math.random()*1e18).toString().padStart(20,'0');
              Stores.transaction.addTransaction({ type: 'Airtime Purchase', amount: `-₦${amtNum.toLocaleString()}`, status: 'Successful', icon: 'phone' });
              showTransactionReceipt({
                amount: `₦${amtNum.toLocaleString()}`, success: true, date: fd,
                details: [
                  { label: 'Recipient Mobile', value: phoneNumber },
                  { label: 'Network', value: netName },
                  { label: 'Transaction No.', value: txId },
                  { label: 'Cashback Earned', value: `+₦${cashbackEarned.toFixed(2)}` },
                ],
                title: netName,
                footerText: 'Enjoy a better life with OPay.',
                onClose: () => { selectedAmount = ''; customAmount = ''; render(); },
              });
            },
          });
        },
        onCancel: () => {},
      });
    });
  }

  render();
}

window.renderAirtimePage = renderAirtimePage;
