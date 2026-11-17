/* =========================================================
   🧬 자료 목록 파일 — 선생님은 이 파일만 고치면 됩니다!
   ---------------------------------------------------------
   [구조]  과목 → 대단원(units) → 소단원(lessons) → 자료 3칸
           lectures (📺 칠판 강의) / notes (✏️ 손글씨 노트) / apps (💻 웹앱)

   ▶ 칠판 강의 추가: lectures: [ ... ] 안에 한 줄
      { title: "1차시 · 제목", desc: "한 줄 설명", url: "lectures/파일.html", blanks: "1~12", video: true },
        - blanks : 학습지 빈칸 번호 범위 (없으면 지워도 됨)
        - video  : 강의 안에 영상이 있으면 true (없으면 지워도 됨)
        - question : 카드 검은 칠판 부분에 보일 도입 질문 (없으면 제목이 보임)
                     예) question: "세포는 에너지를 어떻게 얻을까?",
        - 학생 복습판 링크(?s=1)는 자동으로 만들어집니다.

   ▶ 손글씨 노트 추가: notes: [ ... ] 안에 한 줄
      { title: "노트 제목", desc: "한 줄 설명", url: "notes/파일.html", pdf: "notes/파일.pdf" },
        - pdf 가 없으면 지워도 됨

   ▶ 웹앱 추가: apps: [ ... ] 안에 한 줄
      { title: "웹앱 제목", desc: "한 줄 설명", url: "apps/파일.html" },
        - 외부 사이트는 "https://..." 주소를 그대로 적기

   ▶ 과목 추가/삭제/이름 변경
      - 아래 { id: ..., name: ... } 덩어리 하나가 과목 하나입니다.
      - name 을 바꾸면 왼쪽 탭 이름이 바뀝니다.
      - group 을 "교과" 또는 "탐구 주제"로 적으면 왼쪽 메뉴 묶음이 정해집니다.
      - 파일 안의 순서 = 왼쪽 탭 순서
      - id 는 영어 소문자로, 과목끼리 겹치지 않게 (주소에 쓰입니다)

   ▶ 주의: 따옴표(" ")와 줄 끝 쉼표(,)가 지워지지 않게 해 주세요.
           url 을 비워 두면("") 카드에 '준비 중'으로 표시됩니다.
   ========================================================= */

const SITE = {
  title: "강쌤의 과학 실험실",
  subtitle: "칠판 강의로 배우고, 손글씨 노트로 복습하고, 웹앱으로 탐구해요.",
  author: "열정 강쌤",
};

const SUBJECTS = [
  /* ═══════════════════ 교과 ═══════════════════ */
  {
    id: "bio",
    name: "생명과학",
    group: "교과",
    curriculum: "2022 개정",
    icon: "🌿",
    units: [
      {
        num: "Ⅰ",
        title: "생명 시스템의 구성",
        icon: "🧬",
        lessons: [
          {
            title: "생명과학의 이해",
            lectures: [
              { title: "예시 — 1차시 강의 제목", desc: "학습지 빈칸과 맞춘 칠판 강의 화면이 들어갈 자리예요.", url: "", blanks: "1~12", video: true },
            ],
            notes: [
              { title: "예시 — 손글씨 노트 제목", desc: "한 줄씩 써지는 개념 정리 노트가 들어갈 자리예요.", url: "", pdf: "" },
            ],
            apps: [
              { title: "예시 — 웹앱 제목", desc: "탐구·실습용 웹앱이 들어갈 자리예요.", url: "" },
            ],
          },
          { title: "물질대사", lectures: [], notes: [], apps: [] },
          { title: "생태계", lectures: [], notes: [], apps: [] },
        ],
      },
      {
        num: "Ⅱ",
        title: "항상성과 몸의 조절",
        icon: "🫀",
        lessons: [
          { title: "자극에 대한 반응과 항상성", lectures: [], notes: [], apps: [] },
          { title: "인체의 면역반응", lectures: [], notes: [], apps: [] },
        ],
      },
      {
        num: "Ⅲ",
        title: "생명의 연속성과 다양성",
        icon: "🌱",
        lessons: [
          { title: "유전정보와 생식세포", lectures: [], notes: [], apps: [] },
          { title: "생물의 진화와 다양성", lectures: [], notes: [], apps: [] },
        ],
      },
    ],
  },

  {
    id: "cell",
    name: "세포와 물질대사",
    group: "교과",
    curriculum: "2022 개정",
    icon: "🔬",
    units: [], // ← 단원을 채워 주세요 (생명과학의 units 모양을 복사해서 쓰면 됩니다)
  },
  {
    id: "genetics",
    name: "생물의 유전",
    group: "교과",
    curriculum: "2022 개정",
    icon: "🧬",
    units: [],
  },
  {
    id: "fusion",
    name: "융합과학",
    group: "교과",
    curriculum: "",
    icon: "⚗️",
    units: [],
  },
  {
    id: "inquiry",
    name: "과학탐구실험",
    group: "교과",
    curriculum: "",
    icon: "🧪",
    units: [],
  },

  /* ═══════════════════ 탐구 주제 ═══════════════════ */
  {
    id: "bioinfo",
    name: "생물정보학",
    group: "탐구 주제",
    unitLabel: "주제", // 교과가 아니라서 '단원' 대신 '주제'로 표시
    icon: "🧫",
    units: [
      {
        num: "1",
        title: "서열 분석",
        icon: "🔤",
        lessons: [{ title: "NCBI와 BLAST", lectures: [], notes: [], apps: [] }],
      },
      {
        num: "2",
        title: "단백질 구조",
        icon: "🧩",
        lessons: [{ title: "AlphaFold로 구조 보기", lectures: [], notes: [], apps: [] }],
      },
      {
        num: "3",
        title: "계통수",
        icon: "🌳",
        lessons: [{ title: "분자 계통수 그리기", lectures: [], notes: [], apps: [] }],
      },
    ],
  },
  {
    id: "datasci",
    name: "데이터 과학",
    group: "탐구 주제",
    unitLabel: "주제",
    icon: "📊",
    units: [
      {
        num: "1",
        title: "데이터 수집",
        icon: "📥",
        lessons: [{ title: "공공데이터 찾기", lectures: [], notes: [], apps: [] }],
      },
      {
        num: "2",
        title: "시각화",
        icon: "📈",
        lessons: [{ title: "CODAP·스프레드시트 그래프", lectures: [], notes: [], apps: [] }],
      },
      {
        num: "3",
        title: "분석 도구",
        icon: "🛠️",
        lessons: [{ title: "Orange3 데이터 분석", lectures: [], notes: [], apps: [] }],
      },
    ],
  },
];
