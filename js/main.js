/**
 * AbhiFY.com - Interactive Engine & Scripts
 * Handles dynamic interactions, email copying, animations & form triggers
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Navigation Scroll Effect
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 2. Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking any nav link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });
  }

  // 3. Dynamic Typewriter Effect
  const typeTarget = document.getElementById('typewriterText');
  if (typeTarget) {
    const phrases = [
      'Full-Stack Developer',
      'Tech Creator & Innovator',
      'Digital Solution Architect',
      'Creative Designer & Coder'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function typeEffect() {
      const currentPhrase = phrases[phraseIndex];
      if (isDeleting) {
        typeTarget.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 40;
      } else {
        typeTarget.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100;
      }

      if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typeSpeed = 1800; // Pause at end of text
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 400; // Pause before typing new text
      }

      setTimeout(typeEffect, typeSpeed);
    }

    typeEffect();
  }

  // 4. One-Click Copy Email
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  const toastMsg = document.getElementById('toastMsg');

  function showToast(message = 'Copied to clipboard!') {
    if (!toastMsg) return;
    toastMsg.textContent = message;
    toastMsg.classList.add('show');
    setTimeout(() => {
      toastMsg.classList.remove('show');
    }, 3000);
  }

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const email = 'mrabhify7080@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast('✓ Email copied: mrabhify7080@gmail.com');
      }).catch(() => {
        // Fallback
        const textarea = document.createElement('textarea');
        textarea.value = email;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast('✓ Email copied: mrabhify7080@gmail.com');
      });
    });
  }

  // 5. Contact Form Handler (Direct mailto trigger + validation feedback)
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('senderName').value.trim();
      const email = document.getElementById('senderEmail').value.trim();
      const subject = document.getElementById('senderSubject').value.trim() || 'New Inquiry from AbhiFY.com';
      const message = document.getElementById('senderMessage').value.trim();

      if (!name || !email || !message) {
        showToast('⚠ Please fill in all required fields.');
        return;
      }

      // Construct mailto link
      const mailtoUrl = `mailto:mrabhify7080@gmail.com?subject=${encodeURIComponent(subject + ' - ' + name)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;

      window.location.href = mailtoUrl;
      showToast('🚀 Opening your email client to send message...');
      contactForm.reset();
    });
  }

  // 6. Dynamic Year in Footer
  const yearSpan = document.getElementById('currentYear');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // 7. Active Nav Link on Scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const navLink = document.querySelector(`.nav-menu a[href*='${sectionId}']`);

      if (navLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLink.classList.add('active');
        } else {
          navLink.classList.remove('active');
        }
      }
    });
  });
});
