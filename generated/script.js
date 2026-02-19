// Управление темой
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Загрузка сохраненной темы
const savedTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', savedTheme);
updateThemeButton(savedTheme);

// Переключение темы
themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeButton(newTheme);
});

function updateThemeButton(theme) {
    themeToggle.textContent = theme === 'light' ? '🌙' : '☀️';
}

// Управление размером шрифта
const fontIncreaseBtn = document.getElementById('font-increase');
const fontDecreaseBtn = document.getElementById('font-decrease');
const root = document.documentElement;

// Загрузка сохраненного размера шрифта
const savedFontSize = localStorage.getItem('fontSize') || '1';
root.style.setProperty('--font-size-scale', savedFontSize);

// Увеличение шрифта
fontIncreaseBtn.addEventListener('click', () => {
    const currentScale = parseFloat(root.style.getPropertyValue('--font-size-scale')) || 1;
    const newScale = Math.min(currentScale + 0.1, 1.5);
    
    root.style.setProperty('--font-size-scale', newScale);
    localStorage.setItem('fontSize', newScale);
});

// Уменьшение шрифта
fontDecreaseBtn.addEventListener('click', () => {
    const currentScale = parseFloat(root.style.getPropertyValue('--font-size-scale')) || 1;
    const newScale = Math.max(currentScale - 0.1, 0.8);
    
    root.style.setProperty('--font-size-scale', newScale);
    localStorage.setItem('fontSize', newScale);
});

// Плавная прокрутка для внутренних ссылок
document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Добавление анимации при прокрутке
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Наблюдение за элементами с анимацией
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.author-card, .book-item, .table-of-contents, .chapter-content');
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(element);
    });
});

// Улучшение доступности клавиатуры
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', () => {
    body.classList.remove('keyboard-navigation');
});

// Предотвращение двойного нажатия на мобильных устройствах
let touchEndTime = 0;
document.addEventListener('touchend', (e) => {
    const currentTime = new Date().getTime();
    const tapLength = currentTime - touchEndTime;
    
    if (tapLength < 500 && tapLength > 0) {
        e.preventDefault();
    }
    
    touchEndTime = currentTime;
});

// Определение мобильного устройства
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Адаптация для мобильных устройств
if (isMobile()) {
    document.body.classList.add('mobile-device');
}

// Логирование для отладки (можно удалить в продакшене)
console.log('Сайт библиотеки загружен успешно');
console.log('Текущая тема:', savedTheme);
console.log('Текущий размер шрифта:', savedFontSize);
