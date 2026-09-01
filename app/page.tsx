"use client";

import { useEffect, useState } from "react";
import { wedding } from "./wedding-config";

declare global {
  interface Window {
    Kakao?: {
      init: (key: string) => void;
      isInitialized: () => boolean;
      Share?: { sendDefault: (options: unknown) => void };
      Link?: { sendDefault: (options: unknown) => void };
    };
  }
}

type KakaoSdk = NonNullable<Window["Kakao"]>;

const KAKAO_SDK_SRC = "https://t1.kakaocdn.net/kakao_js_sdk/v1/kakao.js";
let kakaoSdkPromise: Promise<KakaoSdk> | null = null;
const timelinePhoto = (fileName: string) =>
  `${import.meta.env.BASE_URL}images/wedding/${fileName}`;

const loadKakaoSdk = () => {
  if (window.Kakao) return Promise.resolve(window.Kakao);
  if (kakaoSdkPromise) return kakaoSdkPromise;

  kakaoSdkPromise = new Promise<KakaoSdk>((resolve, reject) => {
    const finish = () => {
      if (window.Kakao) resolve(window.Kakao);
      else reject(new Error("Kakao SDK is not available."));
    };
    const fail = () => reject(new Error("Failed to load Kakao SDK."));
    let existingScript = document.getElementById("kakao-sdk") as HTMLScriptElement | null;
    if (existingScript && existingScript.src !== KAKAO_SDK_SRC) {
      existingScript.remove();
      existingScript = null;
    }
    const script = existingScript ?? document.createElement("script");

    script.addEventListener("load", finish, { once: true });
    script.addEventListener("error", fail, { once: true });

    if (!existingScript) {
      script.id = "kakao-sdk";
      script.src = KAKAO_SDK_SRC;
      script.async = true;
      document.head.appendChild(script);
    }

    window.setTimeout(() => {
      if (window.Kakao) resolve(window.Kakao);
      else reject(new Error("Kakao SDK loading timed out."));
    }, 4000);
  }).catch((error) => {
    kakaoSdkPromise = null;
    throw error;
  });

  return kakaoSdkPromise;
};

const Icon = ({ name }: { name: "copy" | "phone" | "map" | "share" | "close" }) => {
  const paths = {
    copy: <><rect x="8" y="8" width="11" height="11" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/></>,
    phone: <path d="M6.6 3.5 9 7.8 6.9 9.4c1.1 2.4 3.2 4.5 5.6 5.6l1.6-2.1 4.4 2.4-.8 3.7c-.2.9-1 1.5-1.9 1.5C9 20 3.5 14.8 3.5 8.2c0-.9.6-1.7 1.5-1.9l1.6-2.8Z"/>,
    map: <><path d="M12 21s7-5.5 7-12a7 7 0 1 0-14 0c0 6.5 7 12 7 12Z"/><circle cx="12" cy="9" r="2.3"/></>,
    share: <><circle cx="18" cy="5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="19" r="2.5"/><path d="m8.2 10.8 7.6-4.4M8.2 13.2l7.6 4.4"/></>,
    close: <><path d="m5 5 14 14M19 5 5 19"/></>,
  };
  return <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">{paths[name]}</svg>;
};

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <header className="section-title"><h2>{children}</h2><i /></header>;
}

const TransportIcon = ({ name }: { name: string }) => {
  const icons: Record<string, React.ReactNode> = {
    자차: <><path d="M6 12.5h12l-1-4A2 2 0 0 0 15 7H9a2 2 0 0 0-2 1.5l-1 4Z"/><path d="M5.5 12.5v5h13v-5"/><path d="M8.5 10h7"/><circle cx="8.5" cy="15.5" r="1.1"/><circle cx="15.5" cy="15.5" r="1.1"/><path d="M6.5 18.5v1M17.5 18.5v1"/></>,
    경전철: <><rect x="6" y="4" width="12" height="13" rx="3"/><path d="M9 8h6M9 12h6M8 20l2-3M16 20l-2-3"/><circle cx="9" cy="15" r=".8"/><circle cx="15" cy="15" r=".8"/></>,
    버스: <><rect x="5.5" y="4.5" width="13" height="13.5" rx="2.5"/><path d="M8.5 4.5V3h7v1.5M8.5 8.5h7M8.5 11.5h7M7.8 14.5h1.4M14.8 14.5h1.4"/><circle cx="8.5" cy="18" r="1"/><circle cx="15.5" cy="18" r="1"/><path d="M6.5 20h2M15.5 20h2"/></>,
    주차: <><path d="M9 19V5h4.4a4.2 4.2 0 0 1 0 8.4H9"/><path d="M9 5h4.4"/></>,
  };

  return (
    <span className="transport-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24">{icons[name] ?? icons.자차}</svg>
    </span>
  );
};

const aboutUs = [
  {
    role: "신랑",
    name: "승현",
    headline: "오직 신부만을 연구하는 공대생",
    born: "1996년 4월 김해 출생",
    description: "묵묵하고 깊은 생각으로\n우리의 미래를 치밀하게 준비하는 INTJ",
    photo: wedding.photos.about.groom,
  },
  {
    role: "신부",
    name: "영미",
    headline: "신랑과 역사를 기록할 인문대생",
    born: "1996년 10월 상주 출생",
    description: "명확한 비전과 따뜻한 감성으로\n우리의 삶을 완성하는 ENTJ",
    photo: wedding.photos.about.bride,
  },
];

const timeline = [
  {
    tag: "17년 6월 15일, 경주",
    title: "🍻 첫 만남",
    description: "도서관 다녀온 뒤 술 한잔 기울이던\n가장 친한 캠퍼스 술 베프에서 연인으로",
    photo: timelinePhoto("timeline-01-v1.webp"),
    imageIndex: 0,
  },
  {
    tag: "18년 9월 17일",
    title: "🌸 꽃신 신은 날",
    description: "서로를 향한 믿음과 기다림 끝에\n더욱 단단하고 예쁜 사랑을 약속한 날",
    photo: timelinePhoto("timeline-02-v1.webp"),
    imageIndex: 1,
  },
  {
    tag: "19년~20년",
    title: "💼 각자의 자리에서 사회인으로서의 첫걸음",
    description: "학생 시절을 지나 서로의 분야에서 자리 잡기까지\n곁에서 가장 뜨겁게 응원해 준 든든한 페이스메이커",
    photo: timelinePhoto("timeline-03-v1.webp"),
    imageIndex: 2,
  },
  {
    tag: "3,469일의 시간",
    title: "🤍 함께해 온 날들",
    description: "함께 울고 웃으며 쌓아온 9년,\n서로에게 가장 든든한 존재가 되어준 시간",
    photo: timelinePhoto("timeline-04-v1.webp"),
    imageIndex: 3,
  },
  {
    tag: "26년 12월 13일, 김해",
    title: "👰🤵 웨딩데이",
    description: "오랜 시간을 깊게 함께했기에\n더 큰 확신으로 같은 미래를 향해 걸어가는 날",
    imageIndex: 4,
  },
];

const galleryPhotos = wedding.photos.moments;

export default function Home() {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const [toast, setToast] = useState("");
  const [now, setNow] = useState(() => Date.now());
  const firstWeekday = new Date(wedding.date.year, wedding.date.month - 1, 1).getDay();
  const lastDay = new Date(wedding.date.year, wedding.date.month, 0).getDate();
  const calendarDays = [...Array(firstWeekday).fill(""), ...Array.from({ length: lastDay }, (_, index) => index + 1)];
  const targetTime = new Date(wedding.date.iso).getTime();
  const remainingMs = targetTime - now;
  const countdownMs = Math.max(0, remainingMs);
  const countdown = [
    { label: "DAYS", value: Math.floor(countdownMs / 86_400_000) },
    { label: "HOURS", value: Math.floor((countdownMs % 86_400_000) / 3_600_000) },
    { label: "MINUTES", value: Math.floor((countdownMs % 3_600_000) / 60_000) },
    { label: "SECONDS", value: Math.floor((countdownMs % 60_000) / 1_000) },
  ];
  const remainingDays = countdown[0].value;
  const englishMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const englishWeekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const weddingWeekdayIndex = new Date(wedding.date.year, wedding.date.month - 1, wedding.date.day).getDay();
  const englishDate = `${englishWeekdays[weddingWeekdayIndex]}, ${englishMonths[wedding.date.month - 1]} ${wedding.date.day}, ${wedding.date.year} | PM 12:30`;

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (selectedPhoto === null) return;
    const close = (event: KeyboardEvent) => event.key === "Escape" && setSelectedPhoto(null);
    document.addEventListener("keydown", close);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", close); document.body.style.overflow = ""; };
  }, [selectedPhoto]);

  useEffect(() => {
    if (!wedding.kakaoJavascriptKey) return;
    void loadKakaoSdk().catch(() => undefined);
  }, []);

  const notify = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2400);
  };

  const copy = async (text: string, label: string) => {
    try {
      if (window.navigator.clipboard?.writeText) {
        await window.navigator.clipboard.writeText(text);
        notify(`${label}을 복사했어요`);
        return;
      }
    } catch {
      // 아래의 수동 복사 방식으로 이어집니다.
    }

    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";
    document.body.appendChild(textarea);
    textarea.select();

    try {
      if (document.execCommand("copy")) {
        notify(`${label}을 복사했어요`);
        return;
      }
    } catch {
      // 직접 복사 안내로 이어집니다.
    } finally {
      document.body.removeChild(textarea);
    }

    window.prompt(`${label}을 직접 복사해 주세요.`, text);
    notify(`${label}을 직접 복사해 주세요`);
  };

  const share = async () => {
    notify("공유를 준비하고 있어요");
    if (wedding.kakaoJavascriptKey) {
      try {
        const kakao = await loadKakaoSdk();
        if (!kakao.isInitialized()) kakao.init(wedding.kakaoJavascriptKey);
        const shareApi = kakao.Share ?? kakao.Link;
        if (!shareApi) throw new Error("Kakao share API is not available.");
        shareApi.sendDefault({
          objectType: "feed",
          content: {
            title: wedding.share.title,
            description: wedding.share.description,
            imageUrl: new URL(wedding.photos.share, window.location.origin).href,
            imageWidth: 1200,
            imageHeight: 1200,
            link: { mobileWebUrl: window.location.href, webUrl: window.location.href },
          },
          buttons: [{
            title: "모바일 청첩장 보기",
            link: { mobileWebUrl: window.location.href, webUrl: window.location.href },
          }],
        });
        return;
      } catch {
        await copy(window.location.href, "청첩장 주소");
        return;
      }
    }
    const data = { title: wedding.share.title, text: wedding.share.description, url: window.location.href };
    if (window.navigator.share) {
      try {
        await window.navigator.share(data);
        return;
      } catch {
        await copy(window.location.href, "청첩장 주소");
        return;
      }
    }
    await copy(window.location.href, "청첩장 주소");
  };

  return (
    <main>
      <section className="hero">
        <div className="petal-layer" aria-hidden="true">
          {Array.from({ length: 22 }, (_, index) => <i key={index} />)}
        </div>
        <div className="hero-stack">
          <span className="hero-label-slot"><span className="hero-label hero-label-left">SUN · 12:30 PM</span></span>
          <figure className="hero-frame"><img src={wedding.photos.cover} alt="신랑 신부의 대표 웨딩 사진" /></figure>
          <h1 className="hero-names"><span>SEUNGHYEON &amp; YOUNGMI</span></h1>
          <span className="hero-label-slot"><span className="hero-label hero-label-left">DEC 13, 2026</span></span>
          <figure className="hero-frame"><img src={wedding.photos.gallery[0]} alt="신랑 신부의 웨딩 사진" /></figure>
        </div>
        <div className="hero-copy">
          <p className="eyebrow">WE ARE GETTING MARRIED</p>
          <p className="hero-date">{wedding.date.display}</p>
        </div>
        <p className="scroll-hint">SCROLL TO BEGIN <span>↓</span></p>
      </section>

      <section className="intro section">
        <SectionTitle>초대합니다</SectionTitle>
        <p className="message">{wedding.message}</p>
        <div className="names">
          <p><span className="parent-names">{wedding.groom.parents}</span><small>의 아들</small><strong>{wedding.groom.name}</strong></p>
          <p><span className="parent-names">{wedding.bride.parents}</span><small>의 딸</small><strong>{wedding.bride.name}</strong></p>
        </div>
      </section>

      <section className="calendar-section section">
        <h2 className="wedding-day-title">예식일 안내</h2>
        <p className="date-korean">{wedding.date.year}년 {wedding.date.month}월 {wedding.date.day}일 {wedding.date.weekday} | {wedding.date.time}</p>
        <p className="date-english">{englishDate}</p>
        <div className="calendar" aria-label={`${wedding.date.month}월 달력`}>
          {["일", "월", "화", "수", "목", "금", "토"].map((day) => <span className="weekday" key={day}>{day}</span>)}
          {calendarDays.map((day, index) => <span key={`${day}-${index}`} className={day === wedding.date.day ? "wedding-day" : ""}>{day || ""}</span>)}
        </div>
        <div className="countdown-grid" aria-label="결혼식까지 남은 시간">
          {countdown.map((item) => (
            <div className="countdown-card" key={item.label}>
              <strong>{String(item.value).padStart(2, "0")}</strong>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
        <p className="countdown-message">승현 <span className="heart-red">♥</span> 영미 결혼식이 {remainingDays}일 남았습니다</p>
      </section>

      <section className="about-us section">
        <h2 className="story-title">우리를 소개합니다</h2>
        <p className="story-subtitle">저희 커플을 소개합니다</p>
        <p className="story-lead">서로 다른 두 세계가 만나<br />하나의 미래를 그려갑니다</p>
        <div className="about-cards">
          {aboutUs.map((person) => (
            <article className="about-card" key={person.role}>
              <div className="about-photo">
                <img src={person.photo} alt={`${person.role} ${person.name} 소개 사진`} loading="lazy" />
              </div>
              <div className="about-copy">
                <p className="about-headline">{person.headline}</p>
                <h3><span>{person.role}</span>{person.name}</h3>
                <p className="about-born">{person.born}</p>
                <p className="about-description">{person.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="timeline-section section">
        <h2 className="story-title">우리의 시간</h2>
        <p className="story-subtitle">저희 연애의 타임라인입니다</p>
        <p className="story-lead">서로에게 참 소중하고<br />감사한 존재가 되어준 시간</p>
        <div className="timeline-list">
          {timeline.map((item, index) => (
            <article className={`timeline-item ${index % 2 === 1 ? "is-reverse" : ""}`} key={item.tag}>
              <div className="timeline-photo">
                <img src={item.photo ?? wedding.photos.gallery[item.imageIndex % wedding.photos.gallery.length]} alt={`${item.title} 사진`} loading="lazy" />
              </div>
              <span className="timeline-dot" aria-hidden="true" />
              <div className="timeline-copy">
                <span className="timeline-tag">{item.tag}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
              <span className="timeline-number">{String(index + 1).padStart(2, "0")}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="gallery section">
        <SectionTitle>우리들의 순간들</SectionTitle>
        <div className="photo-grid">
          {galleryPhotos.map((photo, index) => (
            <button key={`${photo}-${index}`} onClick={() => setSelectedPhoto(index)} aria-label={`웨딩 사진 ${index + 1} 크게 보기`}>
              <img src={photo} alt={`웨딩 사진 ${index + 1}`} loading={index > 1 ? "lazy" : "eager"} />
            </button>
          ))}
        </div>
      </section>

      <section className="location section">
        <SectionTitle>오시는 길</SectionTitle>
        <div className="naver-map-card">
          <a href={wedding.venue.mapUrl} target="_blank" rel="noreferrer" aria-label="네이버 지도에서 예식장 위치 보기">
            <span className="naver-logo">NAVER</span>
            <span className="map-road map-road-main" />
            <span className="map-road map-road-sub" />
            <span className="map-station">인제대역</span>
            <span className="map-marker"><Icon name="map" /></span>
            <strong>{wedding.venue.name}</strong>
            <small>{wedding.venue.address}</small>
          </a>
        </div>
        <div className="location-place">
          <h3>{wedding.venue.name} <span>{wedding.venue.hall}</span></h3>
          <p>{wedding.venue.address}</p>
        </div>
        <a className="primary-button naver-button" href={wedding.venue.mapUrl} target="_blank" rel="noreferrer"><Icon name="map" />네이버 지도 열기</a>
        <div className="transport location-routes">
          {wedding.transport.map((item) => (
            <article key={item.title}>
              <h4><TransportIcon name={item.title} />{item.title}</h4>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="contact section">
        <SectionTitle>마음 전하실 곳</SectionTitle>
        <p className="contact-description">참석이 어려워 직접 축하를 전하지 못하는<br />분들을 위해 계좌번호를 안내드립니다.</p>
        {[wedding.groom, wedding.bride].map((person, index) => (
          <details key={person.name} className="account">
            <summary>{index === 0 ? "신랑" : "신부"}측 계좌번호 보기 <span>⌄</span></summary>
            <div className="account-body">
              {person.accounts.map((account) => (
                <div className="account-item" key={`${account.bank}-${account.account}`}>
                  <div><p>{account.bank} {account.account}</p><small>예금주 {account.accountHolder}</small></div>
                  <button onClick={() => copy(account.account, "계좌번호")} aria-label={`${account.accountHolder} 계좌번호 복사`}><Icon name="copy" />복사</button>
                </div>
              ))}
            </div>
          </details>
        ))}
        <div className="call-row">
          <a href={`tel:${wedding.groom.phone}`}><Icon name="phone" />신랑에게 연락</a>
          <a href={`tel:${wedding.bride.phone}`}><Icon name="phone" />신부에게 연락</a>
        </div>
      </section>

      <footer>
        <p className="footer-message">저희의 새로운 시작을 함께 축복해 주세요.</p>
        <button onClick={share}><Icon name="share" />청첩장 공유하기</button>
      </footer>

      {selectedPhoto !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="웨딩 사진 크게 보기" onClick={() => setSelectedPhoto(null)}>
          <button className="lightbox-close" aria-label="사진 닫기" onClick={() => setSelectedPhoto(null)}><Icon name="close" /></button>
          <img src={galleryPhotos[selectedPhoto]} alt={`웨딩 사진 ${selectedPhoto + 1} 크게 보기`} onClick={(e) => e.stopPropagation()} />
        </div>
      )}
      <div className={`toast ${toast ? "visible" : ""}`} role="status">{toast}</div>
    </main>
  );
}
