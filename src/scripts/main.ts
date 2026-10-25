/**
 * Site interactions — progressive enhancement only.
 * Everything works (links, content, form fallback) without JS.
 */

const $ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) => root.querySelector<T>(sel);
const $$ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) =>
  Array.from(root.querySelectorAll<T>(sel));

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
document.documentElement.classList.add('js');

/* ── Header: compact on scroll ───────────────────────────── */
const header = $('[data-header]');
const fab = $('.wa-fab');
const onScroll = () => {
  header?.classList.toggle('is-scrolled', window.scrollY > 24);
  // Floating WhatsApp button appears once the visitor leaves the hero
  fab?.classList.toggle('is-shown', window.scrollY > window.innerHeight * 0.6);
};
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

/* ── Mobile navigation ───────────────────────────────────── */
const toggle = $<HTMLButtonElement>('[data-nav-toggle]');
const setMenu = (open: boolean) => {
  if (!toggle) return;
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  document.body.classList.toggle('nav-open', open);
};
toggle?.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
$$('[data-nav-list] a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && document.body.classList.contains('nav-open')) {
    setMenu(false);
    toggle?.focus();
  }
});
window.matchMedia('(min-width: 1080px)').addEventListener('change', (e) => e.matches && setMenu(false));

/* ── Active nav link ─────────────────────────────────────── */
const navLinks = $$<HTMLAnchorElement>('[data-nav-link]');
const sections = navLinks
  .map((a) => document.querySelector<HTMLElement>(a.getAttribute('href')!))
  .filter((s): s is HTMLElement => !!s);
const spy = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((a) => {
        const active = a.getAttribute('href') === `#${entry.target.id}`;
        a.classList.toggle('is-active', active);
        if (active) a.setAttribute('aria-current', 'true');
        else a.removeAttribute('aria-current');
      });
    });
  },
  { rootMargin: '-45% 0px -50% 0px' },
);
sections.forEach((s) => spy.observe(s));

/* ── Reveal on scroll ────────────────────────────────────── */
const revealables = $$('[data-reveal], [data-timeline], .quality-flow, .chain, .q-card');
if (reducedMotion || !('IntersectionObserver' in window)) {
  revealables.forEach((el) => el.classList.add('is-visible'));
} else {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
  );
  revealables.forEach((el) => io.observe(el));
}

/* ── Animated counters ───────────────────────────────────── */
const counters = $$('[data-count]');
const runCounter = (el: HTMLElement) => {
  const target = Number(el.dataset.count);
  if (reducedMotion || !target) return;
  const duration = 1600;
  const start = performance.now();
  const tick = (now: number) => {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(target * eased).toLocaleString('en-US');
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
};
const countIO = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        runCounter(entry.target as HTMLElement);
        countIO.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.6 },
);
counters.forEach((c) => {
  if (!reducedMotion) c.textContent = '0';
  countIO.observe(c);
});

/* ── Product detail dialogs ──────────────────────────────── */
const lockScroll = (lock: boolean) => document.documentElement.classList.toggle('scroll-locked', lock);

$$<HTMLButtonElement>('[data-dialog-open]').forEach((btn) => {
  const dialog = document.getElementById(btn.dataset.dialogOpen!) as HTMLDialogElement | null;
  if (!dialog) return;
  btn.addEventListener('click', () => {
    dialog.showModal();
    lockScroll(true);
  });
  dialog.addEventListener('close', () => {
    lockScroll(false);
    btn.focus();
  });
  // Close when clicking the backdrop
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) dialog.close();
  });
  $$('[data-dialog-close]', dialog).forEach((c) => c.addEventListener('click', () => dialog.close()));
});

/* ── Pre-select product in the inquiry form ──────────────── */
const productSelect = $<HTMLSelectElement>('[data-product-select]');
$$<HTMLAnchorElement>('[data-inquire]').forEach((a) => {
  a.addEventListener('click', () => {
    if (productSelect) productSelect.value = a.dataset.inquire ?? '';
    a.closest('dialog')?.close();
  });
});

/* ── Gallery lightbox ────────────────────────────────────── */
const lb = $<HTMLDialogElement>('[data-lightbox-dialog]');
const lbImg = $<HTMLImageElement>('[data-lightbox-img]');
const lbCap = $('[data-lightbox-caption]');
const items = $$<HTMLButtonElement>('[data-lightbox]');
let current = 0;
let lbOpener: HTMLElement | null = null;

const show = (i: number) => {
  current = (i + items.length) % items.length;
  const item = items[current];
  if (!lbImg || !lbCap) return;
  lbImg.src = item.dataset.full!;
  lbImg.alt = item.dataset.caption!;
  lbCap.textContent = `${item.dataset.caption}  ·  ${current + 1} / ${items.length}`;
};

if (lb) {
  items.forEach((btn, i) =>
    btn.addEventListener('click', () => {
      lbOpener = btn;
      show(i);
      lb.showModal();
      lockScroll(true);
    }),
  );
  $('[data-lightbox-prev]', lb)?.addEventListener('click', () => show(current - 1));
  $('[data-lightbox-next]', lb)?.addEventListener('click', () => show(current + 1));
  $('[data-lightbox-close]', lb)?.addEventListener('click', () => lb.close());
  lb.addEventListener('click', (e) => {
    if (e.target === lb) lb.close();
  });
  lb.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') show(current - 1);
    if (e.key === 'ArrowRight') show(current + 1);
  });
  lb.addEventListener('close', () => {
    lockScroll(false);
    lbOpener?.focus();
  });

  // Swipe on touch devices
  let startX = 0;
  lb.addEventListener('touchstart', (e) => (startX = e.touches[0].clientX), { passive: true });
  lb.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 50) show(current + (dx < 0 ? 1 : -1));
  });
}

/* ── Contact form ────────────────────────────────────────── */
const form = $<HTMLFormElement>('[data-contact-form]');
const statusEl = $('[data-form-status]');

const setStatus = (msg: string, type: 'ok' | 'error' | '' = '') => {
  if (!statusEl) return;
  statusEl.textContent = msg;
  statusEl.dataset.type = type;
};

form?.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Validate & mark invalid fields
  let firstInvalid: HTMLInputElement | null = null;
  $$<HTMLInputElement>('input, textarea, select', form).forEach((field) => {
    const valid = field.checkValidity();
    field.setAttribute('aria-invalid', String(!valid));
    if (!valid && !firstInvalid) firstInvalid = field;
  });
  if (firstInvalid) {
    (firstInvalid as HTMLInputElement).focus();
    setStatus('Please fill in the required fields with valid details.', 'error');
    return;
  }

  const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
  const endpoint = form.dataset.endpoint;
  const submitBtn = $<HTMLButtonElement>('button[type="submit"]', form);

  if (endpoint) {
    submitBtn?.setAttribute('disabled', '');
    setStatus('Sending your inquiry…');
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setStatus('Thank you. Your inquiry has been sent and our team will be in touch shortly.', 'ok');
    } catch {
      setStatus('Sorry, your inquiry could not be sent. Please try again, call us, or message us on WhatsApp.', 'error');
    } finally {
      submitBtn?.removeAttribute('disabled');
    }
    return;
  }

  // No endpoint configured: open the visitor's email client with a pre-filled message
  const subject = `Inquiry: ${data.product || 'General'}${data.company ? ` (${data.company})` : ''}`;
  const body = [
    `Name: ${data.name}`,
    `Company: ${data.company || '-'}`,
    `Phone: ${data.phone}`,
    `Email: ${data.email}`,
    `Product: ${data.product || '-'}`,
    '',
    data.message,
  ].join('\n');
  window.location.href = `mailto:${form.dataset.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  setStatus('Your email app should open with the inquiry ready to send.', 'ok');
});

form?.addEventListener('input', (e) => {
  const field = e.target as HTMLInputElement;
  if (field.getAttribute('aria-invalid') === 'true' && field.checkValidity()) field.setAttribute('aria-invalid', 'false');
});

/* ── Hero background video ───────────────────────────────── */
const heroVideo = $<HTMLVideoElement>('[data-hero-video]');
if (heroVideo) {
  const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
  if (reducedMotion || saveData) {
    heroVideo.removeAttribute('autoplay');
    heroVideo.pause();
    heroVideo.preload = 'none';
  } else {
    heroVideo.play().catch(() => {});
  }
}

/* ── Hero banner slider ──────────────────────────────────── */
const slider = $('[data-slider]');
if (slider) {
  const slides = $$<HTMLElement>('[data-slide]', slider);
  const dots = $$<HTMLButtonElement>('[data-slider-dot]', slider);
  const DELAY = 6000;
  let index = 0;
  let timer: number | undefined;

  const go = (n: number) => {
    index = (n + slides.length) % slides.length;
    slides.forEach((s, i) => {
      const on = i === index;
      s.classList.toggle('is-active', on);
      if (on) { s.removeAttribute('aria-hidden'); s.removeAttribute('tabindex'); }
      else { s.setAttribute('aria-hidden', 'true'); s.setAttribute('tabindex', '-1'); }
    });
    dots.forEach((d, i) => {
      d.classList.toggle('is-active', i === index);
      d.setAttribute('aria-selected', String(i === index));
    });
  };
  const stop = () => { if (timer) window.clearInterval(timer); timer = undefined; slider.classList.add('is-paused'); };
  const start = () => {
    if (reducedMotion || slides.length < 2) return;
    stop();
    slider.classList.remove('is-paused');
    // restart the progress bar animation
    dots.forEach((d) => { d.classList.remove('is-active'); void d.offsetWidth; });
    dots[index]?.classList.add('is-active');
    timer = window.setInterval(() => go(index + 1), DELAY);
  };

  $('[data-slider-prev]', slider)?.addEventListener('click', () => { go(index - 1); start(); });
  $('[data-slider-next]', slider)?.addEventListener('click', () => { go(index + 1); start(); });
  dots.forEach((d, i) => d.addEventListener('click', () => { go(i); start(); }));
  slider.addEventListener('mouseenter', stop);
  slider.addEventListener('mouseleave', start);
  slider.addEventListener('focusin', stop);
  slider.addEventListener('focusout', start);
  slider.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') { go(index - 1); }
    if (e.key === 'ArrowRight') { go(index + 1); }
  });
  let sx = 0;
  slider.addEventListener('touchstart', (e) => { sx = e.touches[0].clientX; stop(); }, { passive: true });
  slider.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - sx;
    if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1));
    start();
  });
  document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));
  start();
}
