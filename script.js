// ========================================
// TRADUCTION AUTOMATIQUE FR / EN
// Bascule tout le contenu du site entre le français
// et l'anglais au clic sur le bouton de langue.
// ========================================
(function () {
  const STORAGE_KEY = 'lw_lang';

  function applyLang(lang) {
    if (typeof I18N_DATA === 'undefined') return;

    document.documentElement.setAttribute('lang', lang);

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const entry = I18N_DATA[el.getAttribute('data-i18n')];
      if (entry && entry[lang]) el.textContent = entry[lang];
    });

    document.querySelectorAll('[data-i18n-alt]').forEach((el) => {
      const entry = I18N_DATA[el.getAttribute('data-i18n-alt')];
      if (entry && entry[lang]) el.setAttribute('alt', entry[lang]);
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      const entry = I18N_DATA[el.getAttribute('data-i18n-placeholder')];
      if (entry && entry[lang]) el.setAttribute('placeholder', entry[lang]);
    });

    document.querySelectorAll('[data-i18n-aria]').forEach((el) => {
      const entry = I18N_DATA[el.getAttribute('data-i18n-aria')];
      if (entry && entry[lang]) el.setAttribute('aria-label', entry[lang]);
    });

    document.querySelectorAll('[data-i18n-service]').forEach((el) => {
      const entry = I18N_DATA[el.getAttribute('data-i18n-service')];
      if (entry && entry[lang]) el.setAttribute('data-service', entry[lang]);
    });

    document.querySelectorAll('[data-i18n-desc]').forEach((el) => {
      const entry = I18N_DATA[el.getAttribute('data-i18n-desc')];
      if (entry && entry[lang]) el.setAttribute('data-description', entry[lang]);
    });

    const titleEl = document.querySelector('title[data-i18n-title]');
    if (titleEl) {
      const entry = I18N_DATA[titleEl.getAttribute('data-i18n-title')];
      if (entry && entry[lang]) document.title = entry[lang];
    }

    document.querySelectorAll('.lang-toggle').forEach((btn) => {
      btn.querySelectorAll('.lang-fr, .lang-en').forEach((s) => s.classList.remove('is-active'));
      const activeSpan = btn.querySelector(lang === 'fr' ? '.lang-fr' : '.lang-en');
      if (activeSpan) activeSpan.classList.add('is-active');
      btn.setAttribute('aria-pressed', lang === 'en' ? 'true' : 'false');
    });

    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* stockage indisponible */ }
  }

  document.addEventListener('DOMContentLoaded', function () {
    let savedLang = 'fr';
    try { savedLang = localStorage.getItem(STORAGE_KEY) || 'fr'; } catch (e) { /* ignore */ }

    applyLang(savedLang);

    document.querySelectorAll('.lang-toggle').forEach((btn) => {
      btn.addEventListener('click', function () {
        const current = document.documentElement.getAttribute('lang') === 'en' ? 'en' : 'fr';
        applyLang(current === 'fr' ? 'en' : 'fr');
      });
    });
  });
})();
// Récupère les données du formulaire et les envoie via WhatsApp
// ========================================

document.addEventListener('DOMContentLoaded', function () {
  // Gestion du formulaire de contact
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      let nom = document.getElementById("nom").value;
      let email = document.getElementById("email").value;
      let telephone = document.getElementById("telephone").value;
      let message = document.getElementById("message").value;

      // Validation des champs
      if (!nom || !email || !telephone || !message) {
        alert("Veuillez remplir tous les champs");
        return;
      }

      // Envoi des données au backend pour stockage
      fetch('backend/save_contact.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nom: nom,
          email: email,
          telephone: telephone,
          message: message
        })
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            // Redirection vers WhatsApp après sauvegarde
            let texte = `Bonjour LiGHTWORLD Logistics\n\nNom : ${nom}\n\nEmail : ${email}\n\nTéléphone : ${telephone}\n\nMessage :\n${message}`;
            let numero = "237696362393";
            let whatsappURL = `https://wa.me/${numero}?text=${encodeURIComponent(texte)}`;
            window.open(whatsappURL, "_blank");

            // Réinitialiser le formulaire
            contactForm.reset();
            alert("Votre message a été enregistré et envoyé!");
          }
        })
        .catch(error => console.error('Erreur:', error));
    });
  }
});


// ========================================
// CARTES DYNAMIQUES - BANDE VERTE
// Ajoute des effets d'ombre et transition au survol des cartes
// ========================================

const stripCards = document.querySelectorAll(".strip-card");

stripCards.forEach((card) => {
  // Événement au survol de la souris
  card.addEventListener("mouseenter", () => {
    card.style.boxShadow = "0 8px 18px rgba(0,0,0,0.15)";
    card.style.transform = "scale(1.05)";
    card.style.transition = "all 0.3s ease";
  });

  // Événement au départ de la souris
  card.addEventListener("mouseleave", () => {
    card.style.boxShadow = "none";
    card.style.transform = "scale(1)";
  });
});


// ========================================
// CARTES D'ACTIVITÉ DYNAMIQUES
// Ajoute des effets interactifs aux cartes de secteur d'activité
// ========================================

const activityCards = document.querySelectorAll(".activity-card");

activityCards.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.backgroundColor = "var(--green)";
    card.style.color = "#fff";
    const icon = card.querySelector("i");
    if (icon) icon.style.color = "#fff";
    const h5 = card.querySelector("h5");
    if (h5) h5.style.color = "#fff";
  });

  card.addEventListener("mouseleave", () => {
    card.style.backgroundColor = "#fff";
    card.style.color = "#333";
    const icon = card.querySelector("i");
    if (icon) icon.style.color = "var(--green)";
    const h5 = card.querySelector("h5");
    if (h5) h5.style.color = "#184A2D";
  });
});


// ========================================
// GÉOLOCALISATION ET GPS
// Récupère la position de l'utilisateur et l'envoie au backend
// ========================================

function initGeolocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const precision = position.coords.accuracy;

        console.log("Position récupérée:", latitude, longitude);

        // Envoi de la géolocalisation au backend
        sendLocationToBackend(latitude, longitude, precision);

        // Affichage sur la carte (si présente)
        if (document.querySelector('iframe[src*="maps.google.com"]')) {
          updateMapLocation(latitude, longitude);
        }
      },
      function (error) {
        console.warn("Erreur géolocalisation:", error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    );
  }
}

function sendLocationToBackend(lat, lng, accuracy) {
  fetch('backend/save_location.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      latitude: lat,
      longitude: lng,
      accuracy: accuracy,
      timestamp: new Date().toISOString()
    })
  })
    .then(response => response.json())
    .then(data => console.log("Localisation sauvegardée:", data))
    .catch(error => console.error('Erreur localisation:', error));
}

function updateMapLocation(lat, lng) {
  const mapUrl = `https://maps.google.com/maps?q=${lat},${lng}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
  const mapFrame = document.querySelector('iframe[src*="maps.google.com"]');
  if (mapFrame) {
    mapFrame.src = mapUrl;
  }
}

// Initialiser la géolocalisation au chargement
document.addEventListener('DOMContentLoaded', initGeolocation);


// ========================================
// CARROUSEL DE PROJETS - NAVIGATION
// Gère la navigation du carrousel d'images de projets
// ========================================

let currentProjectIndex = 0;
const projectItems = document.querySelectorAll(".project-item");

function showProject(index) {
  if (projectItems.length === 0) return;

  if (index >= projectItems.length) currentProjectIndex = 0;
  else if (index < 0) currentProjectIndex = projectItems.length - 1;
  else currentProjectIndex = index;

  projectItems.forEach((item) => {
    item.style.display = "none";
  });

  projectItems[currentProjectIndex].style.display = "flex";

  // Mettre à jour les indicateurs
  const indicators = document.querySelectorAll(".indicator");
  indicators.forEach((ind, i) => {
    ind.classList.toggle("active", i === currentProjectIndex);
  });

  const categories = document.querySelectorAll('.project-category');
  categories.forEach((button, i) => {
    button.classList.toggle('active', i === currentProjectIndex);
  });
}

function filterProject(index) {
  goToProject(index);
}

function nextProject() {
  currentProjectIndex++;
  showProject(currentProjectIndex);
}

function prevProject() {
  currentProjectIndex--;
  showProject(currentProjectIndex);
}

function goToProject(index) {
  currentProjectIndex = index;
  showProject(currentProjectIndex);
}

// Initialiser le carrousel
document.addEventListener('DOMContentLoaded', () => {
  showProject(0);
});


// ========================================
// ANIMATION AUX CARTES DE SERVICES
// Ajoute des effets de survol aux cartes de services
// ========================================

const serviceCards = document.querySelectorAll(".service-card");

serviceCards.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.boxShadow = "0 15px 40px rgba(11, 138, 30, 0.2)";
  });

  card.addEventListener("mouseleave", () => {
    card.style.boxShadow = "0 5px 15px rgba(0,0,0,.08)";
  });
});


// ========================================
// CONSULTATION DES DONNÉES - ADMIN
// Récupère et affiche les contacts sauvegardés (pour l'admin)
// ========================================

function loadContacts() {
  fetch('backend/get_contacts.php')
    .then(response => response.json())
    .then(data => {
      console.log("Contacts chargés:", data);
      // Afficher les contacts dans un tableau si nécessaire
    })
    .catch(error => console.error('Erreur chargement contacts:', error));
}

function loadLocations() {
  fetch('backend/get_locations.php')
    .then(response => response.json())
    .then(data => {
      console.log("Localisations chargées:", data);
      // Afficher les localisations sur une carte si nécessaire
    })
    .catch(error => console.error('Erreur chargement localisations:', error));
}


/* ==================================================
   Écosystème interactif (section "Notre approche")
   - Ce script gère la sélection des satellites
   - Affiche une infobulle (tooltip) avec le titre et
     la description du service
   - Accessible au clavier (Enter / Espace / Escape)
   - Ajout de commentaires en français pour maintenance
   ================================================== */
(function () {
  // Attendre que le DOM soit prêt
  document.addEventListener('DOMContentLoaded', function () {
    const satellites = document.querySelectorAll('.satellite');
    const centralCore = document.getElementById('centralCore');
    const tooltip = document.getElementById('serviceTooltip');
    const tooltipTitle = document.getElementById('tooltipTitle');
    const tooltipText = document.getElementById('tooltipText');
    const closeTooltip = document.getElementById('closeTooltip');

    if (!satellites || satellites.length === 0 || !tooltip) return; // Pas de section présente

    let activeSatellite = null;

    // Active un satellite : met à jour le centre et le tooltip
    function activateSatellite(satellite) {
      const service = satellite.dataset.service || '';
      const description = satellite.dataset.description || '';

      satellites.forEach((item) => {
        item.classList.remove('is-selected');
        item.setAttribute('aria-pressed', 'false');
      });

      satellite.classList.add('is-selected');
      satellite.setAttribute('aria-pressed', 'true');
      if (centralCore) centralCore.classList.add('is-active');

      // Remplir le tooltip
      tooltipTitle.textContent = service;
      tooltipText.textContent = description;
      tooltip.classList.add('is-visible');
      activeSatellite = satellite;
    }

    // Ferme le tooltip et réinitialise l'état
    function closeServiceTooltip() {
      tooltip.classList.remove('is-visible');
      if (centralCore) centralCore.classList.remove('is-active');
      satellites.forEach((item) => {
        item.classList.remove('is-selected');
        item.setAttribute('aria-pressed', 'false');
      });
      activeSatellite = null;
    }

    // Assigner les événements clavier et souris aux satellites
    satellites.forEach((satellite) => {
      satellite.setAttribute('aria-pressed', 'false');

      // Clic / activation
      satellite.addEventListener('click', function () {
        activateSatellite(satellite);
      });

      // Clavier : Enter, Espace pour activer ; Escape pour fermer
      satellite.addEventListener('keydown', function (event) {
        const key = event.key;
        if (key === 'Enter' || key === ' ') {
          event.preventDefault();
          activateSatellite(satellite);
        }
        if (key === 'Escape') {
          closeServiceTooltip();
          satellite.blur();
        }
      });
    });

    // Bouton fermer dans le tooltip
    closeTooltip.addEventListener('click', closeServiceTooltip);

    // Fermer au clavier si Escape est pressé et qu'un satellite est actif
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && activeSatellite) {
        closeServiceTooltip();
        activeSatellite.focus();
      }
    });

    // Clic en dehors : ferme le tooltip
    document.addEventListener('click', function (event) {
      const clickedInsideTooltip = tooltip.contains(event.target);
      const clickedSatellite = event.target.closest('.satellite');
      if (!clickedInsideTooltip && !clickedSatellite && activeSatellite) {
        closeServiceTooltip();
      }
    });
  });
})();


// ========================================
// AUTO-SCROLL HORIZONTAL pour sections
// services-grid et activity-grid
// ========================================
function setupInfiniteScroll(selector) {
  const el = document.querySelector(selector);
  if (!el) return 0;

  const items = Array.from(el.children);
  if (!items.length) return 0;

  const originalWidth = items.reduce((total, item) => {
    const style = getComputedStyle(item);
    const marginRight = parseFloat(style.marginRight) || 0;
    return total + item.getBoundingClientRect().width + marginRight;
  }, 0);

  items.forEach((item) => {
    const clone = item.cloneNode(true);
    clone.classList.add('cloned-item');
    el.appendChild(clone);
  });

  el.scrollLeft = 0;
  return originalWidth;
}

function startAutoScroll(selector, speedPxPerTick = 1, tickMs = 20, resetThreshold = null) {
  const el = document.querySelector(selector);
  if (!el) return null;
  let paused = false;
  el.addEventListener('mouseenter', () => paused = true);
  el.addEventListener('mouseleave', () => paused = false);

  const id = setInterval(() => {
    if (paused) return;
    el.scrollLeft += speedPxPerTick;
    if (resetThreshold !== null && el.scrollLeft >= resetThreshold) {
      el.scrollLeft -= resetThreshold;
    }
  }, tickMs);

  el.scrollLeft = 0;
  return id;
}

document.addEventListener('DOMContentLoaded', function () {
  startAutoScroll('.activity-grid', 1, 20);

  // ========================================
  // NAVIGATION DU CARROUSEL "NOS SERVICES"
  // Boutons flèches pour défiler les cartes
  // ========================================
  const servicesTrack = document.getElementById('servicesTrack');
  const servicesPrev = document.getElementById('servicesPrev');
  const servicesNext = document.getElementById('servicesNext');

  if (servicesTrack && servicesPrev && servicesNext) {
    const scrollStep = () => {
      const card = servicesTrack.querySelector('.service-card');
      if (!card) return 300;
      const gap = parseFloat(getComputedStyle(servicesTrack).columnGap || getComputedStyle(servicesTrack).gap) || 20;
      return card.getBoundingClientRect().width + gap;
    };

    const updateNavState = () => {
      const maxScroll = servicesTrack.scrollWidth - servicesTrack.clientWidth - 2;
      servicesPrev.disabled = servicesTrack.scrollLeft <= 2;
      servicesNext.disabled = servicesTrack.scrollLeft >= maxScroll;
    };

    servicesPrev.addEventListener('click', () => {
      servicesTrack.scrollBy({ left: -scrollStep(), behavior: 'smooth' });
    });
    servicesNext.addEventListener('click', () => {
      servicesTrack.scrollBy({ left: scrollStep(), behavior: 'smooth' });
    });
    servicesTrack.addEventListener('scroll', () => window.requestAnimationFrame(updateNavState));
    window.addEventListener('resize', updateNavState);
    updateNavState();
  }

  // ========================================
  // Auto-advance carousel de projets
  // ========================================
  let projectAutoId = null;
  const projectsCarousel = document.querySelector('.projects-carousel');
  function startProjectAuto() {
    if (projectAutoId) return;
    projectAutoId = setInterval(nextProject, 5000);
  }
  function stopProjectAuto() {
    if (!projectAutoId) return;
    clearInterval(projectAutoId);
    projectAutoId = null;
  }
  if (projectsCarousel) {
    projectsCarousel.addEventListener('mouseenter', stopProjectAuto);
    projectsCarousel.addEventListener('mouseleave', startProjectAuto);
    startProjectAuto();
  }

  // ========================================
  // Rotation des témoignages (slider horizontal)
  // ========================================
  const testimonialTrack = document.getElementById('testimonialTrack');
  const testimonialIndicators = document.getElementById('testimonialIndicators');
  if (testimonialTrack) {
    const tItems = testimonialTrack.querySelectorAll('.testimonial');
    let tIndex = 0;

    function updateIndicators() {
      if (!testimonialIndicators) return;
      const dots = testimonialIndicators.querySelectorAll('.testimonial-indicator');
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === tIndex);
      });
    }

    function updateTestimonials() {
      // vertical translate instead of horizontal
      testimonialTrack.style.transform = `translateY(-${tIndex * 100}%)`;
      updateIndicators();
    }

    updateTestimonials();
    let tAuto = setInterval(() => {
      tIndex = (tIndex + 1) % tItems.length;
      updateTestimonials();
    }, 4500);

    if (testimonialIndicators) {
      testimonialIndicators.addEventListener('click', function (event) {
        const target = event.target.closest('.testimonial-indicator');
        if (!target) return;
        const dots = Array.from(testimonialIndicators.querySelectorAll('.testimonial-indicator'));
        const index = dots.indexOf(target);
        if (index >= 0) {
          tIndex = index;
          updateTestimonials();
        }
      });
    }

    testimonialTrack.addEventListener('mouseenter', () => clearInterval(tAuto));
    testimonialTrack.addEventListener('mouseleave', () => {
      tAuto = setInterval(() => {
        tIndex = (tIndex + 1) % tItems.length;
        updateTestimonials();
      }, 4500);
    });
  }

});





//pour la nevigation des image

const slidesContainer = document.getElementById('slides');
if (slidesContainer) {
  const slides = slidesContainer.children;
  const total = slides.length;
  let index = 0;

  const indicateursContainer = document.getElementById('indicateurs');
  for (let i = 0; i < total; i++) {
    const dot = document.createElement('span');
    if (i === 0) dot.classList.add('actif');
    dot.addEventListener('click', () => allerA(i));
    indicateursContainer.appendChild(dot);
  }

  function mettreAJour() {
    slidesContainer.style.transform = `translateX(${-index * 100}%)`;
    [...indicateursContainer.children].forEach((dot, i) => {
      dot.classList.toggle('actif', i === index);
    });
  }

  function changerSlide(direction) {
    index = (index + direction + total) % total;
    mettreAJour();
  }

  function allerA(i) {
    index = i;
    mettreAJour();
  }
}
