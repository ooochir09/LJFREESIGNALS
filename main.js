document.addEventListener('DOMContentLoaded', function() {
    const authBtn = document.getElementById('auth-btn');
    const authSection = document.getElementById('auth-section');
    const userSection = document.getElementById('user-section');
    const adminLink = document.getElementById('admin-link');
    const userName = document.getElementById('user-name');
    const userId = document.getElementById('user-id');
    const userAvatar = document.getElementById('user-avatar');
    const rafflesList = document.getElementById('raffles-list');

    // Проверяем, авторизован ли пользователь
    const tgUser = localStorage.getItem('tg_user');
    
    if (tgUser) {
        showUserSection(JSON.parse(tgUser));
    }

    // Обработчик кнопки авторизации
    authBtn.addEventListener('click', function() {
        if (window.Telegram && window.Telegram.WebApp) {
            const tgWebApp = window.Telegram.WebApp;
            
            tgWebApp.expand();
            tgWebApp.ready();
            
            const user = tgWebApp.initDataUnsafe.user;
            
            if (user) {
                const userData = {
                    id: user.id,
                    firstName: user.first_name,
                    lastName: user.last_name || '',
                    username: user.username || '',
                    photoUrl: user.photo_url || ''
                };
                
                localStorage.setItem('tg_user', JSON.stringify(userData));
                showUserSection(userData);
                
                // Проверяем, является ли пользователь админом
                if (user.id === 123456789 || user.id === 987654321) { // Замените на реальные ID админов
                    adminLink.classList.remove('hidden');
                }
            }
        } else {
            alert('Пожалуйста, откройте этот сайт через Telegram для авторизации.');
        }
    });

    // Загрузка розыгрышей
    loadRaffles();

    function showUserSection(user) {
        authSection.classList.add('hidden');
        userSection.classList.remove('hidden');
        
        userName.textContent = `${user.firstName} ${user.lastName}`;
        userId.textContent = `@${user.username || 'ID:' + user.id}`;
        
        if (user.photoUrl) {
            userAvatar.src = user.photoUrl;
        }
    }

    function loadRaffles() {
        // Здесь должна быть загрузка розыгрышей из localStorage или API
        const raffles = [
            {
                id: 1,
                name: 'iPhone 15 Pro',
                description: 'Выиграйте новый iPhone 15 Pro!',
                prize: 'iPhone 15 Pro 256GB',
                endDate: '2023-12-31',
                participants: 124
            },
            {
                id: 2,
                name: 'PlayStation 5',
                description: 'Розыгрыш игровой консоли PS5',
                prize: 'PlayStation 5 + 2 игры',
                endDate: '2023-11-30',
                participants: 89
            }
        ];
        
        rafflesList.innerHTML = '';
        
        raffles.forEach(raffle => {
            const raffleCard = document.createElement('div');
            raffleCard.className = 'raffle-card';
            raffleCard.innerHTML = `
                <h3>${raffle.name}</h3>
                <p>${raffle.description}</p>
                <p><strong>Приз:</strong> ${raffle.prize}</p>
                <p><strong>Дата окончания:</strong> ${raffle.endDate}</p>
                <p><strong>Участников:</strong> ${raffle.participants}</p>
                <button class="btn" data-raffle-id="${raffle.id}">Участвовать</button>
            `;
            
            rafflesList.appendChild(raffleCard);
        });
        
        // Обработчики кнопок участия
        document.querySelectorAll('[data-raffle-id]').forEach(btn => {
            btn.addEventListener('click', function() {
                const raffleId = this.getAttribute('data-raffle-id');
                participateInRaffle(raffleId);
            });
        });
    }

    function participateInRaffle(raffleId) {
        const tgUser = JSON.parse(localStorage.getItem('tg_user'));
        
        if (!tgUser) {
            alert('Пожалуйста, авторизуйтесь через Telegram.');
            return;
        }
        
        // Здесь должна быть логика участия в розыгрыше
        alert(`Вы участвуете в розыгрыше #${raffleId}! Удачи!`);
        
        // Обновляем список розыгрышей
        loadRaffles();
    }
});
