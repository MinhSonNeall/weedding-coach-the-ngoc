"use strict";

(() => {
  const root = document.documentElement;
  const loader = document.querySelector("#page-loader");
  const emblem = loader.querySelector(".loader-emblem");
  const main = document.querySelector("main");
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
  const revealTargets = new Set(document.querySelectorAll(".reveal"));
  let observer;
  let ready = false;
  let finishing = false;

  // Long text columns enter a paragraph at a time; cards remain a single unit.
  document
    .querySelectorAll(
      ".hero-copy, .invitation-intro, .venue-copy, .rsvp-copy, .dresscode-section",
    )
    .forEach((column) => {
      column.classList.remove("reveal");
      revealTargets.delete(column);
      for (const child of column.children) {
        if (child.matches(".intro-flower")) continue;
        child.classList.add("reveal");
        revealTargets.add(child);
      }
    });
  document
    .querySelectorAll(".hero-collage, .ribbon, .closing, footer")
    .forEach((element) => {
      element.classList.add("reveal");
      revealTargets.add(element);
    });
  if ("IntersectionObserver" in window && !reducedMotion.matches) {
    root.classList.add("motion-ready");
  }

  function show(element) {
    element.classList.add("is-visible");
    observer?.unobserve(element);
  }

  function startReveals() {
    if (ready) return;
    ready = true;
    main.removeAttribute("aria-busy");
    if (!root.classList.contains("motion-ready")) return;
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) show(entry.target);
        }
      },
      { threshold: 0.06, rootMargin: "0px 0px -45px 0px" },
    );
    requestAnimationFrame(() => {
      for (const element of revealTargets) observer.observe(element);
    });
  }
  document.addEventListener("wedding:ready", startReveals, { once: true });
  // Keyboard navigation must never land on an invisible link or form.
  document.addEventListener("focusin", (event) => {
    let element = event.target.closest(".reveal");
    while (element) {
      show(element);
      element = element.parentElement?.closest(".reveal");
    }
  });
  reducedMotion.addEventListener("change", (event) => {
    if (event.matches) {
      root.classList.remove("motion-ready");
      observer?.disconnect();
    }
  });

  function unveil() {
    if (!root.classList.contains("is-loading")) {
      startReveals();
      return;
    }
    clearTimeout(window.weddingBootTimer);
    emblem.classList.add("is-finished");
    root.classList.add("is-unveiling");
    root.classList.remove("is-loading");
    document.dispatchEvent(new Event("wedding:ready"));
    setTimeout(
      () => {
        loader.hidden = true;
        root.classList.remove("is-unveiling");
      },
      reducedMotion.matches ? 0 : 650,
    );
  }

  function finishOnLogo() {
    if (finishing) return;
    finishing = true;
    if (reducedMotion.matches || document.hidden) {
      unveil();
      return;
    }
    // End at the complete LN mark, rather than halfway through its dot phase.
    const monogram = loader.querySelector(".loader-monogram");
    const fallback = setTimeout(complete, 2200);
    function complete() {
      clearTimeout(fallback);
      monogram.removeEventListener("animationiteration", complete);
      unveil();
    }
    monogram.addEventListener("animationiteration", complete, { once: true });
  }

  function imageReady(image) {
    image.loading = "eager";
    return image.decode();
  }

  if (!root.classList.contains("is-loading")) {
    startReveals();
    return;
  }
  main.setAttribute("aria-busy", "true");
  const audio = document.querySelector("#background-music");
  const controller = new AbortController();
  const pageLoaded =
    document.readyState === "complete"
      ? Promise.resolve()
      : new Promise((resolve) =>
          window.addEventListener("load", resolve, { once: true }),
        );
  const assets = [
    pageLoaded.then(() => document.fonts?.ready),
    ...[...document.images]
      .filter((image) => image.getAttribute("src"))
      .map(imageReady),
  ];
  if (audio?.src) {
    // Include the full music file; native preload may stop after a small buffer.
    // The existing player keeps control of autoplay, explicit mute and position.
    assets.push(
      fetch(audio.src, { signal: controller.signal }).then((response) => {
        if (!response.ok) throw new Error("Audio unavailable");
        return response.arrayBuffer();
      }),
    );
  }
  const timeout = setTimeout(() => {
    controller.abort();
    finishOnLogo();
  }, 14000);
  Promise.allSettled(assets).then(() => {
    clearTimeout(timeout);
    finishOnLogo();
  });
  window.addEventListener("pageshow", (event) => {
    if (event.persisted) {
      clearTimeout(timeout);
      controller.abort();
      clearTimeout(window.weddingBootTimer);
      root.classList.remove("is-loading", "is-unveiling");
      loader.hidden = true;
      startReveals();
    }
  });
})();
