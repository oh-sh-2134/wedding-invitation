// 나중에 실제 정보로 바꿀 때는 이 파일만 수정하면 됩니다.
export const wedding = {
  groom: {
    name: "김도윤", parents: "김민수 · 박지영", phone: "01012345678",
    bank: "하나은행", account: "123-456789-01234", accountHolder: "김도윤",
  },
  bride: {
    name: "이서연", parents: "이정호 · 최미경", phone: "01087654321",
    bank: "국민은행", account: "012345-67-890123", accountHolder: "이서연",
  },
  date: {
    display: "2027. 05. 15. SAT. 1:00 PM", year: 2027, month: 5, day: 15,
    weekday: "토요일", time: "오후 1시", countdownLabel: "D-298",
  },
  message: "서로의 가장 좋은 친구로 지내온 두 사람이\n이제 같은 방향을 바라보며 걸어가려 합니다.\n저희의 첫걸음에 귀한 시간을 내어 함께해 주시면\n더없는 기쁨으로 간직하겠습니다.",
  venue: {
    name: "라온제나 웨딩홀", hall: "3층 그랜드홀", address: "서울특별시 강남구 테헤란로 123",
    mapUrl: "https://map.naver.com/",
  },
  transport: [
    { title: "지하철", description: "2호선 역삼역 3번 출구에서 도보 5분" },
    { title: "버스", description: "역삼역 정류장 하차, 도보 3분" },
    { title: "주차", description: "건물 지하 주차장 2시간 무료 이용 가능" },
  ],
  photos: {
    cover: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=82",
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=82",
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=82",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=900&q=82",
      "https://images.unsplash.com/photo-1496196614460-48988a57fccf?auto=format&fit=crop&w=900&q=82",
    ],
  },
  calendar: {
    weekdays: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"],
    days: ["", "", "", "", "", "", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
  },
  share: { title: "김도윤 ♥ 이서연 결혼합니다", description: "2027년 5월 15일 토요일 오후 1시" },
} as const;
