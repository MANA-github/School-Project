(() => {
  const SELECTORS = {
    navItem: '.nav-item',
    screen: '.screen',
    detailPanel: '.detail-panel',
    resourceRow: '.resource-row',
    toast: '#toast-el',
  };

  const showToast = (message) => {
    const toast = document.querySelector(SELECTORS.toast);
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add('show');
    window.setTimeout(() => toast.classList.remove('show'), 2500);
  };

  const switchNav = (key) => {
    document.querySelectorAll(SELECTORS.navItem).forEach((item) => {
      item.classList.remove('active');
    });
    document.querySelectorAll(SELECTORS.screen).forEach((screen) => {
      screen.classList.remove('active');
    });

    document.getElementById(`nav-${key}`)?.classList.add('active');
    document.getElementById(`s-${key}`)?.classList.add('active');
  };

  const goFlow = () => {
    switchNav('flow');
    document.getElementById('nav-flow')?.classList.add('active');
  };

  const toggleDetail = (detailId, rowId) => {
    const panel = document.getElementById(`detail-${detailId}`);
    const row = document.getElementById(rowId);
    if (!panel || !row) return;

    const isOpen = panel.classList.contains('show');
    document.querySelectorAll(SELECTORS.detailPanel).forEach((item) => {
      item.classList.remove('show');
    });
    document.querySelectorAll(SELECTORS.resourceRow).forEach((item) => {
      item.classList.remove('active');
    });

    if (isOpen) {
      return;
    }

    panel.classList.add('show');
    row.classList.add('active');
  };

  const endCall = () => {
    showToast('診療が終了しました — 処方箋を発行します');
    window.setTimeout(() => switchNav('rx'), 800);
  };

  const actions = {
    nav: (target) => switchNav(target.dataset.target),
    flow: () => goFlow(),
    toast: (target) => showToast(target.dataset.message),
    'toggle-detail': (target) => toggleDetail(target.dataset.detailId, target.dataset.rowId),
    'end-call': () => endCall(),
  };

  document.addEventListener('click', (event) => {
    const target = event.target.closest('[data-action]');
    if (!target) return;

    const action = actions[target.dataset.action];
    if (action) action(target);
  });
})();
