// widget.js
function initializeChatToggleButtonText() {
    console.log("Attempting to initialize chat toggle button text...");
    const chatWidgetRoot = document.querySelector('.n8n-chat');
    const toggleButton = chatWidgetRoot ? chatWidgetRoot.querySelector('.chat-window-toggle') : null;
    const chatOpenStateContainer = chatWidgetRoot ? chatWidgetRoot.querySelector('.chat-container') : null;

    console.log("chatWidgetRoot:", chatWidgetRoot);
    console.log("toggleButton:", toggleButton);
    console.log("chatOpenStateContainer:", chatOpenStateContainer);

    if (toggleButton && chatOpenStateContainer && chatWidgetRoot) {
        console.log("Required elements found for toggle text initialization.");
        const openChatIconSVG = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
               <path d="M20 2H4C2.9 2 2 2.9 2 4v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z" fill="currentColor"/>
            </svg>`;
        const closeChatIconSVG = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" fill="currentColor"/>
            </svg>`;

        let textBubble = document.querySelector('.n8n-chat .chat-toggle-text-bubble');
        if (!textBubble) {
            console.log("Text bubble not found, creating...");
            textBubble = document.createElement('div');
            textBubble.className = 'chat-toggle-text-bubble';
            textBubble.textContent = 'Vragen? Klik hier';
            chatWidgetRoot.appendChild(textBubble);
            console.log("Text bubble created and appended to chatWidgetRoot.");
        } else {
            console.log("Text bubble already exists.");
        }

        if (toggleButton.classList.contains('position-left')) {
            textBubble.classList.add('position-left');
        }

        function updateButtonAndTextVisibility(isOpen) {
            if (!textBubble) {
                console.error("textBubble is null in updateButtonAndTextVisibility, cannot update.");
                return;
            }
            console.log(`Updating visibility. Chat is open: ${isOpen}`);
            if (isOpen) {
                toggleButton.innerHTML = closeChatIconSVG;
                textBubble.classList.remove('visible');
            } else {
                toggleButton.innerHTML = openChatIconSVG;
                textBubble.classList.add('visible');
            }
        }
        
        const initiallyOpen = chatOpenStateContainer.classList.contains('open');
        console.log("Initial check: chatOpenStateContainer has 'open' class:", initiallyOpen);
        updateButtonAndTextVisibility(initiallyOpen);

        const observer = new MutationObserver(function(mutationsList) {
            for(let mutation of mutationsList) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    const isOpen = chatOpenStateContainer.classList.contains('open');
                    updateButtonAndTextVisibility(isOpen);
                }
            }
        });
        observer.observe(chatOpenStateContainer, { attributes: true });
        console.log("MutationObserver started on .chat-container for class changes.");

    } else {
        let notFound = [];
        if (!chatWidgetRoot) notFound.push(".n8n-chat (root)");
        if (!toggleButton) notFound.push(".chat-window-toggle");
        if (!chatOpenStateContainer) notFound.push(".chat-container (state container)");
        console.warn(`Could not initialize toggle button text. Missing elements: ${notFound.join(', ')}`);
    }
}

// Wacht tot de .n8n-chat root is toegevoegd aan de DOM
const bodyObserver = new MutationObserver(function(mutations, observer) {
    const chatWidgetRoot = document.querySelector('.n8n-chat');
    if (chatWidgetRoot) {
        console.log(".n8n-chat root element found in DOM by bodyObserver.");
        observer.disconnect();
        initializeChatToggleButtonText();
    }
});

bodyObserver.observe(document.body, { childList: true, subtree: true });
console.log("MutationObserver started on document.body to detect .n8n-chat element.");

// Fallback
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOMContentLoaded event fired (widget.js).");
    setTimeout(() => {
        if (!document.querySelector('.n8n-chat .chat-toggle-text-bubble')) { // Check of het label al bestaat
             console.log("Fallback: attempting to initialize toggle text after DOMContentLoaded + timeout (widget.js).");
             if (document.querySelector('.n8n-chat')) {
                initializeChatToggleButtonText();
             } else {
                console.warn("Fallback: .n8n-chat root still not found after timeout.");
             }
        } else {
            console.log("Fallback: Text bubble already initialized, skipping re-initialization.");
        }
    }, 1500); // Geef het wat meer tijd
});
