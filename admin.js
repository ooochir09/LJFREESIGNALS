document.addEventListener('DOMContentLoaded', function() {
    const adminAuth = document.getElementById('admin-auth');
    const adminPanel = document.getElementById('admin-panel');
    const adminAuthBtn = document.getElementById('admin-auth-btn');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // Проверяем, авторизован ли админ
    const tgUser = localStorage.getItem('tg_user');
    
    if (tgUser) {
        const user = JSON.parse(tgUser);
        
        // Проверяем ID пользователя (замените на реальные ID админов)
        if (user.id === 5354822471 || user.id === 5288984314) {
            adminAuth.classList.add('hidden');
            adminPanel.classList.remove('hidden');
            loadAdminData();
        } else {
            adminAuth.classList.remove('hidden');
        }
    } else {
        adminAuth.classList.remove('hidden');
    }
    
    // Обработчик кнопки авторизации админа
    adminAuthBtn.addEventListener('click', function() {
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
                
                // Проверяем, является ли пользователь админом
                if (user.id === 123456789 || user.id === 987654321) {
                    adminAuth.classList.add('hidden');
                    adminPanel.classList.remove('hidden');
                    loadAdminData();
                } else {
                    alert('У вас нет прав доступа к админ-панели.');
                }
            }
        } else {
            alert('Пожалуйста, откройте этот сайт через Telegram для авторизации.');
        }
    });
    
    // Переключение между вкладками
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Убираем активный класс у всех кнопок и вкладок
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.add('hidden'));
            
            // Добавляем активный класс текущей кнопке и показываем соответствующую вкладку
            this.classList.add('active');
            document.getElementById(`${tabId}-tab`).classList.remove('hidden');
        });
    });
    
    // Инициализация формы добавления розыгрыша
    const addRaffleBtn = document.getElementById('add-raffle-btn');
    const raffleForm = document.getElementById('raffle-form');
    const saveRaffleBtn = document.getElementById('save-raffle-btn');
    
    addRaffleBtn.addEventListener('click', function() {
        raffleForm.classList.toggle('hidden');
    });
    
    saveRaffleBtn.addEventListener('click', function() {
        const name = document.getElementById('raffle-name').value;
        const description = document.getElementById('raffle-description').value;
        const prize = document.getElementById('raffle-prize').value;
        const date = document.getElementById('raffle-date').value;
        
        if (!name || !description || !prize || !date) {
            alert('Пожалуйста, заполните все поля.');
            return;
        }
        
        // Здесь должна быть логика сохранения розыгрыша
        alert(`Розыгрыш "${name}" сохранен!`);
        
        // Очищаем форму и скрываем её
        document.getElementById('raffle-form').reset();
        raffleForm.classList.add('hidden');
        
        // Обновляем список розыгрышей
        loadRaffles();
    });
    
    function loadAdminData() {
        // Здесь должна быть загрузка данных для админ-панели
        loadRaffles();
        loadParticipants();
        loadWinners();
    }
    
    function loadRaffles() {
        // Загрузка списка розыгрышей для админа
        const rafflesList = document.getElementById('admin-raffles-list');
        
        // Здесь должна быть загрузка из localStorage или API
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
                <div class="admin-actions">
                    <button class="btn" data-action="edit" data-raffle-id="${raffle.id}">Редактировать</button>
                    <button class="btn" data-action="delete" data-raffle-id="${raffle.id}">Удалить</button>
                    <button class="btn" data-action="draw" data-raffle-id="${raffle.id}">Провести розыгрыш</button>
                </div>
            `;
            
            rafflesList.appendChild(raffleCard);
        });
    }
    
    function loadParticipants() {
        // Загрузка списка участников
        const participantsList = document.getElementById('participants-list');
        
        // Здесь должна быть загрузка из localStorage или API
        const participants = [
            { id: 1, name: 'Иван Иванов', username: 'ivanov', raffle: 'iPhone 15 Pro' },
            { id: 2, name: 'Петр Петров', username: 'petrov', raffle: 'PlayStation 5' }
        ];
        
        participantsList.innerHTML = '';
        
        participants.forEach(participant => {
            const participantItem = document.createElement('div');
            participantItem.className = 'participant-item';
            participantItem.innerHTML = `
                <p><strong>${participant.name}</strong> (@${participant.username})</p>
                <p>Участвует в: ${participant.raffle}</p>
            `;
            
            participantsList.appendChild(participantItem);
        });
    }
    
    function loadWinners() {
        // Загрузка списка победителей
        const winnersList = document.getElementById('winners-list');
        
        // Здесь должна быть загрузка из localStorage или API
        const winners = [
            { id: 3, name: 'Сергей Сергеев', username: 'sergeev', prize: 'MacBook Pro', date: '2023-10-15' }
        ];
        
        winnersList.innerHTML = '';
        
        winners.forEach(winner => {
            const winnerItem = document.createElement('div');
            winnerItem.className = 'winner-item';
            winnerItem.innerHTML = `
                <p><strong>${winner.name}</strong> (@${winner.username})</p>
                <p>Выиграл: ${winner.prize} (${winner.date})</p>
            `;
            
            winnersList.appendChild(winnerItem);
        });
    }
});
