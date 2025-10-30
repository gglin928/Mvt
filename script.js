// --- 語言包 (Language Translations) ---
const translations = {
    zh: {
        title: "個人履歷 - 冒文進",
        name: "冒文進 (Mào Văn Tiến)",
        student_id_label: "學號:",
        current_status: "來自越南的留學生，目前就讀亞洲科技大學 (Asia University of Science and Technology) 於台中。",
        hobbies_title: "興趣與愛好",
        hobby_1: "跳舞",
        hobby_2: "畫畫",
        hobby_3: "爬山",
        hobby_4: "看海",
        about_me_title: "關於我",
        about_me_content_1: "我是一個充滿熱情與好奇心的人，喜歡透過藝術和運動來探索世界和表達自我。在異國求學雖然充滿挑戰，但也讓我學會獨立、適應新環境和欣賞不同文化。",
        about_me_content_2: "希望未來能將所學應用於實踐，並持續精進自己的專業技能。我樂於接受新事物，相信積極的態度能帶來無限的可能。",
        gallery_title: "生活點滴",
        gallery_caption: "這是我的部分生活照片。",
        copy_success: "已複製！",
        copy_label: "複製學號",
        milestones_title: "大事紀錄 (里程碑)"
    },
    vi: {
        title: "Sơ Yếu Lý Lịch - Mão Văn Tiến",
        name: "冒文進 (Mào Văn Tiến)",
        student_id_label: "Mã số sinh viên:",
        current_status: "Du học sinh đến từ Việt Nam, hiện đang theo học tại Đại học Khoa học và Công nghệ Châu Á (Asia University of Science and Technology) ở Đài Trung.",
        hobbies_title: "Sở Thích & Hoạt Động",
        hobby_1: "Nhảy múa (Dance)",
        hobby_2: "Vẽ tranh (Drawing)",
        hobby_3: "Leo núi (Hiking)",
        hobby_4: "Ngắm biển (Watching the Sea)",
        about_me_title: "Về Tôi",
        about_me_content_1: "Tôi là một người đầy nhiệt huyết và tò mò, thích khám phá thế giới và thể hiện bản thân qua nghệ thuật và thể thao. Việc học tập ở nước ngoài đầy thử thách nhưng cũng giúp tôi học cách độc lập, thích nghi với môi trường mới và trân trọng các nền văn hóa khác nhau.",
        about_me_content_2: "Tôi hy vọng trong tương lai sẽ áp dụng những kiến thức đã học vào thực tế và tiếp tục trau dồi kỹ năng chuyên môn của mình. Tôi sẵn lòng đón nhận những điều mới mẻ và tin rằng thái độ tích cực có thể mang lại vô vàn khả năng.",
        gallery_title: "Khoảnh Khắc Đời Thường",
        gallery_caption: "Đây là một số hình ảnh về cuộc sống của tôi.",
        copy_success: "Đã sao chép!",
        copy_label: "Sao chép Mã SV",
        milestones_title: "Các Mốc Quan Trọng (Timeline)"
    }
};

const milestones = [
    {
        date: "2024/09",
        zh: "來到台灣，學習中文",
        vi: "Đến Đài Loan, bắt đầu học tiếng Trung"
    },
    {
        date: "2025/02",
        zh: "取得中文 B1 認證",
        vi: "Đạt chứng chỉ Hán ngữ B1"
    },
    {
        date: "2025/04",
        zh: "在牛排店任職 (兼職)",
        vi: "Bắt đầu làm việc (bán thời gian) tại một nhà hàng bít tết"
    },
    {
        date: "2025/09",
        zh: "就讀大學一年級 (亞洲科技大學)",
        vi: "Bắt đầu năm thứ nhất đại học (Asia University of Science and Technology)"
    }
];

// --- DOM 元素獲取 ---
const htmlElement = document.documentElement;
const themeToggleBtn = document.getElementById('theme-toggle');
const langSelect = document.getElementById('lang-select');
const copyIdBtn = document.getElementById('copy-id-btn');
const studentIdValue = document.getElementById('student-id-value').textContent;
const copyMessage = document.getElementById('copy-message');

// --- 亮/暗模式功能 (Light/Dark Mode) ---

// 1. 設置主題
function setTheme(theme) {
    htmlElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    // 更新按鈕圖示
    const icon = themeToggleBtn.querySelector('i');
    if (theme === 'dark') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// 2. 切換主題
themeToggleBtn.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
});

// 3. 頁面載入時檢查並應用主題
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'light'; // 預設亮色
    setTheme(savedTheme);
});


// --- 語言切換功能 (Language Switch) ---

// 1. 應用翻譯
function applyTranslation(lang) {
    const currentLangPack = translations[lang];

    // 翻譯所有帶有 data-i18n 屬性的元素
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (currentLangPack[key]) {
            // 處理 title
            if (element.tagName === 'TITLE') {
                document.title = currentLangPack[key];
            } else {
                element.textContent = currentLangPack[key];
            }
        }
    });

    // 特殊處理：複製按鈕的 aria-label
    copyIdBtn.setAttribute('aria-label', currentLangPack.copy_label);
    
    // 更新 HTML 語言屬性
    htmlElement.setAttribute('lang', lang);

    // 儲存語言偏好
    localStorage.setItem('lang', lang);

    // === 新增：渲染大事紀錄 (Render Timeline) ===
    renderTimeline(lang);
}

// --- 大事紀錄渲染功能 (Timeline Rendering) ---
function renderTimeline(lang) {
    const container = document.getElementById('timeline-container');
    if (!container) return; // 如果找不到容器則退出

    container.innerHTML = ''; // 清空舊內容

    milestones.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('timeline-item');
        
        // 根據當前語言選擇描述
        const description = item[lang] || item['zh']; 

        itemElement.innerHTML = `
            <div class="timeline-marker"></div>
            <div class="timeline-content">
                <div class="timeline-date">${item.date}</div>
                <div class="timeline-description">${description}</div>
            </div>
        `;
        container.appendChild(itemElement);
    });
}

// 2. 監聽語言選單變化
langSelect.addEventListener('change', (event) => {
    const newLang = event.target.value;
    applyTranslation(newLang);
});

// 3. 頁面載入時應用儲存的語言
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('lang') || 'zh'; // 預設中文
    langSelect.value = savedLang;
    applyTranslation(savedLang);
});


// --- 學號複製功能 (Student ID Copy) ---

copyIdBtn.addEventListener('click', () => {
    // 使用 Clipboard API 複製文本
    navigator.clipboard.writeText(studentIdValue).then(() => {
        // 顯示複製成功訊息
        const currentLang = htmlElement.getAttribute('lang') || 'zh';
        copyMessage.textContent = translations[currentLang].copy_success;
        copyMessage.classList.add('show');
        
        // 幾秒後隱藏訊息
        setTimeout(() => {
            copyMessage.classList.remove('show');
        }, 2000);

    }).catch(err => {
        console.error('複製失敗:', err);
        alert('複製失敗，請手動複製學號: ' + studentIdValue);
    });
});
