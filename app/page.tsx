"use client";

import { useEffect, useState } from "react";
import { wedding } from "./wedding-config";

declare global {
  interface Window {
    Kakao?: {
      init: (key: string) => void;
      isInitialized: () => boolean;
      Share: { sendDefault: (options: unknown) => void };
    };
  }
}

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

function SectionTitle({ eyebrow, children }: { eyebrow: string; children: React.ReactNode }) {
  return <header className="section-title"><span>{eyebrow}</span><h2>{children}</h2><i /></header>;
}

export default function Home() {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const [toast, setToast] = useState("");
  const firstWeekday = new Date(wedding.date.year, wedding.date.month - 1, 1).getDay();
  const lastDay = new Date(wedding.date.year, wedding.date.month, 0).getDate();
  const calendarDays = [...Array(firstWeekday).fill(""), ...Array.from({ length: lastDay }, (_, index) => index + 1)];
  const remainingDays = Math.ceil((new Date(wedding.date.iso).getTime() - Date.now()) / 86_400_000);
  const countdownLabel = remainingDays >= 0 ? `D-${remainingDays}` : `D+${Math.abs(remainingDays)}`;

  useEffect(() => {
    if (selectedPhoto === null) return;
    const close = (event: KeyboardEvent) => event.key === "Escape" && setSelectedPhoto(null);
    document.addEventListener("keydown", close);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", close); document.body.style.overflow = ""; };
  }, [selectedPhoto]);

  useEffect(() => {
    if (!wedding.kakaoJavascriptKey || document.getElementById("kakao-sdk")) return;
    const script = document.createElement("script");
    script.id = "kakao-sdk";
    script.src = "https://t1.kakaocdn.net/kakao_js_sdk/2.8.1/kakao.min.js";
    script.crossOrigin = "anonymous";
    document.head.appendChild(script);
  }, []);

  const notify = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 1800);
  };

  const copy = async (text: string, label: string) => {
    await navigator.clipboard.writeText(text);
    notify(`${label}을 복사했어요`);
  };

  const share = async () => {
    if (wedding.kakaoJavascriptKey && window.Kakao) {
      if (!window.Kakao.isInitialized()) window.Kakao.init(wedding.kakaoJavascriptKey);
      window.Kakao.Share.sendDefault({
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
    }
    const data = { title: wedding.share.title, text: wedding.share.description, url: window.location.href };
    if (navigator.share) await navigator.share(data);
    else await copy(window.location.href, "청첩장 주소");
  };

  return (
    <main>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">WE ARE GETTING MARRIED</p>
          <h1><span>{wedding.groom.name}</span><b>&amp;</b><span>{wedding.bride.name}</span></h1>
          <p className="hero-date">{wedding.date.display}</p>
        </div>
        <div className="hero-photo">
          <img src={wedding.photos.cover} alt="신랑 신부의 대표 웨딩 사진" />
          <div className="photo-note">Together, always.</div>
        </div>
        <p className="scroll-hint">SCROLL TO BEGIN <span>↓</span></p>
      </section>

      <section className="intro section">
        <SectionTitle eyebrow="INVITATION">소중한 분들을 초대합니다</SectionTitle>
        <p className="message">{wedding.message}</p>
        <div className="names">
          <p>{wedding.groom.parents} <small>의 아들</small> <strong>{wedding.groom.name}</strong></p>
          <p>{wedding.bride.parents} <small>의 딸</small> <strong>{wedding.bride.name}</strong></p>
        </div>
      </section>

      <section className="calendar-section section">
        <SectionTitle eyebrow="THE WEDDING DAY">{wedding.date.year}. {wedding.date.month}. {wedding.date.day}</SectionTitle>
        <p className="time-place">{wedding.date.weekday} {wedding.date.time}<br />{wedding.venue.name} {wedding.venue.hall}</p>
        <div className="calendar" aria-label={`${wedding.date.month}월 달력`}>
          {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day) => <span className="weekday" key={day}>{day}</span>)}
          {calendarDays.map((day, index) => <span key={`${day}-${index}`} className={day === wedding.date.day ? "wedding-day" : ""}>{day || ""}</span>)}
        </div>
        <p className="d-day">우리의 결혼식까지 <strong>{countdownLabel}</strong></p>
      </section>

      <section className="gallery section">
        <SectionTitle eyebrow="GALLERY">우리의 순간들</SectionTitle>
        <div className="photo-grid">
          {wedding.photos.gallery.map((photo, index) => (
            <button key={photo} className={index === 0 ? "featured" : ""} onClick={() => setSelectedPhoto(index)} aria-label={`웨딩 사진 ${index + 1} 크게 보기`}>
              <img src={photo} alt={`웨딩 사진 ${index + 1}`} loading={index > 1 ? "lazy" : "eager"} />
            </button>
          ))}
        </div>
      </section>

      <section className="location section">
        <SectionTitle eyebrow="LOCATION">오시는 길</SectionTitle>
        <h3>{wedding.venue.name}</h3>
        <p>{wedding.venue.hall}<br />{wedding.venue.address}</p>
        <div className="map-card">
          <div className="map-pin"><Icon name="map" /></div>
          <p>{wedding.venue.name}<small>{wedding.venue.address}</small></p>
        </div>
        <a className="primary-button" href={wedding.venue.mapUrl} target="_blank" rel="noreferrer"><Icon name="map" />지도에서 길 찾기</a>
        <div className="transport">
          {wedding.transport.map((item) => <article key={item.title}><h4>{item.title}</h4><p>{item.description}</p></article>)}
        </div>
      </section>

      <section className="contact section">
        <SectionTitle eyebrow="CONTACT">마음을 전하는 곳</SectionTitle>
        <p className="contact-description">참석이 어려워 직접 축하를 전하지 못하는<br />분들을 위해 계좌번호를 안내드립니다.</p>
        {[wedding.groom, wedding.bride].map((person, index) => (
          <details key={person.name} className="account" open={index === 0}>
            <summary>{index === 0 ? "신랑" : "신부"}측 계좌번호 <span>⌄</span></summary>
            <div className="account-body">
              <div><p>{person.bank} {person.account}</p><small>예금주 {person.accountHolder}</small></div>
              <button onClick={() => copy(person.account, "계좌번호")} aria-label={`${person.name} 계좌번호 복사`}><Icon name="copy" />복사</button>
            </div>
          </details>
        ))}
        <div className="call-row">
          <a href={`tel:${wedding.groom.phone}`}><Icon name="phone" />신랑에게 연락</a>
          <a href={`tel:${wedding.bride.phone}`}><Icon name="phone" />신부에게 연락</a>
        </div>
      </section>

      <footer>
        <p className="footer-names">{wedding.groom.name} <span>&amp;</span> {wedding.bride.name}</p>
        <p>저희의 새로운 시작을 함께 축복해 주세요.</p>
        <button onClick={share}><Icon name="share" />청첩장 공유하기</button>
      </footer>

      {selectedPhoto !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="웨딩 사진 크게 보기" onClick={() => setSelectedPhoto(null)}>
          <button className="lightbox-close" aria-label="사진 닫기" onClick={() => setSelectedPhoto(null)}><Icon name="close" /></button>
          <img src={wedding.photos.gallery[selectedPhoto]} alt={`웨딩 사진 ${selectedPhoto + 1} 크게 보기`} onClick={(e) => e.stopPropagation()} />
        </div>
      )}
      <div className={`toast ${toast ? "visible" : ""}`} role="status">{toast}</div>
    </main>
  );
}
