/**
 * PointCast.xyz - Personal Morning Brief Dashboard
 * A nostalgic 1996-inspired dashboard with modern functionality
 */

(function() {
    'use strict';

    // ===== Time and Date Display =====
    function updateDateTime() {
        const now = new Date();

        // Format time
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const displayHours = hours % 12 || 12;
        const displayMinutes = minutes.toString().padStart(2, '0');
        const timeString = `${displayHours}:${displayMinutes} ${ampm}`;

        // Format date
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const months = ['January', 'February', 'March', 'April', 'May', 'June',
                       'July', 'August', 'September', 'October', 'November', 'December'];
        const dayName = days[now.getDay()];
        const monthName = months[now.getMonth()];
        const date = now.getDate();
        const year = now.getFullYear();
        const dateString = `${dayName}, ${monthName} ${date}, ${year}`;

        // Update elements
        const timeEl = document.getElementById('currentTime');
        const dateEl = document.getElementById('currentDate');

        if (timeEl) timeEl.textContent = timeString;
        if (dateEl) dateEl.textContent = dateString;
    }

    // ===== Last Update Time =====
    function updateLastUpdateTime() {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const displayHours = hours % 12 || 12;
        const displayMinutes = minutes.toString().padStart(2, '0');
        const timeString = `${displayHours}:${displayMinutes} ${ampm}`;

        const lastUpdateEl = document.getElementById('lastUpdate');
        if (lastUpdateEl) lastUpdateEl.textContent = timeString;
    }

    // ===== Stock Ticker Animation =====
    function initTicker() {
        const tickerContent = document.getElementById('tickerContent');
        if (!tickerContent) return;

        // Clone content for seamless loop
        const clone = tickerContent.innerHTML;
        tickerContent.innerHTML = clone + clone;
    }

    // ===== Task Checkbox Interactions =====
    function initTaskCheckboxes() {
        const taskItems = document.querySelectorAll('.task-item');

        taskItems.forEach(item => {
            const checkbox = item.querySelector('.task-checkbox');
            if (!checkbox) return;

            checkbox.addEventListener('change', function() {
                if (this.checked) {
                    item.classList.add('completed');
                    // Animate completion
                    item.style.transition = 'opacity 0.3s, transform 0.3s';
                    item.style.transform = 'translateX(10px)';
                    setTimeout(() => {
                        item.style.transform = '';
                    }, 300);
                } else {
                    item.classList.remove('completed');
                }
                updateTaskCount();
            });
        });
    }

    // ===== Update Task Count =====
    function updateTaskCount() {
        const taskCountEl = document.querySelector('.task-count');
        const uncheckedTasks = document.querySelectorAll('.task-checkbox:not(:checked)').length;
        if (taskCountEl) {
            taskCountEl.textContent = `${uncheckedTasks} remaining`;
        }
    }

    // ===== Panel Collapse/Expand =====
    function initPanelControls() {
        const panels = document.querySelectorAll('.panel');

        panels.forEach(panel => {
            const expandBtn = panel.querySelector('.panel-btn[title="Expand"]');
            const content = panel.querySelector('.panel-content');

            if (expandBtn && content) {
                expandBtn.addEventListener('click', function() {
                    const isCollapsed = content.style.display === 'none';
                    content.style.display = isCollapsed ? '' : 'none';
                    this.textContent = isCollapsed ? '▼' : '▲';
                });
            }
        });
    }

    // ===== Menu Dropdown Keyboard Navigation =====
    function initMenuKeyboard() {
        const menuItems = document.querySelectorAll('.menu-item');

        menuItems.forEach(item => {
            item.addEventListener('keydown', function(e) {
                const dropdown = this.querySelector('.dropdown');
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
                }
                if (e.key === 'Escape') {
                    dropdown.style.display = 'none';
                }
            });
        });
    }

    // ===== Window Control Buttons =====
    function initWindowControls() {
        const minimizeBtn = document.querySelector('.win-btn.minimize');
        const maximizeBtn = document.querySelector('.win-btn.maximize');
        const closeBtn = document.querySelector('.win-btn.close');
        const appContainer = document.querySelector('.app-container');

        if (minimizeBtn) {
            minimizeBtn.addEventListener('click', function() {
                appContainer.style.transition = 'transform 0.3s, opacity 0.3s';
                appContainer.style.transform = 'scale(0.1) translateY(100vh)';
                appContainer.style.opacity = '0';
                setTimeout(() => {
                    appContainer.style.transform = '';
                    appContainer.style.opacity = '';
                }, 2000);
            });
        }

        if (maximizeBtn) {
            maximizeBtn.addEventListener('click', function() {
                appContainer.classList.toggle('maximized');
                if (appContainer.classList.contains('maximized')) {
                    appContainer.style.maxWidth = '100%';
                    appContainer.style.maxHeight = '100%';
                    appContainer.style.margin = '0';
                } else {
                    appContainer.style.maxWidth = '';
                    appContainer.style.maxHeight = '';
                    appContainer.style.margin = '';
                }
            });
        }

        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                if (confirm('Exit PointCast.xyz?')) {
                    appContainer.style.transition = 'transform 0.5s, opacity 0.5s';
                    appContainer.style.transform = 'scale(0) rotate(10deg)';
                    appContainer.style.opacity = '0';
                }
            });
        }
    }

    // ===== Refresh Button Animation =====
    function initRefreshButton() {
        const refreshBtn = document.querySelector('.toolbar-btn[title="Refresh All"]');

        if (refreshBtn) {
            refreshBtn.addEventListener('click', function() {
                const icon = this.querySelector('.refresh-icon');
                if (icon) {
                    icon.style.animation = 'spin 1s ease-in-out';
                    setTimeout(() => {
                        icon.style.animation = '';
                        updateLastUpdateTime();
                    }, 1000);
                }

                // Simulate refresh of all panels
                const panels = document.querySelectorAll('.panel-content');
                panels.forEach(panel => {
                    panel.style.opacity = '0.5';
                    setTimeout(() => {
                        panel.style.opacity = '1';
                    }, 500);
                });
            });
        }
    }

    // ===== AI Brief Regenerate =====
    function initAIBrief() {
        const regenerateBtn = document.querySelector('.ai-brief-panel .panel-btn[title="Regenerate"]');

        if (regenerateBtn) {
            regenerateBtn.addEventListener('click', function() {
                const summaryItems = document.querySelectorAll('.summary-item');
                const aiContent = document.querySelector('.ai-brief-panel .panel-content');

                // Add loading state
                aiContent.style.opacity = '0.5';
                this.textContent = '⏳';

                setTimeout(() => {
                    aiContent.style.opacity = '1';
                    this.textContent = '↻';

                    // Update the "updated" time
                    const updateTime = document.querySelector('.update-time');
                    if (updateTime) {
                        updateTime.textContent = 'Updated just now';
                    }
                }, 1500);
            });
        }
    }

    // ===== News Category Filter =====
    function initNewsFilter() {
        const filterBtns = document.querySelectorAll('.news-panel .panel-controls .panel-btn');
        const newsItems = document.querySelectorAll('.news-item');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Update active state
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');

                const filter = this.textContent.toLowerCase();

                newsItems.forEach(item => {
                    const category = item.querySelector('.news-category');
                    if (!category) return;

                    if (filter === 'all') {
                        item.style.display = '';
                    } else if (filter === 'tech' && category.classList.contains('tech')) {
                        item.style.display = '';
                    } else if (filter === 'biz' && category.classList.contains('business')) {
                        item.style.display = '';
                    } else {
                        item.style.display = filter === 'all' ? '' : 'none';
                    }
                });
            });
        });
    }

    // ===== Sports Tab Switching =====
    function initSportsTabs() {
        const sportsBtns = document.querySelectorAll('.sports-panel .panel-controls .panel-btn');

        sportsBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                sportsBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');

                // In a real app, this would load different sports data
                const content = document.querySelector('.sports-scores');
                if (content) {
                    content.style.opacity = '0.5';
                    setTimeout(() => {
                        content.style.opacity = '1';
                    }, 300);
                }
            });
        });
    }

    // ===== Add Task Button =====
    function initAddTask() {
        const addTaskBtn = document.querySelector('.add-task-btn');
        const taskList = document.querySelector('.task-list');

        if (addTaskBtn && taskList) {
            addTaskBtn.addEventListener('click', function() {
                const taskText = prompt('Enter new task:');
                if (taskText && taskText.trim()) {
                    const taskId = 'task' + Date.now();
                    const newTask = document.createElement('li');
                    newTask.className = 'task-item priority-medium';
                    newTask.innerHTML = `
                        <input type="checkbox" id="${taskId}" class="task-checkbox">
                        <label for="${taskId}" class="task-label">
                            <span class="task-text">${taskText}</span>
                            <span class="task-due">New</span>
                        </label>
                    `;

                    // Insert before completed tasks
                    const completedTask = taskList.querySelector('.task-item.completed');
                    if (completedTask) {
                        taskList.insertBefore(newTask, completedTask);
                    } else {
                        taskList.appendChild(newTask);
                    }

                    // Reinitialize checkbox listeners
                    const checkbox = newTask.querySelector('.task-checkbox');
                    checkbox.addEventListener('change', function() {
                        if (this.checked) {
                            newTask.classList.add('completed');
                        } else {
                            newTask.classList.remove('completed');
                        }
                        updateTaskCount();
                    });

                    updateTaskCount();

                    // Highlight new task
                    newTask.style.animation = 'fadeIn 0.5s ease-out';
                }
            });
        }
    }

    // ===== Calendar Navigation =====
    function initCalendarNav() {
        const prevBtn = document.querySelector('.calendar-panel .panel-btn[title="Previous"]');
        const nextBtn = document.querySelector('.calendar-panel .panel-btn[title="Next"]');

        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                // In a real app, this would navigate to previous day
                console.log('Navigate to previous day');
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                // In a real app, this would navigate to next day
                console.log('Navigate to next day');
            });
        }
    }

    // ===== Screensaver =====
    function initScreensaver() {
        const screensaver = document.getElementById('screensaver');
        if (!screensaver) return;

        let inactivityTimer;
        const INACTIVITY_TIMEOUT = 300000; // 5 minutes

        function showScreensaver() {
            screensaver.style.display = 'flex';
        }

        function hideScreensaver() {
            screensaver.style.display = 'none';
        }

        function resetInactivityTimer() {
            clearTimeout(inactivityTimer);
            inactivityTimer = setTimeout(showScreensaver, INACTIVITY_TIMEOUT);
        }

        // Hide screensaver on any interaction
        screensaver.addEventListener('click', hideScreensaver);
        document.addEventListener('keydown', function() {
            hideScreensaver();
            resetInactivityTimer();
        });
        document.addEventListener('mousemove', resetInactivityTimer);
        document.addEventListener('click', resetInactivityTimer);

        // Start timer
        resetInactivityTimer();
    }

    // ===== Quick Links Badge Updates =====
    function simulateBadgeUpdates() {
        // Simulate occasional badge updates (for demo purposes)
        const badges = document.querySelectorAll('.quick-link .badge');

        setInterval(() => {
            badges.forEach(badge => {
                if (Math.random() > 0.7) {
                    const currentValue = parseInt(badge.textContent) || 0;
                    const newValue = currentValue + Math.floor(Math.random() * 3);
                    badge.textContent = newValue;
                    badge.style.animation = 'pulse 0.5s ease-out';
                    setTimeout(() => {
                        badge.style.animation = '';
                    }, 500);
                }
            });
        }, 30000); // Every 30 seconds
    }

    // ===== Keyboard Shortcuts =====
    function initKeyboardShortcuts() {
        document.addEventListener('keydown', function(e) {
            // Ctrl/Cmd + R = Refresh
            if ((e.ctrlKey || e.metaKey) && e.key === 'r') {
                e.preventDefault();
                const refreshBtn = document.querySelector('.toolbar-btn[title="Refresh All"]');
                if (refreshBtn) refreshBtn.click();
            }

            // Escape = Close modals/dropdowns
            if (e.key === 'Escape') {
                document.querySelectorAll('.dropdown').forEach(d => d.style.display = 'none');
            }
        });
    }

    // ===== Add CSS Animation Keyframes =====
    function addAnimationStyles() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }

            @keyframes fadeIn {
                from {
                    opacity: 0;
                    transform: translateY(-10px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
    }

    // ===== Initialize Everything =====
    function init() {
        addAnimationStyles();
        updateDateTime();
        updateLastUpdateTime();
        initTicker();
        initTaskCheckboxes();
        initPanelControls();
        initMenuKeyboard();
        initWindowControls();
        initRefreshButton();
        initAIBrief();
        initNewsFilter();
        initSportsTabs();
        initAddTask();
        initCalendarNav();
        initScreensaver();
        initKeyboardShortcuts();
        simulateBadgeUpdates();

        // Update time every second
        setInterval(updateDateTime, 1000);

        // Update "last updated" every 5 minutes
        setInterval(updateLastUpdateTime, 300000);

        console.log('PointCast.xyz initialized - Welcome to 1996! 📺');
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
