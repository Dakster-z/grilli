/**
 * Grilli Restaurant - Conversion Optimization (MVP)
 * Adds a sticky "Réserver Maintenant" button with subtle animation and smooth scroll.
 */
class ConversionOptimizer {
  constructor() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.init());
    } else {
      this.init();
    }
  }
  init() {
    this.injectStyles();
    this.addStickyReserveButton();
    // WhatsApp popup disabled per request
    this.injectSocialProofStyles();
    this.addSocialProofWidget();
    this.injectUrgencyStyles();
    this.addUrgencyBanner();
    this.injectTrustStyles();
    this.addTrustSignalsBar();
    // Removed per request: do not add extra Hero CTA button
    this.injectTopStyles();
    this.addGoTopButton();
  }
  injectStyles() {
    const style = document.createElement('style');
    style.setAttribute('data-co-style', 'true');
    style.textContent = `
      .co-sticky-reserve { position: fixed; bottom: 20px; right: 20px; z-index: 2147483647; }
      .co-sticky-reserve__btn { background: linear-gradient(135deg, #d4af37, #f4d03f); color: #111; border: none; padding: 14px 22px; border-radius: 999px; font-weight: 700; cursor: pointer; box-shadow: 0 10px 25px rgba(212,175,55,0.45); display: flex; align-items: center; gap: 10px; letter-spacing: .2px; }
      .co-sticky-reserve__btn:hover { transform: translateY(-1px); box-shadow: 0 14px 28px rgba(212,175,55,0.5); }
      .co-pulse-dot { width: 8px; height: 8px; background: #ff4444; border-radius: 50%; position: relative; }
      .co-pulse-dot::after { content: ""; position: absolute; inset: -6px; border-radius: 50%; border: 2px solid #ff4444; opacity: .7; animation: co-pulse 1.6s infinite; }
      @keyframes co-pulse { 0% { transform: scale(0.9); opacity: .7; } 50% { transform: scale(1.15); opacity: .35; } 100% { transform: scale(0.9); opacity: .7; } }
      @media (max-width: 480px) { .co-sticky-reserve { bottom: 16px; right: 16px; } .co-sticky-reserve__btn { padding: 12px 18px; font-size: 14px; } }
    `;
    document.head.appendChild(style);
  }
  injectWhatsAppStyles() {
    const style = document.createElement('style');
    style.setAttribute('data-co-wa-style', 'true');
    style.textContent = `
      .co-wa { position: fixed; bottom: 20px; left: 20px; z-index: 2147483647; display: inline-flex; align-items: center; justify-content: center; width: 52px; height: 52px; border-radius: 50%; background: #25D366; color: white; box-shadow: 0 10px 25px rgba(37, 211, 102, 0.45); cursor: pointer; }
      .co-wa:hover { transform: translateY(-1px); box-shadow: 0 14px 28px rgba(37, 211, 102, 0.5); }
      .co-wa__svg { width: 26px; height: 26px; display: block; }
      @media (max-width: 480px) { .co-wa { bottom: 16px; left: 16px; width: 46px; height: 46px; } .co-wa__svg { width: 24px; height: 24px; } }
    `;
    document.head.appendChild(style);
  }
  addStickyReserveButton() {
    if (document.querySelector('.co-sticky-reserve')) return; // prevent duplicates
    const wrapper = document.createElement('div');
    wrapper.className = 'co-sticky-reserve';
    wrapper.innerHTML = `
      <button class="co-sticky-reserve__btn" aria-label="Réserver Maintenant">
        <span class="co-pulse-dot" aria-hidden="true"></span>
        Réserver Maintenant
      </button>
    `;
    const btn = wrapper.querySelector('.co-sticky-reserve__btn');
    btn.addEventListener('click', () => {
      const section = document.querySelector('#reservation, .reservation, [data-section="reservation"]');
      if (section && typeof section.scrollIntoView === 'function') {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        // Fallback: jump to top where reservation may be present
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
    document.body.appendChild(wrapper);
  }
  addWhatsAppButton() {
    if (document.querySelector('.co-wa')) return;
    const phone = document.body.dataset.whatsapp || document.querySelector('[data-whatsapp]')?.getAttribute('data-whatsapp') || '';
    const href = phone ? `https://wa.me/${phone}?text=${encodeURIComponent('Bonjour Grilli 👋 Je souhaite réserver.')}` : '#';
    const a = document.createElement('a');
    a.className = 'co-wa';
    a.href = href;
    a.target = '_blank';
    a.rel = 'noopener';
    a.setAttribute('aria-label', 'Contacter sur WhatsApp');
    a.innerHTML = `
      <svg class="co-wa__svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
        <path d="M20.52 3.48A11.72 11.72 0 0 0 12.04 0C5.46 0 .09 5.37.09 12c0 2.12.56 4.18 1.62 6.01L0 24l6.18-1.62A11.9 11.9 0 0 0 12.04 24c6.57 0 11.95-5.37 11.95-12 0-3.2-1.25-6.21-3.47-8.52Zm-8.48 18.47a9.71 9.71 0 0 1-5.23-1.53l-.37-.22-3.69.97.99-3.58-.24-.37a9.65 9.65 0 0 1-1.49-5.26c0-5.34 4.35-9.68 9.69-9.68 2.59 0 5.02 1.01 6.85 2.85a9.61 9.61 0 0 1 2.84 6.84c0 5.33-4.35 9.68-9.69 9.68Zm5.31-7.23c-.29-.15-1.71-.84-1.98-.94-.26-.09-.45-.15-.64.15-.19.29-.74.93-.9 1.12-.17.19-.33.21-.62.07-.29-.15-1.22-.45-2.33-1.44-.86-.76-1.45-1.69-1.62-1.98-.17-.29-.02-.45.12-.6.13-.13.29-.33.42-.49.14-.17.19-.29.29-.49.1-.19.05-
36-.02-.5-.08-.15-.64-1.54-.88-2.11-.23-.56-.47-.48-.64-.48-.16 0-.35-.02-.54-.02-.19 0-.5.07-.76.36-.26.29-.99.97-.99 2.36s1.02 2.73 1.16 2.92c.14.19 2.01 3.06 4.88 4.29.68.29 1.21.46 1.63.59.69.22 1.31.19 1.81.12.55-.08 1.71-.7 1.95-1.37.24-.67.24-1.25.17-1.37-.07-.12-.26-.19-.55-.33Z"/>
      </svg>
    `;
    a.addEventListener('click', (e) => {
      if (href === '#') {
        e.preventDefault();
        const section = document.querySelector('#reservation, .reservation, [data-section="reservation"]');
        if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
    document.body.appendChild(a);
  }
  injectSocialProofStyles() {
    const style = document.createElement('style');
    style.setAttribute('data-co-social-style', 'true');
    style.textContent = `
      .co-social { position: fixed; bottom: 90px; left: 20px; z-index: 2147483647; background: rgba(17,17,17,0.92); color: #fff; border-radius: 12px; padding: 12px 14px; box-shadow: 0 12px 28px rgba(0,0,0,0.25); backdrop-filter: blur(6px); display: flex; align-items: center; gap: 10px; }
      .co-social__badge { background: #d4af37; color: #111; font-weight: 800; padding: 4px 8px; border-radius: 999px; font-size: 12px; }
      .co-social__text { font-size: 13px; opacity: .95; }
      @media (max-width: 480px) { .co-social { bottom: 78px; left: 16px; padding: 10px 12px; } .co-social__text { font-size: 12px; } }
    `;
    document.head.appendChild(style);
  }
  addSocialProofWidget() {
    if (document.querySelector('.co-social')) return;
    const wrap = document.createElement('div');
    wrap.className = 'co-social';
    wrap.innerHTML = `
      <span class="co-social__badge">4.8 ★</span>
      <span class="co-social__text">1 200+ réservations ce mois-ci</span>
    `;
    document.body.appendChild(wrap);
  }
  injectUrgencyStyles() {
    const style = document.createElement('style');
    style.setAttribute('data-co-urgency-style', 'true');
    style.textContent = `
      .co-urgency { position: sticky; top: 0; z-index: 2147483647; background: #111; color: #fff; padding: 10px 14px; display: flex; align-items: center; justify-content: center; gap: 10px; box-shadow: 0 8px 20px rgba(0,0,0,0.22); }
      .co-urgency__badge { background: #ff3b30; color: #fff; font-weight: 800; padding: 4px 8px; border-radius: 999px; font-size: 12px; letter-spacing: .2px; }
      .co-urgency__text { font-size: 14px; }
      .co-urgency__close { margin-inline-start: 12px; background: transparent; border: none; color: #bbb; cursor: pointer; font-size: 14px; }
      .co-urgency__close:hover { color: #fff; }
    `;
    document.head.appendChild(style);
  }
  addUrgencyBanner() {
    if (document.querySelector('.co-urgency')) return;
    const bar = document.createElement('div');
    bar.className = 'co-urgency';
    const remaining = 5; // simple static message for MVP
    bar.innerHTML = `
      <span class="co-urgency__badge">Urgent</span>
      <span class="co-urgency__text">Réservez maintenant — ${remaining} tables restantes pour ce soir</span>
      <button class="co-urgency__close" aria-label="Fermer">✕</button>
    `;
    bar.querySelector('.co-urgency__close').addEventListener('click', () => {
      bar.remove();
    });
    bar.addEventListener('click', (e) => {
      if (!(e.target instanceof HTMLElement) || !e.target.classList.contains('co-urgency__close')) {
        const section = document.querySelector('#reservation, .reservation, [data-section="reservation"]');
        if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
    document.body.prepend(bar);
  }
  injectTrustStyles() {
    const style = document.createElement('style');
    style.setAttribute('data-co-trust-style', 'true');
    style.textContent = `
      .co-trust { position: sticky; top: 0; z-index: 2147483646; background: #faf7f0; color: #111; padding: 8px 12px; display: flex; align-items: center; justify-content: center; gap: 18px; border-bottom: 1px solid rgba(0,0,0,0.08); }
      .co-trust__item { display: inline-flex; align-items: center; gap: 8px; font-size: 13px; }
      .co-trust__icon { inline-size: 18px; block-size: 18px; display: inline-block; }
      @media (max-inline-size: 640px) { .co-trust { flex-wrap: wrap; gap: 10px; } }
    `;
    document.head.appendChild(style);
  }
  addTrustSignalsBar() {
    if (document.querySelector('.co-trust')) return;
    const bar = document.createElement('div');
    bar.className = 'co-trust';
    bar.innerHTML = `
      <span class="co-trust__item"><span class="co-trust__icon">🔒</span>Paiement sécurisé</span>
      <span class="co-trust__item"><span class="co-trust__icon">✅</span>Annulation gratuite</span>
      <span class="co-trust__item"><span class="co-trust__icon">🕒</span>Ouvert 7/7</span>
    `;
    document.body.prepend(bar);
  }
  injectHeroCTAStyles() {
    const style = document.createElement('style');
    style.setAttribute('data-co-hero-style', 'true');
    style.textContent = `
      .co-hero-cta { display: inline-flex; align-items: center; gap: 10px; background: linear-gradient(135deg, #d4af37, #f4d03f); color: #111; padding: 12px 18px; border-radius: 999px; font-weight: 700; box-shadow: 0 10px 25px rgba(212,175,55,0.45); cursor: pointer; }
      .co-hero-cta:hover { transform: translateY(-1px); box-shadow: 0 14px 28px rgba(212,175,55,0.5); }
    `;
    document.head.appendChild(style);
  }
  addHeroCTA() {
    if (document.querySelector('.co-hero-cta')) return;
    const hero = document.querySelector('.hero, #hero, [data-section="hero"]');
    const btn = document.createElement('button');
    btn.className = 'co-hero-cta';
    btn.textContent = 'Réserver votre table';
    btn.addEventListener('click', () => {
      const section = document.querySelector('.reservation, #reservation, [data-section="reservation"]');
      if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    if (hero) {
      hero.appendChild(btn);
    } else {
      // Fallback: show near top of page
      const container = document.createElement('div');
      container.style.display = 'flex';
      container.style.justifyContent = 'center';
      container.style.margin = '16px 0';
      container.appendChild(btn);
      document.body.insertBefore(container, document.body.firstChild);
    }
  }

  injectTopStyles() {
    const style = document.createElement('style');
    style.setAttribute('data-co-top-style', 'true');
    style.textContent = `
      .co-top { position: fixed; right: 20px; bottom: 90px; z-index: 2147483647; width: 46px; height: 46px; border-radius: 50%; background: #111; color: #fff; display: none; align-items: center; justify-content: center; box-shadow: 0 10px 25px rgba(0,0,0,0.35); cursor: pointer; }
      .co-top:hover { transform: translateY(-1px); box-shadow: 0 14px 28px rgba(0,0,0,0.4); }
      .co-top__icon { width: 20px; height: 20px; display: block; }
      @media (max-inline-size: 480px) { .co-top { right: 16px; bottom: 82px; width: 42px; height: 42px; } }
    `;
    document.head.appendChild(style);
  }

  addGoTopButton() {
    if (document.querySelector('.co-top')) return;
    const btn = document.createElement('button');
    btn.className = 'co-top';
    btn.setAttribute('aria-label', 'Go to top');
    btn.innerHTML = `
      <svg class="co-top__icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 4l-7 7h4v7h6v-7h4z"/>
      </svg>
    `;
    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    const toggleVisibility = () => {
      const show = window.scrollY > 300;
      btn.style.display = show ? 'inline-flex' : 'none';
    };
    window.addEventListener('scroll', toggleVisibility, { passive: true });
    toggleVisibility();
    document.body.appendChild(btn);
  }
}
new ConversionOptimizer();