/**
 * MOROCCO MOBILE FEATURES
 * Critical features for Morocco market
 */

class MoroccoMobileFeatures {
  constructor() {
    this.restaurantPhone = '+212522123456'; // Morocco phone format
    this.whatsappNumber = '212522123456'; // WhatsApp format (without +)
    this.restaurantLocation = {
      lat: 33.5731,
      lng: -7.5898,
      address: 'Boulevard Mohammed V, Casablanca 20250, Morocco'
    };
    this.init();
  }

  init() {
    console.log('🇲🇦 Initializing Morocco Mobile Features...');
    // WhatsApp CTA disabled per request
    this.removeWhatsAppElements();
    this.addPhoneCallButton();
    this.fixGoogleMaps();
    // Directions CTA disabled per request
    this.removeDirectionsElements();
    this.optimizeMobileMenu();
    this.removePaymentSection();
    this.addMoroccanMenuItems();
    
    this.optimizeFor3G4G();
    this.addOfflineMenuCapability();
    this.addMobileStyles();
    console.log('✅ Morocco Mobile Features Ready!');
  }

  // 1. WhatsApp Click to Chat (Primary Contact)
  addWhatsAppButton() {
    // Disabled per request: do not render WhatsApp button
    return;
    const whatsappBtn = document.createElement('div');
    whatsappBtn.className = 'whatsapp-float';
    whatsappBtn.innerHTML = `
      <a href="https://wa.me/${this.whatsappNumber}?text=مرحبا! أريد حجز طاولة في مطعم جريلي" 
         target="_blank" 
         class="whatsapp-btn"
         aria-label="Chat on WhatsApp">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
        </svg>
        <span>WhatsApp</span>
      </a>
    `;
    document.body.appendChild(whatsappBtn);
  }

  // Remove any WhatsApp elements injected by other scripts
  removeWhatsAppElements() {
    document.querySelectorAll('.whatsapp-float, .whatsapp-btn, .co-wa').forEach(el => el.remove());
  }

  // 2. One-tap Phone Calling
  addPhoneCallButton() {
    const phoneBtn = document.createElement('div');
    phoneBtn.className = 'phone-float';
    phoneBtn.innerHTML = `
      <a href="tel:${this.restaurantPhone}" 
         class="phone-btn"
         aria-label="Call Restaurant">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
        </svg>
        <span>اتصل</span>
      </a>
    `;
    document.body.appendChild(phoneBtn);
  }

  // 3. Fix Google Maps Integration
  fixGoogleMaps() {
    // Remove existing broken google-maps.js reference
    const existingScript = document.querySelector('script[src*="google-maps.js"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Add proper Google Maps implementation
    const mapContainer = document.createElement('div');
    mapContainer.id = 'google-map';
    mapContainer.style.cssText = 'width: 100%; height: 400px; margin: 20px 0; border-radius: 8px; overflow: hidden; background: #f0f0f0; display: flex; align-items: center; justify-content: center; font-size: 18px; color: #666;';
    mapContainer.innerHTML = '<div>🗺️ Loading Google Maps...</div>';
    
    // Find a good place to insert the map (before footer)
    const footer = document.querySelector('.footer') || document.querySelector('footer');
    if (footer) {
      footer.parentNode.insertBefore(mapContainer, footer);
    }

    // Load Google Maps
    this.loadGoogleMaps();
  }

  loadGoogleMaps() {
    if (typeof google !== 'undefined' && google.maps) {
      this.initializeMap();
      return;
    }

    const key = (window.GOOGLE_MAPS_API_KEY || localStorage.getItem('gmaps_key') || '').trim();
    if (!key) {
      this.showMapFallback('Google Maps not configured. Add your API key to proceed.');
      return;
    }

    // Catch authentication errors (e.g., InvalidKeyMapError)
    window.gm_authFailure = () => {
      this.showMapFallback('Google Maps API key invalid or unauthorized for this domain.');
    };

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(key)}&callback=initGoogleMap`;
    script.async = true;
    script.defer = true;
    script.onerror = () => {
      this.showMapFallback('Failed to load Google Maps. Please check your network or API key.');
    };
    
    window.initGoogleMap = () => this.initializeMap();
    document.head.appendChild(script);
  }

  showMapFallback(message) {
    const mapElement = document.getElementById('google-map');
    if (!mapElement) return;
    mapElement.style.display = 'flex';
    mapElement.innerHTML = `
      <div style="text-align:center; padding: 16px;">
        <p style="margin-bottom: 10px; color: #666;">${message}</p>
        <a href="https://maps.google.com/dir/?api=1&destination=${this.restaurantLocation.lat},${this.restaurantLocation.lng}" 
           target="_blank" rel="noopener" 
           style="background:#d4af37;color:#000;padding:8px 14px;border-radius:6px;text-decoration:none;display:inline-block;">
          Open Directions in Google Maps
        </a>
      </div>
    `;
  }

  initializeMap() {
    const mapElement = document.getElementById('google-map');
    if (!mapElement) return;

    const map = new google.maps.Map(mapElement, {
      center: this.restaurantLocation,
      zoom: 16,
      styles: [
        {
          "featureType": "all",
          "elementType": "geometry.fill",
          "stylers": [{"color": "#1a1a1a"}]
        },
        {
          "featureType": "water",
          "elementType": "geometry.fill",
          "stylers": [{"color": "#d4af37"}]
        }
      ]
    });

    const marker = new google.maps.Marker({
      position: this.restaurantLocation,
      map: map,
      title: 'مطعم جريلي - Grilli Restaurant',
      animation: google.maps.Animation.DROP
    });

    const infoWindow = new google.maps.InfoWindow({
      content: `
        <div style="padding: 15px; text-align: center;">
          <h3 style="margin: 0 0 10px 0; color: #d4af37;">🇲🇦 مطعم جريلي</h3>
          <p style="margin: 0 0 10px 0; color: #666;">${this.restaurantLocation.address}</p>
          <button onclick="window.open('https://maps.google.com/dir/?api=1&destination=${this.restaurantLocation.lat},${this.restaurantLocation.lng}', '_blank')" 
                  style="background: #d4af37; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;">
            احصل على الاتجاهات
          </button>
        </div>
      `
    });

    marker.addListener('click', () => {
      infoWindow.open(map, marker);
    });
  }

  // 4. Google Maps Get Directions
  addGetDirectionsButton() {
    const directionsBtn = document.createElement('div');
    directionsBtn.className = 'directions-btn';
    directionsBtn.innerHTML = `
      <button onclick="window.open('https://maps.google.com/dir/?api=1&destination=${this.restaurantLocation.lat},${this.restaurantLocation.lng}', '_blank')" 
              class="btn-directions">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M21.71 11.29l-9-9a.996.996 0 00-1.41 0l-9 9a1.003 1.003 0 001.42 1.42L12 4.41l8.29 8.29c.39.39 1.02.39 1.41 0a.996.996 0 000-1.41z"/>
        </svg>
        احصل على الاتجاهات
      </button>
    `;
    
    const footer = document.querySelector('.footer-brand');
    if (footer) {
      footer.appendChild(directionsBtn);
    }
  }

  // Remove any Directions button rendered previously
  removeDirectionsElements() {
    document.querySelectorAll('.directions-btn, .btn-directions').forEach(el => el.remove());
  }

  // 5. Mobile-optimized Menu Browsing
  optimizeMobileMenu() {
    const menuItems = document.querySelectorAll('.menu-card, .food-menu-card');
    menuItems.forEach(item => {
      item.style.cssText += `
        touch-action: manipulation;
        -webkit-tap-highlight-color: rgba(212, 175, 55, 0.3);
        transition: transform 0.2s ease;
      `;
      
      item.addEventListener('touchstart', function() {
        this.style.transform = 'scale(0.98)';
      });
      
      item.addEventListener('touchend', function() {
        this.style.transform = 'scale(1)';
      });
    });
  }

  // 6. Thumb-zone Optimized CTAs

  // 7. Mobile Payment Options
  addMobilePaymentOptions() {
    const paymentSection = document.createElement('div');
    paymentSection.className = 'mobile-payments';
    paymentSection.innerHTML = `
      <div class="payment-container">
        <h3>طرق الدفع المتاحة</h3>
        <div class="payment-methods">
          <div class="payment-method">💳 بطاقة ائتمان</div>
          <div class="payment-method">💰 نقداً</div>
          <div class="payment-method">📱 CIH Mobile</div>
          <div class="payment-method">🏦 Chaabi Mobile</div>
        </div>
      </div>
    `;
    
    const footer = document.querySelector('.footer-top');
    if (footer) {
      footer.appendChild(paymentSection);
    }
  }

  // 7b. Ensure payment section is removed (per request)
  removePaymentSection() {
    const existingPayments = document.querySelectorAll('.mobile-payments');
    existingPayments.forEach(el => el.remove());
  }

  // 5b. Inject Moroccan specials into the main menu grid
  addMoroccanMenuItems() {
    const grid = document.querySelector('.section.menu .grid-list');
    if (!grid) return;

    // Avoid duplicates if items already present
    const titles = Array.from(grid.querySelectorAll('.card-title')).map(el => el.textContent.trim());
    const toAdd = [
      {
        title: 'Tajine de Poulet au Citron',
        price: '$22.00',
        badge: "Chef’s Special",
        desc: 'Poulet, citron confit, olives vertes, épices marocaines, servi avec pain.',
        img: './assets/images/menu-1.png',
        alt: 'Tajine de Poulet au Citron'
      },
      {
        title: 'Couscous Royal',
        price: '$24.00',
        badge: 'Signature',
        desc: 'Semoule fine, légumes de saison, agneau, poulet et merguez.',
        img: './assets/images/menu-2.png',
        alt: 'Couscous Royal'
      },
      {
        title: 'Pastilla au Poulet',
        price: '$19.00',
        badge: 'Traditionnelle',
        desc: 'Feuilles de brick croustillantes, poulet, amandes, cannelle et sucre glace.',
        img: './assets/images/menu-3.png',
        alt: 'Pastilla au Poulet'
      }
    ].filter(item => !titles.includes(item.title));

    toAdd.forEach(item => {
      const li = document.createElement('li');
      li.innerHTML = `
        <div class="menu-card hover:card">
          <figure class="card-banner img-holder" style="--width: 100; --height: 100;">
            <img src="${item.img}" width="100" height="100" loading="lazy" alt="${item.alt}" class="img-cover">
          </figure>
          <div>
            <div class="title-wrapper">
              <h3 class="title-3"><a href="#" class="card-title">${item.title}</a></h3>
              <span class="badge label-1">${item.badge}</span>
              <span class="span title-2">${item.price}</span>
            </div>
            <p class="card-text label-1">${item.desc}</p>
          </div>
        </div>`;
      grid.appendChild(li);
    });
  }

  // 8. Instagram Story Integration

  // 9. 3G/4G Optimization
  optimizeFor3G4G() {
    // Lazy load images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      img.loading = 'lazy';
    });

    // Compress and optimize critical resources
    const style = document.createElement('style');
    style.textContent = `
      /* Optimize for slow connections */
      * { will-change: auto; }
      img { image-rendering: optimizeSpeed; }
      .hero-slider { transform: translateZ(0); }
    `;
    document.head.appendChild(style);
  }

  // 10. Offline Menu Capability
  addOfflineMenuCapability() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {
        console.log('Service Worker registration failed');
      });
    }

    // Store menu data in localStorage
    const menuItems = document.querySelectorAll('.menu-card');
    const menuData = Array.from(menuItems).map(item => ({
      title: item.querySelector('.card-title')?.textContent || '',
      price: item.querySelector('.title-2')?.textContent || '',
      description: item.querySelector('.card-text')?.textContent || ''
    }));
    
    localStorage.setItem('grilli-menu-offline', JSON.stringify(menuData));
  }

  // Add Mobile-Specific Styles
  addMobileStyles() {
    const style = document.createElement('style');
    style.textContent = `
      /* WhatsApp Float Button */
      .whatsapp-float {
        position: fixed;
        bottom: 80px;
        right: 20px;
        z-index: 1000;
      }
      .whatsapp-btn {
        display: flex;
        align-items: center;
        gap: 8px;
        background: #25D366;
        color: white;
        width: 50px; height: 50px;
        border-radius: 50%; justify-content: center;
        text-decoration: none;
        box-shadow: 0 4px 12px rgba(37, 211, 102, 0.4);
        transition: all 0.3s ease;
        font-weight: 600;
      }
      .whatsapp-btn span, .phone-btn span {
        display: none;
      }      .whatsapp-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(37, 211, 102, 0.6);
      }

      /* Phone Float Button */
      .phone-float {
        position: fixed;
        bottom: 140px;
        right: 20px;
        z-index: 1000;
      }
      .phone-btn {
        display: flex;
        align-items: center;
        gap: 8px;
        background: #d4af37;
        color: white;
        width: 50px; height: 50px;
        border-radius: 50%; justify-content: center;
        text-decoration: none;
        box-shadow: 0 4px 12px rgba(212, 175, 55, 0.4);
        transition: all 0.3s ease;
        font-weight: 600;
      }
      .phone-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(212, 175, 55, 0.6);
      }

      /* Thumb Zone CTAs */
        background: #b8941f;
      }

      .insta-btn {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
        background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
        color: white;
        padding: 12px;
        border-radius: 50%; justify-content: center;
        text-decoration: none;
        box-shadow: 0 4px 12px rgba(188, 24, 136, 0.4);
        transition: all 0.3s ease;
        font-size: 10px;
        font-weight: 600;
      }
      .insta-btn:hover {
        transform: translateY(-50%) scale(1.05);
      }

      /* Directions Button */
      .directions-btn {
        margin: 15px 0;
        text-align: center;
      }
      .btn-directions {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        background: #4285f4;
        color: white;
        border: none;
        padding: 12px 20px;
        border-radius: 8px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
      }
      .btn-directions:hover {
        background: #3367d6;
        transform: translateY(-1px);
      }

      /* Mobile Payments */
      .mobile-payments {
        background: rgba(212, 175, 55, 0.1);
        padding: 20px;
        border-radius: 8px;
        margin: 20px 0;
      }
      .mobile-payments h3 {
        color: #d4af37;
        text-align: center;
        margin-bottom: 15px;
      }
      .payment-methods {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;
      }
      .payment-method {
        background: white;
        padding: 10px;
        border-radius: 6px;
        text-align: center;
        font-weight: 600;
        color: #333;
      }

      /* Mobile Responsive */
      @media (max-width: 768px) {
        .whatsapp-float, .phone-float {
          right: 15px;
        }
        .whatsapp-btn, .phone-btn {
          padding: 10px 12px;
          font-size: 14px;
        }

      /* RTL Support for Arabic */
      [dir="rtl"] .whatsapp-btn,
      [dir="rtl"] .phone-btn {
        flex-direction: row-reverse;
      }
      
      /* Touch optimization */
      .whatsapp-btn, .phone-btn, .cta-btn, .btn-directions {
        -webkit-tap-highlight-color: transparent;
        touch-action: manipulation;
        user-select: none;
      }
    `;
    document.head.appendChild(style);
  }
}

// Initialize Morocco Mobile Features
document.addEventListener('DOMContentLoaded', () => {
  new MoroccoMobileFeatures();
});