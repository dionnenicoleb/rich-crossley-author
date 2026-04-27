/* ══════════════════════════════════════════════
   richcrossley.com — main.js
   Nav · Scroll animations · Mobile menu
   Book mode toggle (waitlist ↔ preorder)
══════════════════════════════════════════════ */

(function () {
  'use strict';

  // ── DOM REFS ──
  const nav        = document.getElementById('nav');
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const yearEl     = document.getElementById('year');

  // Pre-order / waitlist
  const preorderSection = document.getElementById('preorder');
  const waitlistPanel   = document.getElementById('waitlistPanel');
  const preorderPanel   = document.getElementById('preorderPanel');
  const waitlistForm    = document.getElementById('waitlistForm');
  const formSuccess     = document.getElementById('formSuccess');
  const amazonLink      = document.getElementById('amazonLink');

  // ── YEAR ──
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ── NAV: scroll class ──
  function handleNavScroll() {
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  // ── NAV: mobile hamburger ──
  hamburger.addEventListener('click', function () {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  // Close mobile menu on link click
  document.querySelectorAll('.mobile-link').forEach(function (link) {
    link.addEventListener('click', function () {
      mobileMenu.classList.remove('open');
    });
  });

  // ── SCROLL ANIMATIONS ──
  const animatedEls = document.querySelectorAll('.animate-on-scroll');

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  animatedEls.forEach(function (el) {
    observer.observe(el);
  });

  // ── BOOK MODE: waitlist | preorder ──
  // Read from the section's data-mode attribute on load
  // To switch: call window.setBookMode('preorder') or window.setBookMode('waitlist')
  // Or just change the data-mode attribute on #preorder in the HTML

  function applyBookMode(mode) {
    if (!preorderSection || !waitlistPanel || !preorderPanel) return;

    if (mode === 'preorder') {
      waitlistPanel.hidden = true;
      preorderPanel.hidden = false;
      preorderSection.dataset.mode = 'preorder';
    } else {
      waitlistPanel.hidden = false;
      preorderPanel.hidden = true;
      preorderSection.dataset.mode = 'waitlist';
    }
  }

  // Apply on page load from HTML attribute
  applyBookMode(preorderSection ? preorderSection.dataset.mode : 'waitlist');

  // Public API for easy toggling (e.g., from console or CMS)
  window.setBookMode = applyBookMode;

  // Set Amazon URL (call this when the link is ready)
  // window.setAmazonUrl('https://amazon.com/dp/YOUR_ASIN')
  window.setAmazonUrl = function (url) {
    if (amazonLink) {
      amazonLink.href = url;
      console.log('[richcrossley] Amazon URL set to:', url);
    }
  };

  // ── WAITLIST ──
  // Handled by ConvertKit embed (data-uid: 0db01386ce)

})();
