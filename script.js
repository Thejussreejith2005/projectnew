/* ==========================================
   VIRTUAL COLLEGE NOTICE BOARD SYSTEM
   Main JavaScript File
   ========================================== */

// ========== SAMPLE DATA - DUMMY NOTICES ==========
const sampleNotices = [
    {
        id: 1,
        title: "Mid-Semester Examination Schedule - Fall 2024",
        description: "The mid-semester examinations for all undergraduate programs will be conducted from March 15-22, 2024. Students are advised to check the detailed timetable on the examination portal. Hall tickets will be available for download from March 10, 2024.",
        section: "examination",
        importance: "important",
        datePosted: "2024-02-01",
        expiryDate: "2024-03-22",
        attachments: [],
        postedBy: "exam_admin"
    },
    {
        id: 2,
        title: "Hall Ticket Download Instructions",
        description: "Students can download their examination hall tickets from the student portal starting February 5, 2024. Please ensure all fee payments are cleared before downloading.",
        section: "examination",
        importance: "normal",
        datePosted: "2024-01-28",
        expiryDate: "2024-03-15",
        attachments: [{ name: "instructions.pdf", type: "pdf" }],
        postedBy: "exam_admin"
    },
    {
        id: 3,
        title: "Merit Scholarship Application Open for 2024",
        description: "Applications are now open for merit-based scholarships for the academic year 2024. Eligible students with a CGPA above 8.0 can apply. Please download the application form and submit before the deadline.",
        section: "scholarship",
        importance: "normal",
        datePosted: "2024-01-30",
        expiryDate: "2024-02-28",
        attachments: [{ name: "scholarship_form.pdf", type: "pdf" }],
        postedBy: "scholar_admin"
    },
    {
        id: 4,
        title: "Annual Tech Fest 2024 - Registration Open",
        description: "The annual tech fest 'TechnoVista 2024' will be held on March 5-7, 2024. Students can register for various competitions including coding, robotics, and project exhibitions. Register now to secure your spot!",
        section: "events",
        importance: "normal",
        datePosted: "2024-01-28",
        expiryDate: "2024-03-07",
        attachments: [{ name: "techfest_poster.jpg", type: "image" }],
        postedBy: "event_admin"
    },
    {
        id: 5,
        title: "Course Registration for Spring Semester 2024",
        description: "Course registration for Spring Semester 2024 will begin on February 10, 2024. Students must complete their registration within the stipulated time. Please consult your academic advisor before registration.",
        section: "academics",
        importance: "important",
        datePosted: "2024-01-25",
        expiryDate: "2024-02-20",
        attachments: [],
        postedBy: "acad_admin"
    },
    {
        id: 6,
        title: "Campus Recruitment Drive - Tech Giants 2024",
        description: "Leading tech companies will be visiting campus for recruitment in February. Final year students are requested to update their resumes and register through the placement portal. Pre-placement talks will be scheduled soon.",
        section: "placement",
        importance: "normal",
        datePosted: "2024-01-22",
        expiryDate: "2024-03-01",
        attachments: [{ name: "company_profiles.pdf", type: "pdf" }],
        postedBy: "place_admin"
    },
    {
        id: 7,
        title: "Library Extended Hours During Exams",
        description: "The college library will operate with extended hours during the examination period. From March 10-25, the library will be open from 7 AM to 11 PM including weekends.",
        section: "academics",
        importance: "normal",
        datePosted: "2024-01-20",
        expiryDate: "2024-03-25",
        attachments: [],
        postedBy: "acad_admin"
    },
    {
        id: 8,
        title: "Sports Day 2024 - Participation Registration",
        description: "Annual Sports Day will be organized on February 15, 2024. Students interested in participating in various sports events should register with the sports department by February 5, 2024.",
        section: "events",
        importance: "normal",
        datePosted: "2024-01-18",
        expiryDate: "2024-02-15",
        attachments: [],
        postedBy: "event_admin"
    },
    {
        id: 9,
        title: "Answer Script Review Process",
        description: "Students who wish to apply for answer script review should submit their applications within 7 days of result publication along with the prescribed fee.",
        section: "examination",
        importance: "normal",
        datePosted: "2024-01-20",
        expiryDate: "2024-01-31",
        attachments: [],
        postedBy: "exam_admin"
    },
    {
        id: 10,
        title: "Workshop on AI and Machine Learning",
        description: "A two-day workshop on Artificial Intelligence and Machine Learning will be conducted on February 20-21, 2024. Industry experts will be conducting hands-on sessions. Limited seats available.",
        section: "academics",
        importance: "important",
        datePosted: "2024-01-15",
        expiryDate: "2024-02-21",
        attachments: [{ name: "workshop_details.pdf", type: "pdf" }],
        postedBy: "acad_admin"
    }
];

// Store notices in localStorage for persistence
if (!localStorage.getItem('notices')) {
    localStorage.setItem('notices', JSON.stringify(sampleNotices));
}

// ========== HELPER FUNCTIONS ==========

// Get all notices from localStorage
function getAllNotices() {
    const notices = localStorage.getItem('notices');
    return notices ? JSON.parse(notices) : [];
}

// Save notices to localStorage
function saveNotices(notices) {
    localStorage.setItem('notices', JSON.stringify(notices));
}

// Check if notice is expired
function isExpired(expiryDate) {
    const today = new Date();
    const expiry = new Date(expiryDate);
    return today > expiry;
}

// Get active notices
function getActiveNotices() {
    return getAllNotices().filter(notice => !isExpired(notice.expiryDate));
}

// Get expired notices
function getExpiredNotices() {
    return getAllNotices().filter(notice => isExpired(notice.expiryDate));
}

// Get important notices
function getImportantNotices() {
    return getActiveNotices().filter(notice => notice.importance === 'important');
}

// Format date to readable format
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Get current user from session
function getCurrentUser() {
    const user = sessionStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
}

// Check if user is logged in
function isLoggedIn() {
    return getCurrentUser() !== null;
}

// Logout function
function logout() {
    sessionStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

// ========== ADMIN LOGIN HANDLING ==========
document.addEventListener('DOMContentLoaded', function() {
    
    // Admin Login Form
    const adminLoginForm = document.getElementById('adminLoginForm');
    if (adminLoginForm) {
        adminLoginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const role = document.getElementById('adminRole').value;
            const username = document.getElementById('adminUsername').value;
            const password = document.getElementById('adminPassword').value;
            
            // Simple validation (for demo purposes)
            if (role === 'super-admin' && username === 'superadmin' && password === 'super123') {
                // Super Admin Login
                const user = {
                    type: 'super-admin',
                    username: username,
                    role: 'Super Admin'
                };
                sessionStorage.setItem('currentUser', JSON.stringify(user));
                window.location.href = 'admin-dashboard.html';
            } else if (username === 'admin' && password === 'admin123') {
                // Section Admin Login
                const user = {
                    type: 'section-admin',
                    username: username,
                    role: role,
                    section: role.charAt(0).toUpperCase() + role.slice(1)
                };
                sessionStorage.setItem('currentUser', JSON.stringify(user));
                window.location.href = 'section-admin.html';
            } else {
                alert('Invalid credentials! Please check demo credentials.');
            }
        });
    }
    
    // Student Login Form
    const studentLoginForm = document.getElementById('studentLoginForm');
    if (studentLoginForm) {
        studentLoginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const studentId = document.getElementById('studentId').value;
            const password = document.getElementById('studentPassword').value;
            
            // Simple validation (for demo purposes)
            if (studentId === 'STU001' && password === 'student123') {
                const user = {
                    type: 'student',
                    studentId: studentId,
                    name: 'Student User'
                };
                sessionStorage.setItem('currentUser', JSON.stringify(user));
                window.location.href = 'student-dashboard.html';
            } else {
                alert('Invalid credentials! Please check demo credentials.');
            }
        });
    }
    
    // Logout Button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (confirm('Are you sure you want to logout?')) {
                logout();
            }
        });
    }
    
    // Check if user is logged in on protected pages
    const protectedPages = ['admin-dashboard.html', 'section-admin.html', 'student-dashboard.html', 'add-notice.html'];
    const currentPage = window.location.pathname.split('/').pop();
    
    if (protectedPages.includes(currentPage) && !isLoggedIn()) {
        alert('Please login to access this page');
        window.location.href = 'index.html';
    }
    
    // Display user info
    if (isLoggedIn()) {
        const user = getCurrentUser();
        
        // Update sidebar user info
        const sectionName = document.getElementById('sectionName');
        const adminName = document.getElementById('adminName');
        const adminUsername = document.getElementById('adminUsername');
        const studentId = document.getElementById('studentId');
        
        if (user.type === 'super-admin') {
            if (adminName) adminName.textContent = 'Super Admin';
        } else if (user.type === 'section-admin') {
            if (sectionName) sectionName.textContent = user.section + ' Admin';
            if (adminUsername) adminUsername.textContent = user.username;
        } else if (user.type === 'student') {
            if (studentId) studentId.textContent = user.studentId;
        }
    }
});

// ========== SIDEBAR NAVIGATION ==========
document.addEventListener('DOMContentLoaded', function() {
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only handle links with data-section attribute
            if (this.dataset.section) {
                e.preventDefault();
                
                // Remove active class from all links
                sidebarLinks.forEach(l => l.classList.remove('active'));
                
                // Add active class to clicked link
                this.classList.add('active');
                
                // Hide all sections
                const sections = document.querySelectorAll('.content-section');
                sections.forEach(section => section.classList.remove('active'));
                
                // Show selected section
                const targetSection = document.getElementById(this.dataset.section);
                if (targetSection) {
                    targetSection.classList.add('active');
                }
            }
        });
    });
});

// ========== NOTICE FORM HANDLING ==========
document.addEventListener('DOMContentLoaded', function() {
    const noticeForm = document.getElementById('noticeForm');
    
    if (noticeForm) {
        // Set default dates
        const noticeDateInput = document.getElementById('noticeDate');
        const expiryDateInput = document.getElementById('expiryDate');
        
        if (noticeDateInput && expiryDateInput) {
            const today = new Date().toISOString().split('T')[0];
            noticeDateInput.value = today;
            
            // Set expiry date to 30 days from today
            const futureDate = new Date();
            futureDate.setDate(futureDate.getDate() + 30);
            expiryDateInput.value = futureDate.toISOString().split('T')[0];
        }
        
        // Set section automatically for section admins
        const user = getCurrentUser();
        if (user && user.type === 'section-admin') {
            const sectionSelect = document.getElementById('noticeSection');
            if (sectionSelect) {
                sectionSelect.value = user.role;
                sectionSelect.disabled = true;
            }
        }
        
        // Form submission
        noticeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const notice = {
                id: Date.now(),
                title: document.getElementById('noticeTitle').value,
                description: document.getElementById('noticeDescription').value,
                section: document.getElementById('noticeSection').value,
                importance: document.getElementById('noticeImportance').value,
                datePosted: document.getElementById('noticeDate').value,
                expiryDate: document.getElementById('expiryDate').value,
                attachments: [],
                postedBy: user ? user.username : 'admin'
            };
            
            // Handle file attachment if exists
            const fileInput = document.getElementById('noticeAttachment');
            if (fileInput.files.length > 0) {
                const file = fileInput.files[0];
                const fileType = file.type.includes('pdf') ? 'pdf' : 'image';
                notice.attachments.push({
                    name: file.name,
                    type: fileType
                });
            }
            
            // Get existing notices and add new one
            const notices = getAllNotices();
            notices.unshift(notice);
            saveNotices(notices);
            
            alert('Notice published successfully!');
            window.location.href = 'section-admin.html';
        });
    }
});

// ========== FILE UPLOAD HANDLING ==========
function handleFileSelect(event) {
    const file = event.target.files[0];
    const preview = document.getElementById('filePreview');
    
    if (file) {
        // Validate file size (5MB max)
        if (file.size > 5 * 1024 * 1024) {
            alert('File size should not exceed 5MB');
            event.target.value = '';
            return;
        }
        
        // Validate file type
        const validTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
        if (!validTypes.includes(file.type)) {
            alert('Only PDF, JPG, and PNG files are allowed');
            event.target.value = '';
            return;
        }
        
        // Show file preview
        preview.classList.add('active');
        preview.innerHTML = `
            <div class="file-preview-item">
                <div style="display: flex; align-items: center; gap: 10px;">
                    <i class="fas fa-${file.type.includes('pdf') ? 'file-pdf' : 'file-image'}"></i>
                    <span>${file.name}</span>
                    <small>(${(file.size / 1024).toFixed(2)} KB)</small>
                </div>
                <button type="button" class="btn-icon" onclick="clearFileUpload()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
    }
}

function clearFileUpload() {
    const fileInput = document.getElementById('noticeAttachment');
    const preview = document.getElementById('filePreview');
    
    fileInput.value = '';
    preview.classList.remove('active');
    preview.innerHTML = '';
}

// Reset form
function resetForm() {
    if (confirm('Are you sure you want to reset the form?')) {
        document.getElementById('noticeForm').reset();
        clearFileUpload();
    }
}

// Save as draft
function saveDraft() {
    alert('Draft saved successfully! (This is a demo feature)');
}

// ========== DISPLAY NOTICES ==========
function displayNotices(notices, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    if (notices.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 40px; color: var(--secondary-color);">
                <i class="fas fa-inbox" style="font-size: 3rem; margin-bottom: 15px;"></i>
                <p>No notices found</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = notices.map(notice => {
        const expired = isExpired(notice.expiryDate);
        const user = getCurrentUser();
        const isAdmin = user && (user.type === 'super-admin' || user.type === 'section-admin');
        
        return `
            <div class="notice-card ${expired ? 'archived' : ''} ${isAdmin ? 'admin-notice' : 'student-notice'}">
                <div class="notice-header">
                    <div class="notice-meta">
                        <span class="badge badge-${getSectionBadgeColor(notice.section)}">${notice.section}</span>
                        ${notice.importance === 'important' ? '<span class="badge badge-important">Important</span>' : ''}
                        ${expired ? '<span class="badge badge-archived">Archived</span>' : ''}
                    </div>
                    ${isAdmin ? `
                        <div class="notice-actions">
                            <button class="btn-icon" onclick="editNotice(${notice.id})">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn-icon" onclick="deleteNotice(${notice.id})">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    ` : `
                        <span class="notice-date">${formatDate(notice.datePosted)}</span>
                    `}
                </div>
                <h3 class="notice-title">${notice.title}</h3>
                <p class="notice-description">${notice.description}</p>
                ${notice.attachments.length > 0 ? `
                    <div class="notice-attachments">
                        ${notice.attachments.map(att => `
                            <div class="attachment">
                                <i class="fas fa-file-${att.type === 'pdf' ? 'pdf' : 'image'}"></i>
                                <span>${att.name}</span>
                                ${att.type === 'pdf' ? `
                                    <button class="btn-icon" onclick="downloadFile('${att.name}')">
                                        <i class="fas fa-download"></i>
                                    </button>
                                ` : `
                                    <button class="btn-icon" onclick="viewImage('${att.name}')">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                `}
                            </div>
                        `).join('')}
                    </div>
                ` : ''}
                <div class="notice-footer">
                    ${isAdmin ? `
                        <div class="notice-info">
                            <span><i class="fas fa-calendar"></i> Posted: ${formatDate(notice.datePosted)}</span>
                            <span><i class="fas fa-clock"></i> Expires: ${formatDate(notice.expiryDate)}</span>
                        </div>
                        <div class="notice-status">
                            <span class="status-${expired ? 'expired' : 'active'}">${expired ? 'Expired' : 'Active'}</span>
                        </div>
                    ` : `
                        <span class="expiry-info ${expired ? 'expired' : ''}">
                            <i class="fas fa-calendar-times"></i> ${expired ? 'Expired' : 'Expires'}: ${formatDate(notice.expiryDate)}
                        </span>
                        <button class="btn-small" onclick="viewNoticeDetails(${notice.id})">
                            <i class="fas fa-eye"></i> View Details
                        </button>
                    `}
                </div>
            </div>
        `;
    }).join('');
}

function getSectionBadgeColor(section) {
    const colors = {
        'examination': 'blue',
        'scholarship': 'green',
        'academics': 'purple',
        'events': 'orange',
        'placement': 'red'
    };
    return colors[section] || 'gray';
}

// ========== LOAD NOTICES ON PAGE LOAD ==========
document.addEventListener('DOMContentLoaded', function() {
    const user = getCurrentUser();
    
    // Student Dashboard
    if (document.getElementById('noticesList')) {
        const activeNotices = getActiveNotices();
        displayNotices(activeNotices, 'noticesList');
        
        // Update stats
        document.getElementById('totalCount').textContent = activeNotices.length;
        document.getElementById('importantCount').textContent = getImportantNotices().length;
        
        // Today's notices
        const today = new Date().toISOString().split('T')[0];
        const todayNotices = activeNotices.filter(n => n.datePosted === today);
        document.getElementById('todayCount').textContent = todayNotices.length;
        
        // Important notices section
        displayNotices(getImportantNotices(), 'importantNoticesList');
        
        // Archived notices section
        displayNotices(getExpiredNotices(), 'archivedNoticesList');
    }
    
    // Section Admin Dashboard
    if (document.getElementById('myNoticesList') && user && user.type === 'section-admin') {
        const myNotices = getAllNotices().filter(n => n.section === user.role);
        const myActive = myNotices.filter(n => !isExpired(n.expiryDate));
        const myExpired = myNotices.filter(n => isExpired(n.expiryDate));
        const myImportant = myActive.filter(n => n.importance === 'important');
        
        displayNotices(myActive, 'myNoticesList');
        displayNotices(myImportant, 'importantNoticesList');
        displayNotices(myExpired, 'archivedNoticesList');
        
        // Update stats
        document.getElementById('myTotalNotices').textContent = myNotices.length;
        document.getElementById('myActiveNotices').textContent = myActive.length;
        document.getElementById('myImportantNotices').textContent = myImportant.length;
        document.getElementById('myArchivedNotices').textContent = myExpired.length;
    }
    
    // Super Admin Dashboard
    if (document.getElementById('allNoticesList') && user && user.type === 'super-admin') {
        displayNotices(getActiveNotices(), 'allNoticesList');
    }
});

// ========== SEARCH AND FILTER ==========
document.addEventListener('DOMContentLoaded', function() {
    // Search functionality
    const searchInputs = ['searchNotices', 'searchNotice', 'searchMyNotice'];
    
    searchInputs.forEach(inputId => {
        const searchInput = document.getElementById(inputId);
        if (searchInput) {
            searchInput.addEventListener('input', function() {
                filterNotices();
            });
        }
    });
    
    // Section filter checkboxes
    const sectionFilters = document.querySelectorAll('.section-filter');
    sectionFilters.forEach(filter => {
        filter.addEventListener('change', function() {
            filterNotices();
        });
    });
    
    // Filter selects
    const filterSelects = ['filterSection', 'filterStatus'];
    filterSelects.forEach(selectId => {
        const select = document.getElementById(selectId);
        if (select) {
            select.addEventListener('change', function() {
                filterNotices();
            });
        }
    });
});

function filterNotices() {
    const user = getCurrentUser();
    let notices = getActiveNotices();
    
    // Get search query
    const searchInput = document.getElementById('searchNotices') || 
                       document.getElementById('searchNotice') ||
                       document.getElementById('searchMyNotice');
    const searchQuery = searchInput ? searchInput.value.toLowerCase() : '';
    
    // Get selected sections (for student dashboard)
    const sectionFilters = document.querySelectorAll('.section-filter:checked');
    const selectedSections = Array.from(sectionFilters).map(f => f.value);
    
    // Filter by section checkboxes
    if (selectedSections.length > 0 && selectedSections.length < 5) {
        notices = notices.filter(n => selectedSections.includes(n.section));
    }
    
    // Filter by section dropdown (for admin dashboard)
    const sectionSelect = document.getElementById('filterSection');
    if (sectionSelect && sectionSelect.value) {
        notices = notices.filter(n => n.section === sectionSelect.value);
    }
    
    // Filter by status (for section admin)
    const statusSelect = document.getElementById('filterStatus');
    if (statusSelect && statusSelect.value) {
        if (statusSelect.value === 'active') {
            notices = notices.filter(n => !isExpired(n.expiryDate));
        } else if (statusSelect.value === 'expired') {
            notices = getExpiredNotices();
        }
    }
    
    // Search filter
    if (searchQuery) {
        notices = notices.filter(n => 
            n.title.toLowerCase().includes(searchQuery) ||
            n.description.toLowerCase().includes(searchQuery) ||
            n.section.toLowerCase().includes(searchQuery)
        );
    }
    
    // Display filtered notices
    const containerId = document.getElementById('noticesList') ? 'noticesList' :
                       document.getElementById('myNoticesList') ? 'myNoticesList' :
                       'allNoticesList';
    
    displayNotices(notices, containerId);
}

// ========== NOTICE ACTIONS ==========
function editNotice(id) {
    alert(`Edit notice ID: ${id}\n(This would redirect to edit form with notice data)`);
    // In a real application, you would:
    // 1. Redirect to add-notice.html
    // 2. Pre-fill the form with notice data
    // 3. Change the form title to "Edit Notice"
}

function deleteNotice(id) {
    if (confirm('Are you sure you want to delete this notice?')) {
        const notices = getAllNotices().filter(n => n.id !== id);
        saveNotices(notices);
        alert('Notice deleted successfully!');
        location.reload();
    }
}

function viewNoticeDetails(id) {
    const notice = getAllNotices().find(n => n.id === id);
    if (!notice) return;
    
    const modal = document.getElementById('noticeModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    
    modalTitle.textContent = notice.title;
    modalBody.innerHTML = `
        <div style="margin-bottom: 15px;">
            <span class="badge badge-${getSectionBadgeColor(notice.section)}">${notice.section}</span>
            ${notice.importance === 'important' ? '<span class="badge badge-important">Important</span>' : ''}
        </div>
        <p style="margin-bottom: 15px; color: var(--dark-color);">${notice.description}</p>
        ${notice.attachments.length > 0 ? `
            <div style="margin-bottom: 15px;">
                <h4 style="margin-bottom: 10px;">Attachments:</h4>
                ${notice.attachments.map(att => `
                    <div class="attachment" style="margin-bottom: 5px;">
                        <i class="fas fa-file-${att.type === 'pdf' ? 'pdf' : 'image'}"></i>
                        <span>${att.name}</span>
                    </div>
                `).join('')}
            </div>
        ` : ''}
        <div style="padding-top: 15px; border-top: 1px solid var(--border-color); color: var(--secondary-color); font-size: 0.875rem;">
            <p><i class="fas fa-calendar"></i> Posted: ${formatDate(notice.datePosted)}</p>
            <p><i class="fas fa-calendar-times"></i> Expires: ${formatDate(notice.expiryDate)}</p>
        </div>
    `;
    
    modal.classList.add('active');
}

function closeModal() {
    const modal = document.getElementById('noticeModal');
    modal.classList.remove('active');
}

function viewImage(filename) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    
    // In a real application, you would load the actual image
    // For demo, we'll show a placeholder
    modalImage.src = `https://via.placeholder.com/800x600?text=${filename}`;
    modalImage.alt = filename;
    
    modal.classList.add('active');
}

function closeImageModal() {
    const modal = document.getElementById('imageModal');
    modal.classList.remove('active');
}

function downloadFile(filename) {
    alert(`Downloading file: ${filename}\n(In a real application, this would trigger file download)`);
}

// Close modal when clicking outside
window.onclick = function(event) {
    const noticeModal = document.getElementById('noticeModal');
    const imageModal = document.getElementById('imageModal');
    
    if (event.target === noticeModal) {
        closeModal();
    }
    if (event.target === imageModal) {
        closeImageModal();
    }
}

// ========== MOBILE MENU TOGGLE (OPTIONAL) ==========
// You can add mobile menu functionality here if needed

console.log('Virtual College Notice Board System - JavaScript Loaded Successfully');
const API_URL = 'http://localhost:5000/api';

// Login function
async function login(username, password) {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    
    const data = await response.json();
    
    if (data.success) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      // Redirect based on role
    }
  } catch (error) {
    console.error('Login error:', error);
  }
}

// Fetch notices
async function fetchNotices() {
  try {
    const response = await fetch(`${API_URL}/notices`);
    const data = await response.json();
    
    if (data.success) {
      displayNotices(data.notices);
    }
  } catch (error) {
    console.error('Fetch error:', error);
  }
}