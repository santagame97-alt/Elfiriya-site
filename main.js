/**
 * Elfiriyaa Streamer Website - Main JavaScript
 * Handles entrance animations and interactive functionality
 */

// Entrance Animations
document.addEventListener('DOMContentLoaded', () => {
  // Get all elements with the animate-in class
  const animateElements = document.querySelectorAll('.animate-in');
  
  // Stagger the animations with a delay between each element
  animateElements.forEach((element, index) => {
    setTimeout(() => {
      element.classList.add('visible');
    }, index * 100); // 100ms delay between each element
  });
});

// Optional: Track social link clicks for analytics
function trackSocialClick(platform) {
  console.log(`Social link clicked: ${platform}`);
  // Future: Could integrate with analytics service here
}

// Add click tracking to social links
document.addEventListener('DOMContentLoaded', () => {
  const socialLinks = document.querySelectorAll('.social-link');
  
  socialLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      // Extract platform name from class list
      const platform = Array.from(link.classList)
        .find(cls => ['twitch', 'youtube', 'instagram', 'twitter', 'discord'].includes(cls));
      
      if (platform) {
        trackSocialClick(platform);
      }
    });
  });
});

// Keyboard Navigation Enhancements
document.addEventListener('DOMContentLoaded', () => {
  const socialLinks = document.querySelectorAll('.social-link');
  
  // Add keyboard event handlers for better navigation
  socialLinks.forEach((link, index) => {
    link.addEventListener('keydown', (e) => {
      // Handle Enter and Space keys to activate links
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        link.click();
      }
      
      // Arrow key navigation between social links
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        const nextIndex = (index + 1) % socialLinks.length;
        socialLinks[nextIndex].focus();
      }
      
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        const prevIndex = (index - 1 + socialLinks.length) % socialLinks.length;
        socialLinks[prevIndex].focus();
      }
      
      // Home key - focus first link
      if (e.key === 'Home') {
        e.preventDefault();
        socialLinks[0].focus();
      }
      
      // End key - focus last link
      if (e.key === 'End') {
        e.preventDefault();
        socialLinks[socialLinks.length - 1].focus();
      }
    });
  });
});

// Announce page load to screen readers
document.addEventListener('DOMContentLoaded', () => {
  // Create a live region for announcements
  const liveRegion = document.createElement('div');
  liveRegion.setAttribute('role', 'status');
  liveRegion.setAttribute('aria-live', 'polite');
  liveRegion.setAttribute('aria-atomic', 'true');
  liveRegion.className = 'sr-only';
  document.body.appendChild(liveRegion);
  
  // Announce when page is fully loaded
  setTimeout(() => {
    liveRegion.textContent = 'Page loaded. Welcome to Elfiriya\'s page.';
  }, 1000);
});

// About Me Toggle Functionality
document.addEventListener('DOMContentLoaded', () => {
  const aboutToggles = document.querySelectorAll('.about-toggle');
  
  aboutToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const contentId = toggle.getAttribute('aria-controls');
      const content = document.getElementById(contentId);
      const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
      
      // Toggle aria-expanded
      toggle.setAttribute('aria-expanded', !isExpanded);
      
      // Toggle active class
      toggle.classList.toggle('active');
      content.classList.toggle('active');
      
      // Auto-scroll when opening "Найди меня здесь"
      if (contentId === 'social-content' && !isExpanded) {
        setTimeout(() => {
          content.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'nearest' 
          });
        }, 300);
      }
    });
  });
});


// Modal Window Functionality
document.addEventListener('DOMContentLoaded', () => {
  const modalOverlay = document.getElementById('modal-overlay');
  const modalTitle = document.querySelector('.modal-title');
  const modalDescription = document.querySelector('.modal-description');
  const modalButton = document.querySelector('.modal-button');
  const modalClose = document.querySelector('.modal-close');
  
  // Modal content data
  const modalData = {
    twitch: {
      title: 'Twitch',
      description: 'Заглядывайте на мой уютный Twitch канал Elfi_ria. Вас ждут интересные стримы и приятная атмосфера. Будем вместе играть, общаться и весело проводить время. Подписывайтесь, чтобы не пропустить новые трансляции. Обещаю, вам понравится! Заходите, буду рада видеть каждого из вас.',
      url: 'https://www.twitch.tv/elfi_riya'
    },
    instagram: {
      title: 'Instagram',
      description: 'Мои фоточки ❤️',
      url: 'https://www.instagram.com/elfi_riya_tatoo/profilecard/?igsh=eTN3d2g4aXQ2NGo3'
    },
    telegram: {
      title: 'Telegram',
      description: 'Тут моя жизнь и анонсы 💜',
      url: 'https://t.me/elfi_ria'
    },
    donate: {
      title: 'Донат',
      description: 'Тут не чего описывать 💸',
      url: 'https://www.donationalerts.com/r/elfi_riya'
    },
    discord: {
      title: 'Discord',
      description: 'Присоединяйтесь к нашему Discord серверу! Общайтесь с другими зрителями, участвуйте в ивентах и просто весело проводите время! 🎮',
      url: 'https://discord.gg/sf3K5ca6yV'
    },
    setup: {
      title: 'Мой Сетап',
      description: `GPU - RTX 3080 TI
CPU - Ryzen 7 5800x
RAM - 16GB DDR4
Монитор - MSI 144hz
Мышь - ATK Dragonfly F1 Pro MOBA
Клавиатура - Royal Kludge
Наушники - Logitech G435
Микрофон - Fifine A8`,
      url: null
    },
    steam: {
      title: 'Steam Трейд',
      description: 'Хотите обменяться предметами? Нажмите кнопку ниже, чтобы отправить мне предложение обмена в Steam! 🎮',
      url: 'https://steamcommunity.com/tradeoffer/new/?partner=1274283181&token=Jup0Iw2u'
    }
  };
  
  // Open modal function
  function openModal(type) {
    const data = modalData[type];
    if (!data) return;
    
    modalTitle.textContent = data.title;
    modalDescription.textContent = data.description;
    
    if (data.url) {
      modalButton.href = data.url;
      modalButton.style.display = 'inline-block';
      modalButton.textContent = type === 'donate' ? 'Задонатить' : 
                                 type === 'steam' ? 'Отправить Трейд' : 
                                 type === 'twitch' ? 'Смотреть Стримы' :
                                 type === 'instagram' ? 'Открыть Instagram' :
                                 type === 'telegram' ? 'Открыть Telegram' :
                                 type === 'discord' ? 'Присоединиться' :
                                 'Перейти';
    } else {
      modalButton.style.display = 'none';
    }
    
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  
  // Close modal function
  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  // Add click listeners to all social link buttons
  document.querySelectorAll('[data-modal]').forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const modalType = button.getAttribute('data-modal');
      openModal(modalType);
    });
  });
  
  // Close modal on close button click
  modalClose.addEventListener('click', closeModal);
  
  // Close modal on overlay click
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });
  
  // Close modal on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });
});
