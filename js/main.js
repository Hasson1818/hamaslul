/* המסלול – כושר קרבי | main.js (vanilla, no dependencies) */
(() => {
  'use strict';

  const WA_MAIN = '972542046602';
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  const waLink = (phone, text) =>
    `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;

  /* ---------------------------------------------------------
     Data: teams (from the current hamaslul.co.il site)
     Phone numbers are international format without "+".
     ------------------------------------------------------- */
  const REGIONS = ['הכל', 'צפון', 'השרון', 'גוש דן והמרכז', 'ירושלים', 'דרום'];

  const TEAMS = [
    // city, place, days, instructor, unit, phone, region
    ['קריות', 'חוף קרית חיים', 'שני ורביעי', 'קורן בוזגלו', 'מגלן', '972509404828', 'צפון'],
    ['חיפה', 'חוף הסטודנטים', 'ראשון ורביעי', 'ליאור קוסט', 'אגוז', '972539511925', 'צפון'],
    ['גוש זבולון', 'קיבוץ יגור', 'שני ורביעי', 'שניר רוזלס', 'יהל״מ', '972545680842', 'צפון'],
    ['בנימינה', 'גן יד לבנים', 'ראשון ורביעי', 'ליאור קוסט', 'אגוז', '972539511925', 'צפון'],
    ['פרדס חנה', 'ביה״ס החקלאי', 'ראשון ורביעי', 'יוסי אוזן', 'חיל הים', '972505063152', 'צפון'],
    ['חדרה', 'אקו-פארק', 'שני וחמישי', 'אלון אמיד', 'כפיר', '972546606568', 'השרון'],
    ['עמק חפר', 'חוף בית ינאי', 'ראשון ורביעי', 'מידן ברלינו', 'סטילים', '972509667721', 'השרון'],
    ['אבן יהודה', 'הדרך החקלאית', 'ראשון ורביעי', 'סתיו נגר', 'אגוז', '972506511739', 'השרון'],
    ['קדימה צורן', 'מגרש הכדורגל', 'ראשון ורביעי', 'יהב אלבוים', 'סצ״ח', '972532211606', 'השרון'],
    ['תל מונד', 'פארק היערות', 'ראשון ורביעי', 'סתיו נגר', 'אגוז', '972506511739', 'השרון'],
    ['לב השרון', 'עין ורד', 'שני וחמישי', 'יהב אלבוים', 'סצ״ח', '972532211606', 'השרון'],
    ['כפר סבא', 'הירוקה', 'ראשון ורביעי', 'מיכאל ברי', 'גולני', '972526433186', 'השרון'],
    ['אלפי מנשה', 'אמפי', 'ראשון ורביעי', 'אופק לובטון', 'מגלן', '972543079010', 'השרון'],
    ['הרצליה', 'חוף המעליות', 'ראשון ורביעי', 'מיכאל גרי', 'חיל הים', '972527253303', 'השרון'],
    ['רמת השרון', 'פארק הנצח', 'שני וחמישי', 'שחר וינ', 'חיל האוויר', '972544583657', 'השרון'],
    ['תל אביב', 'חוף תל ברוך', 'שני ורביעי', 'יובל בונדי', 'חיל הים', '972526022235', 'גוש דן והמרכז'],
    ['רמת גן (לאומי)', 'הפארק הלאומי', 'ראשון ורביעי', 'זיו שמשון', 'צנחנים', '972543121970', 'גוש דן והמרכז'],
    ['רמת גן (ירקון)', 'ראש ציפור', 'שני ורביעי', 'דרור בלום', 'חיל הים', '972546683533', 'גוש דן והמרכז'],
    ['גבעת שמואל', 'פארק דרום', 'שני וחמישי', 'רותם חנניה', 'צנחנים', '972526134962', 'גוש דן והמרכז'],
    ['פתח תקווה', 'הפארק הגדול', 'ראשון ורביעי', 'רועי פלג', 'חיל האוויר', '972509095504', 'גוש דן והמרכז'],
    ['ראש העין', 'גן טל', 'שני וחמישי', 'ינאי חמו', 'יהל״מ', '972502207792', 'גוש דן והמרכז'],
    ['בת ים', 'חוף תאיו', 'שני וחמישי', 'אדם אברמוב', 'אגוז', '972503379555', 'גוש דן והמרכז'],
    ['חולון', 'דיונה חולון', 'ראשון ורביעי', 'פיודור סובולב', 'חיל האוויר', '972527566329', 'גוש דן והמרכז'],
    ['ראשון לציון', 'חי כייף', 'ראשון ורביעי', 'אור חיים אקוע', 'מגלן', '972525777871', 'גוש דן והמרכז'],
    ['שוהם', 'גן החבל', 'ראשון ורביעי', 'עוז עזרא', 'מגלן', '972535305201', 'גוש דן והמרכז'],
    ['מבשרת ציון', 'פארק הכלבים', 'שני וחמישי', 'אורי כהן', 'דובדבן', '972545556302', 'ירושלים'],
    ['באר שבע', 'מקיף ז׳', 'ראשון ורביעי', 'רועי סבג', 'סצ״ח', '972524325590', 'דרום'],
    ['שובל', 'אצטדיון האתלטיקה', 'ראשון ורביעי', 'רועי סבג', 'סצ״ח', '972524325590', 'דרום'],
  ].map(([city, place, days, who, unit, phone, region]) => ({ city, place, days, who, unit, phone, region }));

  const UNITS = [
    ['סיירת גבעתי', 'givati-brigade'],
    ['קורס טייס', 'know-the-unit-pilot-course-hamaslul'],
    ['קורס חובלים', 'forming-a-captains-course'],
    ['סיירת מטכ״ל', 'gibushmatkal-shaldag-669-komando-kravi'],
    ['שייטת 13', 'gibush-shayetet13-kravi'],
    ['שלדג', 'gibushmatkal-shaldag-669-komando-kravi'],
    ['669', 'gibushmatkal-shaldag-669-komando-kravi'],
    ['עוקץ', 'know-the-unit-oketz-hamaslul'],
    ['מגלן', 'magellan-212'],
    ['אגוז', 'egoz-commando-unit'],
    ['דובדבן', 'duvdevan-commando-217-unit'],
    ['סיירת חרוב', 'carob-cruiser'],
    ['לוט״ר', 'counter-terrorism-unit'],
    ['רב מימדית', 'yom-sayarot-simulation-hamaslul'],
    ['ימ״ס', 'police-special-unit-yamas-gibush'],
    ['סיירת גולני', 'know-the-unit-sayeret-golani'],
    ['סיירת נחל', '2017/08/27/%D7%92%D7%99%D7%91%D7%95%D7%A9-%D7%A0%D7%97%D7%9C-%D7%99%D7%97%D7%98%D7%99%D7%95%D7%AA'],
    ['סיירת צנחנים', 'know-the-unit-sayret-tzanhanim'],
    ['יהל״מ', 'yahalom-idf'],
    ['504', 'yom-sayarot-simulation-hamaslul'],
  ];

  /* ---------------------------------------------------------
     Generic WhatsApp links: <a data-wa="message">
     ------------------------------------------------------- */
  $$('[data-wa]').forEach((a) => {
    a.href = waLink(WA_MAIN, a.dataset.wa);
    a.target = '_blank';
    a.rel = 'noopener';
  });

  /* ---------------------------------------------------------
     Header: mobile menu
     ------------------------------------------------------- */
  const toggle = $('.menu-toggle');
  const nav = $('#site-nav');
  const setMenu = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'סגירת תפריט' : 'פתיחת תפריט');
    nav.classList.toggle('is-open', open);
  };
  toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
  nav.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setMenu(false);
      toggle.focus();
    }
  });

  /* ---------------------------------------------------------
     Team finder
     ------------------------------------------------------- */
  const list = $('#team-list');
  const countEl = $('#team-count');
  const emptyEl = $('#team-empty');
  const searchEl = $('#team-search');
  const regionWrap = $('#region-filters');
  const moreBtn = $('#team-more');
  const PREVIEW = 8;
  let showAll = false;
  let activeRegion = 'הכל';

  REGIONS.forEach((name) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'chip';
    b.textContent = name;
    b.setAttribute('aria-pressed', String(name === activeRegion));
    b.addEventListener('click', () => {
      activeRegion = name;
      $$('.chip', regionWrap).forEach((c) => c.setAttribute('aria-pressed', String(c === b)));
      renderTeams();
    });
    regionWrap.appendChild(b);
  });

  const normalize = (s) => s.replace(/[״"׳'\-־]/g, '').trim();

  function renderTeams() {
    const q = normalize(searchEl.value);
    const matches = TEAMS.filter((t) => {
      const inRegion = activeRegion === 'הכל' || t.region === activeRegion;
      const hay = normalize(`${t.city} ${t.place} ${t.who}`);
      // match from the start of any word, so "תל" finds "תל אביב" but not "האתלטיקה"
      return inRegion && (!q || ` ${hay}`.includes(` ${q}`));
    });
    // Unfiltered view shows a preview; any search or region choice shows every match
    const filtered = q || activeRegion !== 'הכל';
    const items = (filtered || showAll) ? matches : matches.slice(0, PREVIEW);
    moreBtn.hidden = filtered || showAll || matches.length <= PREVIEW;
    moreBtn.textContent = `הצגת כל ${matches.length} הצוותים`;

    list.textContent = '';
    items.forEach((t, i) => {
      const li = document.createElement('li');
      li.className = 'team';
      li.style.animationDelay = `${Math.min(i, 8) * 30}ms`;

      const city = document.createElement('h3');
      city.className = 'team__city';
      city.textContent = t.city;

      const where = document.createElement('p');
      where.className = 'team__where';
      where.textContent = `${t.place}, בימי ${t.days}`;

      const who = document.createElement('p');
      who.className = 'team__who';
      who.innerHTML = '<small>מדריך הצוות</small>';
      who.append(`${t.who}, ${t.unit}`);

      const cta = document.createElement('a');
      cta.className = 'btn btn--primary btn--sm team__cta';
      cta.textContent = 'לתיאום אימון ניסיון';
      cta.href = waLink(t.phone, `היי ${t.who.split(' ')[0]}, אשמח לתאם אימון ניסיון בצוות ${t.city}`);
      cta.target = '_blank';
      cta.rel = 'noopener';
      cta.setAttribute('aria-label', `תיאום אימון ניסיון בצוות ${t.city} בוואטסאפ`);

      li.append(city, where, who, cta);
      list.appendChild(li);
    });

    countEl.textContent = matches.length
      ? (matches.length === TEAMS.length ? `${TEAMS.length} צוותים ברחבי הארץ` : `${matches.length} מתוך ${TEAMS.length} צוותים`)
      : '';
    emptyEl.hidden = matches.length > 0;
  }
  moreBtn.addEventListener('click', () => { showAll = true; renderTeams(); });
  searchEl.addEventListener('input', renderTeams);
  renderTeams();

  /* ---------------------------------------------------------
     Units
     ------------------------------------------------------- */
  const unitList = $('#unit-list');
  UNITS.forEach(([name, slug]) => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.textContent = name;
    a.href = `https://www.hamaslul.co.il/single-post/${slug}`;
    a.rel = 'noopener';
    li.appendChild(a);
    unitList.appendChild(li);
  });

  /* ---------------------------------------------------------
     Hero: page-load sequence + route drawing
     ------------------------------------------------------- */
  const hero = $('.hero');
  const route = $('#route');
  const pinsWrap = $('#route-points');
  const SVG_NS = 'http://www.w3.org/2000/svg';
  const DRAW_MS = 2600;

  const PINS = [
    { t: 0, label: 'היום', side: 'r' },
    { t: 0.36, label: 'אימון ניסיון', side: 'u' },
    { t: 0.7, label: 'יום סיירות', side: 'r' },
    { t: 1, label: 'גיבוש', side: 'l', end: true },
  ];

  const length = route.getTotalLength();
  const pinEls = PINS.map((p) => {
    const pt = route.getPointAtLength(length * p.t);
    const g = document.createElementNS(SVG_NS, 'g');
    g.setAttribute('class', 'map__pin');

    const dot = document.createElementNS(SVG_NS, 'circle');
    dot.setAttribute('cx', pt.x.toFixed(1));
    dot.setAttribute('cy', pt.y.toFixed(1));
    dot.setAttribute('r', p.end ? 11 : 8);
    dot.setAttribute('class', p.end ? 'map__pin-dot map__pin-dot--end' : 'map__pin-dot');

    const text = document.createElementNS(SVG_NS, 'text');
    const above = p.side === 'u';
    const dx = above ? 0 : (p.side === 'r' ? 20 : -20);
    text.setAttribute('x', (pt.x + dx).toFixed(1));
    text.setAttribute('y', (pt.y + (above ? -20 : 6)).toFixed(1));
    text.setAttribute('text-anchor', above ? 'middle' : (p.side === 'r' ? 'start' : 'end'));
    text.setAttribute('class', 'map__label');
    text.textContent = p.label;

    g.append(dot, text);
    pinsWrap.appendChild(g);
    return g;
  });

  if (prefersReduced) {
    pinEls.forEach((g) => g.classList.add('is-on'));
    hero.classList.add('is-loaded');
  } else {
    route.style.strokeDasharray = String(length);
    route.style.strokeDashoffset = String(length);
    route.getBoundingClientRect(); // commit initial state

    const start = () => {
      hero.classList.add('is-loaded');
      route.style.transition = `stroke-dashoffset ${DRAW_MS}ms cubic-bezier(.45,.05,.25,1) .5s`;
      route.style.strokeDashoffset = '0';
      PINS.forEach((p, i) => {
        setTimeout(() => pinEls[i].classList.add('is-on'), 500 + DRAW_MS * p.t * 0.92);
      });
    };
    // wait for fonts so the headline doesn't jump when it animates in
    (document.fonts && document.fonts.ready ? Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 1200))]) : Promise.resolve())
      .then(() => requestAnimationFrame(start));
  }

  /* ---------------------------------------------------------
     Count-up stats
     ------------------------------------------------------- */
  const counters = $$('[data-count]');
  const runCount = (el) => {
    const target = Number(el.dataset.count);
    const fmt = (n) => Math.round(n).toLocaleString('en-US');
    if (prefersReduced) { el.textContent = fmt(target); return; }
    const t0 = performance.now();
    const dur = 1500;
    const tick = (now) => {
      const p = Math.min((now - t0) / dur, 1);
      el.textContent = fmt(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  /* ---------------------------------------------------------
     Observers: stats, reveal, steps line, sticky CTA
     ------------------------------------------------------- */
  if ('IntersectionObserver' in window) {
    const once = (els, cb, opts) => {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) { cb(en.target); io.unobserve(en.target); }
        });
      }, opts);
      els.forEach((el) => io.observe(el));
    };

    counters.forEach((el) => { el.textContent = '0'; });
    once([$('#stats')], () => counters.forEach(runCount), { threshold: 0.4 });

    once($$('.reveal'), (el) => el.classList.add('is-in'), { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    once([$('#steps-list')], (el) => el.classList.add('is-drawn'), { threshold: 0.35 });

    // Sticky mobile CTA: visible after the hero, hidden while the team list or form is on screen
    const sticky = $('#sticky-cta');
    const stickyBtn = $('a', sticky);
    const state = { hero: true, teams: false, join: false };
    const updateSticky = () => {
      const show = !state.hero && !state.teams && !state.join;
      sticky.classList.toggle('is-visible', show);
      sticky.setAttribute('aria-hidden', String(!show));
      stickyBtn.tabIndex = show ? 0 : -1;
    };
    const watch = (el, key) => new IntersectionObserver(([en]) => {
      state[key] = en.isIntersecting;
      updateSticky();
    }, { threshold: 0.05 }).observe(el);
    watch($('.hero'), 'hero');
    watch($('#teams'), 'teams');
    watch($('#join'), 'join');
  } else {
    // very old browsers: show everything
    document.documentElement.classList.remove('js');
  }

  /* ---------------------------------------------------------
     Join form -> WhatsApp message
     (no server needed; nothing is stored on this site)
     ------------------------------------------------------- */
  const form = $('#join-form');
  const status = $('#form-status');
  const fName = $('#f-name');
  const fPhone = $('#f-phone');
  const fGoal = $('#f-goal');
  const fCity = $('#f-city');
  const setError = (input, msg) => {
    const err = $(`#${input.id}-err`);
    err.textContent = msg;
    input.setAttribute('aria-invalid', msg ? 'true' : 'false');
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = fName.value.trim();
    const phone = fPhone.value.replace(/[\s\-()]/g, '');
    const goal = fGoal.value;
    const city = fCity.value.trim();

    const nameOk = name.length >= 2;
    const phoneOk = /^(0|\+?972)5\d{8}$/.test(phone);
    setError(fName, nameOk ? '' : 'כתבו את שמכם המלא.');
    setError(fPhone, phoneOk ? '' : 'מספר הנייד נראה לא תקין. לדוגמה: 050-0000000.');
    if (!nameOk) return fName.focus();
    if (!phoneOk) return fPhone.focus();

    const msg = `היי, שמי ${name}. אשמח לפרטים על: ${goal}${city ? `. אני גר/ה ב${city}` : ''}. הטלפון שלי: ${fPhone.value.trim()}`;
    const url = waLink(WA_MAIN, msg);
    window.open(url, '_blank', 'noopener');

    status.textContent = '';
    status.append('פתחנו וואטסאפ עם ההודעה שלכם. אם לא נפתח חלון, ');
    const a = document.createElement('a');
    a.href = url; a.target = '_blank'; a.rel = 'noopener';
    a.textContent = 'לחצו כאן';
    status.append(a, '.');
  });
  [fName, fPhone].forEach((el) => el.addEventListener('input', () => setError(el, '')));

  /* ---------------------------------------------------------
     Footer year
     ------------------------------------------------------- */
  const year = $('#year');
  if (year) year.textContent = new Date().getFullYear();
})();
