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

export type Activity = {
  name: string;
  description: string;
  role: string;
  period: string;
};

export const activities: Activity[] = [
  {
    name: "FARM SYSTEM",
    description: "동국대학교 개발 동아리 FARM SYSTEM 활동",
    role: "부원",
    period: "2025.03.10 ~ 2025.12.18",
  },
  {
    name: "학생회 홍보국",
    description: "정보통신공학과 학생회 홍보국원으로 활동",
    role: "홍보국 부원",
    period: "2025.03 ~ 2025.12",
  },
  {
    name: "학과 축구소모임 FC정통",
    description: "정보통신공학과 축구 소모임 부원으로 활동",
    role: "부원",
    period: "2024.03 ~ 2026.02",
  },
];

export const certifications: Certification[] = [
  {
    name: "SQLD (SQL 개발자)",
    issuer: "한국데이터산업진흥원",
    date: "2025.12.12",
  },
];
