// =======================================================
// || كود جافاسكريبت نظيف ومضمون - استبدل كل ما في ملفك بهذا ||
// =======================================================

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Logic for Language Switcher ---
    const languageSwitcher = document.querySelector('.language-switcher');
    
    if (languageSwitcher) {
        const langButtons = {
            fr: document.getElementById('lang-fr'),
            ar: document.getElementById('lang-ar')
        };
        let translations = {};

        async function loadTranslations() {
            try {
                // تأكد من أن اسم الملف صحيح وفي نفس المجلد
                const response = await fetch('translations.json');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                translations = await response.json();
                const savedLang = localStorage.getItem('language') || 'fr';
                setLanguage(savedLang);
            } catch (error) {
                console.error("Could not load translations file:", error);
            }
        }

        function setLanguage(lang) {
            if (!translations[lang] || !langButtons[lang]) {
                console.error(`Language '${lang}' or its button is not found.`);
                return;
            }

            document.documentElement.lang = lang;
            document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
            
            document.querySelectorAll('[data-key]').forEach(element => {
                const key = element.getAttribute('data-key');
                if (translations[lang] && translations[lang][key] !== undefined) {
                    element.innerHTML = translations[lang][key];
                }
            });
            
            document.querySelectorAll('[data-placeholder-key]').forEach(element => {
                const key = element.getAttribute('data-placeholder-key');
                 if (translations[lang] && translations[lang][key] !== undefined) {
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
    } else {
        console.error("Language switcher element not found.");
    }

    // --- 2. Logic for Hamburger Menu ---
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', (event) => {
            event.stopPropagation(); // يمنع انتشار النقرة
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    } else {
         console.error("Hamburger menu or nav menu element not found.");
    }
});
