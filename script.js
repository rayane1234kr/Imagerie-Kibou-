// =======================================================
// || كود جافاسكريبت تشخيصي ونهائي - استبدل كل ما في ملفك بهذا ||
// =======================================================

document.addEventListener('DOMContentLoaded', () => {

    console.log("السكريبت بدأ بالعمل: DOMContentLoaded");

    // --- 1. Logic for Language Switcher ---
    const languageSwitcher = document.querySelector('.language-switcher');
    
    if (languageSwitcher) {
        console.log("تم العثور على عنصر تبديل اللغة.");
        const langButtons = {
            fr: document.getElementById('lang-fr'),
            ar: document.getElementById('lang-ar')
        };
        let translations = {};

        async function loadTranslations() {
            try {
                // تأكد من أن اسم الملف صحيح وفي نفس المجلد
                const response = await fetch('./translations.json');

                console.log("محاولة جلب ملف translations.json");
                
                if (!response.ok) {
                    // إذا لم يتم العثور على الملف أو حدث خطأ
                    throw new Error(`خطأ في الشبكة: لم يتم العثور على الملف أو حدث خطأ آخر. الحالة: ${response.status}`);
                }
                
                translations = await response.json();
                console.log("تم تحميل ملف الترجمة بنجاح!");
                
                const savedLang = localStorage.getItem('language') || 'fr';
                setLanguage(savedLang);

            } catch (error) {
                console.error("فشل تحميل ملف الترجمة:", error);
                // عرض رسالة خطأ للمستخدم في الصفحة
                alert("خطأ: لا يمكن تحميل ملف الترجمة 'translations.json'. يرجى التأكد من وجود الملف في نفس مجلد المشروع وأن اسمه صحيح.");
            }
        }

        function setLanguage(lang) {
            if (!translations[lang] || !langButtons[lang]) {
                console.error(`اللغة '${lang}' أو زرها غير موجود.`);
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
            
            updateButtonStyles(lang);
            localStorage.setItem('language', lang);
            console.log(`تم تغيير اللغة إلى: ${lang}`);
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
                console.log(`تم النقر على زر اللغة: ${lang}`);
                setLanguage(lang);
            }
        });

        loadTranslations();
    } else {
        console.error("عنصر تبديل اللغة غير موجود في الصفحة.");
        alert("خطأ في برمجة الصفحة: عنصر تبديل اللغة غير موجود.");
    }

    // --- 2. Logic for Hamburger Menu ---
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        console.log("تم العثور على قائمة الهامبرغر.");
        hamburger.addEventListener('click', (event) => {
            event.stopPropagation();
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            console.log("تم النقر على قائمة الهامبرغر.");
        });
    } else {
         console.error("قائمة الهامبرغر أو عنصر القائمة غير موجود.");
    }
});
