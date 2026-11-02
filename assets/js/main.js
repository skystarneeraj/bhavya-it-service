(function () {
  'use strict';

  // Mobile navigation
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');

  function setNav(open) {
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
  }

  toggle.addEventListener('click', function () {
    setNav(toggle.getAttribute('aria-expanded') !== 'true');
  });
  nav.addEventListener('click', function (event) {
    if (event.target.closest('a')) setNav(false);
  });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && nav.classList.contains('is-open')) {
      setNav(false);
      toggle.focus();
    }
  });

  // Scroll reveal
  var pending = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  var revealTimer = null;

  function revealInView() {
    revealTimer = null;
    var limit = window.innerHeight * 0.92;
    pending = pending.filter(function (el) {
      if (el.getBoundingClientRect().top < limit) {
        el.classList.add('is-visible');
        return false;
      }
      return true;
    });
    if (!pending.length) {
      window.removeEventListener('scroll', queueReveal);
      window.removeEventListener('resize', queueReveal);
    }
  }

  function queueReveal() {
    if (revealTimer === null) revealTimer = setTimeout(revealInView, 60);
  }

  window.addEventListener('scroll', queueReveal, { passive: true });
  window.addEventListener('resize', queueReveal);
  window.addEventListener('load', queueReveal);
  revealInView();

  // Enquiry form: hands the message to the visitor's email app
  var form = document.getElementById('contact-form');
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    var data = new FormData(form);
    var subject = 'Website enquiry from ' + data.get('name');
    var body = 'Name: ' + data.get('name') + '\n' +
      'Phone: ' + data.get('phone') + '\n\n' +
      data.get('message');
    window.location.href = 'mailto:bhavya.it@gmail.com,Kumarmithun094@gmail.com' +
      '?subject=' + encodeURIComponent(subject) +
      '&body=' + encodeURIComponent(body);
  });

  document.getElementById('year').textContent = new Date().getFullYear();
})();
