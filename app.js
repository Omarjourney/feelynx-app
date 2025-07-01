// Application data
const appData = {
  "creators": [
    {
      "id": 1,
      "name": "Luna Rose",
      "avatar": "👩‍🦰",
      "online": true,
      "live": true,
      "viewers": 234,
      "videoPrice": 50,
      "voicePrice": 30,
      "lovenseToy": "Lush 3",
      "tokensReceived": 1250
    },
    {
      "id": 2,
      "name": "Scarlett Vibe",
      "avatar": "👩‍🦳",
      "online": true,
      "live": true,
      "viewers": 189,
      "videoPrice": 45,
      "voicePrice": 25,
      "lovenseToy": "Nora",
      "tokensReceived": 987
    },
    {
      "id": 3,
      "name": "Jade Storm",
      "avatar": "👩",
      "online": true,
      "live": false,
      "viewers": 0,
      "videoPrice": 40,
      "voicePrice": 20,
      "lovenseToy": null,
      "tokensReceived": 0
    },
    {
      "id": 4,
      "name": "Ruby Dreams",
      "avatar": "👱‍♀️",
      "online": false,
      "live": false,
      "viewers": 0,
      "videoPrice": 55,
      "voicePrice": 35,
      "lovenseToy": "Domi 2",
      "tokensReceived": 0
    },
    {
      "id": 5,
      "name": "Violet Star",
      "avatar": "👩‍🎤",
      "online": true,
      "live": true,
      "viewers": 456,
      "videoPrice": 60,
      "voicePrice": 40,
      "lovenseToy": "Hush",
      "tokensReceived": 2100
    },
    {
      "id": 6,
      "name": "Crystal Moon",
      "avatar": "👸",
      "online": true,
      "live": false,
      "viewers": 0,
      "videoPrice": 35,
      "voicePrice": 20,
      "lovenseToy": "Lush 2",
      "tokensReceived": 0
    },
    {
      "id": 7,
      "name": "Ember Fox",
      "avatar": "🦊",
      "online": false,
      "live": false,
      "viewers": 0,
      "videoPrice": 65,
      "voicePrice": 45,
      "lovenseToy": null,
      "tokensReceived": 0
    },
    {
      "id": 8,
      "name": "Nova Blaze",
      "avatar": "⭐",
      "online": true,
      "live": true,
      "viewers": 89,
      "videoPrice": 42,
      "voicePrice": 28,
      "lovenseToy": "Edge",
      "tokensReceived": 445
    }
  ],
  "tokenPacks": [
    {"id": 1, "name": "Starter Pack", "price": "$0.99", "tokens": 75, "badge": null},
    {"id": 2, "name": "Basic Pack", "price": "$4.99", "tokens": 375, "badge": null},
    {"id": 3, "name": "Popular Pack", "price": "$9.99", "tokens": 825, "badge": "Most Popular"},
    {"id": 4, "name": "Premium Pack", "price": "$14.99", "tokens": 1380, "badge": null},
    {"id": 5, "name": "Deluxe Pack", "price": "$19.99", "tokens": 1725, "badge": null},
    {"id": 6, "name": "Ultimate Pack", "price": "$24.99", "tokens": 2250, "badge": null},
    {"id": 7, "name": "VIP Pack", "price": "$49.99", "tokens": 4500, "badge": null},
    {"id": 8, "name": "Elite Pack", "price": "$99.99", "tokens": 9375, "badge": null},
    {"id": 9, "name": "Platinum Pack", "price": "$149.99", "tokens": 14625, "badge": "Best Value"}
  ],
  "groups": [
    {
      "id": 1,
      "name": "VIP Lounge",
      "members": 24,
      "userRole": "Performer",
      "splitPercent": 40,
      "active": true
    },
    {
      "id": 2,
      "name": "Midnight Club",
      "members": 8,
      "userRole": "Host",
      "splitPercent": 50,
      "active": false
    },
    {
      "id": 3,
      "name": "Elite Circle",
      "members": 15,
      "userRole": "Admin",
      "splitPercent": 60,
      "active": true
    }
  ],
  "messages": [
    {
      "id": 1,
      "sender": "Luna Rose",
      "content": "Thanks for the amazing tips! 💖",
      "timestamp": "2 min ago",
      "unread": true
    },
    {
      "id": 2,
      "sender": "VIP Lounge",
      "content": "Group battle starting in 10 minutes!",
      "timestamp": "5 min ago",
      "unread": true
    },
    {
      "id": 3,
      "sender": "Scarlett Vibe",
      "content": "Hope to see you in my stream later! 😘",
      "timestamp": "15 min ago",
      "unread": false
    },
    {
      "id": 4,
      "sender": "Feelynx Support",
      "content": "Welcome to Feelynx! Complete your profile to get 100 bonus tokens.",
      "timestamp": "1 hour ago",
      "unread": false
    }
  ],
  "notifications": [
    {
      "id": 1,
      "type": "creator_online",
      "message": "Scarlett Vibe is now live!",
      "timestamp": "1 min ago"
    },
    {
      "id": 2,
      "type": "bonus_tokens",
      "message": "You received 50 bonus tokens!",
      "timestamp": "3 min ago"
    }
  ],
  "userStats": {
    "tokenBalance": 1250,
    "totalSpent": 4500,
    "favoriteCreators": 8,
    "groupsJoined": 2
  }
};

// Global state
let currentTab = 'homeTab';
let mascotState = 'normal';
let tokenBalance = appData.userStats.tokenBalance;

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    startRealTimeUpdates();
});

function initializeApp() {
    // Initialize mascot
    setupMascot();
    
    // Render initial content
    renderPopularCreators();
    renderCreatorsGrid();
    renderCallsList();
    renderGroupsList();
    renderMessagesList();
    renderTokenPacks();
    
    // Show notifications
    showInitialNotifications();
    
    // Update token displays
    updateTokenDisplays();
    
    // Set active tab
    switchTab('homeTab');
}

function setupEventListeners() {
    // Bottom navigation
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            switchTab(tabId);
            setActiveNavItem(this);
        });
    });
    
    // Go live button
    document.querySelector('.go-live-btn').addEventListener('click', function() {
        showNotification('🎥 Starting live stream...', 'success');
        this.textContent = 'Broadcasting...';
        this.style.background = '#ef4444';
        
        setTimeout(() => {
            this.textContent = 'Go Live Now';
            this.style.background = '#10b981';
        }, 3000);
    });
    
    // Token modal events
    document.querySelector('.floating-token-btn').addEventListener('click', openTokenModal);
    document.querySelector('.modal-close').addEventListener('click', closeTokenModal);
    document.querySelector('.modal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeTokenModal();
        }
    });
    
    // Banner close
    document.querySelector('.banner-close').addEventListener('click', closeBanner);
    
    // Mascot interaction
    document.querySelector('.mascot').addEventListener('click', triggerMascotInteraction);
}

function setupMascot() {
    const mascot = document.querySelector('.mascot');
    
    // Random mascot animations
    setInterval(() => {
        if (Math.random() < 0.3) {
            mascot.style.transform = 'scale(1.1)';
            setTimeout(() => {
                mascot.style.transform = 'scale(1)';
            }, 200);
        }
    }, 5000);
}

function triggerMascotInteraction() {
    const mascot = document.querySelector('.mascot');
    const faces = ['😍', '🤑', '😘', '😏', '🥰'];
    const randomFace = faces[Math.floor(Math.random() * faces.length)];
    
    // Create floating emoji
    const floatingEmoji = document.createElement('div');
    floatingEmoji.textContent = randomFace;
    floatingEmoji.style.cssText = `
        position: fixed;
        top: 60px;
        left: 90px;
        font-size: 24px;
        z-index: 1001;
        animation: floatUp 2s ease-out forwards;
        pointer-events: none;
    `;
    
    document.body.appendChild(floatingEmoji);
    
    // Add CSS animation
    if (!document.querySelector('#floatUpAnimation')) {
        const style = document.createElement('style');
        style.id = 'floatUpAnimation';
        style.textContent = `
            @keyframes floatUp {
                0% { transform: translateY(0) scale(1); opacity: 1; }
                100% { transform: translateY(-50px) scale(1.5); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    setTimeout(() => {
        floatingEmoji.remove();
    }, 2000);
    
    // Show appreciation message
    showNotification('Mascot loves the attention! 💖', 'success');
}

function switchTab(tabId) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Show selected tab
    document.getElementById(tabId).classList.add('active');
    currentTab = tabId;
    
    // Update navigation
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');
}

function setActiveNavItem(item) {
    document.querySelectorAll('.nav-item').forEach(nav => {
        nav.classList.remove('active');
    });
    item.classList.add('active');
}

function renderPopularCreators() {
    const container = document.getElementById('popularCreators');
    const liveCreators = appData.creators.filter(creator => creator.live).slice(0, 5);
    
    container.innerHTML = liveCreators.map(creator => `
        <div class="popular-creator" onclick="openCreatorProfile(${creator.id})">
            <div class="creator-header">
                <div class="creator-avatar ${creator.online ? 'online' : 'offline'}">
                    ${creator.avatar}
                </div>
                <div class="creator-info">
                    <div class="creator-name">${creator.name}</div>
                    <div class="creator-status">
                        ${creator.live ? '<span class="live-badge">LIVE</span>' : ''}
                        <span class="viewer-count">👁️ ${creator.viewers}</span>
                    </div>
                </div>
            </div>
            <div class="creator-actions">
                <button class="tip-btn" onclick="event.stopPropagation(); tipCreator(${creator.id})">
                    Tip ${creator.videoPrice} 💎
                </button>
            </div>
        </div>
    `).join('');
}

function renderCreatorsGrid() {
    const container = document.getElementById('creatorsGrid');
    
    container.innerHTML = appData.creators.map(creator => `
        <div class="creator-card" onclick="openCreatorProfile(${creator.id})">
            <div class="creator-header">
                <div class="creator-avatar ${creator.online ? 'online' : 'offline'}">
                    ${creator.avatar}
                </div>
                <div class="creator-info">
                    <div class="creator-name">${creator.name}</div>
                    <div class="creator-status">
                        ${creator.live ? '<span class="live-badge">LIVE</span>' : ''}
                        ${creator.online ? '<span>🟢 Online</span>' : '<span>⚫ Offline</span>'}
                        ${creator.live ? `<span class="viewer-count">👁️ ${creator.viewers}</span>` : ''}
                    </div>
                </div>
            </div>
            <div class="creator-actions">
                <button class="tip-btn" onclick="event.stopPropagation(); tipCreator(${creator.id})">
                    Tip 💎
                </button>
            </div>
        </div>
    `).join('');
}

function renderCallsList() {
    const container = document.getElementById('callsList');
    const sortedCreators = [...appData.creators].sort((a, b) => b.online - a.online);
    
    container.innerHTML = sortedCreators.map(creator => `
        <div class="call-item">
            <div class="creator-avatar ${creator.online ? 'online' : 'offline'}">
                ${creator.avatar}
            </div>
            <div class="creator-info">
                <div class="creator-name">${creator.name}</div>
                <div class="creator-status">
                    ${creator.online ? '<span>🟢 Available</span>' : '<span>⚫ Offline</span>'}
                    ${creator.lovenseToy ? `<div class="lovense-status">🎮 ${creator.lovenseToy}</div>` : ''}
                </div>
            </div>
            <div class="call-pricing">
                <div class="price-item video" onclick="startVideoCall(${creator.id})">
                    📹 ${creator.videoPrice} tokens
                </div>
                <div class="price-item voice" onclick="startVoiceCall(${creator.id})">
                    🎤 ${creator.voicePrice} tokens
                </div>
            </div>
        </div>
    `).join('');
}

function renderGroupsList() {
    const container = document.getElementById('groupsList');
    
    container.innerHTML = appData.groups.map(group => `
        <div class="group-item">
            <div class="group-header">
                <div class="group-name">${group.name}</div>
                <div class="role-badge ${group.userRole.toLowerCase()}">${group.userRole}</div>
            </div>
            <div class="group-stats">
                <span>👥 ${group.members} members</span>
                <span>${group.active ? '🟢 Active' : '⚫ Inactive'}</span>
                <span>💰 ${group.splitPercent}% split</span>
            </div>
        </div>
    `).join('');
}

function renderMessagesList() {
    const container = document.getElementById('messagesList');
    
    container.innerHTML = appData.messages.map(message => `
        <div class="message-item ${message.unread ? 'unread' : ''}" onclick="openMessage(${message.id})">
            <div class="message-header">
                <div class="message-sender">${message.sender}</div>
                <div class="message-time">${message.timestamp}</div>
            </div>
            <div class="message-content">${message.content}</div>
        </div>
    `).join('');
    
    // Update message badge
    const unreadCount = appData.messages.filter(msg => msg.unread).length;
    const badge = document.getElementById('messagesBadge');
    if (unreadCount > 0) {
        badge.textContent = unreadCount;
        badge.style.display = 'block';
    } else {
        badge.style.display = 'none';
    }
}

function renderTokenPacks() {
    const container = document.getElementById('tokenPacks');
    
    container.innerHTML = appData.tokenPacks.map(pack => `
        <div class="token-pack ${pack.badge ? (pack.badge === 'Most Popular' ? 'popular' : 'best-value') : ''}" 
             onclick="purchaseTokenPack(${pack.id})">
            <div class="pack-tokens">${pack.tokens.toLocaleString()} 💎</div>
            <div class="pack-price">${pack.price}</div>
        </div>
    `).join('');
}

function showInitialNotifications() {
    setTimeout(() => {
        appData.notifications.forEach((notification, index) => {
            setTimeout(() => {
                showNotification(notification.message, notification.type);
            }, index * 2000);
        });
    }, 2000);
}

function showNotification(message, type = 'info') {
    const container = document.getElementById('notificationsContainer');
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <div class="notification-content">
            ${getNotificationIcon(type)} ${message}
        </div>
    `;
    
    container.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out forwards';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
}

function getNotificationIcon(type) {
    const icons = {
        'creator_online': '🔴',
        'bonus_tokens': '💎',
        'success': '✅',
        'info': 'ℹ️',
        'warning': '⚠️'
    };
    return icons[type] || 'ℹ️';
}

function updateTokenDisplays() {
    document.getElementById('tokenBalance').textContent = `${tokenBalance.toLocaleString()} tokens`;
    document.getElementById('floatingTokenCount').textContent = tokenBalance.toLocaleString();
}

function openTokenModal() {
    document.getElementById('tokenModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeTokenModal() {
    document.getElementById('tokenModal').classList.remove('active');
    document.body.style.overflow = 'auto';
}

function closeBanner() {
    const banner = document.querySelector('.banner-notification');
    banner.style.animation = 'slideUp 0.3s ease-out forwards';
    setTimeout(() => {
        banner.style.display = 'none';
    }, 300);
    
    if (!document.querySelector('#slideUpAnimation')) {
        const style = document.createElement('style');
        style.id = 'slideUpAnimation';
        style.textContent = `
            @keyframes slideUp {
                from { transform: translateY(0); opacity: 1; }
                to { transform: translateY(-100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
}

function openCreatorProfile(creatorId) {
    const creator = appData.creators.find(c => c.id === creatorId);
    showNotification(`Opening ${creator.name}'s profile...`, 'info');
    
    // Simulate profile opening
    setTimeout(() => {
        if (creator.live) {
            showNotification(`Joined ${creator.name}'s live stream! 🎥`, 'success');
        } else {
            showNotification(`${creator.name} is offline. Send a message instead? 💬`, 'info');
        }
    }, 1000);
}

function tipCreator(creatorId) {
    const creator = appData.creators.find(c => c.id === creatorId);
    const tipAmount = 50;
    
    if (tokenBalance >= tipAmount) {
        tokenBalance -= tipAmount;
        creator.tokensReceived += tipAmount;
        
        updateTokenDisplays();
        showNotification(`Tipped ${creator.name} ${tipAmount} tokens! 💖`, 'success');
        
        // Update mascot state
        triggerMascotCelebration();
        
        // Add confetti effect
        createConfetti();
    } else {
        showNotification('Not enough tokens! Visit the token store 💎', 'warning');
        setTimeout(() => {
            openTokenModal();
        }, 1000);
    }
}

function startVideoCall(creatorId) {
    const creator = appData.creators.find(c => c.id === creatorId);
    
    if (!creator.online) {
        showNotification(`${creator.name} is offline`, 'warning');
        return;
    }
    
    if (tokenBalance >= creator.videoPrice) {
        showNotification(`Starting video call with ${creator.name}... 📹`, 'success');
        tokenBalance -= creator.videoPrice;
        updateTokenDisplays();
    } else {
        showNotification('Not enough tokens for video call 💎', 'warning');
        openTokenModal();
    }
}

function startVoiceCall(creatorId) {
    const creator = appData.creators.find(c => c.id === creatorId);
    
    if (!creator.online) {
        showNotification(`${creator.name} is offline`, 'warning');
        return;
    }
    
    if (tokenBalance >= creator.voicePrice) {
        showNotification(`Starting voice call with ${creator.name}... 🎤`, 'success');
        tokenBalance -= creator.voicePrice;
        updateTokenDisplays();
    } else {
        showNotification('Not enough tokens for voice call 💎', 'warning');
        openTokenModal();
    }
}

function openMessage(messageId) {
    const message = appData.messages.find(m => m.id === messageId);
    message.unread = false;
    renderMessagesList();
    showNotification(`Opening conversation with ${message.sender}...`, 'info');
}

function purchaseTokenPack(packId) {
    const pack = appData.tokenPacks.find(p => p.id === packId);
    
    // Simulate purchase
    showNotification(`Processing payment for ${pack.name}...`, 'info');
    
    setTimeout(() => {
        tokenBalance += pack.tokens;
        updateTokenDisplays();
        showNotification(`Successfully purchased ${pack.tokens} tokens! 💎`, 'success');
        closeTokenModal();
        createConfetti();
        triggerMascotCelebration();
    }, 2000);
}

function triggerMascotCelebration() {
    const mascot = document.querySelector('.mascot');
    mascot.style.animation = 'bounce 0.5s ease-in-out 3';
    
    setTimeout(() => {
        mascot.style.animation = '';
    }, 1500);
}

function createConfetti() {
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            top: -10px;
            left: ${Math.random() * 100}vw;
            width: 10px;
            height: 10px;
            background: ${['#ec4899', '#8b5cf6', '#06b6d4', '#10b981'][Math.floor(Math.random() * 4)]};
            border-radius: 50%;
            z-index: 2000;
            animation: confettiFall ${2 + Math.random() * 3}s linear forwards;
            pointer-events: none;
        `;
        
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
    
    // Add confetti animation
    if (!document.querySelector('#confettiAnimation')) {
        const style = document.createElement('style');
        style.id = 'confettiAnimation';
        style.textContent = `
            @keyframes confettiFall {
                0% { 
                    transform: translateY(0) rotate(0deg); 
                    opacity: 1; 
                }
                100% { 
                    transform: translateY(100vh) rotate(360deg); 
                    opacity: 0; 
                }
            }
        `;
        document.head.appendChild(style);
    }
}

function startRealTimeUpdates() {
    // Simulate real-time viewer count updates
    setInterval(() => {
        appData.creators.forEach(creator => {
            if (creator.live) {
                const change = Math.floor(Math.random() * 20) - 10;
                creator.viewers = Math.max(0, creator.viewers + change);
            }
        });
        
        if (currentTab === 'homeTab') {
            renderPopularCreators();
            renderCreatorsGrid();
        }
    }, 10000);
    
    // Simulate random notifications
    setInterval(() => {
        if (Math.random() < 0.3) {
            const messages = [
                'New viewer joined your favorite creator!',
                'Special promotion: 20% bonus tokens!',
                'Your friend is now live!',
                'Group battle invitation received!'
            ];
            const randomMessage = messages[Math.floor(Math.random() * messages.length)];
            showNotification(randomMessage, 'info');
        }
    }, 30000);
    
    // Simulate creators going online/offline
    setInterval(() => {
        if (Math.random() < 0.2) {
            const offlineCreators = appData.creators.filter(c => !c.online);
            if (offlineCreators.length > 0) {
                const creator = offlineCreators[Math.floor(Math.random() * offlineCreators.length)];
                creator.online = true;
                creator.live = Math.random() < 0.7;
                if (creator.live) {
                    creator.viewers = Math.floor(Math.random() * 100) + 10;
                }
                showNotification(`${creator.name} is now ${creator.live ? 'live' : 'online'}! 🔴`, 'creator_online');
                
                if (currentTab === 'homeTab') {
                    renderPopularCreators();
                    renderCreatorsGrid();
                } else if (currentTab === 'callsTab') {
                    renderCallsList();
                }
            }
        }
    }, 45000);
}

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeTokenModal();
    }
    
    // Tab navigation with number keys
    const tabKeys = {
        '1': 'homeTab',
        '2': 'callsTab',
        '3': 'goLiveTab',
        '4': 'groupsTab',
        '5': 'messagesTab'
    };
    
    if (tabKeys[e.key]) {
        switchTab(tabKeys[e.key]);
        setActiveNavItem(document.querySelector(`[data-tab="${tabKeys[e.key]}"]`));
    }
});

// Service Worker registration for PWA-like experience
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Note: In a real app, you would register a service worker here
        console.log('Feelynx app loaded successfully! 🎉');
    });
}

// Handle visibility changes
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // App is hidden
        console.log('App hidden');
    } else {
        // App is visible
        console.log('App visible');
        // Refresh data when app becomes visible
        if (currentTab === 'homeTab') {
            renderPopularCreators();
            renderCreatorsGrid();
        }
    }
});

// Touch gestures for mobile
let touchStartX = 0;
let touchStartY = 0;

document.addEventListener('touchstart', function(e) {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
});

document.addEventListener('touchend', function(e) {
    if (!touchStartX || !touchStartY) return;
    
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    
    const diffX = touchStartX - touchEndX;
    const diffY = touchStartY - touchEndY;
    
    // Horizontal swipe
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
        const tabs = ['homeTab', 'callsTab', 'goLiveTab', 'groupsTab', 'messagesTab'];
        const currentIndex = tabs.indexOf(currentTab);
        
        if (diffX > 0 && currentIndex < tabs.length - 1) {
            // Swipe left - next tab
            switchTab(tabs[currentIndex + 1]);
            setActiveNavItem(document.querySelector(`[data-tab="${tabs[currentIndex + 1]}"]`));
        } else if (diffX < 0 && currentIndex > 0) {
            // Swipe right - previous tab
            switchTab(tabs[currentIndex - 1]);
            setActiveNavItem(document.querySelector(`[data-tab="${tabs[currentIndex - 1]}"]`));
        }
    }
    
    touchStartX = 0;
    touchStartY = 0;
});

// Add haptic feedback for supported devices
function triggerHapticFeedback() {
    if (navigator.vibrate) {
        navigator.vibrate(50);
    }
}

// Add haptic feedback to buttons
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn') || 
        e.target.classList.contains('nav-item') || 
        e.target.classList.contains('tip-btn')) {
        triggerHapticFeedback();
    }
});

// Initialize tooltips and enhanced interactions
function initializeEnhancedFeatures() {
    // Add loading states
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function() {
            if (!this.classList.contains('loading')) {
                this.classList.add('loading');
                setTimeout(() => {
                    this.classList.remove('loading');
                }, Math.random() * 2000 + 1000);
            }
        });
    });
}

// Call enhanced features after DOM is loaded
setTimeout(initializeEnhancedFeatures, 1000);