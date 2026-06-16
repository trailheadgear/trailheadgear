/**
 * Trailhead Gear - Main JavaScript
 * Handles: mobile menu, smooth scrolling, affiliate link tracking, schema breadcrumbs
 */

(function() {
  'use strict';

  // --- Mobile menu toggle ---
  document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    if (menuBtn && navLinks) {
      menuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('open');
      });
    }

    // Close mobile menu when clicking a link
    navLinks.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        navLinks.classList.remove('open');
      });
    });
  });

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // --- Affiliate link click tracking (privacy-friendly, no cookies) ---
  document.querySelectorAll('a[href*="amazon.com"]').forEach(function(link) {
    link.addEventListener('click', function() {
      // Log to analytics if you ever add it. For now, no-op.
      // console.log('Affiliate click: ' + this.href);
    });
  });

  // --- Lazy load images when they come into viewport ---
  if ('IntersectionObserver' in window) {
    var lazyObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          lazyObserver.unobserve(img);
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach(function(img) {
      lazyObserver.observe(img);
    });
  }

  // --- Generate Table of Contents for blog posts ---
  var tocContainer = document.querySelector('.toc');
  if (tocContainer) {
    var toc = document.createElement('ul');
    toc.style.listStyle = 'none';
    toc.style.paddingLeft = '0';

    document.querySelectorAll('.blog-content h2, .blog-content h3').forEach(function(heading, index) {
      var id = heading.id || 'section-' + index;
      heading.id = id;
      var li = document.createElement('li');
      li.style.marginLeft = heading.tagName === 'H3' ? '16px' : '0';
      li.style.marginBottom = '4px';
      var a = document.createElement('a');
      a.href = '#' + id;
      a.textContent = heading.textContent;
      li.appendChild(a);
      toc.appendChild(li);
    });

    tocContainer.appendChild(toc);
  }

  // --- "Back to Top" button ---
  var backBtn = document.createElement('button');
  backBtn.innerHTML = '↑';
  backBtn.setAttribute('aria-label', '返回顶部');
  backBtn.style.cssText = 'position:fixed;bottom:24px;right:24px;width:44px;height:44px;' +
    'background:#2D5016;color:#fff;border:none;border-radius:50%;font-size:1.4rem;' +
    'cursor:pointer;z-index:99;display:none;box-shadow:0 2px 8px rgba(0,0,0,0.2);';
  document.body.appendChild(backBtn);

  window.addEventListener('scroll', function() {
    backBtn.style.display = window.scrollY > 400 ? 'block' : 'none';
  });

  backBtn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

})();
