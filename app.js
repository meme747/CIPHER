document.addEventListener('DOMContentLoaded', () => {
  // Background Music Control
  const backgroundMusic = document.getElementById('background-music');
  const musicToggleBtn = document.createElement('button');
  musicToggleBtn.innerHTML = '🎵';
  musicToggleBtn.classList.add('music-toggle-btn');
  document.body.appendChild(musicToggleBtn);

  // Styles for music toggle button
  musicToggleBtn.style.position = 'fixed';
  musicToggleBtn.style.bottom = '20px';
  musicToggleBtn.style.right = '20px';
  musicToggleBtn.style.zIndex = '1000';
  musicToggleBtn.style.background = 'var(--primary-color)';
  musicToggleBtn.style.color = 'var(--bg-color)';
  musicToggleBtn.style.border = 'none';
  musicToggleBtn.style.borderRadius = '50%';
  musicToggleBtn.style.width = '50px';
  musicToggleBtn.style.height = '50px';
  musicToggleBtn.style.fontSize = '20px';
  musicToggleBtn.style.cursor = 'pointer';
  musicToggleBtn.style.boxShadow = '0 0 10px rgba(0, 255, 255, 0.5)';

  let isMusicPlaying = false;

  musicToggleBtn.addEventListener('click', () => {
    if (!isMusicPlaying) {
      backgroundMusic.play();
      musicToggleBtn.innerHTML = '🔇';
      isMusicPlaying = true;
    } else {
      backgroundMusic.pause();
      musicToggleBtn.innerHTML = '🎵';
      isMusicPlaying = false;
    }
  });

  // Start playing music when page loads
  backgroundMusic.play()
    .then(() => {
      isMusicPlaying = true;
      musicToggleBtn.innerHTML = '🔇';
    })
    .catch(error => {
      console.log('Autoplay was prevented:', error);
      // This can happen due to browser autoplay restrictions
      musicToggleBtn.innerHTML = '🎵';
    });

  // Animate hero section
  gsap.from('.hero-content', {
    opacity: 0,
    y: 50,
    duration: 1,
    ease: 'power3.out'
  });

  gsap.from('.hero-image img', {
    opacity: 0,
    x: 100,
    duration: 1,
    delay: 0.5,
    ease: 'power3.out'
  });

  // Animate social icons
  gsap.utils.toArray('.social-logo').forEach(logo => {
    logo.addEventListener('mouseenter', () => {
      gsap.to(logo, {
        scale: 1.2,
        duration: 0.3,
        ease: 'power1.inOut'
      });
    });

    logo.addEventListener('mouseleave', () => {
      gsap.to(logo, {
        scale: 1,
        duration: 0.3,
        ease: 'power1.inOut'
      });
    });
  });

  // Add hover effect to top social logos
  gsap.utils.toArray('.top-social-logo').forEach(logo => {
    logo.addEventListener('mouseenter', () => {
      gsap.to(logo, {
        scale: 1.2,
        duration: 0.3,
        ease: 'power1.inOut'
      });
    });

    logo.addEventListener('mouseleave', () => {
      gsap.to(logo, {
        scale: 1,
        duration: 0.3,
        ease: 'power1.inOut'
      });
    });
  });

  // Add hover effect to marquee images
  const marqueeImages = document.querySelectorAll('.marquee-content img');
  marqueeImages.forEach(img => {
    img.addEventListener('mouseenter', () => {
      gsap.to(img, {
        scale: 1.1,
        duration: 0.3,
        ease: 'power1.inOut'
      });
    });

    img.addEventListener('mouseleave', () => {
      gsap.to(img, {
        scale: 1,
        duration: 0.3,
        ease: 'power1.inOut'
      });
    });
  });

  // Add smoke effect
  function createSmokeEffect() {
    const smokeContainer = document.createElement('div');
    smokeContainer.classList.add('smoke-container');
    document.body.appendChild(smokeContainer);

    function createSmokePuff() {
      const smoke = document.createElement('div');
      smoke.classList.add('smoke-particle');
      
      // Randomize position
      smoke.style.left = `${Math.random() * 100}%`;
      
      // Randomize animation duration
      const duration = Math.random() * 10 + 5;
      smoke.style.setProperty('--duration', `${duration}s`);
      
      smokeContainer.appendChild(smoke);

      // Animate
      gsap.fromTo(smoke, 
        { 
          opacity: 0, 
          scale: 0.5, 
          y: 0 
        },
        { 
          opacity: [0, 0.5, 0],
          scale: [0.5, 1.5],
          y: -window.innerHeight,
          duration: duration,
          ease: 'power1.inOut',
          onComplete: () => {
            smokeContainer.removeChild(smoke);
            createSmokePuff();
          }
        }
      );
    }

    // Create initial smoke puffs
    for (let i = 0; i < 5; i++) {
      createSmokePuff();
    }
  }

  createSmokeEffect();

  // Animate about section
  gsap.from('.about-section', {
    opacity: 0,
    y: 50,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.about-section',
      start: 'top 80%'
    }
  });

  // Add Cipher Generation Modal
  const generateCipherBtn = document.getElementById('generate-cipher-btn');
  const claimCipherBtn = document.getElementById('claim-cipher-btn');

  function createModal(title, content) {
    // Create modal
    const modal = document.createElement('div');
    modal.classList.add('modal');
    
    modal.innerHTML = `
      <div class="modal-content">
        <h2>${title}</h2>
        <p>${content}</p>
        <button class="modal-close">Close</button>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', () => {
      document.body.removeChild(modal);
    });
    
    // Show modal with animation
    gsap.fromTo(modal, 
      { opacity: 0, scale: 0.8 },
      { 
        opacity: 1, 
        scale: 1, 
        duration: 0.3, 
        ease: 'power1.out',
        onStart: () => {
          modal.style.display = 'flex';
        }
      }
    );
  }

  generateCipherBtn.addEventListener('click', (event) => {
    // Intense button press effect
    gsap.to(generateCipherBtn, {
      scale: 0.9,
      duration: 0.1,
      ease: 'power1.inOut',
      onComplete: () => {
        gsap.to(generateCipherBtn, {
          scale: 1,
          duration: 0.1,
          ease: 'power1.inOut'
        });
      }
    });

    // Create a burst of particles
    createTokenGenerationEffect(event);

    // Show generation modal
    createModal(
      'Cipher Generation', 
      'Generating 100 Cipher... Please connect your wallet to proceed.'
    );
  });

  // Particle generation effect for token generation
  function createTokenGenerationEffect(event) {
    const particlesContainer = document.createElement('div');
    particlesContainer.classList.add('token-particles-container');
    document.body.appendChild(particlesContainer);

    // Generate multiple particles
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.classList.add('token-particle');

      // Randomize particle properties
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 200 + 100;
      const color = `hsl(${Math.random() * 360}, 50%, 50%)`;

      particle.style.backgroundColor = color;

      // Position particles around click point
      gsap.fromTo(particle, 
        { 
          x: event.clientX, 
          y: event.clientY,
          scale: 0,
          opacity: 1
        },
        {
          x: event.clientX + Math.cos(angle) * distance,
          y: event.clientY + Math.sin(angle) * distance,
          scale: 0,
          opacity: 0,
          duration: 1,
          ease: 'power2.out',
          onStart: () => {
            particlesContainer.appendChild(particle);
          },
          onComplete: () => {
            particlesContainer.removeChild(particle);
          }
        }
      );
    }

    // Remove container after effect
    setTimeout(() => {
      document.body.removeChild(particlesContainer);
    }, 1500);
  }

  // Animate generate button
  gsap.fromTo(generateCipherBtn, 
    { scale: 1 },
    { 
      scale: [1, 1.1, 1], 
      duration: 0.5, 
      ease: 'power1.inOut',
      repeat: 1
    }
  );

  // Copy Contract Address
  const copyAddressBtn = document.querySelector('.copy-address-btn');
  const contractAddressCode = document.querySelector('.contract-address-box code');

  copyAddressBtn.addEventListener('click', () => {
    // Create a temporary textarea to copy text
    const tempTextArea = document.createElement('textarea');
    tempTextArea.value = contractAddressCode.textContent;
    document.body.appendChild(tempTextArea);
    tempTextArea.select();
    document.execCommand('copy');
    document.body.removeChild(tempTextArea);

    // Animate button to show copied
    gsap.to(copyAddressBtn, {
      backgroundColor: '#00ff00',
      color: '#000',
      duration: 0.3,
      onComplete: () => {
        gsap.to(copyAddressBtn, {
          backgroundColor: 'var(--primary-color)',
          color: 'var(--bg-color)',
          duration: 0.3,
          delay: 0.5
        });
      }
    });

    // Optional: Show tooltip or temporary text
    const originalText = copyAddressBtn.textContent;
    copyAddressBtn.textContent = 'Copied!';
    setTimeout(() => {
      copyAddressBtn.textContent = originalText;
    }, 2000);
  });

  // Animate contact address section
  gsap.from('.contact-address-section', {
    opacity: 0,
    y: 50,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.contact-address-section',
      start: 'top 80%'
    }
  });
});