"use strict";

/* THAY THÔNG TIN THIỆP:
   1. Sửa tên, ngày, địa điểm và câu chuyện hiển thị trong index.html.
   2. Cập nhật ngày và lịch hẹn bên dưới (múi giờ Việt Nam: +07:00).
   3. Thay ảnh/nhạc trong assets; giữ ghi nguồn khi dùng bản nhạc hiện tại.
   Đây là bản HTML tĩnh: RSVP chỉ lưu ở trình duyệt, chưa có máy chủ nhận phản hồi.
*/
const WEDDING = {
  date: "2026-12-20T17:30:00+07:00",
  end: "2026-12-20T21:00:00+07:00",
  title: "Lễ cưới Minh Anh & Hoàng Nam",
  location: "The Adora Center, 431 Hoàng Văn Thụ, TP. Hồ Chí Minh",
  description:
    "Đón khách 17:30. Lễ thành hôn 18:00. Khai tiệc 18:30. Hẹn gặp bạn!",
  storageKey: "minhanh-hoangnam-wedding-demo-v1",
};

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
let toastTimeout;

function toast(message) {
  const element = $("#toast");
  element.textContent = message;
  element.classList.add("show");
  window.clearTimeout(toastTimeout);
  toastTimeout = window.setTimeout(
    () => element.classList.remove("show"),
    4500,
  );
}

// Finite number of lightweight petals; no animation work while the tab is hidden.
function createPetals() {
  const container = $("#petals");
  container.replaceChildren();
  if (motionPreference.matches) return;
  const fragment = document.createDocumentFragment();
  for (let index = 0; index < 11; index++) {
    const petal = document.createElement("span");
    petal.className = "petal";
    petal.style.setProperty("--left", `${(index * 9.1 + 3) % 100}%`);
    petal.style.setProperty("--duration", `${15 + (index % 5) * 2}s`);
    petal.style.setProperty("--delay", `${-index * 3.7}s`);
    if (index % 3 === 0) petal.style.width = "7px";
    fragment.append(petal);
  }
  container.append(fragment);
}
createPetals();
motionPreference.addEventListener("change", createPetals);
document.addEventListener("visibilitychange", () => {
  $$(".petal").forEach((petal) => {
    petal.style.animationPlayState = document.hidden ? "paused" : "running";
  });
});

if ("IntersectionObserver" in window) {
  document.documentElement.classList.add("motion-ready");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -20px 0px" },
  );
  $$(".reveal").forEach((element) => observer.observe(element));
}

function updateCountdown() {
  const remaining = Math.max(0, new Date(WEDDING.date).getTime() - Date.now());
  const units = {
    days: Math.floor(remaining / 86400000),
    hours: Math.floor(remaining / 3600000) % 24,
    minutes: Math.floor(remaining / 60000) % 60,
    seconds: Math.floor(remaining / 1000) % 60,
  };
  Object.entries(units).forEach(([id, value]) => {
    $(`#${id}`).textContent = String(value).padStart(2, "0");
  });
  if (remaining === 0) {
    $("#countdown-title").textContent = "Ngày chung đôi đã đến!";
    $(".countdown").setAttribute("aria-label", "Ngày cưới đã đến");
  }
}
updateCountdown();
window.setInterval(updateCountdown, 1000);

const menuButton = $(".menu-toggle");
const mobileNav = $("#mobile-nav");
function closeMenu() {
  mobileNav.hidden = true;
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Mở menu");
}
menuButton.addEventListener("click", () => {
  const opening = menuButton.getAttribute("aria-expanded") !== "true";
  mobileNav.hidden = !opening;
  menuButton.setAttribute("aria-expanded", String(opening));
  menuButton.setAttribute("aria-label", opening ? "Đóng menu" : "Mở menu");
});
$$("a", mobileNav).forEach((link) => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !mobileNav.hidden) {
    closeMenu();
    menuButton.focus();
  }
});
document.addEventListener("click", (event) => {
  if (!$(".site-header").contains(event.target)) closeMenu();
});
window.matchMedia("(min-width: 701px)").addEventListener("change", (event) => {
  if (event.matches) closeMenu();
});

const music = $("#background-music");
const musicButton = $("#music-toggle");
const musicPreferenceKey = `${WEDDING.storageKey}-music`;
const musicPositionKey = `${WEDDING.storageKey}-music-position`;
music.volume = 0.35;
let musicLoading = false;
let musicPausedByUser = false;
let musicNeedsInteraction = false;
let musicResumePosition = 0;
let musicPositionRestored = false;
const musicActivationEvents = ["click", "touchend", "keydown"];

try {
  musicPausedByUser = localStorage.getItem(musicPreferenceKey) === "off";
} catch {
  // Music still works when browser storage is unavailable.
}
try {
  const position = Number(sessionStorage.getItem(musicPositionKey));
  if (Number.isFinite(position) && position > 0) musicResumePosition = position;
} catch {}
music.autoplay = !musicPausedByUser;

function rememberMusicPreference(enabled) {
  try {
    localStorage.setItem(musicPreferenceKey, enabled ? "on" : "off");
  } catch {}
}

function rememberMusicPosition() {
  if (
    !musicPositionRestored ||
    music.readyState < 1 ||
    !Number.isFinite(music.currentTime)
  )
    return;
  try {
    sessionStorage.setItem(musicPositionKey, String(music.currentTime));
  } catch {}
}

function restoreMusicPosition() {
  try {
    if (musicResumePosition > 0 && musicResumePosition < music.duration) {
      music.currentTime = musicResumePosition;
    }
  } catch {}
  musicPositionRestored = true;
}
if (music.readyState >= 1) restoreMusicPosition();
else
  music.addEventListener("loadedmetadata", restoreMusicPosition, {
    once: true,
  });

let lastMusicPositionSave = 0;
music.addEventListener("timeupdate", () => {
  if (Date.now() - lastMusicPositionSave < 1000) return;
  lastMusicPositionSave = Date.now();
  rememberMusicPosition();
});
window.addEventListener("pagehide", rememberMusicPosition);
document.addEventListener("visibilitychange", () => {
  if (document.hidden) rememberMusicPosition();
});

function stopMusicActivationListeners() {
  musicActivationEvents.forEach((eventName) => {
    document.removeEventListener(eventName, activateMusic);
  });
}

function updateMusicUI() {
  const playing = !music.paused && !music.error;
  musicButton.classList.toggle("is-playing", playing);
  musicButton.setAttribute("aria-pressed", String(playing));
  musicButton.setAttribute(
    "aria-label",
    playing ? "Tắt nhạc nền" : "Bật nhạc nền",
  );
  musicButton.title = musicNeedsInteraction
    ? "Trình duyệt đang chặn tự phát âm thanh. Chạm vào trang để nghe nhạc."
    : playing
      ? "Tạm dừng nhạc nền"
      : "Bật nhạc nền";
  $(".music-text strong").textContent = playing
    ? "Giai điệu của chúng mình"
    : musicNeedsInteraction
      ? "Chạm để nghe nhạc nhé"
      : "Một chút nhạc nhé?";
  $(".music-text small").textContent = playing
    ? "Canon in D · Nhấn để tạm dừng"
    : musicLoading
      ? "Đang mở giai điệu…"
      : musicNeedsInteraction
        ? "Chạm bất kỳ đâu để bật nhạc"
        : "Canon in D · Nhấn để nghe";
}
async function startMusic({ automatic = false } = {}) {
  if (automatic && musicPausedByUser) return;
  if (!music.paused) {
    stopMusicActivationListeners();
    updateMusicUI();
    return;
  }
  if (musicLoading) return;
  musicLoading = true;
  musicButton.setAttribute("aria-busy", "true");
  updateMusicUI();
  try {
    await music.play();
    musicNeedsInteraction = false;
  } catch (error) {
    // A blocked autoplay attempt is expected on fresh mobile/browser visits.
    if (error.name === "NotAllowedError") musicNeedsInteraction = true;
    else if (!automatic && error.name !== "AbortError")
      toast("Chưa mở được nhạc. Bạn nhấn nút nhạc để thử lại nhé.");
  } finally {
    musicLoading = false;
    musicButton.removeAttribute("aria-busy");
    updateMusicUI();
  }
}
musicButton.addEventListener("click", () => {
  if (musicLoading || !music.paused) {
    musicPausedByUser = true;
    rememberMusicPreference(false);
    musicNeedsInteraction = false;
    music.autoplay = false;
    stopMusicActivationListeners();
    music.pause();
    updateMusicUI();
  } else {
    musicPausedByUser = false;
    rememberMusicPreference(true);
    startMusic();
  }
});
music.addEventListener("play", () => {
  if (musicPausedByUser) {
    music.pause();
    return;
  }
  musicNeedsInteraction = false;
  rememberMusicPreference(true);
  stopMusicActivationListeners();
  updateMusicUI();
});
music.addEventListener("pause", () => {
  rememberMusicPosition();
  updateMusicUI();
});
music.addEventListener("error", () => {
  updateMusicUI();
});

function activateMusic(event) {
  if (
    !event.isTrusted ||
    musicPausedByUser ||
    event.target.closest?.("#music-toggle") ||
    (event.type === "keydown" &&
      (event.repeat ||
        event.ctrlKey ||
        event.altKey ||
        event.metaKey ||
        ["Escape", "Shift", "Control", "Alt", "Meta"].includes(event.key)))
  )
    return;
  // Call play() inside the gesture handler, without a timer or network await.
  startMusic({ automatic: true });
}
if (!musicPausedByUser) {
  musicActivationEvents.forEach((eventName) => {
    document.addEventListener(eventName, activateMusic, { passive: true });
  });
  // Restore playback on entry/reload; stored preferences never bypass browser policy.
  startMusic({ automatic: true });
} else updateMusicUI();
window.addEventListener("pageshow", (event) => {
  if (event.persisted) startMusic({ automatic: true });
});

function openDialog(dialog) {
  closeMenu();
  dialog.showModal();
  document.body.classList.add("modal-open");
}
$$("dialog").forEach((dialog) => {
  $("[data-close]", dialog).addEventListener("click", () => dialog.close());
  dialog.addEventListener("close", () => {
    if (!$("dialog[open]")) document.body.classList.remove("modal-open");
  });
  dialog.addEventListener("click", (event) => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom
    )
      dialog.close();
  });
});
$("#open-invitation").addEventListener("click", () => {
  openDialog($("#invitation-dialog"));
});
function closeLetterAndVisit(id) {
  $("#invitation-dialog").close();
  const target = $(id);
  target.scrollIntoView({
    behavior: motionPreference.matches ? "instant" : "smooth",
    block: "start",
  });
  if (id === "#rsvp") $("#guest-name").focus({ preventScroll: true });
}
$("#letter-rsvp").addEventListener("click", () => closeLetterAndVisit("#rsvp"));
$("#letter-details").addEventListener("click", () =>
  closeLetterAndVisit("#invitation"),
);
$("#open-credits").addEventListener("click", () =>
  openDialog($("#credits-dialog")),
);

// Photo viewer: keyboard arrows, touch swipe, native Escape and focus trapping.
const photos = $$(".gallery-item");
const lightbox = $("#lightbox");
let photoIndex = 0;
function showPhoto(index) {
  photoIndex = (index + photos.length) % photos.length;
  const button = photos[photoIndex];
  const original = $("img", button);
  $("#lightbox-image").src = original.src;
  $("#lightbox-image").alt = original.alt;
  $("#lightbox-caption").textContent = button.dataset.caption;
  $("#lightbox-counter").textContent =
    `${String(photoIndex + 1).padStart(2, "0")} / ${String(photos.length).padStart(2, "0")}`;
}
photos.forEach((button, index) =>
  button.addEventListener("click", () => {
    showPhoto(index);
    openDialog(lightbox);
  }),
);
$(".lightbox-prev").addEventListener("click", () => showPhoto(photoIndex - 1));
$(".lightbox-next").addEventListener("click", () => showPhoto(photoIndex + 1));
lightbox.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") {
    event.preventDefault();
    showPhoto(photoIndex + 1);
  }
  if (event.key === "ArrowLeft") {
    event.preventDefault();
    showPhoto(photoIndex - 1);
  }
});
let swipeStart = null;
lightbox.addEventListener(
  "touchstart",
  (event) => {
    swipeStart =
      event.touches.length === 1
        ? { x: event.touches[0].clientX, y: event.touches[0].clientY }
        : null;
  },
  { passive: true },
);
lightbox.addEventListener(
  "touchend",
  (event) => {
    if (!swipeStart) return;
    const dx = event.changedTouches[0].clientX - swipeStart.x;
    const dy = event.changedTouches[0].clientY - swipeStart.y;
    if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.5)
      showPhoto(photoIndex + (dx < 0 ? 1 : -1));
    swipeStart = null;
  },
  { passive: true },
);

// Calendar download works from file:// and a static web server without an API.
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
function foldCalendarLine(line) {
  const encoder = new TextEncoder();
  const output = [];
  let current = "";
  let bytes = 0;
  for (const character of line) {
    const size = encoder.encode(character).length;
    if (bytes + size > 73) {
      output.push(current);
      current = " ";
      bytes = 1;
    }
    current += character;
    bytes += size;
  }
  output.push(current);
  return output.join("\r\n");
}
$("#save-date").addEventListener("click", () => {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//MinhAnhHoangNam//Wedding Invitation//VI",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    "UID:minhanh-hoangnam-20261220@wedding.example",
    `DTSTAMP:${icsDate(Date.now())}`,
    `DTSTART:${icsDate(WEDDING.date)}`,
    `DTEND:${icsDate(WEDDING.end)}`,
    `SUMMARY:${icsText(WEDDING.title)}`,
    `LOCATION:${icsText(WEDDING.location)}`,
    `DESCRIPTION:${icsText(WEDDING.description)}`,
    "BEGIN:VALARM",
    "TRIGGER:-P1D",
    "ACTION:DISPLAY",
    "DESCRIPTION:Ngày mai mình có hẹn chung vui nhé!",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  const file = new Blob([lines.map(foldCalendarLine).join("\r\n") + "\r\n"], {
    type: "text/calendar;charset=utf-8",
  });
  const url = URL.createObjectURL(file);
  const link = document.createElement("a");
  link.href = url;
  link.download = "Minh-Anh-Hoang-Nam-20-12-2026.ics";
  document.body.append(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 10000);
  toast("Đã tạo lịch hẹn. Mở tệp .ics vừa tải để thêm vào lịch nhé.");
});

function readResponses() {
  try {
    const stored = JSON.parse(localStorage.getItem(WEDDING.storageKey) || "[]");
    return Array.isArray(stored)
      ? stored
          .filter(
            (item) =>
              item &&
              typeof item.name === "string" &&
              typeof item.wish === "string",
          )
          .slice(-30)
      : [];
  } catch {
    return [];
  }
}
function addWish(response, prepend = true) {
  if (!response.wish.trim()) return;
  const card = document.createElement("article");
  card.className = "wish-card";
  const heart = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  heart.setAttribute("class", "icon");
  heart.setAttribute("aria-hidden", "true");
  const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
  use.setAttribute("href", "#i-heart");
  heart.append(use);
  const quote = document.createElement("blockquote");
  quote.textContent = response.wish.slice(0, 600);
  const author = document.createElement("div");
  const avatar = document.createElement("span");
  avatar.className = "wish-avatar";
  avatar.textContent =
    [...response.name.trim()][0]?.toLocaleUpperCase("vi") || "♡";
  const name = document.createElement("p");
  name.append(document.createTextNode(response.name.slice(0, 80)));
  const label = document.createElement("small");
  label.textContent = "LỜI CHÚC TRÊN THIẾT BỊ NÀY";
  name.append(label);
  author.append(avatar, name);
  card.append(heart, quote, author);
  if (prepend) $("#wishes-list").prepend(card);
  else $("#wishes-list").append(card);
}
readResponses().forEach((response) => addWish(response));

const form = $("#rsvp-form");
const result = $("#rsvp-result");
let submitting = false;
$$('input[name="attendance"]').forEach((input) =>
  input.addEventListener("change", () => {
    const coming = $('input[name="attendance"]:checked').value === "yes";
    $(".guest-count-wrap").hidden = !coming;
    $("#guest-count").disabled = !coming;
  }),
);
form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (submitting) return;
  const name = $("#guest-name").value.trim();
  if (!name) {
    $("#guest-name").setCustomValidity("Bạn nhập tên giúp chúng mình nhé.");
    $("#guest-name").reportValidity();
    return;
  }
  const coming = $('input[name="attendance"]:checked').value === "yes";
  const response = {
    name: name.slice(0, 80),
    attendance: coming ? "yes" : "no",
    guests: coming ? Number($("#guest-count").value) : 0,
    wish: $("#guest-wish").value.trim().slice(0, 600),
    createdAt: new Date().toISOString(),
  };
  let saved = true;
  try {
    localStorage.setItem(
      WEDDING.storageKey,
      JSON.stringify([...readResponses(), response].slice(-30)),
    );
  } catch {
    saved = false;
  }
  addWish(response);
  result.textContent = saved
    ? `Cảm ơn ${name}! Đã lưu lời hẹn${response.wish ? " và lời chúc" : ""} trên thiết bị này. Đây là bản xem thử, phản hồi chưa được gửi đến cô dâu chú rể.`
    : `Cảm ơn ${name}! Đã hiển thị lời chúc trong lần xem này. Trình duyệt không cho lưu dữ liệu; phản hồi sẽ mất khi tải lại và chưa được gửi đi.`;
  result.hidden = false;
  submitting = true;
  const submit = $('button[type="submit"]', form);
  submit.disabled = true;
  toast(
    saved
      ? "Đã lưu lời hẹn thử trên thiết bị của bạn ♡"
      : "Trình duyệt chưa cho phép lưu lời hẹn.",
  );
  window.setTimeout(() => {
    submitting = false;
    submit.disabled = false;
  }, 2000);
});
$("#guest-name").addEventListener("input", () => {
  $("#guest-name").setCustomValidity("");
  result.hidden = true;
});
