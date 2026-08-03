import type { Dict } from "./en";

export const ko: Dict = {
  meta: {
    title: "아흐마드 홀무로도프 — 풀스택 & WebOps 엔지니어",
    description:
      "한국에서 활동하는 풀스택 & WebOps 엔지니어. Next.js, React Native, Python으로 실서비스 웹 플랫폼을 구축하고 운영하며, 공격자의 관점으로 제 코드를 먼저 점검합니다.",
  },

  nav: {
    home: "홈",
    about: "소개",
    stack: "기술",
    work: "경력",
    projects: "프로젝트",
    security: "보안",
    contact: "연락처",
    resume: "이력서",
  },

  hero: {
    available: "새로운 기회를 찾고 있습니다",
    role: "풀스택 & WebOps 엔지니어",
    tagline: "웹 제품을 처음부터 끝까지 만들고, 계속 살아 있게 운영합니다.",
    intro:
      "한국에서 3년간 실서비스 플랫폼을 담당했습니다. 프런트는 Next.js, 뒤에는 Node와 Python, 그 아래에는 Linux와 Docker — 그리고 그 전체를 공격자의 체크리스트로 다시 봅니다.",
    ctaWork: "작업 보기",
    ctaContact: "연락하기",
    scroll: "스크롤",
    stats: [
      { value: "3년+", label: "실서비스 경력" },
      { value: "99.9%", label: "lowshop.net 가동률" },
      { value: "100배", label: "비전 API 비용 절감" },
      { value: "3개", label: "구사 언어" },
    ],
  },

  about: {
    eyebrow: "01 · 소개",
    title: "저에 대해",
    lead: "웹 제품을 처음부터 끝까지 만들고 운영합니다.",
    body: [
      "개발의 출발점은 대학교 클라우드 컴퓨팅 연구실이었습니다. 자율주행 차량 관제 프로토타입을 Flutter에서 React + TypeScript로 다시 만들면서, 편한 아키텍처가 아니라 맞는 아키텍처를 골라야 한다는 걸 처음 배웠습니다.",
      "현재 삼부에서는 회사의 이커머스 플랫폼을 첫 컴포넌트부터 서버 가동률까지 직접 책임지고 있으며, 개인 제품도 계속 출시하고 있습니다. 개발과 함께 애플리케이션 보안 — OWASP Top 10, 모의 해킹, 버그 바운티 — 도 꾸준히 연습합니다. 제 코드의 구멍은 제가 먼저 찾는 편이 낫기 때문입니다.",
      "한국어, 영어, 우즈베크어로 일하며, 깔끔한 인터페이스와 멈추면 안 되는 시스템 사이에 있는 문제를 좋아합니다.",
    ],
    facts: [
      { label: "거주지", value: "대구 · 경산, 대한민국" },
      { label: "경력", value: "3년 이상, 실서비스 웹 플랫폼" },
      { label: "주력", value: "Next.js · Node · TypeScript · WebOps" },
      { label: "그 외", value: "애플리케이션 보안 & 버그 바운티" },
      { label: "학력", value: "대구대학교 — 소프트웨어공학" },
      { label: "체류 자격", value: "E-7 비자 보유" },
    ],
    photoCaption: "대한민국 대구",
  },

  stack: {
    eyebrow: "02 · 역량",
    title: "기술 스택",
    lead: "시스템에서 차지하는 위치별로 정리한, 제가 실제로 쓰는 도구들입니다.",
    groups: {
      frontend: "프런트엔드",
      backend: "백엔드",
      data: "데이터베이스",
      devops: "데브옵스",
      security: "보안",
      practice: "일하는 방식",
    },
  },

  experience: {
    eyebrow: "03 · 경력",
    title: "업무 경험",
    lead: "다른 사람이 의존하는 실제 시스템을 직접 책임졌던 두 곳입니다.",
    present: "현재",
    roles: {
      sambu: {
        company: "㈜삼부",
        role: "풀스택 & WebOps 엔지니어",
        location: "대한민국 경산",
        context: "자체 D2C 채널을 운영하는 제조·유통 기업",
        bullets: [
          "회사 공식 이커머스 플랫폼 lowshop.net을 설계·구축하고 운영하며, 프런트엔드 구현부터 서버 운영까지 전체 라이프사이클을 담당했습니다.",
          "쿠팡, 네이버 스마트스토어, 토스 등 국내 주요 커머스 채널에 스토어를 오픈하고 운영했습니다. 사업자 프로필 설정, 스토어 구축, 판매 시스템 관리를 포함합니다.",
          "가동률 99.9%를 유지하고 페이지 로드 시간을 60% 단축했으며, 전 판매 채널에서 치명적 다운타임 0건을 기록했습니다.",
          "결제 및 데이터 동기화 워크플로를 최적화해 온라인 판매 파이프라인이 수동 개입 없이 돌아가도록 만들었습니다.",
        ],
      },
      ccl: {
        company: "대구대학교 클라우드 컴퓨팅 연구실",
        role: "프런트엔드 / 풀스택 개발자",
        location: "대한민국 대구",
        context: "대학 연구실",
        bullets: [
          "자율주행 차량의 원격 제어 및 텔레메트리 모니터링을 위한 웹/앱 프로토타입을 개발했습니다.",
          "기존 Flutter 코드베이스에서 ReactJS + TypeScript로의 전면 마이그레이션을 제안하고 주도해, 프로토타입을 막고 있던 모바일 렌더링 및 호환성 문제를 해결했습니다.",
          "Node.js 백엔드 개발자와 함께 마이그레이션을 마감보다 앞당겨 완료했으며, 반응형 UI와 REST 데이터 동기화를 담당했습니다.",
          "팀 워크플로 안에서 GitLab과 GitHub의 버전 관리 및 코드 리뷰를 맡았습니다.",
        ],
      },
    },
  },

  projects: {
    eyebrow: "04 · 주요 작업",
    title: "프로젝트",
    lead: "빈 저장소에서 시작해 실제로 사람들이 쓰는 것까지 만든 세 가지입니다.",
    viewLive: "사이트 방문",
    privateRepo: "비공개 저장소",
    caseStudy: "자세히 보기",
    featuresTitle: "주요 기능",
    shotsTitle: "실제로 동작하는 제품",
    close: "닫기",
    journey: {
      hint: "계속 스크롤하세요",
      beats: {
        eyaqin: [
          "동네 피드",
          "지도 위 반경 검색",
          "구매자와 판매자의 대화",
          "매물 상태가 바뀝니다",
        ],
        smartguard: [
          "문을 닫은 뒤의 가게",
          "카메라가 대상을 포착합니다",
          "하루가 한 장의 종이가 됩니다",
          "사람이 최종 확인합니다",
        ],
        eyaqinMobile: [
          "같은 피드를 손안에서",
          "핀, 그리고 끌어올리는 시트",
          "푸시로 도착하는 채팅",
          "아홉 개의 팔레트, 하나는 당신 것",
        ],
      },
    },
    items: {
      eyaqin: {
        name: "eYaqin",
        subtitle: "위치 기반 C2C 중고 마켓플레이스",
        status: "운영 중",
        summary:
          "동네를 우선하는 중고 거래 플랫폼입니다. 전국 단위 피드 대신 실제 거리 — 행정구역과 반경 — 을 기준으로 매물을 정렬하고 걸러서, 거래가 걸어갈 수 있는 거리 안에서 이뤄지게 합니다.",
        role: "스키마 설계, API 구성, 실시간 채팅, 신고·관리 도구, 배포까지 혼자 만든 풀스택 프로젝트입니다.",
        highlights: [
          { value: "1인", label: "풀스택 개발" },
          { value: "5단계", label: "매물 상태 흐름" },
          { value: "실시간", label: "구매자–판매자 채팅" },
        ],
        features: [
          { title: "위치 기반 탐색", body: "행정구역과 반경 기준 검색 및 필터링." },
          { title: "매물 라이프사이클", body: "판매 중부터 거래 완료까지 명시적인 상태." },
          { title: "실시간 채팅", body: "읽음 표시를 포함한 구매자–판매자 메시지." },
          { title: "신뢰와 안전", body: "신고 접수와 중재 워크플로." },
          { title: "참여 기능", body: "찜, 저장한 매물, 주변 발견 피드." },
          { title: "인증과 계정", body: "세션 처리와 프로필 관리." },
        ],
        deepDive: {
          title: "매물 상태 설계",
          body: "모든 매물이 명시적인 상태를 거치기 때문에, 양쪽 모두 거래가 어디까지 왔는지 알 수 있고 중재도 한 곳에서만 개입하면 됩니다.",
          states: {
            active: "등록되어 동네 검색에 노출",
            reserved: "구매 합의 완료, 물품 보류",
            escrow_verification: "결제 예치 및 확인 중",
            sold: "거래 완료",
            hidden: "철회 또는 중재로 비공개",
          },
          whyTitle: "왜 불리언이 아니라 상태인가",
          why: [
            "is_sold 같은 불리언 하나로는 보류된 물품, 분쟁 중인 결제, 삭제된 매물을 표현할 수 없습니다.",
            "상태 전이는 서버에서 검증하므로, UI가 불가능한 상태를 만들어낼 수 없습니다.",
          ],
        },
        architecture: [
          {
            title: "프런트엔드",
            body: "React 19와 TypeScript 기반 Next.js App Router. 클라이언트 상태는 Zustand, 스타일은 Tailwind, 매물 페이지는 서버 컴포넌트로 처리합니다.",
          },
          {
            title: "백엔드와 데이터",
            body: "Prisma를 통해 PostgreSQL(Neon)에 접근하는 라우트 핸들러. API는 인증, 매물, 참여, 주변 탐색으로 나눠 구성했습니다.",
          },
          {
            title: "배포",
            body: "브랜치별 프리뷰 빌드와 함께 Vercel에 배포했고, 스키마 마이그레이션 안전을 위해 환경별로 DB 브랜치를 분리했습니다.",
          },
        ],
        nextTitle: "다음에 할 일",
        next: [
          "이미지 저장소를 서명된 URL 기반 오브젝트 스토리지로 이전.",
          "규모가 커져도 반경 쿼리가 빠르도록 검색 인덱싱 추가.",
        ],
      },

      smartguard: {
        name: "SmartGuard",
        subtitle: "AI 기반 CCTV 관제 · SuniyKoz",
        status: "소매점 실운영 중",
        summary:
          "소규모 매장은 도난으로 재고를 잃고, CCTV를 되감아 보느라 시간을 낭비합니다. SmartGuard는 IP 카메라를 Claude Vision에 연결해 의심 행동을 자동 감지하고, 스냅샷과 함께 텔레그램으로 즉시 알림을 보냅니다.",
        role: "멀티스레드 카메라 파이프라인, AI 라우팅 로직, 웹 UI를 포함해 플랫폼 전체를 혼자 설계·구현했습니다.",
        highlights: [
          { value: "100배", label: "VLM API 비용 절감" },
          { value: "1초 이내", label: "알림 생성" },
          { value: "24/7", label: "멀티스레드 워커" },
        ],
        shots: [
          {
            alt: "SmartGuard 랜딩 페이지: 밤의 3D 편의점을 KAM-03 카메라로 본 화면, 통로의 사람을 추적하는 감지 박스",
            caption: "랜딩 페이지는 방문자를 카메라 뒤에 세웁니다 — 스크롤하며 걸어 들어가는 실시간 3D 매장, 그리고 대상을 포착하는 감지기.",
          },
          {
            alt: "차가운 종이 질감 위에 놓인 SmartGuard 기능 섹션, 8:00부터 23:00까지의 눈금에 두 건의 이벤트가 표시된 하루 스트립",
            caption: "그 아래에는 제품 전체가 따르는 디자인 시스템이 있습니다: 종이 질감, 단 하나의 형광 강조색, 그리고 한 줄로 압축된 하루.",
          },
        ],
        features: [
          { title: "엣지/클라우드 하이브리드", body: "로컬 OpenCV 모션 감지가 일상적인 프레임을 먼저 걸러냅니다." },
          { title: "선별적 VLM 라우팅", body: "핵심 프레임만 Claude Vision에 도달합니다 — 100배 절감의 핵심." },
          { title: "즉시 텔레그램 알림", body: "점주는 되감아 볼 타임라인 대신 스냅샷과 설명을 받습니다." },
          { title: "다중 카메라 워커", body: "카메라마다 독립 스레드로, 한 스트림이 죽어도 버팁니다." },
          { title: "이벤트 이력", body: "PostgreSQL에 감지 기록을 저장해 나중에 확인할 수 있습니다." },
          { title: "컨테이너 배포", body: "현장에 Docker로 배포해, 데브옵스 인력 없이도 운영됩니다." },
        ],
        deepDive: {
          title: "2단계 비전 파이프라인",
          body: "AI 관제 시스템에서 비싼 부분은 모델 호출입니다. 그래서 모델은 저렴한 로컬 필터를 이미 통과한 프레임만 봅니다.",
          steps: [
            { label: "IP 카메라", body: "매장 카메라별 상시 RTSP 스트림." },
            { label: "OpenCV 필터", body: "로컬 모션 감지가 일상 프레임을 버립니다." },
            { label: "프레임 라우터", body: "후보 핵심 프레임만 상위로 올립니다." },
            { label: "Claude Vision", body: "장면을 설명하고 의심도를 분류합니다." },
            { label: "텔레그램 알림", body: "스냅샷과 설명을 점주 휴대폰으로." },
          ],
          whyTitle: "왜 중요한가",
          why: [
            "모든 프레임을 VLM에 보내는 건 동네 가게에는 경제적으로 불가능합니다.",
            "로컬에서 걸러내 API 비용을 100배 이상 줄이면서도 1초 이내 알림을 유지했습니다.",
          ],
        },
        architecture: [
          {
            title: "엣지",
            body: "OpenCV 기반 Python 워커가 카메라당 한 스레드로 RTSP 디코딩과 모션 게이팅을 매장 자체 하드웨어에서 처리합니다.",
          },
          {
            title: "클라우드",
            body: "FastAPI 서비스가 후보 프레임을 Claude Vision으로 라우팅하고, 감지 결과를 PostgreSQL에 저장하며 텔레그램 알림을 발송합니다.",
          },
          {
            title: "인터페이스",
            body: "카메라 상태, 감지 이력, 알림 설정을 위한 React 18 대시보드. 전체 스택을 Docker 컨테이너로 배포합니다.",
          },
        ],
        nextTitle: "다음에 할 일",
        next: [
          "네트워크 호출 전에 1차 분류를 수행하는 온디바이스 모델 도입.",
          "매장 구조와 유동 인구에 맞춰 민감도를 조정하는 매장별 튜닝.",
        ],
      },

      eyaqinMobile: {
        name: "eYaqin Mobile",
        subtitle: "크로스 플랫폼 네이티브 앱 · React Native",
        status: "개발 진행 중",
        summary:
          "eYaqin의 네이티브 클라이언트입니다. 중고 거래는 결국 휴대폰에서, 그리고 모르는 사람 사이에서 일어납니다 — 그래서 업로드 속도와 신뢰가 모두 앱 안에 있어야 했습니다.",
        role: "Expo 기반 React Native로 구축했고, 웹과 REST/WebSocket 백엔드 및 Prisma 스키마를 공유합니다.",
        highlights: [
          { value: "Expo 54", label: "SDK / Router v6" },
          { value: "공유", label: "타입 지정 API 레이어" },
          { value: "네이티브", label: "카메라, 푸시, 위치" },
        ],
        features: [
          { title: "카메라·갤러리 업로드", body: "카메라나 사진 보관함에서 바로 매물을 등록합니다." },
          { title: "매물 공유", body: "앱 밖의 사람에게도 매물을 보낼 수 있습니다." },
          { title: "실시간 채팅", body: "거래를 합의하는 동안 구매자–판매자 메시지." },
          { title: "동네 커뮤니티", body: "주민이 지역 요청을 올리고 근처 일감을 찾습니다." },
          { title: "매너 온도", body: "거래 이력을 눈에 보이게 만드는 평판 점수." },
          { title: "후기 기반 거래 완료", body: "후기를 작성해야 판매가 최종 확정됩니다." },
        ],
        deepDive: {
          title: "보이게 만든 신뢰",
          body: "직접 만나 거래하는 낯선 사람들에게는 서로를 믿을 근거가 필요합니다. 두 가지 장치가 그 역할을 합니다.",
          steps: [
            { label: "매너 온도", body: "모든 프로필에 누적되는 평판 점수." },
            { label: "후기 게이트", body: "상대가 후기를 쓸 때까지 거래는 닫히지 않습니다." },
            { label: "신고", body: "어떤 매물이나 사용자든 중재로 올릴 수 있습니다." },
            { label: "피드백 채널", body: "앱 내 구조화된 기능 요청 — 곧바로 제품 리서치." },
          ],
          whyTitle: "왜 거래 완료에 후기를 거는가",
          why: [
            "후기가 선택이면 화난 사용자만 쓰게 되고, 점수는 의미를 잃습니다.",
            "완료를 후기에 걸어두면 평판 신호가 촘촘하고 정직하게 유지됩니다.",
          ],
        },
        architecture: [
          {
            title: "앱",
            body: "Expo SDK 54와 Expo Router v6 기반 React Native. 부드러운 인터랙션은 Reanimated와 Moti로, 카메라·알림·위치·공유는 네이티브 모듈로 처리합니다.",
          },
          {
            title: "데이터",
            body: "타입이 지정된 REST 엔드포인트 위의 TanStack Query, 실시간 채팅 이벤트는 Socket.io, 데이터는 웹과 공유하는 중앙 Prisma 스키마로 관리되는 Supabase(PostgreSQL).",
          },
          {
            title: "배포",
            body: "OTA 업데이트를 포함한 Expo 빌드 파이프라인 — 앱스토어 심사를 기다리지 않고 수정 사항이 사용자에게 도달합니다.",
          },
        ],
        nextTitle: "다음에 할 일",
        next: [
          "연결이 나빠도 업로드를 잃지 않도록 오프라인 우선 매물 임시 저장.",
          "모바일 데이터 사용을 줄이기 위한 업로드 전 백그라운드 이미지 압축.",
        ],
      },
    },
  },

  security: {
    eyebrow: "05 · 스택 너머",
    title: "보안 실무",
    lead: "공격자의 체크리스트를 염두에 두고 개발합니다 — 훈련 플랫폼에서 연습하는 OWASP 항목이 곧 제 코드를 검토하는 기준입니다.",
    cards: [
      {
        tag: "HackerOne",
        title: "트리아지된 취약점 리포트",
        body: "실서비스 웹 애플리케이션에 대해 유효한 취약점 리포트를 제출했습니다. 벤더 보안팀이 기술적으로 검증하고 트리아지했으며, 중복으로 종료되었으나 유효성은 공식 확인되었습니다.",
      },
      {
        tag: "HTB & TryHackMe",
        title: "꾸준한 연습",
        body: "웹 애플리케이션 취약점 분석, 인프라 모의 해킹, OWASP Top 10 실습을 정기적으로 수행합니다.",
      },
      {
        tag: "자격증",
        title: "네트워크 및 무선 보안",
        body: "Secure Wireless LAN 7.6 Administrator — Fortinet Training Institute & ISC2 (2026). CISSP 도메인 중 통신 및 네트워크 보안 영역을 다룹니다.",
      },
    ],
    certsTitle: "자격증",
    languagesTitle: "언어",
    languageNames: { ko: "한국어", en: "영어", uz: "우즈베크어" },
    languageLevels: { ko: "고급", en: "고급", uz: "모국어" },
    awardsTitle: "터미널 밖에서",
    awards: [
      "전국 오픈 탁구 선수권 대회 — 1위 (2026)",
      "전국 오픈 탁구 선수권 대회 — 2위 (2024)",
      "탁구 챔피언스 리그 — 1위 (2024)",
    ],
  },

  contact: {
    eyebrow: "06 · 연락처",
    title: "이야기 나눠요",
    lead: "제가 팀에 어떻게 기여할 수 있을지 이야기 나누고 싶습니다.",
    emailCta: "메일 보내기",
    copied: "복사됨",
    copy: "이메일 복사",
    availability: "현재 한국 및 원격 근무의 풀스택, 프런트엔드, WebOps 포지션을 찾고 있습니다.",
  },

  footer: {
    built: "Next.js, React Three Fiber, Motion으로 제작했습니다.",
    rights: "All rights reserved.",
    backToTop: "맨 위로",
  },

  a11y: {
    theme: "밝은/어두운 모드 전환",
    languageSwitcher: "언어 변경",
    menu: "메뉴",
    closeMenu: "메뉴 닫기",
  },
};
