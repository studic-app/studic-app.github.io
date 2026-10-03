(function () {
  "use strict";

  var root = document.documentElement;
  var params = new URLSearchParams(window.location.search);
  var embed =
    params.get("embed") === "1" || /StudicApp\//.test(navigator.userAgent || "");

  if (embed) root.setAttribute("data-embed", "");

  var themeParam = params.get("theme");
  if (themeParam !== "light" && themeParam !== "dark") themeParam = null;

  var stored = null;
  if (!embed) {
    try {
      stored = window.localStorage.getItem("studic-theme");
    } catch (e) {
      stored = null;
    }
  }

  var theme = themeParam || (stored === "dark" ? "dark" : "light");

  function applyTheme(next) {
    theme = next;
    if (next === "dark") root.setAttribute("data-theme", "dark");
    else root.removeAttribute("data-theme");
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", next === "dark" ? "#3a2e23" : "#ffb076");
  }
  applyTheme(theme);

  function openTarget() {
    var id = decodeURIComponent((window.location.hash || "").slice(1));
    if (!id) return;
    var el = document.getElementById(id);
    if (!el) return;
    var d = el.closest("details");
    while (d) {
      d.open = true;
      d = d.parentElement ? d.parentElement.closest("details") : null;
    }
    if (el.scrollIntoView) el.scrollIntoView();
  }

  function carryEmbedParams() {
    if (!embed) return;
    var links = document.querySelectorAll("a[href]");
    for (var i = 0; i < links.length; i++) {
      var a = links[i];
      var raw = a.getAttribute("href");
      if (!raw || raw.charAt(0) === "#" || a.target === "_blank") continue;
      var url;
      try {
        url = new URL(raw, window.location.href);
      } catch (e) {
        continue;
      }
      if (url.protocol.indexOf("http") !== 0 || url.origin !== window.location.origin) continue;
      url.searchParams.set("embed", "1");
      if (themeParam) url.searchParams.set("theme", themeParam);
      a.setAttribute("href", url.pathname + url.search + url.hash);
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    var toggle = document.getElementById("theme-toggle");
    if (toggle) {
      var sync = function () {
        toggle.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
        toggle.setAttribute(
          "aria-label",
          theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
        );
      };
      sync();
      toggle.addEventListener("click", function () {
        var next = theme === "dark" ? "light" : "dark";
        applyTheme(next);
        try {
          window.localStorage.setItem("studic-theme", next);
        } catch (e) {

        }
        sync();
      });
    }

    var menuBtn = document.getElementById("menu-toggle");
    var nav = document.getElementById("site-nav");
    if (menuBtn && nav) {
      menuBtn.addEventListener("click", function () {
        var open = nav.classList.toggle("open");
        menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
      });
      nav.addEventListener("click", function (e) {
        if (e.target.tagName === "A") {
          nav.classList.remove("open");
          menuBtn.setAttribute("aria-expanded", "false");
        }
      });
    }

    carryEmbedParams();
    openTarget();
  });

  window.addEventListener("hashchange", openTarget);
})();
