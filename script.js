"use strict";
const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];
const WEDDING = {
  date: "2026-11-07T17:15:00+07:00",
  title: "Lễ cưới Thế Ngọc & Hương Ly",
  location:
    "Khu bể bơi Serenity, tầng 1, Khách sạn Hà Nội Daewoo, 360 Kim Mã, Giảng Võ, Hà Nội",
  description:
    "15h: Lễ thân mật cùng gia đình. 17h15–17h30: Đón khách tiệc cưới. 18h: Nghi lễ đính hôn. 19h: Cô dâu chú rể khiêu vũ. 19h30: Giao lưu và tung hoa.",
};
let toastTimer;
function toast(message) {
  $("#toast").textContent = message;
  $("#toast").classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => $("#toast").classList.remove("show"), 5000);
}
function readStorage(kind, key) {
  try {
    return window[kind].getItem(key);
  } catch {
    return null;
  }
}
function writeStorage(kind, key, value) {
  try {
    window[kind].setItem(key, value);
    return true;
  } catch {
    return false;
  }
}

// Explicit pause wins over all automatic retries. A browser may require a gesture.
const audio = $("#background-music");
const musicButton = $("#music-toggle");
const musicKey = "ly-ngoc-music-enabled-v1";
const positionKey = "ly-ngoc-mot-doi-position-v1";
let musicEnabled = readStorage("localStorage", musicKey) !== "false";
let starting = false;
let audioFailed = false;
audio.volume = 0.4;
audio.autoplay = musicEnabled;
function musicState(playing, blocked = false) {
  musicButton.classList.toggle("is-playing", playing);
  musicButton.setAttribute("aria-pressed", String(playing));
  musicButton.setAttribute(
    "aria-label",
    playing ? "Tạm dừng nhạc một đời" : "Bật nhạc một đời",
  );
  $("#music-status").textContent = audioFailed
    ? "Nhạc chưa tải được · chạm để thử lại"
    : blocked
      ? "Chạm vào thiệp để nhạc vang lên"
      : playing
        ? "14 Casper · Bon Nghiêm · buitruonglinh"
        : "Đã tạm dừng · chạm để nghe tiếp";
}
async function startMusic() {
  if (!musicEnabled || starting || !audio.paused) return;
  starting = true;
  try {
    await audio.play();
    if (!musicEnabled) audio.pause();
  } catch (error) {
    if (error.name === "NotAllowedError") musicState(false, true);
    else if (error.name !== "AbortError") {
      audioFailed = true;
      musicState(false);
    }
  } finally {
    starting = false;
  }
}
audio.addEventListener("loadedmetadata", () => {
  const last = Number(readStorage("sessionStorage", positionKey));
  if (Number.isFinite(last) && last > 0 && last < audio.duration - 1)
    audio.currentTime = last;
  startMusic();
});
audio.addEventListener("playing", () => {
  audioFailed = false;
  if (!musicEnabled) audio.pause();
  else musicState(true);
});
audio.addEventListener("pause", () => musicState(false));
audio.addEventListener("error", () => {
  audioFailed = true;
  musicState(false);
});
audio.addEventListener("canplay", startMusic);
let savedAt = 0;
audio.addEventListener("timeupdate", () => {
  if (Date.now() - savedAt > 2000) {
    writeStorage("sessionStorage", positionKey, String(audio.currentTime));
    savedAt = Date.now();
  }
});
window.addEventListener("pagehide", () =>
  writeStorage("sessionStorage", positionKey, String(audio.currentTime)),
);
musicButton.addEventListener("click", () => {
  if (!audio.paused) {
    musicEnabled = false;
    audio.pause();
  } else {
    musicEnabled = true;
    audioFailed = false;
    if (audio.error) audio.load();
    startMusic();
  }
  writeStorage("localStorage", musicKey, String(musicEnabled));
});
function unlockMusic(event) {
  if (event.target instanceof Element && event.target.closest("#music-toggle"))
    return;
  startMusic();
}
["pointerdown", "pointerup", "touchend", "click", "keydown"].forEach((event) =>
  document.addEventListener(event, unlockMusic, { passive: true }),
);
document.addEventListener("visibilitychange", () => {
  if (!document.hidden && musicEnabled) startMusic();
});
if (musicEnabled) startMusic();
else musicState(false);

const menu = $(".menu-toggle");
function closeMenu() {
  menu.setAttribute("aria-expanded", "false");
  menu.setAttribute("aria-label", "Mở menu");
  $("#mobile-nav").hidden = true;
}
menu.addEventListener("click", () => {
  const open = menu.getAttribute("aria-expanded") !== "true";
  menu.setAttribute("aria-expanded", String(open));
  menu.setAttribute("aria-label", open ? "Đóng menu" : "Mở menu");
  $("#mobile-nav").hidden = !open;
});
$$("#mobile-nav a").forEach((a) => a.addEventListener("click", closeMenu));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !$("#mobile-nav").hidden) {
    closeMenu();
    menu.focus();
  }
});
window.matchMedia("(min-width: 801px)").addEventListener("change", (event) => {
  if (event.matches) closeMenu();
});

const motion = matchMedia("(prefers-reduced-motion: reduce)");
if ("IntersectionObserver" in window && !motion.matches) {
  document.documentElement.classList.add("motion-ready");
  const observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }),
    { threshold: 0.08 },
  );
  $$(".reveal").forEach((element) => observer.observe(element));
}
if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (entry.isIntersecting)
          $$(".desktop-nav a").forEach((a) =>
            a.classList.toggle("active", a.hash === `#${entry.target.id}`),
          );
      }),
    { rootMargin: "-20% 0px -55% 0px" },
  );
  $$("main section[id]").forEach((section) => sectionObserver.observe(section));
}
let countdownInterval;
function countdown() {
  const remaining = Math.max(0, new Date(WEDDING.date).getTime() - Date.now());
  const units = {
    days: Math.floor(remaining / 86400000),
    hours: Math.floor(remaining / 3600000) % 24,
    minutes: Math.floor(remaining / 60000) % 60,
    seconds: Math.floor(remaining / 1000) % 60,
  };
  Object.entries(units).forEach(
    ([key, value]) =>
      ($(`#${key}`).textContent = String(value).padStart(2, "0")),
  );
  if (!remaining) {
    $("#countdown-title").textContent = "Ngày chung đôi đã đến.";
    clearInterval(countdownInterval);
  }
}
countdownInterval = setInterval(countdown, 1000);
countdown();
const guest = new URLSearchParams(location.search).get("to");
if (guest && guest.trim())
  $("#guest-dedication").textContent = guest.trim().slice(0, 100);

function openDialog(dialog) {
  dialog.showModal();
  document.body.classList.add("modal-open");
}
$$("dialog").forEach((dialog) => {
  $("[data-close]", dialog).addEventListener("click", () => dialog.close());
  dialog.addEventListener("close", () =>
    document.body.classList.remove("modal-open"),
  );
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
      const r = dialog.getBoundingClientRect();
      if (
        event.clientX < r.left ||
        event.clientX > r.right ||
        event.clientY < r.top ||
        event.clientY > r.bottom
      )
        dialog.close();
    }
  });
});
$("#show-map").addEventListener("click", () => openDialog($("#map-dialog")));
$("#open-credits").addEventListener("click", () =>
  openDialog($("#credits-dialog")),
);
const photos = $$(".gallery-item");
const lightbox = $("#lightbox");
let photoIndex = 0;
function showPhoto(index) {
  photoIndex = (index + photos.length) % photos.length;
  const original = $("img", photos[photoIndex]);
  $("#lightbox-image").src = original.src;
  $("#lightbox-image").alt = original.alt;
  $("#lightbox-caption").textContent = photos[photoIndex].dataset.caption;
  $("#lightbox-counter").textContent =
    `${String(photoIndex + 1).padStart(2, "0")} / ${String(photos.length).padStart(2, "0")}`;
}
photos.forEach((photo, index) =>
  photo.addEventListener("click", () => {
    showPhoto(index);
    openDialog(lightbox);
  }),
);
$(".lightbox-prev").addEventListener("click", () => showPhoto(photoIndex - 1));
$(".lightbox-next").addEventListener("click", () => showPhoto(photoIndex + 1));
lightbox.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
    event.preventDefault();
    showPhoto(photoIndex + (event.key === "ArrowRight" ? 1 : -1));
  }
});
let swipe = null;
lightbox.addEventListener(
  "touchstart",
  (event) => {
    swipe =
      event.touches.length === 1
        ? { x: event.touches[0].clientX, y: event.touches[0].clientY }
        : null;
  },
  { passive: true },
);
lightbox.addEventListener(
  "touchend",
  (event) => {
    if (!swipe) return;
    const dx = event.changedTouches[0].clientX - swipe.x;
    const dy = event.changedTouches[0].clientY - swipe.y;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5)
      showPhoto(photoIndex + (dx < 0 ? 1 : -1));
    swipe = null;
  },
  { passive: true },
);
function icsText(value) {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}
function icsDate(value) {
  return new Date(value)
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}/, "");
}
function foldLine(line) {
  const encoder = new TextEncoder();
  let current = "",
    bytes = 0;
  const output = [];
  for (const char of line) {
    const size = encoder.encode(char).length;
    if (bytes + size > 73) {
      output.push(current);
      current = " ";
      bytes = 1;
    }
    current += char;
    bytes += size;
  }
  output.push(current);
  return output.join("\r\n");
}
$("#save-date").addEventListener("click", () => {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//LyNgoc//Wedding//VI",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    "UID:ly-ngoc-20261107@wedding.local",
    `DTSTAMP:${icsDate(Date.now())}`,
    `DTSTART:${icsDate(WEDDING.date)}`,
    `SUMMARY:${icsText(WEDDING.title)}`,
    `LOCATION:${icsText(WEDDING.location)}`,
    `DESCRIPTION:${icsText(WEDDING.description)}`,
    "BEGIN:VALARM",
    "TRIGGER:-P1D",
    "ACTION:DISPLAY",
    "DESCRIPTION:Ngày mai hẹn gặp Ly và Ngọc!",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  const url = URL.createObjectURL(
    new Blob([lines.map(foldLine).join("\r\n") + "\r\n"], {
      type: "text/calendar;charset=utf-8",
    }),
  );
  const a = document.createElement("a");
  a.href = url;
  a.download = "The-Ngoc-Huong-Ly-07-11-2026.ics";
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 10000);
  toast("Mở tệp lịch vừa tải để lưu ngày hẹn của chúng mình nhé.");
});
const form = $("#rsvp-form");
const receipt = $("#google-rsvp");
const receiptFrame = $("#google-rsvp-frame");
const sendButton = form.querySelector('button[type="submit"]');
const rsvpResult = $("#rsvp-result");
let rsvpTarget = null;
let sendingRsvp = false;
let deliveryTimer;
form.hidden = false;

// Post the styled form through a normal browser navigation. The visible Google
// response is the receipt; an iframe load alone is never treated as success.
try {
  const config = window.WEDDING_RSVP;
  const url = new URL(config?.formUrl);
  const entries = config?.entries;
  if (
    url.protocol === "https:" &&
    url.hostname === "docs.google.com" &&
    !url.username &&
    !url.password &&
    !url.port &&
    /^\/forms\/d\/e\/[A-Za-z0-9_-]+\/viewform\/?$/.test(url.pathname) &&
    ["name", "attendance", "guests", "wish"].every((key) =>
      /^entry\.\d+$/.test(entries?.[key]),
    )
  ) {
    url.search = "";
    url.hash = "";
    $("#google-rsvp-link").href = url.href;
    url.pathname = url.pathname.replace(/viewform\/?$/, "formResponse");
    url.searchParams.set("embedded", "true");
    rsvpTarget = { url: url.href, entries };
  }
} catch {
  /* An invalid configuration must not send guest details elsewhere. */
}
if (!rsvpTarget) {
  sendButton.disabled = true;
  rsvpResult.hidden = false;
  rsvpResult.textContent =
    "Phiếu xác nhận chưa sẵn sàng. Vui lòng thử lại sau.";
}

function updateAttendance() {
  const coming = form.elements.attendance.value === "yes";
  $(".guest-count-wrap").hidden = !coming;
  $("#guest-count").disabled = !coming;
}
$$('input[name="attendance"]').forEach((input) =>
  input.addEventListener("change", updateAttendance),
);
$("#guest-name").addEventListener("input", () =>
  $("#guest-name").setCustomValidity(""),
);

function finishDeliveryView() {
  if (!sendingRsvp) return;
  clearTimeout(deliveryTimer);
  sendingRsvp = false;
  receipt.removeAttribute("aria-busy");
  rsvpResult.textContent = "Vui lòng xem kết quả gửi ở khung bên dưới.";
  receipt.classList.add("is-visible");
  receipt.scrollIntoView({
    behavior: motion.matches ? "instant" : "smooth",
    block: "center",
  });
  // Require a deliberate edit before allowing another submission.
}
receiptFrame.addEventListener("load", finishDeliveryView);
form.addEventListener("input", () => {
  if (rsvpTarget && !sendingRsvp) sendButton.disabled = false;
});
form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!rsvpTarget || sendingRsvp) return;
  const name = $("#guest-name").value.trim();
  if (!name) {
    $("#guest-name").setCustomValidity("Vui lòng nhập họ và tên.");
    $("#guest-name").reportValidity();
    return;
  }
  if (!navigator.onLine) {
    rsvpResult.hidden = false;
    rsvpResult.textContent =
      "Chưa có kết nối mạng. Thông tin vẫn được giữ trong form; vui lòng thử lại khi có mạng.";
    return;
  }
  const coming = form.elements.attendance.value === "yes";
  const payload = {
    [rsvpTarget.entries.name]: name,
    [rsvpTarget.entries.attendance]: coming
      ? "Sẽ tham dự"
      : "Không thể tham dự",
    [rsvpTarget.entries.wish]: $("#guest-wish").value.trim(),
    fvv: "1",
    pageHistory: coming ? "0,1,2" : "0,2",
  };
  if (coming) payload[rsvpTarget.entries.guests] = $("#guest-count").value;
  const deliveryForm = document.createElement("form");
  deliveryForm.method = "POST";
  deliveryForm.action = rsvpTarget.url;
  deliveryForm.target = receiptFrame.name;
  deliveryForm.acceptCharset = "UTF-8";
  deliveryForm.hidden = true;
  for (const [key, value] of Object.entries(payload)) {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = key;
    input.value = value;
    deliveryForm.append(input);
  }
  document.body.append(deliveryForm);
  sendingRsvp = true;
  sendButton.disabled = true;
  receipt.hidden = false;
  receipt.classList.add("is-visible");
  receipt.setAttribute("aria-busy", "true");
  rsvpResult.hidden = false;
  rsvpResult.textContent = "Đang gửi xác nhận…";
  deliveryTimer = setTimeout(() => {
    sendingRsvp = false;
    receipt.removeAttribute("aria-busy");
    sendButton.disabled = false;
    rsvpResult.textContent =
      "Chưa hiển thị được kết quả. Vui lòng kiểm tra khung bên dưới trước khi gửi lại.";
  }, 30000);
  HTMLFormElement.prototype.submit.call(deliveryForm);
  deliveryForm.remove();
});
updateAttendance();
