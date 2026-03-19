/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
   app.js  â€“  Pro UI Resume  â€“  Kiran Fulchand Parmar
â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */

/* â”€â”€â”€ PDF DOWNLOAD â”€â”€â”€ */
function downloadPDF() { window.print(); }

/* â”€â”€â”€ DARK / LIGHT MODE TOGGLE â”€â”€â”€ */
(function () {
  const btn = document.getElementById('themeToggle');
  if (!btn) return;
  const saved = localStorage.getItem('resume-theme') || 'light';
  applyTheme(saved);
  btn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('resume-theme', theme);
    btn.innerHTML = theme === 'dark'
      ? '<i class="fa-solid fa-sun"></i>'
      : '<i class="fa-solid fa-moon"></i>';
  }
})();

/* â”€â”€â”€ LOAD & BUILD â”€â”€â”€ */
(async function () {
  try {
    const res  = await fetch('data.json');
    const data = await res.json();
    buildResume(data);
    triggerAnimations();
  } catch (err) {
    console.error('Failed to load data.json:', err);
    document.body.innerHTML =
      '<p style="color:red;padding:20px">Could not load data.json. ' +
      'Serve this folder via a local server (e.g. Live Server in VS Code).</p>';
  }
})();

/* â”€â”€â”€ MASTER BUILD â”€â”€â”€ */
function buildResume(d) {
  buildHeader(d.personal);
  buildStats(d.stats || []);
  buildSummary(d.summary);
  buildExperience(d.experience);
  buildEducation(d.education);
  // buildLanguages(d.languages);
  buildStrengths(d.strengths);
  buildAchievements(d.achievements);
  buildSkills(d.skills);
  buildSkillBars(d.skills.proficiency || []);
  buildProjects(d.projects);
}

/* â”€â”€â”€ HEADER â”€â”€â”€ */
function setAvatarInitials(el, name) {
  const parts = (name || '').trim().split(/\s+/);
  el.textContent = parts.length >= 2
    ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    : (parts[0] || '?').slice(0, 2).toUpperCase();
}

function buildHeader(p) {
  // Avatar: photo or initials
  const avatar = document.getElementById('avatarCircle');
  if (avatar) {
    if (p.photo) {
      const img = document.createElement('img');
      img.src = p.photo;
      img.alt = p.name;
      img.onerror = () => {
        // fallback to initials if photo not found
        avatar.removeChild(img);
        setAvatarInitials(avatar, p.name);
      };
      avatar.appendChild(img);
    } else {
      setAvatarInitials(avatar, p.name);
    }
  }

  setText('fullName', p.name);
  setText('jobTitle', p.title);

  // Industry as pill tags
  const industryWrap = document.getElementById('industryTags');
  if (industryWrap && p.industries) {
    const list = Array.isArray(p.industries) ? p.industries : p.industries.split('|');
    list.forEach(ind => {
      const tag = document.createElement('span');
      tag.className = 'industry-tag';
      tag.textContent = ind.trim();
      industryWrap.appendChild(tag);
    });
  }

  const contacts = [
    { icon: 'fa-solid fa-phone',        value: p.phone,         href: `tel:${p.phone}` },
    { icon: 'fa-solid fa-envelope',     value: p.email,         href: `mailto:${p.email}` },
    { icon: 'fa-brands fa-linkedin',    value: p.linkedinLabel, href: p.linkedin, newTab: true },
    { icon: 'fa-solid fa-location-dot', value: p.location }
  ];

  const wrap = document.getElementById('contactInfo');
  contacts.forEach(c => {
    if (!c.value) return;
    const item = document.createElement('div');
    item.className = 'contact-item';

    const iconBox = document.createElement('div');
    iconBox.className = 'ci-icon';
    const ic = document.createElement('i');
    ic.className = c.icon;
    iconBox.appendChild(ic);
    item.appendChild(iconBox);

    if (c.href) {
      const a = document.createElement('a');
      a.href = c.href;
      a.textContent = c.value;
      if (c.newTab) { a.target = '_blank'; a.rel = 'noopener noreferrer'; }
      item.appendChild(a);
    } else {
      item.appendChild(document.createTextNode(c.value));
    }
    wrap.appendChild(item);
  });
}

/* â”€â”€â”€ STATS BAR â”€â”€â”€ */
function buildStats(list) {
  const bar = document.getElementById('statsBar');
  if (!bar || !list.length) return;
  list.forEach(s => {
    const item = document.createElement('div');
    item.className = 'stat-item';
    item.innerHTML = `
      <i class="${s.icon}"></i>
      <span class="stat-value" data-target="${s.value}">${s.value}</span>
      <span class="stat-label">${s.label}</span>`;
    bar.appendChild(item);
  });
}

/* â”€â”€â”€ SUMMARY â”€â”€â”€ */
function buildSummary(text) {
  setText('summaryText', text);
}

/* â”€â”€â”€ EXPERIENCE â”€â”€â”€ */
function buildExperience(list) {
  const wrap = document.getElementById('experienceList');
  list.forEach(job => wrap.appendChild(makeExpItem(job)));
}

function makeExpItem(job) {
  const div = document.createElement('div');
  div.className = 'exp-item';

  // Header row: title + duration badge
  const header = document.createElement('div');
  header.className = 'exp-header';

  const title = document.createElement('div');
  title.className = 'exp-title';
  title.textContent = job.title;
  header.appendChild(title);

  if (job.period) {
    const badge = document.createElement('span');
    badge.className = 'exp-duration-badge';
    badge.innerHTML = `<i class="fa-regular fa-calendar"></i> ${job.period}`;
    header.appendChild(badge);
  }
  div.appendChild(header);

  // Company
  const company = document.createElement('div');
  company.className = 'exp-company';
  company.textContent = job.company;
  div.appendChild(company);

  // Meta (location only now, period in badge)
  if (job.location) {
    const meta = document.createElement('div');
    meta.className = 'exp-meta';
    const locSpan = document.createElement('span');
    locSpan.innerHTML = `<i class="fa-solid fa-location-dot"></i>${job.location}`;
    meta.appendChild(locSpan);
    div.appendChild(meta);
  }

  // Description
  if (job.description) {
    const desc = document.createElement('p');
    desc.className = 'exp-description';
    desc.innerHTML = job.description;
    div.appendChild(desc);
  }

  // Bullets
  if (job.bullets && job.bullets.length) {
    const ul = document.createElement('ul');
    ul.className = 'exp-bullets';
    job.bullets.forEach(b => {
      const li = document.createElement('li');
      li.textContent = b;
      ul.appendChild(li);
    });
    div.appendChild(ul);
  }

  return div;
}

/* â”€â”€â”€ EDUCATION â”€â”€â”€ */
function buildEducation(list) {
  const wrap = document.getElementById('educationList');
  list.forEach(edu => {
    const div = document.createElement('div');
    div.className = 'edu-item';

    const degree = document.createElement('div');
    degree.className = 'edu-degree';
    degree.textContent = edu.degree;
    div.appendChild(degree);

    const inst = document.createElement('div');
    inst.className = 'edu-institution';
    inst.textContent = edu.institution;
    div.appendChild(inst);

    div.appendChild(makeMeta(edu.period, edu.location, 'edu-meta'));
    wrap.appendChild(div);
  });
}

/* â”€â”€â”€ LANGUAGES â”€â”€â”€ */
function buildLanguages(list) {
  const grid = document.getElementById('languageGrid');
  list.forEach(lang => {
    const item = document.createElement('div');
    item.className = 'lang-item';

    const header = document.createElement('div');
    header.className = 'lang-header';

    const name = document.createElement('span');
    name.className = 'lang-name';
    name.textContent = lang.name;
    header.appendChild(name);

    const level = document.createElement('span');
    level.className = 'lang-level';
    level.textContent = lang.level;
    header.appendChild(level);

    item.appendChild(header);

    // Language proficiency bar (based on dots out of 5)
    const pct = Math.round((lang.dots / 5) * 100);
    const track = document.createElement('div');
    track.className = 'lang-bar-track';
    const fill = document.createElement('div');
    fill.className = 'lang-bar-fill';
    fill.style.width = '0%';
    fill.setAttribute('data-width', pct + '%');
    fill.style.background = getSkillGradient(lang.name);
    track.appendChild(fill);
    item.appendChild(track);

    grid.appendChild(item);
  });
}

/* â”€â”€â”€ STRENGTHS â”€â”€â”€ */
const STRENGTH_ICONS = {
  users:          'fa-solid fa-users',
  lightbulb:      'fa-solid fa-lightbulb',
  shuffle:        'fa-solid fa-shuffle',
  'user-graduate':'fa-solid fa-user-graduate',
  bullseye:       'fa-solid fa-bullseye',
  'gauge-high':   'fa-solid fa-gauge-high',
  default:        'fa-solid fa-star'
};

function buildStrengths(list) {
  const wrap = document.getElementById('strengthsList');
  wrap.className = 'strengths-list';
  list.forEach((s, idx) => {
    const item = document.createElement('div');
    item.className = 'strength-item';
    
    const iconEl = document.createElement('div');
    iconEl.className = 'strength-icon';
    const ic = document.createElement('i');
    ic.className = STRENGTH_ICONS[s.icon] || STRENGTH_ICONS.default;
    iconEl.appendChild(ic);
    item.appendChild(iconEl);
    
    const content = document.createElement('div');
    content.className = 'strength-content';
    
    const titleEl = document.createElement('h4');
    titleEl.className = 'strength-title';
    titleEl.textContent = s.title;
    content.appendChild(titleEl);
    
    const descEl = document.createElement('p');
    descEl.className = 'strength-desc';
    descEl.textContent = s.description || '';
    content.appendChild(descEl);
    
    item.appendChild(content);
    wrap.appendChild(item);
    
    // Add divider between items (but not after last item)
    if (idx < list.length - 1) {
      const divider = document.createElement('div');
      divider.className = 'strength-divider';
      wrap.appendChild(divider);
    }
  });
}

/* â”€â”€â”€ KEY ACHIEVEMENTS â”€â”€â”€ */
function buildAchievements(list) {
  const wrap = document.getElementById('achievementsList');
  list.forEach(a => {
    const div = document.createElement('div');
    div.className = 'achievement-item';

    const iconWrap = document.createElement('div');
    iconWrap.className = `ach-icon ${a.icon}`;
    const ic = document.createElement('i');
    ic.className = a.icon === 'star' ? 'fa-solid fa-star' : 'fa-solid fa-gem';
    iconWrap.appendChild(ic);
    div.appendChild(iconWrap);

    const text = document.createElement('div');
    text.className = 'ach-text';
    text.innerHTML = `<h4>${a.title}</h4><p>${a.description}</p>`;
    div.appendChild(text);

    wrap.appendChild(div);
  });
}

/* â”€â”€â”€ SKILLS TAGS â”€â”€â”€ */
function buildSkills(skills) {
  function renderTags(containerId, list) {
    const wrap = document.getElementById(containerId);
    if (!wrap) return;
    list.forEach(skill => {
      const span = document.createElement('span');
      span.className = 'skill-tag';
      span.textContent = skill;
      wrap.appendChild(span);
    });
  }
  if (Array.isArray(skills)) {
    renderTags('keySkillsTags', skills);
  } else {
    renderTags('keySkillsTags', skills.keySkills || []);
    renderTags('toolsTags', skills.tools || []);
  }
}

/* â”€â”€â”€ SKILL PROFICIENCY BARS â”€â”€â”€ */
function buildSkillBars(list) {
  const wrap = document.getElementById('skillBars');
  if (!wrap || !list.length) return;

  list.forEach(skill => {
    const item = document.createElement('div');
    item.className = 'skill-bar-item';

    const hdr = document.createElement('div');
    hdr.className = 'skill-bar-header';
    hdr.innerHTML = `
      <span class="skill-bar-name">${skill.name}</span>
      <span class="skill-bar-pct">${skill.pct}%</span>`;
    item.appendChild(hdr);

    const track = document.createElement('div');
    track.className = 'skill-bar-track';

    const fill = document.createElement('div');
    fill.className = 'skill-bar-fill';
    fill.style.width = '0%';
    fill.setAttribute('data-width', skill.pct + '%');
    fill.style.background = skill.color
      ? `linear-gradient(90deg, ${skill.color}cc, ${skill.color})`
      : 'linear-gradient(90deg, #2563a8, #0ea5e9)';

    track.appendChild(fill);
    item.appendChild(track);
    wrap.appendChild(item);
  });
}

/* â”€â”€â”€ PROJECTS â”€â”€â”€ */
const DOMAIN_COLORS = {
  'b2b marketing automation': 'b2b',
  'digital marketing':        'digital',
  'healthcare':               'healthcare',
  'casino gaming':            'casino',
  'automotive & industrial':  'automotive',
};

function getDomainClass(domain) {
  if (!domain) return 'default';
  const key = domain.toLowerCase();
  for (const [k, v] of Object.entries(DOMAIN_COLORS)) {
    if (key.includes(k)) return v;
  }
  return 'default';
}

function buildProjects(list) {
  const wrap = document.getElementById('projectsList');
  list.forEach((proj, i) => {
    const div = document.createElement('div');
    div.className = 'proj-item';
    div.style.animationDelay = (i * 0.07) + 's';

    // Domain badge
    if (proj.domain) {
      const badge = document.createElement('div');
      badge.className = `domain-badge ${getDomainClass(proj.domain)}`;
      badge.innerHTML = `<i class="fa-solid fa-layer-group"></i>${proj.domain}`;
      div.appendChild(badge);
    }

    // Title
    const title = document.createElement('div');
    title.className = 'exp-title';
    title.textContent = proj.title;
    div.appendChild(title);

    // Company + period row
    const row = document.createElement('div');
    row.className = 'exp-header';
    if (proj.company) {
      const co = document.createElement('div');
      co.className = 'exp-company';
      co.textContent = proj.company;
      row.appendChild(co);
    }
    if (proj.period) {
      const per = document.createElement('span');
      per.className = 'exp-duration-badge';
      per.innerHTML = `<i class="fa-regular fa-calendar"></i> ${proj.period}`;
      row.appendChild(per);
    }
    div.appendChild(row);

    // Role
    if (proj.role) {
      const meta2 = document.createElement('div');
      meta2.className = 'proj-meta-tags';
      const r = document.createElement('span');
      r.innerHTML = `<i class="fa-solid fa-user-gear"></i>${proj.role}`;
      meta2.appendChild(r);
      div.appendChild(meta2);
    }

    // Tech stack
    if (proj.technologies) {
      const t = document.createElement('div');
      t.className = 'proj-tech';
      t.innerHTML = `<i class="fa-solid fa-code"></i><span>${proj.technologies}</span>`;
      div.appendChild(t);
    }

    // Description
    if (proj.description) {
      const desc = document.createElement('p');
      desc.className = 'exp-description';
      desc.textContent = proj.description;
      div.appendChild(desc);
    }

    // Bullets
    if (proj.bullets && proj.bullets.length) {
      const ul = document.createElement('ul');
      ul.className = 'exp-bullets kf-bullets';
      proj.bullets.forEach(b => {
        const li = document.createElement('li');
        li.textContent = b;
        ul.appendChild(li);
      });
      div.appendChild(ul);
    }

    wrap.appendChild(div);
  });
}

/* â”€â”€â”€ ANIMATIONS (progress bars, counters) â”€â”€â”€ */
function triggerAnimations() {
  // Animate all progress bars (skill + language)
  const fills = document.querySelectorAll('[data-width]');
  fills.forEach((el, i) => {
    setTimeout(() => {
      el.style.width = el.getAttribute('data-width');
    }, 300 + i * 80);
  });
}

/* â”€â”€â”€ HELPERS â”€â”€â”€ */
function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

function makeMeta(period, location, cls = 'exp-meta') {
  const meta = document.createElement('div');
  meta.className = cls;
  if (period) {
    const dateSpan = document.createElement('span');
    dateSpan.innerHTML = `<i class="fa-regular fa-calendar"></i>${period}`;
    meta.appendChild(dateSpan);
  }
  if (location) {
    const locSpan = document.createElement('span');
    locSpan.innerHTML = `<i class="fa-solid fa-location-dot"></i>${location}`;
    meta.appendChild(locSpan);
  }
  return meta;
}

function getSkillGradient(name) {
  const colors = {
    'English': 'linear-gradient(90deg,#2563a8,#0ea5e9)',
    'Marathi': 'linear-gradient(90deg,#7c3aed,#a78bfa)',
    'Hindi':   'linear-gradient(90deg,#059669,#34d399)',
    'Marwari': 'linear-gradient(90deg,#d97706,#fbbf24)',
  };
  return colors[name] || 'linear-gradient(90deg,#2563a8,#0ea5e9)';
}

