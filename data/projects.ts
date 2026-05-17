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
    tag: ["팀프로젝트", "Backend"],
    title: "AI 기반 쿠버네티스 모니터링 플랫폼",
    period: "2026.04 ~ 2026.10",
    status: "진행중",
    shortDescription:
      "Kubernetes 환경의 메트릭·로그·이벤트를 통합 수집하고 AI가 이상을 감지·분석하여 티켓 자동 생성 및 실시간 알람까지 수행하는 SaaS형 지능형 모니터링 플랫폼 (한이음 공모전)",
    description:
      "Prometheus/Loki/K8s API로 메트릭·로그·이벤트를 통합 수집하고, 룰 기반 1차 탐지 후 AI 서버(FastAPI)에서 Isolation Forest ML·RAG·GPT로 정밀 분석하여 원인 설명과 해결책을 자동 생성하는 플랫폼입니다. 탐지된 이상은 티켓으로 자동 생성되고 이메일·SSE로 실시간 알람됩니다. 한이음 공모전 출품 및 GitHub 오픈소스 공개를 목표로 진행 중입니다.",
    role: "Spring Boot 백엔드 전체 담당 (데이터 수집·룰 기반 탐지·AI 연동·티켓 자동화·SSE/이메일 알람·REST API) 및 React 프론트엔드 담당 (실시간 대시보드·티켓 UI·SSE 연동, Claude Code 활용)",
    techStack: [
      { name: "Java 17 / Spring Boot 3" },
      { name: "Spring Data JPA / PostgreSQL" },
      {
        name: "Redis",
        reason: "동일 이상 10분 내 중복 티켓 생성을 방지하기 위해 TTL 키로 관리",
      },
      { name: "Prometheus / Loki / K8s API", reason: "메트릭·로그·클러스터 이벤트를 각 소스에서 30초 주기로 통합 수집" },
      { name: "AWS SES / SSE" },
      { name: "React / Chart.js" },
      { name: "FastAPI (AI 서버, 팀원 담당)" },
    ],
    issues: [
      {
        issue: "AI 서버 장애 시 전체 탐지 흐름이 중단되는 문제",
        analysis:
          "AI 분석 요청이 타임아웃되거나 실패할 경우 티켓 생성 자체가 막히면 모니터링 핵심 기능이 중단됨",
        solution:
          "RestTemplate에 연결 3초·응답 10초 타임아웃 설정 후 try-catch로 AI 호출 실패를 감지, AI 없이도 룰 기반 결과만으로 티켓을 생성하는 fallback 흐름 구현",
        result: "AI 서버 장애와 무관하게 이상 감지·티켓 생성·알람 흐름 유지",
      },
      {
        issue: "30초 스케줄러가 반복 실행되며 동일 이상에 대해 티켓이 중복 생성됨",
        analysis:
          "스케줄러가 매 사이클마다 동일 Pod의 동일 이상을 새로 감지하므로 제한 없이 티켓이 누적됨",
        solution:
          "이상 감지 시 Redis에 'ticket:{podName}:{anomalyType}' 키를 10분 TTL로 저장하고, 키가 존재하면 티켓 생성을 건너뛰는 중복 방지 로직 추가",
        result: "동일 이상에 대해 10분 내 티켓 중복 생성 차단",
      },
      {
        issue: "다수 클라이언트의 SSE 연결을 서버에서 관리하고 이벤트를 브로드캐스트해야 하는 구조 필요",
        analysis:
          "SSE는 연결마다 별도 SseEmitter를 유지해야 하며, 타임아웃·에러 시 정리하지 않으면 메모리 누수 발생",
        solution:
          "ConcurrentHashMap으로 SseEmitter를 관리하고 onCompletion·onTimeout·onError 콜백에서 자동 제거, 이벤트 발생 시 전체 연결에 브로드캐스트",
        result: "다수 클라이언트 실시간 수신 및 연결 안정성 확보",
      },
    ],
    retrospective: {
      growth:
        "단일 서비스가 아닌 수집·탐지·AI·알람이 분리된 분산 구조에서 각 컴포넌트 장애 시나리오를 설계 단계부터 고려하는 경험을 쌓고 있음",
      regret:
        "아직 진행 중이라 전체 흐름을 실제 EKS 환경에서 검증하지 못했고, AI 분석 품질을 정량적으로 측정하는 방법을 충분히 고민하지 못함",
      future:
        "AWS EKS 실 환경 배포 및 ArgoCD 자동 배포 연동, 해결 이력을 Vector DB에 학습시켜 RAG 분석 품질을 지속 개선",
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
      { name: "PDFBox" },
      { name: "Tabula" },
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
