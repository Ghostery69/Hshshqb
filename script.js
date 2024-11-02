const token = '7917386515:AAFKQkkLGs4uP9-dAkS70zoDtpWtPZIRgnE';
const chatId = '6221938580';

// Récupère les messages et les affiche en les stockant dans le localStorage
async function getMessages() {
    try {
        const response = await fetch(https://api.telegram.org/bot${token}/getUpdates);
        const data = await response.json();

        if (data.ok) {
            const messages = data.result
                .map(update => update.message)
                .filter(msg => msg && msg.chat.id === parseInt(chatId))
                .filter(msg => msg.text && msg.text.startsWith('2 '))
                .map(msg => msg.text.slice(2).trim()); // Supprime "2 " du message

            // Récupère les messages actuels du localStorage
            let storedMessages = JSON.parse(localStorage.getItem('telegramMessages'))  [];
            
            // Ajoute les nouveaux messages au localStorage s'ils n'existent pas déjà
            messages.forEach(msg => {
                if (!storedMessages.includes(msg)) {
                    storedMessages.push(msg);
                }
            });

            // Sauvegarde les messages mis à jour dans le localStorage
            localStorage.setItem('telegramMessages', JSON.stringify(storedMessages));
            
            // Affiche les messages sur le site
            displayMessages(storedMessages);
        }
    } catch (error) {
        console.error("Erreur lors de la récupération des messages :", error);
    }
}

// Affiche les messages stockés dans le localStorage
function displayMessages(messages) {
    const container = document.getElementById('messages');
    container.innerHTML = '<h2>Messages Telegram</h2>';

    messages.forEach(messageText => {
        const messageElement = document.createElement('div');
        messageElement.className = 'message';
        messageElement.textContent = messageText;
        container.appendChild(messageElement);
    });
}

// Charge les messages sauvegardés au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    const storedMessages = JSON.parse(localStorage.getItem('telegramMessages'))  [];
    displayMessages(storedMessages);
});

// Actualise les messages toutes les 5 secondes
setInterval(getMessages, 5000);