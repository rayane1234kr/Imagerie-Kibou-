// الكود الكامل والمُصحح لملف script.js
document.addEventListener('DOMContentLoaded', () => {

    // --- Logic for Language Switcher ---
    const languageSwitcher = document.querySelector('.language-switcher');
    
    if (languageSwitcher) {
        const langButtons = {
            fr: document.getElementById('lang-fr'),
            ar: document.getElementById('lang-ar')
        };
        let translations = {};

        async function loadTranslations() {
            try {
                const response = await fetch('translations.json');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                translations = await response.json();
                const savedLang = localStorage.getItem('language') || 'fr';
                setLanguage(savedLang);
            } catch (error) {
                console.error("Could not load translations:", error);
            }
        }

        function setLanguage(lang) {
            if (!translations[lang] || !langButtons[lang]) {
                console.error(`Language '${lang}' or its button not found.`);
                return;
            }

            document.documentElement.lang = lang;
            document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
            
            document.querySelectorAll('[data-key]').forEach(element => {
                const key = element.getAttribute('data-key');
                if (translations[lang][key]) {
                    element.innerHTML = translations[lang][key];
                }
            });
            
            // Handle placeholder translation
            document.querySelectorAll('[data-placeholder-key]').forEach(element => {
                const key = element.getAttribute('data-placeholder-key');
                if (translations[lang][key]) {
                    element.placeholder = translations[lang][key];
                }
            });

            updateButtonStyles(lang);
            localStorage.setItem('language', lang);
        }

        function updateButtonStyles(activeLang) {
            for (const lang in langButtons) {
                if (langButtons[lang]) {
                    if (lang === activeLang) {
                        langButtons[lang].classList.add('lang-active');
                    } else {
                        langButtons[lang].classList.remove('lang-active');
                    }
                }
            }
        }

        languageSwitcher.addEventListener('click', (event) => {
            const button = event.target.closest('button');
            if (button) {
                const lang = button.id.split('-')[1];
                setLanguage(lang);
            }
        });

        loadTranslations();
    }

    // --- Logic for Hamburger Menu ---
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when a link is clicked
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
});
