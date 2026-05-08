const API_URL = 'https://script.google.com/macros/s/AKfycbyLGbJzEd5H_lOjyY7TjulegAidszH05N05o2t4V6Cpo2IcT4uReBclEr35iyM-LYw2wg/exec';

document.addEventListener('DOMContentLoaded', () => {
    fetchEvents();
});

async function fetchEvents() {
    const container = document.getElementById('eventContainer');
    
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        
        if (!data || data.length === 0) {
            container.innerHTML = '<div class="no-events">現在、予定されているイベントはありません。</div>';
            return;
        }

        renderEvents(data);
    } catch (error) {
        console.error('Error fetching events:', error);
        container.innerHTML = '<div class="error-message">データの取得に失敗しました。時間をおいて再度お試しください。</div>';
    }
}

function renderEvents(events) {
    const container = document.getElementById('eventContainer');
    container.innerHTML = ''; // Clear loading state

    events.forEach((event, index) => {
        const eventDate = new Date(event.start);
        const month = eventDate.getMonth() + 1;
        const date = eventDate.getDate();
        const day = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'][eventDate.getDay()];
        const time = eventDate.getHours().toString().padStart(2, '0') + ':' + 
                     eventDate.getMinutes().toString().padStart(2, '0');

        const card = document.createElement('div');
        card.className = 'event-card fade-in';
        card.style.animationDelay = `${index * 0.1}s`;
        
        // Check if event is today
        const isToday = new Date().toDateString() === eventDate.toDateString();

        card.innerHTML = `
            <div class="event-date-box ${isToday ? 'today' : ''}">
                <span class="month">${month}</span>
                <span class="date">${date}</span>
                <span class="day">${day}</span>
            </div>
            <div class="event-details">
                <div class="event-header">
                    <span class="event-time">🕒 ${time === '00:00' ? 'ALL DAY' : time}</span>
                    ${isToday ? '<span class="status-badge">TODAY</span>' : ''}
                </div>
                <h3 class="event-title">${event.title}</h3>
                <div class="event-info">
                    <span class="location">📍 ${event.location || 'Online'}</span>
                </div>
                ${event.description ? `<p class="event-desc">${event.description.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank">Link</a>')}</p>` : ''}
            </div>
        `;
        
        container.appendChild(card);
    });
}
