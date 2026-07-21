// 나중에 실제 정보로 바꿀 때는 이 파일만 수정하면 됩니다.
export const wedding = {
  // 카카오 Developers의 JavaScript 키를 입력하면 카카오톡 공유가 활성화됩니다.
  // 예: kakaoJavascriptKey: "1234567890abcdef1234567890abcdef"
  kakaoJavascriptKey: "af4bf52382ee539838bd5a5dcf901419",
  groom: {
    name: "오승현", parents: "김민수 · 박지영", phone: "01012345678",
    bank: "하나은행", account: "123-456789-01234", accountHolder: "오승현",
  },
  bride: {
    name: "이영미", parents: "이정호 · 최미경", phone: "01087654321",
    bank: "국민은행", account: "012345-67-890123", accountHolder: "이서연",
  },
  date: {
    iso: "2027-12-13T12:30:00+09:00",
    display: "2027. 12. 13. MON. 12:30 PM", year: 2027, month: 12, day: 13,
    weekday: "월요일", time: "오후 12시 30분",
  },
  message: "서로의 가장 좋은 친구로 지내온 두 사람이\n이제 같은 방향을 바라보며 걸어가려 합니다.\n저희의 첫걸음에 귀한 시간을 내어 함께해 주시면\n더없는 기쁨으로 간직하겠습니다.",
  venue: {
    name: "JW웨딩컨벤션센터", hall: "5층 일루미아홀", address: "경남 김해시 김해대로 2520",
    mapUrl: "https://naver.me/FqWtu6oQ",
  },
  transport: [
    { title: "지하철", description: "2호선 역삼역 3번 출구에서 도보 5분" },
    { title: "버스", description: "역삼역 정류장 하차, 도보 3분" },
    { title: "주차", description: "건물 지하 주차장 2시간 무료 이용 가능" },
  ],
  photos: {
    // 실제 사진은 public/images/wedding 폴더에 넣고 아래처럼 지정하는 것을 권장합니다.
    // cover: "/images/wedding/cover.webp",
    // gallery: ["/images/wedding/gallery-01.webp", ...],
    cover: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=82",
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=82",
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=82",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=900&q=82",
      "https://images.unsplash.com/photo-1496196614460-48988a57fccf?auto=format&fit=crop&w=900&q=82",
    ],
  },
  share: { title: "오승현 ♥ 이영미 결혼합니다", description: "2027년 12월 13일 월요일 오후 12시 30분" },
} as const;
