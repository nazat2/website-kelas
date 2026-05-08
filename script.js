function createParticles() {
    const container = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        const size = 1 + Math.random() * 3;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = 8 + Math.random() * 12 + 's';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.opacity = 0.3 + Math.random() * 0.5;
        container.appendChild(particle);
    }
}

function animateCounter(elementId, target, duration = 2000) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    let start = 0;
    const increment = target / (duration / 16);
    
    const updateCounter = () => {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
}

const observerOptions = { threshold: 0.3 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter('counter-walikelas', 1);
            animateCounter('counter-siswa', 41);
            animateCounter('counter-pengurus', 6);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

function initScrollEffects() {
    const topbar = document.getElementById('topbar');
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            topbar.classList.add('scrolled');
            scrollTopBtn.classList.add('show');
        } else {
            topbar.classList.remove('scrolled');
            scrollTopBtn.classList.remove('show');
        }
    });
    
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

function initWaliKelas() {
    const waliGrid = document.getElementById('wali-grid');
    if (waliGrid) {
        waliGrid.innerHTML = `
            <div class="wali-card">
                <div class="s-icon"><i class="fas fa-chalkboard-user"></i></div>
                <div class="s-role">WALI KELAS XI TJKT 1</div>
                <div class="s-name">ABDUL WAHAB, S.Pd.I</div>
            </div>
        `;
    }
}

function initPengurus() {
    const pengurusGrid = document.getElementById('pengurus-grid');
    const pengurus = [
        { role: "Ketua", name: "MUHAMMAD FARHAN FAUZI", icon: "fas fa-crown" },
        { role: "Wakil Ketua", name: "SALMA DZAKIRAH", icon: "fas fa-hand-peace" },
        { role: "Sekretaris 1", name: "NAZWA NURKEIFA", icon: "fas fa-book" },
        { role: "Sekretaris 2", name: "SITI NOERJANAH NATASYA", icon: "fas fa-book" },
        { role: "Bendahara 1", name: "TESYA MULYANI REYHANA", icon: "fas fa-coins" },
        { role: "Bendahara 2", name: "ZAHRA NOVIYANI PRATIWI", icon: "fas fa-coins" }
    ];
    
    if (pengurusGrid) {
        pengurusGrid.innerHTML = pengurus.map(p => `
            <div class="struct-card">
                <div class="s-icon"><i class="${p.icon}"></i></div>
                <div class="s-role">${p.role}</div>
                <div class="s-name">${p.name}</div>
            </div>
        `).join('');
    }
}

function initStudentList() {
    const students = [
        "ABDUL AZIZ", "APARI RAHMAH HUMAIROH", "DEDEN MORGAN", "FEBRIAN MUHAMAD FIRDAUS",
        "FIRDA INGGI RAHAYU", "Hafid Azizan Hakim", "JIWAN ADITYA RAMADHAN", "JUAN RENDY MAULANA",
        "M NAJAT", "M. AGIS SAEPUL ULUM", "M. HASAN SANUDIN", "MAHA NURAENI",
        "MOCH RIFQI FAJAR RUHIYAT", "Moch Wildan Zakaria", "MOH ALIFFATHAN RADHITHYA ALIYAN",
        "Muhamad Rajib", "MUHAMAD ZHANDER AL FIANSYAH", "Muhammad Aditya Fajar",
        "MUHAMMAD AHZAN RAHMADI", "MUHAMMAD FARHAN FAUZI", "Muhammad Raihanun Basit",
        "NAZWA NURKEIFA SYAHRIZAL R", "NENG LULU YULIANA NINGSIH", "PARUK PIRMANSAH",
        "RABIL HILMALUDIN", "Raditia Saparudin Rangkuti", "Rafli Barokah", "Rangga Adithya Budi",
        "RENALDI KHAIZURAN", "RESTIARA", "RICKY M ADHA", "RIO SUHENDAR",
        "RIZKI MUHAMAD FAJAR", "RIZKI MUHAMMAD YUSUF", "SALMA DZAKIRAH", "SHELY PUTRI IRAWAN",
        "Siti Noerjanah Natasya", "SYIFA KHOIRUNNISA", "Tesya Mulyani Reyhana",
        "YASMIN PERMATASARI", "ZAHRA NOVIYANI PRATIWI"
    ];
    
    const studentGrid = document.getElementById('student-grid');
    if (studentGrid) {
        studentGrid.innerHTML = students.map((name, i) => `
            <div class="student-card">
                <div class="student-num">${(i+1).toString().padStart(2,'0')}</div>
                <div class="student-name">${name}</div>
            </div>
        `).join('');
    }
}

// ============ GALERI DENGAN MODAL ============
let currentImageIndex = 0;
let galleryImagesList = [];

function initGallery() {
    galleryImagesList = [];
    for (let i = 1; i <= 8; i++) {
        galleryImagesList.push(`gallery/${i}.jpeg`);
    }
    
    const galleryScroll = document.getElementById('gallery-scroll');
    
    if (galleryScroll) {
        galleryScroll.innerHTML = '';
        galleryImagesList.forEach((imgUrl, i) => {
            const slide = document.createElement('div');
            slide.className = 'gallery-slide';
            slide.innerHTML = `<img src="${imgUrl}" alt="Foto Kelas ${i+1}">`;
            slide.onclick = (e) => {
                e.stopPropagation();
                openModal(i);
            };
            galleryScroll.appendChild(slide);
        });
    }
    
    const galleryPrev = document.getElementById('gallery-prev');
    const galleryNext = document.getElementById('gallery-next');
    
    if (galleryPrev) {
        galleryPrev.onclick = () => {
            if (galleryScroll) galleryScroll.scrollBy({ left: -220, behavior: 'smooth' });
        };
    }
    
    if (galleryNext) {
        galleryNext.onclick = () => {
            if (galleryScroll) galleryScroll.scrollBy({ left: 220, behavior: 'smooth' });
        };
    }
}

function openModal(index) {
    currentImageIndex = index;
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-img');
    
    if (modal && modalImg) {
        modalImg.src = galleryImagesList[currentImageIndex];
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    const modal = document.getElementById('image-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + galleryImagesList.length) % galleryImagesList.length;
    const modalImg = document.getElementById('modal-img');
    if (modalImg) {
        modalImg.src = galleryImagesList[currentImageIndex];
    }
}

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryImagesList.length;
    const modalImg = document.getElementById('modal-img');
    if (modalImg) {
        modalImg.src = galleryImagesList[currentImageIndex];
    }
}

// ============ JADWAL ============
function initSchedule() {
    const schedules = {
        senin: [
            { subject: "Matematika", time: "08:40 - 10:10" },
            { subject: "PKK", time: "10:10 - 12:25" },
            { subject: "Bahasa Inggris", time: "12:25 - 14:00" }
        ],
        selasa: [
            { subject: "PKK", time: "07:30 - 10:10" },
            { subject: "Bahasa Indonesia", time: "12:25 - 14:00" }
        ],
        rabu: [
            { subject: "Bahasa Inggris", time: "07:30 - 10:10" },
            { subject: "Sejarah", time: "10:10 - 12:25" },
            { subject: "PAI", time: "12:25 - 14:00" }
        ],
        kamis: [
            { subject: "Bahasa Indonesia", time: "07:30 - 08:40" },
            { subject: "Bahasa Sunda", time: "08:40 - 10:10" },
            { subject: "PAI", time: "10:10 - 12:25" },
            { subject: "PPKN", time: "12:25 - 14:00" }
        ],
        jumat: [
            { subject: "Bahasa Sunda", time: "07:30 - 10:10" },
            { subject: "Matematika", time: "10:10 - 12:25" }
        ]
    };

    function renderSchedule(day) {
        const container = document.getElementById('schedule-list');
        if (!container) return;
        
        container.innerHTML = schedules[day].map((item, idx) => `
            <div class="schedule-item" data-subject="${item.subject}" data-time="${item.time}" data-idx="${idx}">
                <div>
                    <div class="schedule-subject">${item.subject}</div>
                    <div class="schedule-time"><i class="far fa-clock"></i> ${item.time}</div>
                </div>
                <div class="schedule-arrow"><i class="fas fa-chevron-right"></i></div>
            </div>
        `).join('');
        
        document.querySelectorAll('.schedule-item').forEach(el => {
            el.onclick = (e) => {
                e.stopPropagation();
                const subject = el.getAttribute('data-subject');
                const time = el.getAttribute('data-time');
                openScheduleModal(subject, time);
            };
        });
    }
    
    renderSchedule('senin');
    
    document.querySelectorAll('.day-tab').forEach(tab => {
        tab.onclick = () => {
            document.querySelectorAll('.day-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            renderSchedule(tab.dataset.day);
        };
    });
}

function openScheduleModal(subject, time) {
    const modal = document.getElementById('schedule-detail-modal');
    const detailSubject = document.getElementById('detail-subject');
    const detailTime = document.getElementById('detail-time');
    
    if (modal && detailSubject && detailTime) {
        detailSubject.textContent = subject;
        detailTime.textContent = `Jam: ${time}`;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeScheduleModal() {
    const modal = document.getElementById('schedule-detail-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// ============ MUSIC PLAYER ============
function initMusicPlayer() {
    const playlist = [
        { title: "needy", artist: "ariana grande", file: "musik/lagu1.mp3", duration: "2:52" },
        { title: "into it", artist: "chase atlantic", file: "musik/lagu2.mp3", duration: "3:16" },
        { title: "superpowers", artist: "daniel caesar", file: "musik/lagu3.mp3", duration: "2:54" },
        { title: "snooze", artist: "sza", file: "musik/lagu4.mp3", duration: "3:20" },
        { title: "every breath you take", artist: "the police", file: "musik/lagu5.mp3", duration: "3:48" }
    ];
    
    let currentIndex = 0;
    let isPlaying = false;
    let audio = new Audio();
    let volume = 0.7;
    
    audio.volume = volume;
    audio.loop = false;
    
    function loadSong(index) {
        const song = playlist[index];
        audio.src = song.file;
        audio.load();
        const currentSongEl = document.getElementById('current-song');
        const currentArtistEl = document.getElementById('current-artist');
        const durationEl = document.getElementById('duration');
        if (currentSongEl) currentSongEl.textContent = song.title;
        if (currentArtistEl) currentArtistEl.textContent = song.artist;
        if (durationEl) durationEl.textContent = song.duration;
        
        document.querySelectorAll('.playlist-item').forEach((item, i) => {
            if (i === index) item.classList.add('active');
            else item.classList.remove('active');
        });
        
        if (isPlaying) {
            audio.play().catch(e => console.log('Auto-play need interaction'));
        }
    }
    
    function formatTime(seconds) {
        if (isNaN(seconds)) return "0:00";
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' + secs : secs}`;
    }
    
    function updateProgress() {
        if (audio.duration && !isNaN(audio.duration)) {
            const percent = (audio.currentTime / audio.duration) * 100;
            const progressFill = document.getElementById('progress-fill');
            const currentTimeEl = document.getElementById('current-time');
            if (progressFill) progressFill.style.width = percent + '%';
            if (currentTimeEl) currentTimeEl.textContent = formatTime(audio.currentTime);
        }
    }
    
    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', () => { nextSong(); });
    audio.addEventListener('loadedmetadata', () => {
        if (audio.duration && !isNaN(audio.duration)) {
            const durationEl = document.getElementById('duration');
            if (durationEl) durationEl.textContent = formatTime(audio.duration);
        }
    });
    
    function playSong() {
        audio.play();
        isPlaying = true;
        const playPauseBtn = document.getElementById('play-pause-btn');
        if (playPauseBtn) playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }
    
    function pauseSong() {
        audio.pause();
        isPlaying = false;
        const playPauseBtn = document.getElementById('play-pause-btn');
        if (playPauseBtn) playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
    
    function togglePlay() {
        if (isPlaying) pauseSong();
        else playSong();
    }
    
    function nextSong() {
        currentIndex = (currentIndex + 1) % playlist.length;
        loadSong(currentIndex);
        if (isPlaying) audio.play();
    }
    
    function prevSong() {
        currentIndex = (currentIndex - 1 + playlist.length) % playlist.length;
        loadSong(currentIndex);
        if (isPlaying) audio.play();
    }
    
    const progressBar = document.getElementById('progress-bar');
    if (progressBar) {
        progressBar.addEventListener('click', (e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const percent = (e.clientX - rect.left) / rect.width;
            if (audio.duration && !isNaN(audio.duration)) {
                audio.currentTime = percent * audio.duration;
            }
        });
    }
    
    function updateVolumeFill() {
        const volumeFill = document.getElementById('volume-fill');
        if (volumeFill) volumeFill.style.width = (volume * 100) + '%';
    }
    
    const volumeSlider = document.getElementById('volume-slider');
    if (volumeSlider) {
        volumeSlider.addEventListener('click', (e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            volume = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
            audio.volume = volume;
            updateVolumeFill();
        });
    }
    
    const playPauseBtn = document.getElementById('play-pause-btn');
    const nextBtn = document.getElementById('next-btn');
    const prevBtn = document.getElementById('prev-btn');
    
    if (playPauseBtn) playPauseBtn.onclick = togglePlay;
    if (nextBtn) nextBtn.onclick = nextSong;
    if (prevBtn) prevBtn.onclick = prevSong;
    
    const playlistContainer = document.getElementById('playlist-container');
    if (playlistContainer) {
        playlistContainer.innerHTML = '';
        playlist.forEach((song, idx) => {
            const item = document.createElement('div');
            item.className = 'playlist-item';
            item.innerHTML = `
                <div class="play-icon"><i class="fas ${idx === currentIndex ? 'fa-play-circle' : 'fa-music'}"></i></div>
                <div class="song-info"><div class="song-name">${song.title}</div><div class="song-duration">${song.artist}</div></div>
                <div class="song-duration">${song.duration}</div>
            `;
            item.onclick = () => {
                currentIndex = idx;
                loadSong(currentIndex);
                playSong();
            };
            playlistContainer.appendChild(item);
        });
    }
    
    const playerToggle = document.getElementById('player-toggle');
    const playerPanel = document.getElementById('player-panel');
    if (playerToggle && playerPanel) {
        playerToggle.onclick = () => {
            playerPanel.classList.toggle('show');
        };
    }
    
    loadSong(0);
    updateVolumeFill();
}

// ============ PESAN ANONIM FIREBASE ============
function initAnonimMessages() {
    let messages = [];
    let isLoading = true;
    
    function escapeHtml(str) {
        if (!str) return '';
        return str.replace(/[&<>]/g, function(m) {
            if (m === '&') return '&amp;';
            if (m === '<') return '&lt;';
            if (m === '>') return '&gt;';
            return m;
        });
    }
    
    function formatTime(timestamp) {
        if (!timestamp) return 'Baru saja';
        const date = new Date(timestamp);
        const now = new Date();
        const diff = now - date;
        
        if (diff < 60000) return 'Baru saja';
        if (diff < 3600000) return Math.floor(diff / 60000) + ' menit lalu';
        if (diff < 86400000) return Math.floor(diff / 3600000) + ' jam lalu';
        if (diff < 604800000) return Math.floor(diff / 86400000) + ' hari lalu';
        return date.toLocaleDateString('id-ID');
    }
    
    function renderMessages() {
        const container = document.getElementById('anonim-messages');
        if (!container) return;
        
        if (isLoading) {
            container.innerHTML = '<div style="text-align: center; padding: 20px; color: var(--text-dim);"><i class="fas fa-spinner fa-pulse"></i> Memuat pesan...</div>';
            return;
        }
        
        if (messages.length === 0) {
            container.innerHTML = '<div style="text-align: center; padding: 20px; color: var(--text-dim);">✨ Belum ada pesan, jadilah yang pertama!</div>';
            return;
        }
        
        const sortedMessages = [...messages].reverse();
        
        container.innerHTML = sortedMessages.map(msg => `
            <div style="background: var(--surface); border-radius: 12px; padding: 12px; margin-bottom: 8px; transition: all 0.2s ease;">
                <div style="display: flex; gap: 6px; margin-bottom: 6px;">
                    <i class="fas fa-user-secret" style="color: var(--purple); font-size: 10px;"></i>
                    <span style="font-size: 10px; color: var(--text-dim);">Anonymous</span>
                    <span style="font-size: 9px; color: var(--text-dim); margin-left: auto;">${formatTime(msg.timestamp)}</span>
                </div>
                <p style="font-size: 12px; word-break: break-word; line-height: 1.4;">${escapeHtml(msg.text)}</p>
            </div>
        `).join('');
    }
    
    function loadMessagesFromFirebase() {
        if (typeof messagesRef === 'undefined') {
            console.error('Firebase not initialized');
            isLoading = false;
            const container = document.getElementById('anonim-messages');
            if (container) {
                container.innerHTML = '<div style="text-align: center; padding: 20px; color: #ef4444;">⚠️ Firebase error. Cek konfigurasi.</div>';
            }
            return;
        }
        
        isLoading = true;
        renderMessages();
        
        messagesRef.on('value', function(snapshot) {
            const data = snapshot.val();
            messages = [];
            
            if (data) {
                Object.keys(data).forEach(key => {
                    messages.push({
                        id: key,
                        text: data[key].text,
                        timestamp: data[key].timestamp || Date.now()
                    });
                });
                messages.sort((a, b) => (a.timestamp || 0) - (b.timestamp || 0));
            }
            
            isLoading = false;
            renderMessages();
        }, function(error) {
            console.error('Error loading messages:', error);
            isLoading = false;
            const container = document.getElementById('anonim-messages');
            if (container) {
                container.innerHTML = '<div style="text-align: center; padding: 20px; color: #ef4444;">⚠️ Gagal memuat pesan. Periksa koneksi internet.</div>';
            }
        });
    }
    
    function sendMessageToFirebase(text) {
        if (!text.trim()) return false;
        if (typeof messagesRef === 'undefined') {
            alert('Firebase belum siap, coba lagi nanti.');
            return false;
        }
        
        const newMessage = {
            text: text.trim(),
            timestamp: Date.now()
        };
        
        messagesRef.push(newMessage)
            .then(() => {
                console.log('Pesan terkirim!');
            })
            .catch((error) => {
                console.error('Error sending message:', error);
                alert('Gagal mengirim pesan. Pastikan koneksi internet Anda stabil.');
            });
        
        return true;
    }
    
    const anonimModal = document.getElementById('anonim-modal');
    const anonimBtn = document.getElementById('anonim-btn');
    const closeAnonim = document.getElementById('close-anonim');
    const anonimInput = document.getElementById('anonim-input');
    const anonimSend = document.getElementById('anonim-send');
    
    if (anonimBtn) {
        anonimBtn.onclick = () => {
            renderMessages();
            if (anonimModal) anonimModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        };
    }
    
    if (closeAnonim) {
        closeAnonim.onclick = () => {
            if (anonimModal) anonimModal.classList.remove('active');
            document.body.style.overflow = '';
        };
    }
    
    if (anonimModal) {
        anonimModal.onclick = (e) => {
            if (e.target === anonimModal) {
                anonimModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        };
    }
    
    if (anonimSend) {
        anonimSend.onclick = () => {
            const text = anonimInput ? anonimInput.value.trim() : '';
            if (!text) {
                alert('Silakan tulis pesan terlebih dahulu!');
                return;
            }
            
            if (sendMessageToFirebase(text)) {
                if (anonimInput) anonimInput.value = '';
                const originalText = anonimSend.textContent;
                anonimSend.textContent = '✓ Terkirim!';
                setTimeout(() => {
                    anonimSend.textContent = originalText;
                }, 1500);
            }
        };
    }
    
    if (anonimInput) {
        anonimInput.onkeypress = (e) => {
            if (e.key === 'Enter' && anonimSend) anonimSend.click();
        };
    }
    
    loadMessagesFromFirebase();
}

// ============ MODAL HANDLERS ============
function initModals() {
    // Modal Galeri
    const imageModal = document.getElementById('image-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const modalPrev = document.getElementById('modal-prev');
    const modalNext = document.getElementById('modal-next');
    
    if (closeModalBtn) {
        closeModalBtn.onclick = () => {
            closeModal();
        };
    }
    
    if (imageModal) {
        imageModal.onclick = (e) => {
            if (e.target === imageModal) {
                closeModal();
            }
        };
    }
    
    if (modalPrev) {
        modalPrev.onclick = (e) => {
            e.stopPropagation();
            prevImage();
        };
    }
    
    if (modalNext) {
        modalNext.onclick = (e) => {
            e.stopPropagation();
            nextImage();
        };
    }
    
    // Keyboard navigation untuk galeri
    document.addEventListener('keydown', (e) => {
        const imageModalActive = document.getElementById('image-modal')?.classList.contains('active');
        if (imageModalActive) {
            if (e.key === 'Escape') {
                closeModal();
            } else if (e.key === 'ArrowLeft') {
                prevImage();
            } else if (e.key === 'ArrowRight') {
                nextImage();
            }
        }
        
        const scheduleModalActive = document.getElementById('schedule-detail-modal')?.classList.contains('active');
        if (scheduleModalActive && e.key === 'Escape') {
            closeScheduleModal();
        }
        
        const anonimModalActive = document.getElementById('anonim-modal')?.classList.contains('active');
        if (anonimModalActive && e.key === 'Escape') {
            const modal = document.getElementById('anonim-modal');
            if (modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });
    
    // Modal Jadwal
    const scheduleDetailModal = document.getElementById('schedule-detail-modal');
    const closeDetailModal = document.getElementById('close-detail-modal');
    
    if (closeDetailModal) {
        closeDetailModal.onclick = () => {
            closeScheduleModal();
        };
    }
    
    if (scheduleDetailModal) {
        scheduleDetailModal.onclick = (e) => {
            if (e.target === scheduleDetailModal) {
                closeScheduleModal();
            }
        };
    }
}

function initSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const openBtn = document.getElementById('open-menu');
    const closeSidebarBtn = document.getElementById('close-menu');
    
    function closeSidebar() {
        if (sidebar) sidebar.classList.remove('open');
        if (overlay) overlay.classList.remove('show');
        document.body.style.overflow = '';
    }
    
    function openSidebar() {
        if (sidebar) sidebar.classList.add('open');
        if (overlay) overlay.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
    
    if (openBtn) openBtn.onclick = openSidebar;
    if (closeSidebarBtn) closeSidebarBtn.onclick = closeSidebar;
    if (overlay) overlay.onclick = closeSidebar;
    
    const homeNav = document.getElementById('home-nav');
    const galleryNav = document.getElementById('gallery-nav');
    const structureNav = document.getElementById('structure-nav');
    const scheduleNav = document.getElementById('schedule-nav');
    
    if (homeNav) {
        homeNav.onclick = () => {
            document.getElementById('home-section').scrollIntoView({ behavior: 'smooth' });
            closeSidebar();
        };
    }
    if (galleryNav) {
        galleryNav.onclick = () => {
            document.getElementById('gallery-section').scrollIntoView({ behavior: 'smooth' });
            closeSidebar();
        };
    }
    if (structureNav) {
        structureNav.onclick = () => {
            document.getElementById('structure-section').scrollIntoView({ behavior: 'smooth' });
            closeSidebar();
        };
    }
    if (scheduleNav) {
        scheduleNav.onclick = () => {
            document.getElementById('schedule-section').scrollIntoView({ behavior: 'smooth' });
            closeSidebar();
        };
    }
}

function initTheme() {
    const themeSwitch = document.getElementById('theme-switch');
    const savedTheme = localStorage.getItem('theme_tjkt1');
    if (savedTheme === 'light') {
        document.body.classList.add('light');
        if (themeSwitch) themeSwitch.classList.add('active');
    }
    
    if (themeSwitch) {
        themeSwitch.onclick = () => {
            document.body.classList.toggle('light');
            themeSwitch.classList.toggle('active');
            localStorage.setItem('theme_tjkt1', document.body.classList.contains('light') ? 'light' : 'dark');
        };
    }
}

// ============ INITIALIZATION ============
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    
    const heroSection = document.querySelector('.hero');
    if (heroSection) observer.observe(heroSection);
    
    initScrollEffects();
    initWaliKelas();
    initPengurus();
    initStudentList();
    initGallery();
    initSchedule();
    initMusicPlayer();
    initAnonimMessages();
    initModals();
    initSidebar();
    initTheme();
    
    console.log('XI TJKT 1 all systems ready.');
});