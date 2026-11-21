(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const setTabs = (buttons, panels, selected, buttonAttr, panelAttr) => {
    buttons.forEach((button) => {
      const active = button === selected;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-selected', String(active));
      button.tabIndex = active ? 0 : -1;
    });
    panels.forEach((panel) => {
      const active = panel.id === selected.getAttribute(buttonAttr);
      panel.classList.toggle('is-active', active);
      panel.hidden = !active;
    });
  };

  const wireTabSet = (buttonSelector, panelSelector, buttonAttr) => {
    const buttons = Array.from(document.querySelectorAll(buttonSelector));
    const panels = Array.from(document.querySelectorAll(panelSelector));
    if (!buttons.length || !panels.length) return;
    buttons.forEach((button, index) => {
      button.addEventListener('click', () => setTabs(buttons, panels, button, buttonAttr));
      button.addEventListener('keydown', (event) => {
        if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
        event.preventDefault();
        let next = index;
        if (event.key === 'ArrowRight') next = (index + 1) % buttons.length;
        if (event.key === 'ArrowLeft') next = (index - 1 + buttons.length) % buttons.length;
        if (event.key === 'Home') next = 0;
        if (event.key === 'End') next = buttons.length - 1;
        buttons[next].focus();
        setTabs(buttons, panels, buttons[next], buttonAttr);
      });
    });
  };

  wireTabSet('.workflow-tab', '.workflow-panel', 'aria-controls');
  wireTabSet('.compare-tab', '.compare-view', 'aria-controls');

  const menuButton = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('#primary-nav');
  if (menuButton && navigation) {
    const closeMenu = () => {
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open navigation');
      navigation.classList.remove('is-open');
    };
    menuButton.addEventListener('click', () => {
      const opening = menuButton.getAttribute('aria-expanded') !== 'true';
      menuButton.setAttribute('aria-expanded', String(opening));
      menuButton.setAttribute('aria-label', opening ? 'Close navigation' : 'Open navigation');
      navigation.classList.toggle('is-open', opening);
    });
    navigation.addEventListener('click', (event) => {
      if (event.target.closest('a')) closeMenu();
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
        closeMenu();
        menuButton.focus();
      }
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth > 760) closeMenu();
    });
  }

  const states = Array.from(document.querySelectorAll('.stage-state'));
  const railSteps = Array.from(document.querySelectorAll('.rail-step'));
  const progress = document.querySelector('.stage-progress i');
  const caption = document.querySelector('.stage-caption');
  const nextButton = document.querySelector('.stage-next');
  const replayButton = document.querySelector('.stage-replay');
  const captions = ['Repository context, before code.', 'A focused patch, easy to inspect.', 'Checks close the loop.'];
  let activeState = 0;
  let timer = null;
  const showState = (index) => {
    activeState = (index + states.length) % states.length;
    states.forEach((state, i) => {
      const active = i === activeState;
      state.classList.toggle('is-visible', active);
      state.setAttribute('aria-hidden', String(!active));
    });
    railSteps.forEach((step, i) => step.classList.toggle('is-current', i === activeState));
    if (progress) progress.style.width = `${((activeState + 1) / states.length) * 100}%`;
    if (caption) caption.textContent = captions[activeState];
  };
  const stopCycle = () => {
    if (timer) window.clearInterval(timer);
    timer = null;
  };
  const startCycle = () => {
    stopCycle();
    if (!reduceMotion && !document.hidden) timer = window.setInterval(() => showState(activeState + 1), 6200);
  };
  nextButton?.addEventListener('click', () => { showState(activeState + 1); startCycle(); });
  replayButton?.addEventListener('click', () => { showState(0); startCycle(); });
  document.addEventListener('visibilitychange', () => document.hidden ? stopCycle() : startCycle());
  const stage = document.querySelector('.hero-stage');
  stage?.addEventListener('focusin', stopCycle);
  stage?.addEventListener('focusout', startCycle);
  if (states.length) { showState(0); startCycle(); }

  if (!reduceMotion && 'IntersectionObserver' in window) {
    const revealTargets = document.querySelectorAll('.section-heading, .capability-row, .source-entry, .evidence-title, .closing-inner');
    revealTargets.forEach((element) => element.classList.add('js-reveal'));
    const observer = new IntersectionObserver((entries, instance) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        instance.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -55px 0px', threshold: 0.06 });
    revealTargets.forEach((element) => observer.observe(element));
  }
})();
