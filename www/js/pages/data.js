function renderDataPage(container) {
  const durationTabs = [
    { id: "hot", name: "Hot" },
    { id: "night", name: "Extra Night" },
    { id: "daily", name: "Daily" },
    { id: "weekly_monthly", name: "Weekly" },
    { id: "monthly", name: "Monthly" },
  ];
  
  const networkDataPlans = {
    mtn: {
      hot: [
        { id: "mtn_hot_1", size: "500MB", validity: "1 Day", price: 124, description: "Super Fast" },
        { id: "mtn_hot_2", size: "1GB", validity: "3 Days", price: 235, description: "" },
        { id: "mtn_hot_3", size: "2GB", validity: "7 Days", price: 425, description: "" },
      ],
      night: [
        { id: "mtn_night_1", size: "1GB", validity: "11PM-6AM", price: 164, description: "" },
        { id: "mtn_night_2", size: "2GB", validity: "11PM-6AM", price: 294, description: "" },
      ],
      daily: [
        { id: "mtn_social_1", size: "250MB", validity: "1 Day", price: 89, description: "" },
        { id: "mtn_social_2", size: "500MB", validity: "1 Day", price: 142, description: "" },
      ],
      weekly_monthly: [
        { id: "mtn_weekly_1", size: "3.5GB", validity: "7 Days", price: 615, description: "" },
        { id: "mtn_weekly_2", size: "10GB", validity: "30 Days", price: 1825, description: "Best Value" },
      ],
      mega: [
        { id: "mtn_mega_1", size: "20GB", validity: "30 Days", price: 3650, description: "Mega Pack" },
        { id: "mtn_mega_2", size: "50GB", validity: "30 Days", price: 8550, description: "" },
      ]
    },
    airtel: {
      hot: [
        { id: "airtel_hot_1", size: "500MB", validity: "1 Day", price: 119, description: "" },
        { id: "airtel_hot_2", size: "1GB", validity: "3 Days", price: 225, description: "" },
        { id: "airtel_hot_3", size: "2GB", validity: "7 Days", price: 410, description: "" },
      ],
      night: [
        { id: "airtel_night_1", size: "1GB", validity: "12AM-5AM", price: 155, description: "" },
        { id: "airtel_night_2", size: "2GB", validity: "12AM-5AM", price: 280, description: "" },
      ],
      daily: [
        { id: "airtel_social_1", size: "300MB", validity: "1 Day", price: 95, description: "" },
        { id: "airtel_social_2", size: "600MB", validity: "1 Day", price: 155, description: "" },
      ],
      weekly_monthly: [
        { id: "airtel_weekly_1", size: "3GB", validity: "7 Days", price: 580, description: "" },
        { id: "airtel_weekly_2", size: "10GB", validity: "30 Days", price: 1650, description: "" },
      ],
      mega: [
        { id: "airtel_mega_1", size: "20GB", validity: "30 Days", price: 3300, description: "" },
        { id: "airtel_mega_2", size: "40GB", validity: "30 Days", price: 6600, description: "" },
      ]
    },
    glo: {
      hot: [
        { id: "glo_hot_1", size: "500MB", validity: "1 Day", price: 109, description: "" },
        { id: "glo_hot_2", size: "1.5GB", validity: "3 Days", price: 215, description: "" },
        { id: "glo_hot_3", size: "2.5GB", validity: "7 Days", price: 390, description: "" },
      ],
      night: [
        { id: "glo_night_1", size: "1.5GB", validity: "11:30PM-4:30AM", price: 145, description: "" },
        { id: "glo_night_2", size: "3GB", validity: "11:30PM-4:30AM", price: 260, description: "" },
      ],
      daily: [
        { id: "glo_social_1", size: "400MB", validity: "1 Day", price: 85, description: "" },
        { id: "glo_social_2", size: "750MB", validity: "1 Day", price: 145, description: "" },
      ],
      weekly_monthly: [
        { id: "glo_weekly_1", size: "4GB", validity: "7 Days", price: 560, description: "" },
        { id: "glo_weekly_2", size: "12GB", validity: "30 Days", price: 1600, description: "" },
      ],
      mega: [
        { id: "glo_mega_1", size: "25GB", validity: "30 Days", price: 3200, description: "" },
        { id: "glo_mega_2", size: "60GB", validity: "30 Days", price: 7500, description: "" },
      ]
    },
    "9mobile": {
      hot: [
        { id: "9mobile_hot_1", size: "500MB", validity: "1 Day", price: 114, description: "" },
        { id: "9mobile_hot_2", size: "1GB", validity: "3 Days", price: 220, description: "" },
        { id: "9mobile_hot_3", size: "2GB", validity: "7 Days", price: 400, description: "" },
      ],
      night: [
        { id: "9mobile_night_1", size: "1GB", validity: "12AM-5AM", price: 150, description: "" },
        { id: "9mobile_night_2", size: "1.5GB", validity: "12AM-5AM", price: 225, description: "" },
      ],
      daily: [
        { id: "9mobile_social_1", size: "350MB", validity: "1 Day", price: 90, description: "" },
        { id: "9mobile_social_2", size: "650MB", validity: "1 Day", price: 150, description: "" },
      ],
      weekly_monthly: [
        { id: "9mobile_weekly_1", size: "3.5GB", validity: "7 Days", price: 570, description: "" },
        { id: "9mobile_weekly_2", size: "10GB", validity: "30 Days", price: 1700, description: "" },
      ],
      mega: [
        { id: "9mobile_mega_1", size: "22GB", validity: "30 Days", price: 3400, description: "" },
        { id: "9mobile_mega_2", size: "55GB", validity: "30 Days", price: 8000, description: "" },
      ]
    }
  };

  // Map our stored categories onto the tabs shown in the reference UI.
  const tabToCategory = {
    hot: "hot",
    night: "night",
    daily: "daily",
    weekly_monthly: "weekly_monthly",
    monthly: "mega",
  };

  let selectedNetwork = "mtn";
  let showNetworkPicker = false;
  let phoneNumber = "0816 0881 049";
  let activeTab = "hot";
  let selectedPlan = "";
  let useCashbackForPayment = false;

  function networkLogo(net, size) {
    const { networkImages } = Stores.customization.get();
    const img = networkImages[net.id];
    if (img) {
      return `<img src="${img}" alt="${net.name}" style="width:${size}px;height:${size}px;border-radius:9999px;object-fit:cover;" />`;
    }
    return `<div style="width:${size}px;height:${size}px;border-radius:9999px;background:${net.color};color:${net.textColor};display:flex;align-items:center;justify-content:center;font-size:${size * 0.32}px;font-weight:800;">${net.name.charAt(0)}</div>`;
  }

  function getAvailablePlans(network, category) {
    const plans = networkDataPlans[network] || {};
    return plans[category] || [];
  }

  function render() {
    const { primaryColor } = Stores.customization.get();
    const { totalCashback } = Stores.cashback.get();
    const net = window.NETWORKS.find((n) => n.id === selectedNetwork);
    const category = tabToCategory[activeTab];
    const availablePlans = getAvailablePlans(selectedNetwork, category);
    const chosenPlan = availablePlans.find((p) => p.id === selectedPlan);

    container.innerHTML = `
    <div class="ui-data"><div class="app-container">
      <header class="header">
        <div class="header-left" data-nav-back style="cursor:pointer;">
          <svg viewBox="0 0 24 24"><path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"/></svg>
          <span>Mobile Data</span>
        </div>
        <div class="header-right" id="history-btn" style="cursor:pointer;">History</div>
      </header>

      ${window.UI_PROMO_BANNER}

      <div class="user-section" style="position:relative;">
        <div class="user-left">
          <div id="network-toggle" style="display:flex;align-items:center;gap:6px;cursor:pointer;">${networkLogo(net, 34)}${Icon(showNetworkPicker ? "chevron-up" : "chevron-down", { size: 14 })}</div>
          <input id="phone-input" type="tel" inputmode="numeric" pattern="[0-9]*" value="${phoneNumber}" class="phone-number" style="border:none;outline:none;background:transparent;font-family:inherit;width:11.5rem;" />
        </div>
        <button id="contacts-btn" class="profile-icon" style="border:none;">${Icon("user", { size: 18 })}</button>
      </div>

      ${showNetworkPicker ? `
      <div class="ui-air" style="min-height:0;position:static;"><div class="dropdown-modal" style="position:absolute;left:0.75rem;right:0.75rem;top:11.5rem;z-index:30;">
        ${window.NETWORKS.map((n) => `
        <div class="network-item" data-select-network="${n.id}" style="cursor:pointer;">
          <div class="network-info"><div style="display:flex;">${networkLogo(n, 34)}</div><div class="network-name">${n.name}</div></div>
          <div class="radio-btn ${n.id === selectedNetwork ? "checked" : ""}"></div>
        </div>`).join("")}
      </div></div>` : ""}

      ${totalCashback > 0 ? `<label style="display:flex;align-items:center;gap:0.5rem;font-size:0.8125rem;color:#4b5563;padding:0.6rem 1rem;background:#fff;"><input type="checkbox" id="use-cashback" ${useCashbackForPayment ? "checked" : ""} /> Use cashback for this purchase</label>` : ""}

      <div class="ussd-banner">
        <p class="top-text">Top-up your Data anytime, anywhere</p>
        <h2>Simply Dial <span class="ussd-code">*955*4*</span> mobile no#</h2>
      </div>

      <div class="plans-container">
        <div class="plans-header"><h2>Data Plans</h2></div>
        <div class="tabs">
          ${durationTabs.map((t) => `<div class="tab ${activeTab === t.id ? "active" : ""}" data-tab="${t.id}" style="cursor:pointer;">${t.name}</div>`).join("")}
        </div>
        <div class="plans-grid">
          ${availablePlans.map((p) => {
            const sel = selectedPlan === p.id;
            const cb = (p.price * 0.02).toFixed(0);
            return `
          <div class="plan-card ${p.description ? "has-badge" : ""}" data-plan="${p.id}" style="cursor:pointer;${sel ? `outline:2px solid ${primaryColor};background:${primaryColor}10;` : ""}">
            <div class="plan-data">${p.size}</div>
            <div class="plan-duration">${p.validity}</div>
            <div class="plan-price">₦${p.price.toLocaleString()}</div>
            <div class="plan-cashback">₦${formatMoney(cb)} Cashback</div>
            ${p.description ? `<div class="plan-badge">${p.description}</div>` : ""}
          </div>`;
          }).join("")}
        </div>
        ${availablePlans.length === 0 ? `<p style="text-align:center;color:#9ca3af;font-size:0.875rem;padding:2rem 0;">No plans available</p>` : ""}
        ${selectedPlan ? `<button id="buy-btn" style="width:100%;margin:1rem 0 0;color:white;padding:0.875rem;border-radius:9999px;font-weight:700;border:none;background:${primaryColor};font-size:1rem;">Buy ${chosenPlan ? chosenPlan.size + " · ₦" + chosenPlan.price.toLocaleString() : ""}</button>` : ""}
        <div style="height:5rem;"></div>
      </div>
    </div></div>`;

    bindPageHeader(container, "/dashboard");

    const phoneInput = container.querySelector("#phone-input");
    if (phoneInput) {
      phoneInput.addEventListener("change", () => {
        phoneNumber = phoneInput.value || phoneNumber;
      });
    }

    const networkToggle = container.querySelector("#network-toggle");
    if (networkToggle) {
      networkToggle.addEventListener("click", () => {
        showNetworkPicker = !showNetworkPicker;
        render();
      });
    }
    container.querySelectorAll("[data-select-network]").forEach((btn) => {
      btn.addEventListener("click", () => {
        selectedNetwork = btn.dataset.selectNetwork;
        showNetworkPicker = false;
        selectedPlan = "";
        render();
      });
    });
    container.querySelectorAll("[data-tab]").forEach((btn) => {
      btn.addEventListener("click", () => {
        activeTab = btn.dataset.tab;
        selectedPlan = "";
        render();
      });
    });
    container.querySelectorAll("[data-plan]").forEach((btn) => {
      btn.addEventListener("click", () => {
        selectedPlan = selectedPlan === btn.dataset.plan ? "" : btn.dataset.plan;
        render();
      });
    });
    const cashbackCheckbox = container.querySelector("#use-cashback");
    if (cashbackCheckbox) {
      cashbackCheckbox.addEventListener("change", () => {
        useCashbackForPayment = cashbackCheckbox.checked;
      });
    }
    const historyBtn = container.querySelector("#history-btn");
    if (historyBtn) historyBtn.addEventListener("click", () => navigate("/transaction-history"));
    const buyBtn = container.querySelector("#buy-btn");
    if (buyBtn) buyBtn.addEventListener("click", () => handleBuy(chosenPlan));
  }

  function handleBuy(plan) {
    if (!plan) return;
    const { totalCashback } = Stores.cashback.get();
    const { balance } = Stores.balance.get();
    const cashbackEarned = +(plan.price * 0.01).toFixed(2);
    const netName = (window.NETWORKS && window.NETWORKS.find(n => n.id === selectedNetwork)?.name) || selectedNetwork.toUpperCase();

    if (balance < plan.price) {
      toast.error("Insufficient balance");
      return;
    }

    showConfirmationModal({
      amount: plan.price,
      productName: `${netName} ${plan.size} Data`,
      productIcon: selectedNetwork,
      recipientMobile: phoneNumber,
      cashbackAmount: cashbackEarned,
      useCashback: false,
      availableCashback: totalCashback,
      balance: balance,
      onConfirm: (usedCashback) => {
        const cashbackToUse = usedCashback ? Math.min(totalCashback, plan.price) : 0;
        const remainingAmount = plan.price - cashbackToUse;
        showPinModal({
          amount: plan.price.toLocaleString(),
          recipientLabel: phoneNumber,
          onConfirm: () => {
        const cashbackEarned = plan.price * 0.01;
        const transId = Date.now().toString().slice(-12);
        if (cashbackToUse > 0) Stores.cashback.useCashback(cashbackToUse);
        Stores.balance.set({ balance: Stores.balance.get().balance - remainingAmount });
        Stores.cashback.addCashback(cashbackEarned);

        Stores.transaction.addTransaction({
          type: `${selectedNetwork.toUpperCase()} Data`,
          amount: `-₦${plan.price.toLocaleString()}`,
          status: "Successful",
          icon: "smartphone",
        });
        
        showTransactionReceipt({
          title: selectedNetwork.toUpperCase(),
          amount: `-₦${formatMoney(plan.price)}`,
          success: true,
          date: new Date().toLocaleString(),
          details: [
            { label: "Recipient Mobile", value: phoneNumber },
            { label: "Transaction Type", value: "Data" },
            { label: "Data Plan", value: plan.size },
            { label: "Transaction No.", value: transId },
            { label: "Payment Method", value: "OWealth" },
            { label: "Cashback Earned", value: `+₦${formatMoney(cashbackEarned.toFixed(2))}` },
          ],
          variant: "badge",
          footerText: "Enjoy a better life with OPay. Get free transfers, withdrawals, bill payments, instant loans, and good annual interest on your savings. OPay is licensed by the Central Bank of Nigeria and insured by the NDIC.",
          onClose: () => navigate("/dashboard")
        });
        
        Stores.transaction.addTransaction({ type: "Data Cashback", amount: `+₦${formatMoney(cashbackEarned.toFixed(2))}`, status: "Successful", icon: "wifi" });
        if (cashbackToUse > 0) {
          Stores.transaction.addTransaction({ type: "Cashback Used", amount: `-₦${formatMoney(cashbackToUse.toFixed(2))}`, status: "Successful", icon: "gift" });
        }
        },
        });
      },
    });
  }

  render();
}

window.renderDataPage = renderDataPage;
