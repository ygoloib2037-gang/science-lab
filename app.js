/* 화면을 그리는 코드 — 평소에는 고칠 필요가 없습니다. 자료는 data.js 에서 관리하세요. */
(function () {
  const app = document.getElementById("app");
  const sidebar = document.getElementById("sidebar");
  const crumbs = document.getElementById("crumbs");
  const UNIT_COLORS = [
    ["var(--unit1)", "#dff0e3"],
    ["var(--unit2)", "#f8e7d2"],
    ["var(--unit3)", "#e8e3f8"],
  ];

  document.getElementById("site-title").textContent = SITE.title;
  document.getElementById("footer-text").textContent = `© ${new Date().getFullYear()} ${SITE.author} · ${SITE.title}`;
  document.title = SITE.title;

  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const accent = (i) => {
    const [c, soft] = UNIT_COLORS[i % UNIT_COLORS.length];
    return `--accent:${c};--accent-soft:${soft};`;
  };
  const label = (s) => s.unitLabel || "단원";
  const ready = (list) => (list || []).filter((x) => x.url).length;
  const isExternal = (url) => /^https?:\/\//.test(url);
  const reviewUrl = (url) => url + (url.includes("?") ? "&" : "?") + "s=1";

  function setCrumbs(items) {
    crumbs.innerHTML = items
      .map((it, i) => (i ? '<span class="sep">›</span>' : "") + (it.href ? `<a href="${it.href}">${esc(it.text)}</a>` : `<span>${esc(it.text)}</span>`))
      .join("");
  }

  /* ---------- 왼쪽 메뉴 ---------- */
  function renderSidebar(current) {
    const groups = [];
    SUBJECTS.forEach((s) => {
      const g = s.group || "교과";
      let grp = groups.find((x) => x.name === g);
      if (!grp) groups.push((grp = { name: g, items: [] }));
      grp.items.push(s);
    });
    sidebar.innerHTML = groups
      .map(
        (g) =>
          `<div class="side-group">${esc(g.name)}</div>` +
          g.items
            .map((s) => `<a class="side-item ${s === current ? "active" : ""}" href="#/${s.id}"><span class="ic">${s.icon || "📘"}</span>${esc(s.name)}</a>`)
            .join("")
      )
      .join("");
  }

  /* ---------- 과목 첫 화면 ---------- */
  function renderSubject(subject) {
    setCrumbs([{ text: subject.name }]);
    const chip = [subject.name, subject.curriculum].filter(Boolean).join(" · ");
    let body;
    if (!subject.units.length) {
      body = `<div class="empty">아직 ${label(subject)}이 없어요. <b>data.js</b>에서 이 과목의 <b>units</b>를 채우면 여기에 나타나요.</div>`;
    } else {
      body =
        '<section class="unit-grid">' +
        subject.units
          .map((u, ui) => {
            const lessons = u.lessons
              .map((l, li) => {
                const c = [["l", "📺", ready(l.lectures)], ["n", "✏️", ready(l.notes)], ["a", "💻", ready(l.apps)]]
                  .map(([k, ic, n]) => `<span class="count ${k} ${n ? "" : "zero"}">${ic} ${n}</span>`)
                  .join("");
                return `<li><a href="#/${subject.id}/${ui + 1}/${li + 1}"><span>${li + 1}. ${esc(l.title)}</span><span class="counts">${c}</span></a></li>`;
              })
              .join("");
            return `<div class="unit-card" style="${accent(ui)}">
              <div class="band"></div>
              <div class="body">
                <div class="unit-head">
                  <div class="unit-icon">${u.icon || "📘"}</div>
                  <div><div class="unit-num">${esc(u.num)} ${label(subject)}</div><h2 class="unit-title">${esc(u.title)}</h2></div>
                </div>
                <ul class="lesson-list">${lessons}</ul>
                <a class="unit-go" href="#/${subject.id}/${ui + 1}/1">${label(subject)} 들어가기 →</a>
              </div>
            </div>`;
          })
          .join("") +
        "</section>";
    }
    app.innerHTML = `
      <section class="hero">
        <div class="chip">${esc(chip)}</div>
        <h1><span class="hl">${esc(subject.name)}</span></h1>
        <p>${esc(SITE.subtitle)}</p>
      </section>${body}`;
  }

  /* ---------- 카드 3종 ---------- */
  function lectureCard(x) {
    const ok = !!x.url;
    const tags = [x.blanks ? `빈칸 ${esc(x.blanks)}` : "", x.video ? "🎬 영상 포함" : ""].filter(Boolean).map((t) => `<span class="tag">${t}</span>`).join("");
    const foot = ok
      ? `<a href="${esc(x.url)}" target="_blank" rel="noopener">강의 열기 →</a>` + (isExternal(x.url) ? "" : `<a href="${esc(reviewUrl(x.url))}" target="_blank" rel="noopener">학생 복습판 →</a>`)
      : "준비 중";
    return `<div class="card lecture ${ok ? "" : "not-ready"}">
      <div class="cover board">${esc(x.question || x.title)}</div>
      <div class="card-body">
        <p class="card-title">${esc(x.title)}</p>
        <p class="card-desc">${esc(x.desc)}</p>
        ${tags ? `<div class="tags">${tags}</div>` : ""}
        <div class="card-foot">${foot}</div>
      </div>
    </div>`;
  }

  function noteCard(x) {
    const ok = !!x.url;
    const foot = ok ? `<a href="${esc(x.url)}" target="_blank" rel="noopener">노트 열기 →</a>` + (x.pdf ? `<a href="${esc(x.pdf)}" target="_blank" rel="noopener">PDF ↓</a>` : "") : "준비 중";
    return `<div class="card note ${ok ? "" : "not-ready"}">
      <div class="cover grid"><span>${esc(x.title)}</span></div>
      <div class="card-body">
        <p class="card-title">${esc(x.title)}</p>
        <p class="card-desc">${esc(x.desc)}</p>
        <div class="card-foot">${foot}</div>
      </div>
    </div>`;
  }

  function appCard(x) {
    const ok = !!x.url;
    const foot = ok ? `<a href="${esc(x.url)}" target="_blank" rel="noopener">웹앱 열기 →</a>` : "준비 중";
    return `<div class="card app ${ok ? "" : "not-ready"}">
      <div class="cover applike">${x.icon || "💻"}</div>
      <div class="card-body">
        <p class="card-title">${esc(x.title)}</p>
        <p class="card-desc">${esc(x.desc)}</p>
        <div class="card-foot">${foot}</div>
      </div>
    </div>`;
  }

  function section(kind, icon, name, sub, items, make) {
    const body = items.length
      ? `<div class="card-grid">${items.map(make).join("")}</div>`
      : `<div class="empty">아직 ${name} 자료가 없어요. <b>data.js</b>에 추가하면 여기에 나타나요.</div>`;
    return `<div class="section ${kind}">
      <div class="section-head"><h2>${icon} ${name}</h2><span class="pill">${items.length}개</span><span class="section-sub">${sub}</span></div>
      ${body}
    </div>`;
  }

  /* ---------- 소단원 페이지 ---------- */
  function renderLesson(subject, ui, li) {
    const u = subject.units[ui];
    const lesson = u.lessons[li];
    const base = `#/${subject.id}`;
    setCrumbs([
      { text: subject.name, href: base },
      { text: `${u.num}. ${u.title}`, href: `${base}/${ui + 1}/1` },
      { text: lesson.title },
    ]);

    const tabs = u.lessons
      .map((l, i) => `<a class="tab ${i === li ? "active" : ""}" href="${base}/${ui + 1}/${i + 1}"><span class="no">${i + 1}</span>${esc(l.title)}</a>`)
      .join("");

    const prev = li > 0 ? `<a class="btn" href="${base}/${ui + 1}/${li}">← ${esc(u.lessons[li - 1].title)}</a>` : `<a class="btn" href="${base}">← ${esc(subject.name)} 처음으로</a>`;
    const next =
      li < u.lessons.length - 1
        ? `<a class="btn" href="${base}/${ui + 1}/${li + 2}">${esc(u.lessons[li + 1].title)} →</a>`
        : ui < subject.units.length - 1
        ? `<a class="btn" href="${base}/${ui + 2}/1">다음 ${label(subject)}: ${esc(subject.units[ui + 1].title)} →</a>`
        : "<span></span>";

    app.innerHTML = `
      <div style="${accent(ui)}">
        <div class="unit-banner">
          <div class="unit-icon">${u.icon || "📘"}</div>
          <div><div class="unit-num">${esc(u.num)} ${label(subject)}</div><h1>${esc(u.title)}</h1></div>
        </div>
        <nav class="tabs">${tabs}</nav>
        <div class="panel">
          ${section("lecture", "📺", "칠판 강의", "수업 시간 · 학습지 빈칸과 함께", lesson.lectures || [], lectureCard)}
          ${section("note", "✏️", "손글씨 노트", "복습 · 영상 녹화용", lesson.notes || [], noteCard)}
          ${section("app", "💻", "웹앱", "탐구 · 실습", lesson.apps || [], appCard)}
        </div>
        <div class="lesson-nav">${prev}${next}</div>
      </div>`;
  }

  /* ---------- 주소(#/과목/대단원/소단원)에 따라 화면 바꾸기 ---------- */
  function route() {
    const p = location.hash.replace(/^#\/?/, "").split("/").filter(Boolean);
    const subject = SUBJECTS.find((s) => s.id === p[0]) || SUBJECTS[0];
    const ui = parseInt(p[1], 10) - 1;
    const li = parseInt(p[2], 10) - 1 || 0;
    renderSidebar(subject);
    if (p.length >= 2 && subject.units[ui] && subject.units[ui].lessons[li]) renderLesson(subject, ui, li);
    else renderSubject(subject);
    window.scrollTo(0, 0);
  }

  window.addEventListener("hashchange", route);
  route();
})();
