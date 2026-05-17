export type Experience = {
  company: string;
  role: string;
  period: string;
  duration: string;
  description: string;
  details: string[];
};

export type Certification = {
  name: string;
  issuer: string;
  date: string;
};

export const experiences: Experience[] = [
  {
    company: "한국전력공사",
    role: "백엔드 개발 인턴",
    period: "2024.xx ~ 2024.xx",
    duration: "약 2개월",
    description: "Bio-Pay 생체 인증 결제 시스템 백엔드 개발",
    details: [
      "PalmSecure 기반 손바닥 정맥 인식 결제 시스템에서 백엔드 결제 흐름 담당",
      "Toss Payments API 연동 구현",
      "중복 결제 방지를 위한 멱등성(Idempotency) 처리",
      "PENDING / SUCCESS / FAILED 결제 상태 관리",
      "결제 전 과정 로그 추적 구조 설계 및 구현",
    ],
  },
];

export const certifications: Certification[] = [
  {
    name: "SQLD (SQL 개발자)",
    issuer: "한국데이터산업진흥원",
    date: "2025.xx.xx",
  },
];
