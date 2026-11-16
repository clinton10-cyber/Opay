function renderMePage(container, routeState) {
  let showBalance = false;
  let openAddMoneyPending = (routeState && routeState.openAddMoney) || false;
  let showBalanceAdjuster = (routeState && routeState.openBalanceAdjuster) || false;

  function render() {
    const cust = Stores.customization.get();
    const { primaryColor, meShieldImage } = cust;
    // meIconImages keys stored as meIconImages_<id> in customization
    const meIconImages = {};
    Object.keys(cust).forEach(k => { if (k.startsWith('meIconImages_')) meIconImages[k.replace('meIconImages_','')] = cust[k]; });
    const profilePhoto = AuthState.profilePhoto || Stores.customization.get().profilePhoto || '';
    const balance = AuthState.isAdmin ? Stores.balance.get().balance : (AuthState.balance || 0);
    const displayName = AuthState.isAdmin ? 'CLINTON' : (AuthState.fullName || AuthState.username || 'User').toUpperCase().split(' ')[0];
    const tier = AuthState.isAdmin ? null : (AuthState.tier || 1);
    const upgradeRequested = AuthState.tierUpgradeRequested || false;

    // Row builder
    function row(id, iconKey, label, desc, badge) {
      const iconImg = meIconImages && meIconImages[id];
      const iconHtml = iconImg
        ? `<img src="${iconImg}" style="width:1.5rem;height:1.5rem;object-fit:contain;" />`
        : Icon(iconKey, { size: 22 });
      return `
      <div class="list-item" data-row="${id}" style="cursor:pointer;">
        <div class="item-left">
          <div class="item-icon">${iconHtml}</div>
          <div class="item-text">
            <div class="item-title">${label}</div>
            ${desc ? `<div class="item-subtitle">${desc}</div>` : ''}
          </div>
        </div>
        ${badge ? `<span style="background:#ef4444;color:white;font-size:0.65rem;font-weight:700;padding:2px 7px;border-radius:9999px;margin-right:6px;">${badge}</span>` : ''}
        <svg class="item-arrow" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>
      </div>`;
    }

    container.innerHTML = `
    <div class="ui-me"><div class="app-container" style="padding-bottom:5rem;">
      <div class="top-section">
        <div class="header-main">
          <div class="profile-info">
            <button id="open-profile-btn" style="position:relative;background:none;border:none;padding:0;cursor:pointer;flex-shrink:0;">
              <div class="avatar" style="${profilePhoto ? 'background:transparent;' : ''}overflow:hidden;display:flex;align-items:center;justify-content:center;">
                ${profilePhoto ? `<img src="${profilePhoto}" style="width:100%;height:100%;object-fit:cover;" />` : ''}
              </div>
            </button>
            <div class="user-details">
              <div class="greeting">Hi, ${displayName}</div>
              ${tier && !upgradeRequested ? `<div id="upgrade-tier-btn" class="upgrade-pill" style="cursor:pointer;"><span>${TierBadge(tier, 14)}</span> Upgrade to Tier ${Math.min(tier + 1, 3)}</div>` : ''}
              ${upgradeRequested ? `<div class="upgrade-pill" style="color:${primaryColor};">Upgrade Requested</div>` : ''}
              ${AuthState.isAdmin ? `<span style="font-size:0.75rem;background:#fce7f3;color:#be185d;padding:2px 8px;border-radius:9999px;font-weight:700;">Admin</span>` : ''}
            </div>
          </div>
          <div class="settings-icon" id="settings-icon" style="cursor:pointer;"><svg viewBox="0 0 24 24">
                    <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1Z"/>
                </svg><div class="red-dot"></div></div>
        </div>
        <div class="balance-container">
          <div class="balance-left">
            <div class="balance-label" id="toggle-bal" style="cursor:pointer;">Total Balance ${Icon(showBalance ? 'eye' : 'eye-off', { size: 14, color: '#6b7280' })}</div>
            <div class="balance-amount">${showBalance ? '₦' + formatBalance(balance) : '****'}</div>
            <div class="interest-pill">Interest Credited Today <span>${showBalance ? '₦0.00' : '••••'}</span></div>
          </div>
          <div class="shield-graphic">${meShieldImage ? `<img src="${meShieldImage}" style="width:100%;height:100%;object-fit:contain;" />` : `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <!-- Outer Glow -->
                    <circle cx="50" cy="50" r="45" fill="#00d26a" opacity="0.1"/>
                    <circle cx="50" cy="50" r="35" fill="#00d26a" opacity="0.2"/>
                    <!-- Main Shield -->
                    <path d="M50 20 L75 30 V50 C75 65 65 75 50 85 C35 75 25 65 25 50 V30 Z" fill="#69e2a1" stroke="#4ade80" stroke-width="2"/>
                    <!-- Inner Shield -->
                    <path d="M50 25 L70 33 V50 C70 62 60 72 50 80 C40 72 30 62 30 50 V33 Z" fill="#4ade80"/>
                    <!-- Checkmark -->
                    <path d="M40 50 L47 57 L62 42" fill="none" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>`}</div>
        </div>
      </div>

      <div class="content-area" style="overflow:visible;">
        <div class="security-banner">
          <div class="banner-left"><svg class="banner-icon" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg><div class="banner-text"><h4>Security Check is not turned on</h4><p>Make your account more secure with extra safety checks.</p></div></div>
          <button class="turn-on-btn">Turn On</button>
        </div>

      <!-- Admin tools -->
      ${AuthState.isAdmin ? `
      <div class="card">
        ${row('manage-users','users','Manage Users','View, add, edit accounts')}
        ${row('adjustbalance','wallet','Adjust Balance','Add or remove funds')}
        ${row('appearance','palette','Appearance','Customize the app')}
      </div>` : ''}
      ${AuthState.isAdmin ? `<div id="ba-wrap" style="margin:0;">${showBalanceAdjuster ? BalanceAdjusterHtml() : ''}</div>` : ''}

      <!-- Primary items -->
      <div class="card">
        ${row('addmoney','plus-circle','Add Money','Fund your account')}
        ${row('txhistory','file-text','Transaction History')}
        ${row('limits','gauge','Account Limits','View your transaction limits')}
        ${row('bankcard','credit-card','Bank Card/Account','Add payment option')}
        ${row('bizpayment','store','My BizPayment','Receive payment for business')}
        ${row('ojunior','users','OJunior','Create an account for your child/ward','New')}
      </div>

      <!-- Secondary items -->
      <div class="card">
        ${row('security','shield-check','Security Center','Protect your funds')}
        ${row('support','headphones','Customer Service Center')}
        ${row('invitation','gift','Invitation','Invite friends and earn up to ₦5,600 Bonus')}
      </div>

      <!-- Settings + sign out -->
      <div class="card">
        ${row('settings','settings','Settings')}
        ${row('signout','log-out','Sign Out')}
      </div>

      </div>
      ${BottomNav('me')}
    </div></div>`;

    bindBottomNav(container);

    const gi = container.querySelector('#settings-icon'); if (gi) gi.addEventListener('click', () => navigate('/settings'));
    container.querySelector('#toggle-bal').addEventListener('click', () => { showBalance = !showBalance; render(); });
    container.querySelector('#open-profile-btn').addEventListener('click', () => navigate('/my-profile'));

    const upgradeBtn = container.querySelector('#upgrade-tier-btn');
    if (upgradeBtn) {
      upgradeBtn.addEventListener('click', async () => {
        const res = await fetch('/api/user/tier/request', { method:'POST', credentials:'include' });
        const data = await res.json();
        if (data.ok) { AuthState.tierUpgradeRequested = true; toast.success('Upgrade request sent!'); render(); }
        else toast.error(data.error);
      });
    }

    container.querySelectorAll('[data-row]').forEach(btn => {
      const id = btn.dataset.row;
      btn.addEventListener('click', () => {
        switch(id) {
          case 'txhistory': navigate('/transaction-history'); break;
          case 'limits': navigate('/account-limits'); break;
          case 'bankcard': navigate('/cards'); break;
          case 'security': toast('Coming soon'); break;
          case 'support': toast('Coming soon'); break;
          case 'invitation': navigate('/invitation'); break;
          case 'addmoney': showAddMoneyModal(); break;
          case 'settings': navigate('/settings'); break;
          case 'manage-users': if (AuthState.isAdmin) navigate('/admin/users'); break;
          case 'adjustbalance': if (AuthState.isAdmin) { showBalanceAdjuster = !showBalanceAdjuster; render(); } break;
          case 'appearance': if (AuthState.isAdmin) navigate('/customization'); break;
          case 'signout': Auth.logout(); break;
          default: toast('Coming soon');
        }
      });
    });

    if (showBalanceAdjuster && AuthState.isAdmin) {
      const baWrap = container.querySelector('#ba-wrap');
      if (baWrap && typeof bindBalanceAdjuster === 'function') {
        bindBalanceAdjuster(baWrap, () => { showBalanceAdjuster = false; render(); });
      }
    }
  }

  render();
  if (openAddMoneyPending) { openAddMoneyPending = false; setTimeout(() => showAddMoneyModal(), 50); }
}

window.renderMePage = renderMePage;
