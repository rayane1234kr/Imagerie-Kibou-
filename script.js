// =======================================================
// || النسخة النهائية النظيفة والمضمونة لملف script.js ||
// =======================================================

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Logic for Hamburger Menu ---
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', (event) => {
            // يمنع أي سلوك آخر عند النقر
            event.preventDefault(); 
            event.stopPropagation();
            
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // --- 2. Logic for Language Switcher ---
    const languageSwitcher = document.querySelector('.language-switcher');
    
    if (languageSwitcher) {
        const langButtons = {
            fr: document.getElementById('lang-fr'),
            ar: document.getElementById('lang-ar')
        };
        let translations = {};

        const isGitHubPages = window.location.hostname.includes('github.io');
        const basePath = isGitHubPages ? '/Imagerie-Kibou-/' : '/'; 
        const translationFileURL = `${basePath}translations.json`;

        async function loadTranslations() {
            try {
                const response = await fetch(translationFileURL);
                if (!response.ok) {
                    throw new Error(`Failed to fetch translations. Status: ${response.status}`);
                }
                translations = await response.json();
                const savedLang = localStorage.getItem('language') || 'fr';
                setLanguage(savedLang);
            } catch (error) {
                console.error("Fatal Error: Could not load or parse translations file.", error);
                alert("A critical error occurred while loading language data. Please contact support.");
            }
        }

        function setLanguage(lang) {
            if (!translations[lang] || !langButtons[lang]) {
                return;
            }

            document.documentElement.lang = lang;
            document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
            
            document.querySelectorAll('[data-key]').forEach(element => {
                const key = element.getAttribute('data-key');
                if (translations[lang]?.[key]) {
                    element.innerHTML = translations[lang][key];
                }
            });
            
            updateButtonStyles(lang);
            localStorage.setItem('language', lang);
        }

        function updateButtonStyles(activeLang) {
            for (const lang in langButtons) {
                if (langButtons[lang]) {
                    langButtons[lang].classList.toggle('lang-active', lang === activeLang);
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
});
