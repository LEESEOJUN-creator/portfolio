export type Experience = {
  company: string;
  role: string;
  period: string;
  details: string[];
};

export type Education = {
  school: string;
  departments: string[];
  period: string;
};

export type Certification = {
  name: string;
  issuer: string;
  date: string;
};

export const educations: Education[] = [
  {
    school: "동국대학교",
    departments: ["정보통신공학과"],
    period: "2021.03 ~ ",
  },
];

export const experiences: Experience[] = [
  {
    company: "한전엠씨에스 주식회사",
    role: "백엔드 개발 인턴",
    period: "2025.07.21 ~ 2025.08.29",
    details: [
      "PalmSecure 기반 손바닥 정맥 인식 결제 시스템 백엔드 담당",
      "Toss Payments API 연동 및 멱등성 처리로 중복 결제 방지",
      "PENDING / SUCCESS / FAILED 결제 상태 관리 구현",
      "결제 전 과정 로그 추적 구조 설계",
    ],
  },
];

export const certifications: Certification[] = [
  {
    name: "SQLD (SQL 개발자)",
    issuer: "한국데이터산업진흥원",
    date: "2025.12.12",
  },
];
