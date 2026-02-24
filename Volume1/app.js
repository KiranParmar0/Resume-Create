/* ────────────────────────────────────────────────
   app.js  –  Loads resume data from data.json
   and dynamically builds every section of the page
──────────────────────────────────────────────── */

/* ─── PDF DOWNLOAD ─── */
function downloadPDF() {
  window.print();
}

(async function () {
  try {
    const res  = await fetch('data.json');
    const data = await res.json();
    buildResume(data);
  } catch (err) {
    console.error('Failed to load data.json:', err);
    document.body.innerHTML =
      '<p style="color:red;padding:20px">Could not load data.json. ' +
      'Make sure you are serving this folder via a local server.</p>';
  }
})();

/* ─── MASTER BUILD ─── */
function buildResume(d) {
  buildHeader(d.personal);
  buildSummary(d.summary);
  buildExperience(d.experience);
  buildEducation(d.education);
  buildLanguages(d.languages);
  buildStrengths(d.strengths);
  buildAchievements(d.achievements);
  buildSkills(d.skills);
  buildProjects(d.projects);
}

/* ─── HEADER ─── */
function buildHeader(p) {
  setText('fullName',  p.name);
  setText('jobTitle',  p.title);
  if (p.industries) setText('industryLine', p.industries);

  const contacts = [
    { icon: 'fa-solid fa-phone',        value: p.phone,         href: `tel:${p.phone}` },
    { icon: 'fa-solid fa-envelope',     value: p.email,         href: `mailto:${p.email}` },
    { icon: 'fa-brands fa-linkedin',    value: p.linkedinLabel, href: p.linkedin, newTab: true },
    { icon: 'fa-solid fa-location-dot', value: p.location }
  ];

  const wrap = document.getElementById('contactInfo');
  contacts.forEach(c => {
    const item = document.createElement('div');
    item.className = 'contact-item';

    const icon = document.createElement('i');
    icon.className = c.icon;
    item.appendChild(icon);

    if (c.href) {
      const a = document.createElement('a');
      a.href   = c.href;
      a.textContent = c.value;
      if (c.newTab) { a.target = '_blank'; a.rel = 'noopener noreferrer'; }
      item.appendChild(a);
    } else {
      item.appendChild(document.createTextNode(c.value));
    }

    wrap.appendChild(item);
  });
}

/* ─── SUMMARY ─── */
function buildSummary(text) {
  setText('summaryText', text);
}

/* ─── EXPERIENCE ─── */
function buildExperience(list) {
  const wrap = document.getElementById('experienceList');
  list.forEach(job => {
    wrap.appendChild(makeExpItem(job));
  });
}

function makeExpItem(job) {
  const div = document.createElement('div');
  div.className = 'exp-item';

  // Title
  const title = document.createElement('div');
  title.className = 'exp-title';
  title.textContent = job.title;
  div.appendChild(title);

  // Company
  const company = document.createElement('div');
  company.className = 'exp-company';
  company.textContent = job.company;
  div.appendChild(company);

  // Meta (date + location)
  div.appendChild(makeMeta(job.period, job.location));

  // Description (with bold first keyword)
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

/* ─── EDUCATION ─── */
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

/* ─── LANGUAGES ─── */
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

    // Dots (max 5)
    const dotsWrap = document.createElement('div');
    dotsWrap.className = 'lang-dots';
    for (let i = 1; i <= 5; i++) {
      const dot = document.createElement('span');
      dot.className = 'dot' + (i <= lang.dots ? ' filled' : '');
      dotsWrap.appendChild(dot);
    }
    item.appendChild(dotsWrap);

    grid.appendChild(item);
  });
}

/* ─── STRENGTHS ─── */
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
  wrap.className = 'strengths-pills';
  list.forEach(s => {
    const pill = document.createElement('div');
    pill.className = 'strength-pill';

    const ic = document.createElement('i');
    ic.className = STRENGTH_ICONS[s.icon] || STRENGTH_ICONS.default;
    pill.appendChild(ic);

    const label = document.createElement('span');
    label.textContent = s.title;
    pill.appendChild(label);

    wrap.appendChild(pill);
  });
}

/* ─── KEY ACHIEVEMENTS ─── */
function buildAchievements(list) {
  const wrap = document.getElementById('achievementsList');
  list.forEach(a => {
    const div = document.createElement('div');
    div.className = 'achievement-item';

    const iconWrap = document.createElement('div');
    iconWrap.className = `ach-icon ${a.icon}`;
    const ic = document.createElement('i');
    ic.className = a.icon === 'star'
      ? 'fa-solid fa-star'
      : 'fa-solid fa-gem';
    iconWrap.appendChild(ic);
    div.appendChild(iconWrap);

    const text = document.createElement('div');
    text.className = 'ach-text';
    text.innerHTML = `<h4>${a.title}</h4><p>${a.description}</p>`;
    div.appendChild(text);

    wrap.appendChild(div);
  });
}

/* ─── SKILLS ─── */
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

/* ─── PROJECTS ─── */
function buildProjects(list) {
  const wrap = document.getElementById('projectsList');
  list.forEach(proj => {
    const div = document.createElement('div');
    div.className = 'proj-item';

    // Title
    const title = document.createElement('div');
    title.className = 'exp-title';
    title.textContent = proj.title;
    div.appendChild(title);

    // Company badge
    if (proj.company) {
      const co = document.createElement('div');
      co.className = 'exp-company';
      co.textContent = proj.company;
      div.appendChild(co);
    }

    // Meta row: period
    if (proj.period) {
      div.appendChild(makeMeta(proj.period, null));
    }

    // Meta tags: domain | role | technologies
    if (proj.domain || proj.role || proj.technologies) {
      const meta2 = document.createElement('div');
      meta2.className = 'proj-meta-tags';
      if (proj.domain) {
        const d = document.createElement('span');
        d.innerHTML = `<i class="fa-solid fa-layer-group"></i>${proj.domain}`;
        meta2.appendChild(d);
      }
      if (proj.role) {
        const r = document.createElement('span');
        r.innerHTML = `<i class="fa-solid fa-user-gear"></i>${proj.role}`;
        meta2.appendChild(r);
      }
      if (proj.technologies) {
        const t = document.createElement('div');
        t.className = 'proj-tech';
        t.innerHTML = `<i class="fa-solid fa-code"></i><span>${proj.technologies}</span>`;
        div.appendChild(meta2);
        div.appendChild(t);
      } else {
        div.appendChild(meta2);
      }
    }

    // Description
    if (proj.description) {
      const desc = document.createElement('p');
      desc.className = 'exp-description';
      desc.textContent = proj.description;
      div.appendChild(desc);
    }

    // Key Features
    if (proj.keyFeatures && proj.keyFeatures.length) {
      const kfLabel = document.createElement('div');
      kfLabel.className = 'proj-kf-label';
      kfLabel.textContent = 'Key Features:';
      div.appendChild(kfLabel);
      const kfUl = document.createElement('ul');
      kfUl.className = 'exp-bullets kf-bullets';
      proj.keyFeatures.forEach(f => {
        const li = document.createElement('li');
        li.textContent = f;
        kfUl.appendChild(li);
      });
      div.appendChild(kfUl);
    }

    // Bullets
    if (proj.bullets && proj.bullets.length) {
      const ul = document.createElement('ul');
      ul.className = 'exp-bullets';
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

/* ─── HELPERS ─── */
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
