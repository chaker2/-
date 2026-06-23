/* =========================================================
   Quran Diploma — static site
   Data is hand-curated from manual.pdf, program.pdf and
   extracted_links.txt (Arabic RTL).
   ========================================================= */

/* ---------- 1) NAVIGATION (single-page tabs) ---------- */
function showPage(id){
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const el = document.getElementById(id);
  if (el) el.classList.add('active');
  document.querySelectorAll('.main-nav a').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + id);
  });
  document.querySelector('.main-nav')?.classList.remove('open');
  window.scrollTo({top:0, behavior:'smooth'});
}
window.addEventListener('hashchange', () => {
  const id = location.hash.replace('#','') || 'home';
  showPage(id);
});
document.addEventListener('DOMContentLoaded', () => {
  const id = location.hash.replace('#','') || 'home';
  showPage(id);
  renderWeeks();
  renderVideos();
  renderAudio();
  renderForms();
  renderDrive();
});

/* ---------- 2) WEEKLY PROGRAM (from program.pdf) ---------- */
const weeks = [
  ["أركان المنهج النبوي في التعامل مع القرآن الكريم", "حلقات أطفالنا والقرآن (١-٥)", "—", "مقالة ١ (أخلص تتخلص) / مقالة ٢٩ (المصلي الذي ليس من أهل الصلاة)"],
  ["مدارسة حول قضية الهروب من الفهم", "حلقات أطفالنا والقرآن (٦-١٠)", "—", "مقالة ٩ (الأمر يستحق) / مقالة ١٥ (الجرعات الثلاث)"],
  ["كيف ننجز ختمات الفهم والوصايا والمحبة؟", "حلقات أطفالنا والقرآن (١١-١٥)", "—", "مقالة ٣٩ (بين التحفيظ والتنفيذ) / مقالة ٢ (أرجوك لا تكشفها)"],
  ["الترتيب التعليمي", "حلقات أطفالنا والقرآن (١٦-٢٠)", "سورة عمّ (النبأ)", "مقالة ٢٨ (المشهور غير المذكور)"],
  ["مدارسة سورة الفاتحة دراية", "حلقات أطفالنا والقرآن (٢١-٢٥)", "سورة النازعات", "مقالة ٢٤ (العلم والعمل.. ألم وأمل)"],
  ["مدارسة آية الكرسي دراية", "حلقات أطفالنا والقرآن (٢٦-٣٠)", "سورة عبس", "مقالة ٤٤ (حصوننا المنسية)"],
  ["مدارسة سورة الإخلاص دراية", "حلقات أطفالنا والقرآن (٣١-٣٥)", "سورة التكوير", "مقالة ٣٤ (إني أحبها)"],
  ["مدارسة سورة الفلق دراية", "حلقات أطفالنا والقرآن (٣٦-٤٠)", "سورة الانفطار", "مقالة ٤٥ (خديجة والغاسق)"],
  ["مدارسة سورة الناس دراية", "حلقات أطفالنا والقرآن (٤١-٤٥)", "سورة المطففين", "مقالة ١٦ (الحصن الحصين)"],
  ["مدارسة سورة الكافرون دراية", "حلقات أطفالنا والقرآن (٤٦-٥٠)", "سورة الانشقاق", "مقالة ١١ (البراءة بالقراءة)"],
  ["مدارسة خواتيم البقرة دراية", "حلقات أطفالنا والقرآن (٥١-٥٥)", "سورة البروج", "مقالة ٤٨ (دعوات لا ترنيمات)"],
  ["مدارسة سورة الأعلى دراية", "حلقات أطفالنا والقرآن (٥٦-٦٠)", "سورتا الطارق والأعلى", "مقالة ٢٢ (الصلاة والحياة)"],
  ["مدارسة سورة الغاشية دراية", "حلقات أطفالنا والقرآن (٦١-٦٥)", "سورة الغاشية", "مقالة ١٨ (الحملة القومية لمكافحة الفراغ)"],
  ["مدارسة سورة الملك دراية", "حلقات أطفالنا والقرآن (٦٦-٧٠)", "سورة الفجر", "مقالة ٧ (أعاجل المنية)"],
  ["مدارسة سورة الإنسان دراية", "حلقات أطفالنا والقرآن (٧١-٧٥)", "سورة البلد", "مقالة ٣ (أريد أن أموت ولكن)"],
  ["مدارسة سورة الحشر دراية", "حلقات أطفالنا والقرآن (٧٦-٨٠)", "سورتا الشمس والليل", "مقالة ٤١ (ترك الذنوب أهم)"],
  ["مدارسة سورة الصف دراية", "حلقات أطفالنا والقرآن (٨١-٨٥)", "سورتا الضحى والشرح", "مقالة ١٠ (الانشراح يطارد الهموم)"],
  ["مدارسة سورة الجمعة دراية", "حلقات أطفالنا والقرآن (٨٦-٩٠)", "سورتا القدر والبينة", "مقالة ٣١ (أمانة المظهر وأمانة الجوهر)"],
  ["مدارسة سورة التغابن دراية", "حلقات أطفالنا والقرآن (٩١-٩٥)", "سورتا التين والعلق", "مقالة ٣٣ (إنسان الإيمان وإنسان الخسران)"],
  ["مدارسة سورة المنافقون دراية", "حلقات أطفالنا والقرآن (٩٦-١٠٠)", "سورتا الزلزلة والعاديات", "مقالة ٦ (أشد حراً)"],
  ["مدارسة سورة الحديد دراية", "حلقات أطفالنا والقرآن (١٠١-١٠٥)", "سورتا القارعة والتكاثر", "مقالة ١٢ (البلسم القرآني)"],
  ["مدارسة سورة ق دراية", "حلقات أطفالنا والقرآن (١٠٦-١١٠)", "سور العصر والهمزة والفيل وقريش", "مقالة ٣٦ (أهل كوكب الإحسان)"],
  ["مدارسة سورة القمر دراية", "حلقات مهارات الفاتحة (١-٥)", "سور الماعون والكوثر والكافرون", "مقالة ٤٦ (الدعاء والحجاب والتدبر)"],
  ["مدارسة سورة السجدة دراية", "حلقات مهارات الفاتحة (٦-١٠)", "سور النصر والمسد والإخلاص والفلق والناس", "مقالة ٢٠ (سلامة الإيمان أم سلامة الأبدان)"],
];
const weekLabels = ["مدارسات وورش","محاضرات مرئية","ختمات دراية","مقالات بالوحي نحيا"];
const weekTagClasses = ["t1","t2","t3","t4"];
const arabicNum = n => n.toString().replace(/\d/g, d => "٠١٢٣٤٥٦٧٨٩"[d]);

function renderWeeks(){
  const wrap = document.getElementById('weeks-list');
  wrap.innerHTML = weeks.map((w, i) => `
    <div class="week-card">
      <h3><span class="num">${arabicNum(i+1)}</span> الأسبوع ${arabicNum(i+1)}</h3>
      ${w.map((cell, j) => `
        <div class="week-row">
          <span class="tag ${weekTagClasses[j]}">${weekLabels[j]}</span>
          <span>${cell}</span>
        </div>`).join('')}
    </div>`).join('');
}

/* ---------- 3) VIDEOS (from extracted_links.txt) ---------- */
const playlists = [
  { id:"PL7_Jp3gcxeGl0KFAJIaF17f1FT5quY7qp", title:"قائمة بالوحي نحيا — الرئيسية",
    desc:"قائمة تشغيل تضم محاضرات ومواد متنوعة من قناة بالوحي نحيا." },
  { id:"PL7_Jp3gcxeGk3Jl9ykLKDFSA9dLcLgT0E", title:"حلقات أطفالنا والقرآن",
    desc:"السلسلة المعتمدة في المحور المرئي للدبلومة." },
];

// All single video IDs extracted from the links file
const videos = [
  // playlist PL7_Jp3gcxeGk3Jl9ykLKDFSA9dLcLgT0E – ordered by index
  ["i60SU-AiBgE","حلقة ١ — مقدمة الدبلومة"],
  ["5upXZLC4GC4","حلقة ٢"],
  ["x0gOh4Pn5So","حلقة ٣"],
  ["9CjhUc1h590","حلقة ٤"],
  ["KTUWPWJNvYU","حلقة ٦"],
  ["wjZpBnTSgIk","حلقة ٧"],
  ["OkjtQELSyqY","حلقة ٨"],
  ["9XS6XlKiBhs","حلقة ٩"],
  ["i2cEc7Fkxxo","حلقة ١٠"],
  ["1RprMlKwC7w","حلقة ١١"],
  ["I7X1ffM5Su0","حلقة ١٢"],
  ["G2hFZYQcVmc","حلقة ١٣"],
  ["1SHz_9X42Os","حلقة ١٤"],
  ["5fKoT7LhAZE","حلقة ١٥"],
  ["PR1K-zAjAwQ","حلقة ١٦"],
  ["yBRVnTJJW8s","حلقة ١٧"],
  // youtu.be standalone
  ["hNr1JinBJJE","محاضرة إضافية ١"],
  ["5zOTUuukDTw","محاضرة إضافية ٢"],
  ["hsMQrrfQF9g","محاضرة إضافية ٣"],
  ["jZCQYc7ny3s","محاضرة إضافية ٤"],
];

function renderVideos(){
  document.getElementById('playlists').innerHTML = playlists.map(p => `
    <div class="card">
      <div class="video-thumb" style="background-image:url('https://i.ytimg.com/vi/${videos[0][0]}/hqdefault.jpg')"
           onclick="openVideo('https://www.youtube.com/embed/videoseries?list=${p.id}')"></div>
      <h3>${p.title}</h3>
      <p>${p.desc}</p>
      <div class="actions">
        <button class="btn primary" onclick="openVideo('https://www.youtube.com/embed/videoseries?list=${p.id}')">شغّل القائمة</button>
        <a class="btn ghost" target="_blank" href="https://www.youtube.com/playlist?list=${p.id}">فتح في يوتيوب</a>
      </div>
    </div>`).join('');

  document.getElementById('videos-list').innerHTML = videos.map(([id,title]) => `
    <div class="card">
      <div class="video-thumb" style="background-image:url('https://i.ytimg.com/vi/${id}/hqdefault.jpg')"
           onclick="openVideo('https://www.youtube.com/embed/${id}?autoplay=1')"></div>
      <h3>${title}</h3>
      <div class="actions">
        <button class="btn primary" onclick="openVideo('https://www.youtube.com/embed/${id}?autoplay=1')">تشغيل</button>
        <a class="btn ghost" target="_blank" href="https://www.youtube.com/watch?v=${id}">يوتيوب</a>
      </div>
    </div>`).join('');
}

/* ---------- 4) VIDEO MODAL ---------- */
function openVideo(src){
  let m = document.getElementById('video-modal');
  if(!m){
    m = document.createElement('div');
    m.id = 'video-modal'; m.className = 'modal';
    m.innerHTML = `<div class="modal-inner">
        <button class="modal-close" onclick="closeVideo()">✕</button>
        <iframe allow="autoplay; encrypted-media" allowfullscreen></iframe>
      </div>`;
    document.body.appendChild(m);
    m.addEventListener('click', e => { if(e.target === m) closeVideo(); });
  }
  m.querySelector('iframe').src = src;
  m.classList.add('open');
}
function closeVideo(){
  const m = document.getElementById('video-modal');
  if(!m) return;
  m.querySelector('iframe').src = '';
  m.classList.remove('open');
}

/* ---------- 5) AUDIO (SoundCloud) ---------- */
const audioTracks = [
  { url:"https://soundcloud.com/user-738639575/sets/4xhyeixgvclc", title:"مجموعة المحاضرات الصوتية", desc:"المجموعة الصوتية الكاملة على ساوند كلاود." },
  { url:"https://soundcloud.com/user-738639575/1-20", title:"الحلقات ١ - ٢٠", desc:"تجميعة الحلقات الأولى للدبلومة." },
  { url:"https://soundcloud.com/user-738639575/cgwjqhnyio1o", title:"محاضرة صوتية", desc:"مادة صوتية من حساب بالوحي نحيا." },
  { url:"https://soundcloud.com/user-738639575/kltobq0hnry0", title:"محاضرة صوتية", desc:"مادة صوتية من حساب بالوحي نحيا." },
];
function renderAudio(){
  document.getElementById('audio-list').innerHTML = audioTracks.map(t => `
    <div class="card">
      <h3>🎧 ${t.title}</h3>
      <p>${t.desc}</p>
      <iframe width="100%" height="120" scrolling="no" frameborder="no" allow="autoplay" style="border-radius:8px;margin-bottom:10px"
        src="https://w.soundcloud.com/player/?url=${encodeURIComponent(t.url)}&color=%230f6e57&auto_play=false&hide_related=true&show_comments=false&show_user=true"></iframe>
      <a class="btn ghost" target="_blank" href="${t.url}">فتح في ساوند كلاود</a>
    </div>`).join('');
}

/* ---------- 6) FORMS (Google Forms) ---------- */
const forms = [
  // single forms
  "https://docs.google.com/forms/d/e/1FAIpQLSd1ZzrtMkTZZowShkhWH4rCQbNq8ldkbEUk3-kEUOHlQecQgw/viewform",
  "https://docs.google.com/forms/d/e/1FAIpQLSe-UGv4bHJcPMrzwTWscFDraAkHvqOFyrCmkQALoCammTNaNA/viewform",
  "https://forms.gle/3frMoCnaRHRiLEFP6","https://forms.gle/ZwBm7kKC7XY7D81Y8","https://forms.gle/di7tg7iaPqmBmSy38","https://forms.gle/fSgVyG4Mi7biniHd9",
  "https://forms.gle/7sPtfeb5gMW2A5oCA","https://forms.gle/wtdrkyxbLF9uBA2t5","https://forms.gle/iF6cQ91HNd8h2fbh6","https://forms.gle/WodpFB5Jz1z6Thsu7",
  "https://forms.gle/9RNrUrah7of7Votn7","https://forms.gle/ChKygEaAvWdnLKHW9","https://forms.gle/DbJtRSgK8Nsp4RjFA","https://forms.gle/PU6XLyTmhXMNZDZKA",
  "https://forms.gle/aNA7a1jixH5JUEg79","https://forms.gle/fEjeHgcseUPNkMFF8","https://forms.gle/xmYHKRG1gGczPRUKA","https://forms.gle/i1vAajueXQnMJrJi7",
  "https://forms.gle/qFKYxfiqwAstuncR6","https://forms.gle/sRSx4RZTw6YZzRDG8","https://forms.gle/uar2GLvhBTKuZaeq8","https://forms.gle/BP8o6hF63ACaJmVc8",
  "https://forms.gle/NouZ5GCh9Q9xDvK97","https://forms.gle/yEEiUaEf5GbqjfNK7","https://forms.gle/yQxu2mZdoRbPrgLt6",
];
function renderForms(){
  document.getElementById('forms-list').innerHTML = forms.map((url, i) => `
    <div class="card">
      <h3>📝 استمارة رقم ${arabicNum(i+1)}</h3>
      <p>استمارة Google Forms لمتابعة الدارسين وتقييم المحاور.</p>
      <a class="btn primary" target="_blank" rel="noopener" href="${url}">فتح الاستمارة</a>
    </div>`).join('');
}

/* ---------- 7) GOOGLE DRIVE FILES ---------- */
const drive = [
  { id:"1AEzsPbcQdHo2DGn8dXxzdIjhOVWGjXAi", title:"ملف Google Drive ١" },
  { id:"1AFnupN7dfbJDg3knd8XcEu0P-wY5Xu6j", title:"ملف Google Drive ٢" },
];
function renderDrive(){
  document.getElementById('drive-list').innerHTML = drive.map(d => `
    <div class="card">
      <h3>📄 ${d.title}</h3>
      <p>ملف إضافي مستضاف على Google Drive.</p>
      <div class="actions">
        <a class="btn primary" target="_blank" href="https://drive.google.com/file/d/${d.id}/view">معاينة</a>
        <a class="btn ghost"   target="_blank" href="https://drive.google.com/uc?export=download&id=${d.id}">تحميل</a>
      </div>
    </div>`).join('');
}
