export type Project = {
  slug: string;
  tag: string[];
  title: string;
  period: string;
  status: "완료" | "진행중";
  shortDescription: string;
  description: string;
  role: string;
  techStack: { name: string; reason?: string }[];
  issues: {
    issue: string;
    analysis?: string;
    solution: string;
    result: string;
  }[];
  retrospective: {
    growth: string;
    regret: string;
    future: string;
  };
  github?: string;
};

export const projects: Project[] = [
  {
    slug: "dgu-cap",
    tag: ["팀프로젝트", "Backend", "Frontend"],
    title: "AI 기반 쿠버네티스 모니터링 SaaS 플랫폼",
    period: "2026.03 ~ 2026.06",
    status: "완료",
    shortDescription:
      "Kubernetes 클러스터의 메트릭·로그·이벤트를 통합 수집하고 룰 기반 + 통계(z-score) + ML(Isolation Forest) 3중 이상탐지를 거쳐 RAG+LLM으로 원인을 분석, 티켓 자동 생성과 실시간 알림까지 수행하는 AIOps SaaS 플랫폼 (4인 팀)",
    description:
      "Kubernetes 클러스터의 메트릭·로그·이벤트를 실시간 수집하고, 룰 기반 1차 탐지 → 통계(z-score) → ML(Isolation Forest) 3중 이상탐지를 거친 데이터만 AI 서버로 전달해 RAG+LLM(GPT-4o-mini)으로 근본 원인과 해결책을 자연어로 분석하는 AIOps 플랫폼입니다. AI(1명)·인프라(1명)·배포·CI/CD(1명)와 함께한 4인 팀 프로젝트에서, 이상탐지부터 티켓 생성·알림까지 이어지는 백엔드 처리 계층과 Next.js 대시보드 프론트엔드 전체를 담당했습니다.",
    role:
      "Spring Boot 백엔드 처리 계층 담당 (이상탐지 엔진, AI 서버 연동 및 Fallback 설계, 티켓 생성·관리, SES 이메일·SSE 실시간 알림, REST API 설계, 약 50%). Next.js 프론트엔드 전체 담당 (대시보드, Pod/티켓 목록·상세, 메트릭 차트, SSE 실시간 연동, 약 40%) — Claude Code를 활용해 이슈·브랜치·PR·리뷰 워크플로를 자동화하며 개발. kind 로컬 클러스터 구성, Dockerfile 작성 등 인프라 일부도 보조.",
    techStack: [
      { name: "Java 17 / Spring Boot 3.4.5" },
      { name: "Spring Data JPA / Spring Data Redis" },
      { name: "PostgreSQL", reason: "메트릭 스냅샷, 티켓, 조치 이력 등 영구 데이터 저장" },
      {
        name: "Redis",
        reason: "동일 이상 10분 내 중복 티켓 생성을 방지하기 위해 TTL 키(ticket:{pod}:{type})로 관리",
      },
      { name: "Kubernetes client-java / Prometheus / Loki", reason: "메트릭·로그·클러스터 이벤트를 30초 주기로 통합 수집" },
      { name: "AWS SES / SSE" },
      { name: "Next.js 16 / React 19 / TypeScript" },
      { name: "TanStack Query v5 / Zustand v5", reason: "서버 상태는 TanStack Query로 캐시·자동갱신, SSE 알림 등 전역 UI 상태는 Zustand로 분리 관리" },
      { name: "Recharts" },
      { name: "FastAPI / Isolation Forest / ChromaDB / GPT-4o-mini (AI 서버, 팀원 담당)" },
    ],
    issues: [
      {
        issue: "AI 서버 장애 시 핵심 기능인 티켓 생성까지 함께 중단되는 문제",
        analysis:
          "모니터링 시스템이 AI 서버 장애로 같이 멈추면 본래 목적과 모순되며, LLM 호출 특성상 응답 지연·실패 가능성도 상시 존재함",
        solution:
          "RestTemplate에 연결 3초·응답 10초 타임아웃을 설정하고 try-catch로 AI 호출 실패를 감지, AI 없이도 severity=MEDIUM 기본 분석으로 단독 티켓을 생성하는 Fallback 흐름 구현",
        result: "AI 서버 장애와 무관하게 이상 감지부터 티켓 생성·알림까지 흐름이 끊기지 않음",
      },
      {
        issue: "30초 스케줄러가 반복 실행되며 동일 이상에 대해 티켓이 중복 생성됨",
        analysis:
          "스케줄러가 매 사이클마다 동일 Pod의 동일 이상을 새로 감지해 제한 없이 티켓이 누적됨",
        solution:
          "이상 감지 시 Redis에 'ticket:{podName}:{anomalyType}' 키를 10분 TTL로 저장하고, 키가 존재하면 생성을 건너뛰는 중복 방지 로직 추가. DB 조회 대신 Redis를 쓴 이유는 자동 만료(TTL) 기반 삭제가 필요하고 30초 주기 조회에 인메모리 캐시가 더 빠르기 때문",
        result: "동일 이상에 대한 10분 내 티켓 중복 생성 차단",
      },
      {
        issue: "다수 클라이언트의 SSE 연결을 동시성 문제 없이 관리하고 브로드캐스트해야 하는 구조 필요",
        analysis:
          "30초 스케줄러 스레드가 이벤트를 보내는 동시에 HTTP 스레드가 새 연결을 추가할 수 있어, 일반 ArrayList로는 ConcurrentModificationException 위험이 있고 끊어진 연결을 방치하면 메모리 누수로 이어짐",
        solution:
          "CopyOnWriteArrayList로 SseEmitter 목록을 관리해 동시 접근 문제를 해소하고, 전송 실패한 emitter는 dead 리스트에 모아 일괄 정리",
        result: "다수 클라이언트 환경에서 동시성 이슈 없는 안정적인 실시간 알림 전송",
      },
      {
        issue: "SSE 실시간성과 화면에 보이는 데이터의 정합성을 동시에 보장해야 하는 문제",
        analysis:
          "SSE로 받은 일부 데이터를 화면 상태에 직접 반영하면 서버의 전체 데이터와 어긋날 위험이 있음",
        solution:
          "SSE 이벤트 수신 시 TanStack Query의 invalidateQueries로 관련 쿼리를 stale 처리해 자동 refetch시키고, 알람 배너 같은 전역 UI 상태만 Zustand로 별도 관리하는 '폴링과 푸시를 결합한 동기화' 패턴 적용",
        result: "실시간 알림 즉시성과 대시보드 데이터 정합성을 동시에 확보",
      },
    ],
    retrospective: {
      growth:
        "외부 서비스(AI 서버) 장애에도 핵심 흐름이 죽지 않는 Fallback 설계, Redis를 캐시가 아닌 분산 상태 관리 도구로 활용하는 경험, SSE+TanStack Query 조합으로 실시간성과 데이터 정합성을 함께 satisfy하는 패턴을 백엔드·프론트엔드 양쪽에서 직접 설계하며 익혔습니다.",
      regret:
        "AI 서버 응답 지연(LLM 호출 특성)에 대한 타임아웃 값을 더 정교하게 튜닝하지 못했고, SSE 자동 재연결 로직의 모든 예외 케이스를 충분히 검증하지 못했습니다.",
      future:
        "EKS 운영 환경에서 실제 트래픽 기반 성능 측정, 알림 채널 다양화(Slack 연동 등), 해결 이력을 Vector DB에 누적 학습시켜 RAG 분석 품질을 지속 개선할 계획입니다.",
    },
    github: "https://github.com/DGU-CAP",
  },
  {
    slug: "k8s-cicd",
    tag: ["개인프로젝트", "Infra"],
    title: "Kubernetes CI/CD + GitOps",
    period: "2026.03 ~ 2026.03",
    status: "완료",
    shortDescription:
      "GitHub Actions와 ArgoCD를 활용해 코드 push부터 자동 배포까지 이어지는 GitOps CI/CD 파이프라인을 구성한 실습 프로젝트",
    description:
      "Kubernetes 환경에서 GitHub Actions와 ArgoCD를 활용해 코드 push부터 자동 배포까지 이어지는 GitOps CI/CD 파이프라인을 구성한 실습 프로젝트입니다.",
    role: "전체 구성 (개인 프로젝트)",
    techStack: [
      { name: "Docker" },
      { name: "Kubernetes" },
      {
        name: "GitHub Actions",
        reason: "main 브랜치 push 시 자동 빌드 트리거를 위해 선택",
      },
      {
        name: "ArgoCD",
        reason:
          "Git을 기준 상태로 두고 클러스터를 자동 동기화하는 GitOps 구현을 위해 선택",
      },
      {
        name: "Helm",
      },
      { name: "kind" },
    ],
    issues: [
      {
        issue: "latest 태그 사용 시 ArgoCD가 이미지 변경을 감지하지 못함",
        analysis:
          "manifest의 image 값이 바뀌지 않으면 ArgoCD는 변경 없음으로 판단",
        solution:
          "commit SHA 기반 이미지 태그 적용으로 매 배포마다 manifest 값 변경",
        result:
          "코드 push 시 자동으로 새 이미지가 빌드되고 배포까지 연결되는 흐름 완성",
      },
      {
        issue:
          "GitHub Actions가 manifest 수정 후 다시 push하면 CI가 무한 반복 실행됨",
        solution: "자동 커밋 메시지에 [skip ci] 추가로 불필요한 재실행 방지",
        result: "CI 무한 루프 문제 해결",
      },
    ],
    retrospective: {
      growth:
        "자동화를 단순히 연결하는 것이 아니라 변경 감지 방식과 반복 실행 문제까지 고려하며 구조를 설계하는 경험",
      regret:
        "로컬 kind 환경이라 실제 클라우드 환경(EKS 등)에서 LoadBalancer 타입 Service 동작을 직접 확인하지 못함",
      future: "실제 클라우드 환경에서 전체 흐름 적용해보기",
    },
  },
  {
    slug: "k8s-monitoring",
    tag: ["개인프로젝트", "Infra"],
    title: "Kubernetes 모니터링",
    period: "2026.03 ~ 2026.04",
    status: "완료",
    shortDescription:
      "Prometheus/Grafana/Loki 기반 모니터링 스택을 직접 구성한 실습 프로젝트",
    description:
      "Kubernetes 환경에서 Pod가 Running 상태인 것만으로는 실제 운영 상태를 알 수 없다는 한계를 느껴, Prometheus/Grafana/Loki 기반 모니터링 스택을 직접 구성한 실습 프로젝트입니다.",
    role: "전체 구성 (개인 프로젝트)",
    techStack: [
      { name: "Kubernetes" },
      {
        name: "Helm",
        reason:
          "Prometheus 스택처럼 복잡한 리소스를 패키지로 설치하고 설정을 일관되게 관리하기 위해 선택",
      },
      { name: "Prometheus" },
      { name: "Grafana" },
      {
        name: "Loki",
        reason:
          "메트릭만으로는 원인 추적이 어려워 로그도 함께 수집하기 위해 선택",
      },
    ],
    issues: [
      {
        issue: "Grafana Pod가 CrashLoopBackOff 상태 발생",
        analysis:
          "kubectl logs 확인 결과 datasource provisioning 과정에서 default datasource 중복 설정 오류 발견",
        solution:
          "Helm upgrade의 --set 옵션으로 중복 default datasource 설정 비활성화",
        result: "Grafana 정상 기동, Prometheus와 Loki datasource 연결 완료",
      },
    ],
    retrospective: {
      growth:
        "장애 상황에서 재설치보다 로그 분석으로 근본 원인을 찾는 접근 방식을 익힘",
      regret: "알림(Alert) 설정까지 연결하지 못함",
      future: "Alertmanager 연동으로 임계치 초과 시 알림 받는 구조 추가",
    },
  },
  {
    slug: "graduation-checker",
    tag: ["팀프로젝트", "Backend"],
    title: "AI 기반 졸업요건 자동 판정 시스템",
    period: "2025.09.08 ~ 2025.12.18",
    status: "완료",
    shortDescription:
      "성적표 PDF를 기반으로 이수 과목을 추출하고 졸업 가능 여부를 판단하는 서비스",
    description:
      "성적표 PDF를 기반으로 이수 과목을 추출하고 학번별 졸업요건과 비교해 졸업 가능 여부를 판단하는 서비스. Spring Boot 백엔드와 FastAPI AI 서버가 분리된 구조로 구성되었습니다.",
    role: "Spring Boot 백엔드 담당. PDF 파싱 및 데이터 정제, Draft 임시 저장 구조 설계, 졸업 판정 서비스 로직, N+1 문제 개선",
    techStack: [
      { name: "Java" },
      { name: "Spring Boot" },
      { name: "JPA" },
      { name: "MySQL" },
      { name: "FastAPI", reason: "AI 분석 기능을 분리된 외부 서버로 제공하는 AI 서버 (팀원 담당)" },
    ],
    issues: [
      {
        issue: "PDF 파싱 시 줄바꿈과 공백으로 과목명과 학점 데이터가 깨지는 문제",
        analysis: "PDFBox 텍스트 추출만으로는 표 구조를 정확히 인식하지 못함",
        solution:
          "Tabula의 SpreadsheetExtractionAlgorithm과 BasicExtractionAlgorithm을 함께 적용하고 normalize()로 특수 공백과 줄바꿈 정규화",
        result:
          "파싱 결과를 Draft로 임시 저장 후 사용자 확인·수정 뒤 최종 저장하는 흐름 구성",
      },
      {
        issue: "졸업 판정 로직에서 이수 과목 개별 조회 시 N+1 문제 발생",
        analysis: "SQL 로그 확인 결과 과목 수만큼 select 쿼리 반복 발생",
        solution:
          "판정에 필요한 데이터를 먼저 한 번에 조회하고 서비스 로직에서 메모리 비교 방식으로 변경",
        result: "반복 쿼리 감소, 응답 속도 개선",
      },
    ],
    retrospective: {
      growth: "입력 데이터 신뢰성 확보와 도메인 규칙 처리의 중요성을 실무적으로 이해",
      regret: "N+1 개선 전후 정확한 수치 측정을 하지 못함",
      future: "fetch join 또는 DTO Projection으로 쿼리 최적화 개선",
    },
  },
  {
    slug: "hidden-growth",
    tag: ["팀프로젝트", "Backend"],
    title: "Hidden Growth",
    period: "2025.11.22 ~ 2025.11.23",
    status: "완료",
    shortDescription:
      "사용자의 비정형 경험 데이터를 AI 인터뷰·분석을 통해 스킬, 성장 지표, 포트폴리오 데이터로 구조화하는 AI 기반 커리어 성장 자동화 플랫폼",
    description:
      "Spring Boot와 FastAPI 기반 AI 서버가 분리된 구조로 운영되는 AI 기반 개인 커리어 성장 자동화 플랫폼입니다. 사용자의 자유로운 경험 기록을 스킬·성장 지표·포트폴리오 데이터로 구조화하는 서비스에서 Spring Boot 백엔드를 담당했습니다.",
    role: "Spring Boot 백엔드 참여. Controller-Service-Repository 계층 구조 설계, DTO 기반 요청/응답 데이터 분리, AI 서버 연동 흐름 이해",
    techStack: [
      { name: "Java" },
      { name: "Spring Boot" },
      { name: "JPA" },
      { name: "MySQL" },
      {
        name: "FastAPI",
        reason: "AI 분석 기능을 분리된 외부 서버로 제공하는 AI 서버 (팀원 담당)",
      },
    ],
    issues: [
      {
        issue: "비정형 경험 데이터를 서비스 데이터로 변환하는 흐름 설계 필요",
        analysis:
          "사용자의 자유로운 문장 형태 경험 기록은 그대로는 서비스 데이터로 활용하기 어렵고, AI 분석 결과를 백엔드에서 도메인 데이터로 저장하는 구조 설계가 필요",
        solution:
          "AI 서버 응답을 DTO로 전달받아 스킬·성장 지표 도메인 데이터로 매핑·저장하는 백엔드 흐름 구현",
        result: "AI 결과와 백엔드 서비스 흐름이 연결되는 구조 이해 및 구현",
      },
      {
        issue: "외부 AI 서버 응답 지연 및 예상과 다른 응답 형식 처리",
        solution:
          "요청/응답 DTO 형식을 명확히 정의하고, 예외 상황에 대비한 백엔드 레이어 처리 구조 고려",
        result: "외부 API 연동 시 응답 형식 검증과 예외 처리의 중요성 경험",
      },
    ],
    retrospective: {
      growth:
        "AI 분석 결과 자체보다 그 결과를 어떤 DTO로 받아 어떤 도메인 데이터로 저장하고 제공할지가 백엔드 핵심이라는 점을 실감",
      regret: "외부 AI 서버와의 연동 부분을 더 직접적으로 구현하지 못함",
      future: "외부 API 연동, 응답 검증, 예외 처리 구조를 직접 설계하는 경험 쌓기",
    },
  },
  {
    slug: "spring-security-auth",
    tag: ["개인프로젝트", "Backend"],
    title: "Spring Security 인증 실습",
    period: "2025.06 ~ 2025.07",
    status: "완료",
    shortDescription:
      "JWT 인증, Redis Refresh Token 관리, 카카오 OAuth2 로그인 연동을 직접 구현한 인증 실습 프로젝트",
    description:
      "Spring Boot 기반으로 JWT 인증, Redis Refresh Token 관리, 카카오 OAuth2 로그인 연동을 직접 구현한 인증 실습 프로젝트입니다.",
    role: "전체 구성 (개인 프로젝트)",
    techStack: [
      { name: "Java" },
      { name: "Spring Boot" },
      { name: "Spring Security" },
      { name: "JWT" },
      {
        name: "Redis",
        reason:
          "Refresh Token 저장 시 DB 대비 빠른 조회와 TTL 자동 만료 처리를 위해 선택",
      },
      { name: "MySQL" },
      { name: "Kakao OAuth2" },
    ],
    issues: [
      {
        issue: "Refresh Token으로 API를 직접 호출하는 것을 막을 방법 필요",
        solution:
          "JWT payload에 type claim을 추가해 access/refresh 구분, 필터에서 type 검증",
        result: "Refresh Token으로 API 직접 호출 차단",
      },
      {
        issue: "로그아웃 후에도 Access Token이 만료 전까지 유효한 문제",
        analysis: "JWT는 stateless라 발급 후 서버가 추적하지 않음",
        solution:
          "Refresh Token을 Redis에서 삭제해 재발급 차단, Access Token 수명을 30분으로 짧게 설정",
        result: "재발급 경로 차단으로 사실상의 로그아웃 처리",
      },
    ],
    retrospective: {
      growth:
        "세션 방식과 토큰 방식의 구조적 차이와 각각의 trade-off를 직접 구현하며 이해",
      regret:
        "Access Token 블랙리스트 처리를 구현하지 못해 로그아웃 후 완전한 무효화가 안 됨",
      future: "Redis 블랙리스트로 Access Token도 즉시 무효화하는 구조 추가",
    },
  },
];
