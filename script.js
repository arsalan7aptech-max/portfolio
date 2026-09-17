/**
 * Portfolio Interactive Script
 * Features:
 * - Theme Switcher (Dark/Light with localStorage persistence)
 * - Dynamic Typewriter Text in Hero Section
 * - Scroll Progress Bar & Sticky Header
 * - Mobile Navigation Toggle & Auto-Close
 * - Active Navigation Link Tracking
 * - Number Counter Animation for Stats
 * - Animate Skill Progress Bars on Scroll
 * - Category Filtering for Projects
 * - Quick Preview Modal for Projects
 * - Contact Form Validation & Simulated Submission
 * - Back to Top Floating Button
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Current Year in Footer
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // 2. Dark / Light Mode Switcher
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlRoot = document.documentElement;

  // Check saved theme or system preference
  const savedTheme = localStorage.getItem('portfolio_theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
  htmlRoot.setAttribute('data-theme', initialTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlRoot.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      htmlRoot.setAttribute('data-theme', newTheme);
      localStorage.setItem('portfolio_theme', newTheme);
    });
  }

  // 3. Mobile Navigation Menu
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      mobileToggle.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileToggle.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close mobile menu on resize past tablet breakpoint
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768 && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        mobileToggle.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // 4. Scroll Progress & Sticky Navbar & Back to Top
  const scrollProgressBar = document.getElementById('scroll-progress');
  const navbar = document.getElementById('navbar');
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercentage = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    if (scrollProgressBar) {
      scrollProgressBar.style.width = `${scrollPercentage}%`;
    }

    // Sticky Navbar shrink
    if (navbar) {
      if (scrollTop > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // Back to Top button visibility
    if (backToTopBtn) {
      if (scrollTop > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 5. Dynamic Typewriter Effect in Hero Section
  const typewriterElement = document.getElementById('typewriter');
  const roles = [
    'Full Stack Developer',
    'Frontend Specialist',
    'UI/UX Enthusiast',
    'Creative Problem Solver',
    'Open Source Contributor'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function typeEffect() {
    if (!typewriterElement) return;

    const currentRole = roles[roleIndex];
    if (isDeleting) {
      typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      // Pause at full text
      isDeleting = true;
      typingSpeed = 1800;
    } else if (isDeleting && charIndex === 0) {
      // Move to next word
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 400;
    }

    setTimeout(typeEffect, typingSpeed);
  }

  typeEffect();

  // 6. Active Navigation Link Highlighting via IntersectionObserver
  const sections = document.querySelectorAll('main section');
  const observerOptions = {
    root: null,
    rootMargin: '-30% 0px -40% 0px',
    threshold: 0
  };

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const currentId = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${currentId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => navObserver.observe(section));

  // 7. Stat Counters Animation
  const statNumbers = document.querySelectorAll('.stat-number');
  let animatedStats = false;

  function animateCounters() {
    statNumbers.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'), 10);
      const isPercent = counter.textContent.includes('%');
      const isPlus = counter.textContent.includes('+');
      let count = 0;
      const step = Math.ceil(target / 40);

      const updateCount = () => {
        count += step;
        if (count >= target) {
          counter.textContent = `${target}${isPercent ? '%' : isPlus ? '+' : ''}`;
        } else {
          counter.textContent = `${count}${isPercent ? '%' : isPlus ? '+' : ''}`;
          requestAnimationFrame(updateCount);
        }
      };

      updateCount();
    });
  }

  const aboutSection = document.getElementById('about');
  if (aboutSection) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animatedStats) {
          animateCounters();
          animatedStats = true;
        }
      });
    }, { threshold: 0.3 });

    statsObserver.observe(aboutSection);
  }

  // 8. Skill Progress Bars Animation
  const skillFills = document.querySelectorAll('.skill-fill');
  const skillsSection = document.getElementById('skills');
  let animatedSkills = false;

  function animateSkills() {
    skillFills.forEach(fill => {
      const width = fill.getAttribute('data-width');
      if (width) {
        fill.style.width = width;
      }
    });
  }

  if (skillsSection) {
    const skillsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animatedSkills) {
          animateSkills();
          animatedSkills = true;
        }
      });
    }, { threshold: 0.25 });

    skillsObserver.observe(skillsSection);
  }

  // 9. Project Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active button class
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.classList.remove('hidden');
          // Add quick scale-in animation
          card.style.animation = 'fadeInCard 0.4s ease forwards';
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // 10. Project Quick View Modal
  const modal = document.getElementById('project-modal');
  const modalOverlay = document.getElementById('modal-overlay');
  const modalCloseBtn = document.getElementById('modal-close');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalTags = document.getElementById('modal-tags');
  const modalBanner = document.getElementById('modal-banner');
  const modalDemoLink = document.getElementById('modal-demo-link');
  const modalCodeLink = document.getElementById('modal-code-link');

  const previewButtons = document.querySelectorAll('.preview-btn');

  function openModal(data) {
    if (!modal) return;
    modalTitle.textContent = data.title;
    modalDesc.textContent = data.desc;
    modalDemoLink.href = data.demo;
    modalCodeLink.href = data.code;

    // Populate tags
    modalTags.innerHTML = '';
    const tags = data.tags.split(',');
    tags.forEach(tagText => {
      const span = document.createElement('span');
      span.className = 'tag';
      span.textContent = tagText.trim();
      modalTags.appendChild(span);
    });

    // Icon or decorative banner
    modalBanner.innerHTML = data.icon || '🚀';

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  previewButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const card = btn.closest('.project-card');
      const icon = card ? card.querySelector('.banner-overlay-icon')?.textContent : '💻';

      const data = {
        title: btn.getAttribute('data-title'),
        desc: btn.getAttribute('data-desc'),
        tags: btn.getAttribute('data-tags'),
        demo: btn.getAttribute('data-demo'),
        code: btn.getAttribute('data-code'),
        icon: icon
      };
      openModal(data);
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalOverlay) modalOverlay.addEventListener('click', closeModal);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('open')) {
      closeModal();
    }
  });

  // 11. Download CV Button Notification
  const cvBtn = document.getElementById('cv-download-btn');
  if (cvBtn) {
    cvBtn.addEventListener('click', (e) => {
      e.preventDefault();
      // Provide an interactive toast feedback
      showNotification('📄 Resume download initiated! (Demo file: Nasrullah_Resume.pdf)', 'success');
    });
  }

  // 12. Contact Form Validation & Submission
  const contactForm = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');
  const formStatus = document.getElementById('form-status');

  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const subjectInput = document.getElementById('subject');
  const messageInput = document.getElementById('message');

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function clearErrors() {
    document.querySelectorAll('.field-error').forEach(el => el.textContent = '');
    document.querySelectorAll('.form-control').forEach(el => el.classList.remove('error'));
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      clearErrors();

      let hasError = false;

      // Validate Name
      if (!nameInput.value.trim()) {
        document.getElementById('name-error').textContent = 'Please enter your name.';
        nameInput.classList.add('error');
        hasError = true;
      }

      // Validate Email
      if (!emailInput.value.trim()) {
        document.getElementById('email-error').textContent = 'Please enter your email address.';
        emailInput.classList.add('error');
        hasError = true;
      } else if (!validateEmail(emailInput.value.trim())) {
        document.getElementById('email-error').textContent = 'Please enter a valid email address.';
        emailInput.classList.add('error');
        hasError = true;
      }

      // Validate Subject
      if (!subjectInput.value.trim()) {
        document.getElementById('subject-error').textContent = 'Please enter a subject.';
        subjectInput.classList.add('error');
        hasError = true;
      }

      // Validate Message
      if (!messageInput.value.trim()) {
        document.getElementById('message-error').textContent = 'Please enter your message.';
        messageInput.classList.add('error');
        hasError = true;
      } else if (messageInput.value.trim().length < 10) {
        document.getElementById('message-error').textContent = 'Message should be at least 10 characters long.';
        messageInput.classList.add('error');
        hasError = true;
      }

      if (hasError) return;

      // Simulated Asynchronous Sending state
      const originalBtnHtml = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="spin-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite; width: 18px; height: 18px;">
          <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
          <path d="M12 2a10 10 0 0 1 10 10" stroke-opacity="1"></path>
        </svg>
        <span>Sending Message...</span>
      `;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHtml;

        // Show Success Banner
        formStatus.className = 'form-status success';
        formStatus.textContent = '🎉 Thank you! Your message has been sent successfully. I will get back to you shortly.';
        formStatus.style.display = 'block';

        // Reset form fields
        contactForm.reset();

        // Auto hide success banner after 6 seconds
        setTimeout(() => {
          formStatus.style.display = 'none';
        }, 6000);
      }, 1500);
    });
  }

  // Toast notification helper
  function showNotification(msg, type) {
    let toast = document.getElementById('portfolio-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'portfolio-toast';
      toast.style.position = 'fixed';
      toast.style.bottom = '90px';
      toast.style.right = '30px';
      toast.style.padding = '14px 22px';
      toast.style.borderRadius = '12px';
      toast.style.background = 'var(--bg-secondary)';
      toast.style.color = 'var(--text-primary)';
      toast.style.border = '1px solid var(--accent-primary)';
      toast.style.boxShadow = 'var(--shadow-lg)';
      toast.style.zIndex = '3000';
      toast.style.transition = 'all 0.3s ease';
      toast.style.fontSize = '0.9rem';
      toast.style.fontWeight = '600';
      document.body.appendChild(toast);
    }

    toast.textContent = msg;
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(15px)';
    }, 3500);
  }
});
