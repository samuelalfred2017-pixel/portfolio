/**
 * OSMOSIS COMPUTER SERVICES PLUG - MASTER JAVASCRIPT
 * Serving Jalingo & Zing LGA, Taraba State
 * WhatsApp Hotline: 09031726988 (+2349031726988)
 */

document.addEventListener('DOMContentLoaded', () => {
  const WHATSAPP_PHONE = '2349031726988';
  const DISPLAY_PHONE = '09031726988';

  /* ===================================================================
     1. SAMPLE PROJECT TOPICS DATABASE
  =================================================================== */
  const projectTopics = [
    {
      id: 1,
      category: 'computer-science',
      dept: 'Computer Science',
      code: 'CSC-2026-01',
      title: 'Design and Implementation of an Automated University Result Processing and Clearance Portal',
    },
    {
      id: 2,
      category: 'computer-science',
      dept: 'Computer Science & IT',
      code: 'CSC-2026-02',
      title: 'Development of a Secure Campus Wi-Fi Authentication and Bandwidth Management System',
    },
    {
      id: 3,
      category: 'education',
      dept: 'Education',
      code: 'EDU-2026-01',
      title: 'Impact of Computer-Assisted Instruction (CAI) on Secondary School Students Academic Performance in Jalingo LGA',
    },
    {
      id: 4,
      category: 'education',
      dept: 'Educational Technology',
      code: 'EDU-2026-02',
      title: 'Assessment of ICT Infrastructure and Digital Literacy among College of Education Lecturers in Zing LGA',
    },
    {
      id: 5,
      category: 'social-sciences',
      dept: 'Business Administration',
      code: 'BUS-2026-01',
      title: 'The Role of Small and Medium Scale Enterprises (SMEs) in Rural Economic Empowerment in Zing and Jalingo',
    },
    {
      id: 6,
      category: 'social-sciences',
      dept: 'Accounting',
      code: 'ACC-2026-02',
      title: 'Effect of Electronic Banking and Point of Sale (POS) Terminals on Financial Inclusion in Taraba State',
    },
    {
      id: 7,
      category: 'natural-sciences',
      dept: 'Microbiology / Science',
      code: 'SCI-2026-01',
      title: 'Microbiological and Physicochemical Analysis of Borehole and Well Water Sources in Jalingo Metropolis',
    },
    {
      id: 8,
      category: 'arts-humanities',
      dept: 'Mass Communication',
      code: 'MAC-2026-01',
      title: 'Influence of Social Media Networking on Youth Civic Engagement and Information Dissemination in Taraba State',
    },
    {
      id: 9,
      category: 'social-sciences',
      dept: 'Public Administration',
      code: 'PAD-2026-03',
      title: 'E-Governance Adoption and Service Delivery Efficiency in Local Government Councils: A Study of Zing LGA',
    }
  ];

  /* ===================================================================
     2. RENDER & FILTER PROJECT TOPICS
  =================================================================== */
  const topicsContainer = document.getElementById('topicsGrid');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const searchInput = document.getElementById('topicsSearchInput');

  let activeCategory = 'all';
  let searchQuery = '';

  function renderTopics() {
    if (!topicsContainer) return;

    const filtered = projectTopics.filter(item => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.dept.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.code.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    if (filtered.length === 0) {
      topicsContainer.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 2.5rem; background: rgba(10, 17, 32, 0.7); border-radius: 12px; border: 1px dashed rgba(255,255,255,0.15);">
          <p style="color: var(--text-muted); margin-bottom: 1rem; font-size: 1.05rem;">
            No pre-listed topic matched "<strong>${escapeHtml(searchQuery)}</strong>".
          </p>
          <a href="${getDirectWhatsAppLink('Custom Project Request', 'I have a specific project topic or need new custom topics formulated.')}" 
             target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp btn-sm">
             Request Custom Project Topic on WhatsApp
          </a>
        </div>
      `;
      return;
    }

    topicsContainer.innerHTML = filtered.map(item => {
      const waMsg = encodeURIComponent(
        `Hello Osmosis Computer Services Plug! I am interested in getting the complete material for Project Topic:\n` +
        `• Code: ${item.code}\n` +
        `• Department: ${item.dept}\n` +
        `• Topic: "${item.title}"\n` +
        `Please let me know the availability and procedure.`
      );
      const itemWaLink = `https://wa.me/${WHATSAPP_PHONE}?text=${waMsg}`;

      return `
        <article class="topic-item-card" data-category="${item.category}">
          <div class="topic-meta">
            <span class="topic-dept-badge">${item.dept}</span>
            <span class="topic-code">${item.code}</span>
          </div>
          <h4 class="topic-title">${item.title}</h4>
          <div class="topic-action">
            <span>Verified Materials (Ch. 1-5)</span>
            <a href="${itemWaLink}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp btn-sm" id="btn-topic-${item.id}">
              Get Material 💬
            </a>
          </div>
        </article>
      `;
    }).join('');
  }

  // Filter button clicks
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.getAttribute('data-filter');
      renderTopics();
    });
  });

  // Search input typing
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim();
      renderTopics();
    });
  }

  // Initial render
  renderTopics();

  /* ===================================================================
     3. INTERACTIVE WHATSAPP INQUIRY GENERATOR TOOL
  =================================================================== */
  const serviceSelect = document.getElementById('inquiryService');
  const locationSelect = document.getElementById('inquiryLocation');
  const urgencySelect = document.getElementById('inquiryUrgency');
  const clientNameInput = document.getElementById('inquiryName');
  const detailsInput = document.getElementById('inquiryDetails');
  const waPreviewBox = document.getElementById('waPreviewText');
  const waSubmitBtn = document.getElementById('waSubmitBtn');

  function updateWhatsAppPreview() {
    if (!waPreviewBox || !serviceSelect) return;

    const service = serviceSelect.value || 'Typesetting & Document Processing';
    const location = locationSelect.value || 'Jalingo LGA';
    const urgency = urgencySelect.value || 'Normal Standard';
    const name = clientNameInput.value.trim() ? clientNameInput.value.trim() : 'Valued Client';
    const details = detailsInput.value.trim() ? detailsInput.value.trim() : 'Standard assistance requested';

    const message = 
      `*Hello OSMOSIS COMPUTER SERVICES PLUG!* 🌟\n` +
      `I would like to make an inquiry / place an order:\n\n` +
      `👤 *Name:* ${name}\n` +
      `📍 *Location:* ${location}\n` +
      `🛠️ *Service Required:* ${service}\n` +
      `⏱️ *Timeline / Urgency:* ${urgency}\n` +
      `📝 *Details / Topic:* ${details}\n\n` +
      `Kindly reply with your pricing and turnaround time. Thank you!`;

    waPreviewBox.textContent = message;

    const encoded = encodeURIComponent(message);
    const fullWaUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encoded}`;
    if (waSubmitBtn) {
      waSubmitBtn.setAttribute('href', fullWaUrl);
    }
  }

  const formElements = [serviceSelect, locationSelect, urgencySelect, clientNameInput, detailsInput];
  formElements.forEach(el => {
    if (el) {
      el.addEventListener('input', updateWhatsAppPreview);
      el.addEventListener('change', updateWhatsAppPreview);
    }
  });

  // Run once to set initial text
  updateWhatsAppPreview();

  /* ===================================================================
     4. FAQ ACCORDION
  =================================================================== */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isOpen = item.classList.contains('active');
        // Close others
        faqItems.forEach(other => other.classList.remove('active'));
        if (!isOpen) {
          item.classList.add('active');
        }
      });
    }
  });

  /* ===================================================================
     5. MOBILE MENU TOGGLE
  =================================================================== */
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const navLinks = document.getElementById('navLinks');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-open');
      const isExpanded = navLinks.classList.contains('mobile-open');
      mobileToggle.setAttribute('aria-expanded', isExpanded);
    });

    // Close mobile menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('mobile-open');
      });
    });
  }

  /* ===================================================================
     6. BACK TO TOP BUTTON
  =================================================================== */
  const backToTopBtn = document.getElementById('backToTopBtn');
  window.addEventListener('scroll', () => {
    if (backToTopBtn) {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ===================================================================
     7. COPY PHONE NUMBER UTILITY & TOAST
  =================================================================== */
  const copyPhoneBtns = document.querySelectorAll('.copy-phone-btn');
  const toast = document.getElementById('toastNotice');

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  copyPhoneBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      navigator.clipboard.writeText(DISPLAY_PHONE).then(() => {
        showToast(`Copied phone number ${DISPLAY_PHONE} to clipboard!`);
      }).catch(() => {
        showToast(`Hotline: ${DISPLAY_PHONE}`);
      });
    });
  });

  /* ===================================================================
     HELPER FUNCTIONS
  =================================================================== */
  function getDirectWhatsAppLink(serviceName, note) {
    const text = encodeURIComponent(
      `Hello Osmosis Computer Services Plug! I am inquiring about ${serviceName}.\n` +
      `Location: Jalingo / Zing LGA.\n` +
      `Note: ${note}`
    );
    return `https://wa.me/${WHATSAPP_PHONE}?text=${text}`;
  }

  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
});
