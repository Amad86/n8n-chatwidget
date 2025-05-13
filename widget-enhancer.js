// widget-enhancer.js
function initializeChatToggleButtonText() {
    console.log("WIDGET ENHANCER: Attempting to initialize chat toggle button text...");
    const chatWidgetRoot = document.querySelector('.n8n-chat');
    const toggleButton = chatWidgetRoot ? chatWidgetRoot.querySelector('.chat-window-toggle') : null;
    const chatOpenStateContainer = chatWidgetRoot ? chatWidgetRoot.querySelector('.chat-container') : null;

    if (chatWidgetRoot && toggleButton && chatOpenStateContainer) {
        console.log("WIDGET ENHANCER: Required elements found.");
        const openChatIconSVG = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
               <path d="M20 2H4C2.9 2 2 2.9 2 4v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z" fill="currentColor"/>
            </svg>`;
        const closeChatIconSVG = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" fill="currentColor"/>
            </svg>`;

        let textLabel = chatWidgetRoot.querySelector('.chat-toggle-text-label');
        if (!textLabel) {
            textLabel = document.createElement('div');
            textLabel.className = 'chat-toggle-text-label';
            // De tekst zelf kan via i18n of een data-attribuut van het script worden gehaald
            // Voor nu hardcoded, of haal het uit een config:
            textLabel.textContent = window.chatWidgetCustomTexts?.toggleLabel || 'Vragen? Klik hier';
            chatWidgetRoot.appendChild(textLabel);
            console.log("WIDGET ENHANCER: Text label created: ", textLabel.textContent);
        }

        if (toggleButton.classList.contains('position-left')) {
            textLabel.classList.add('position-left');
        }

        function updateButtonAndTextVisibility(isOpen) {
            if (!textLabel) return;
            if (isOpen) {
                toggleButton.innerHTML = closeChatIconSVG;
                textLabel.classList.remove('visible'); // CSS handelt opacity af
                // textLabel.classList.add('hidden-by-js'); // Als je display:none wilt
            } else {
                toggleButton.innerHTML = openChatIconSVG;
                textLabel.classList.add('visible');
                // textLabel.classList.remove('hidden-by-js');
            }
        }
        
        const initiallyOpen = chatOpenStateContainer.classList.contains('open');
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
        console.log("WIDGET ENHANCER: MutationObserver on .chat-container started.");

    } else {
        console.warn('WIDGET ENHANCER: Could not initialize toggle button text. Missing elements.');
    }
}

const bodyObserverForWidget = new MutationObserver(function(mutations, observer) {
    const chatWidgetRoot = document.querySelector('.n8n-chat');
    if (chatWidgetRoot) {
        console.log("WIDGET ENHANCER: .n8n-chat root element found.");
        observer.disconnect();
        initializeChatToggleButtonText();
    }
});

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        console.log("WIDGET ENHANCER: DOMContentLoaded, starting bodyObserver.");
        bodyObserverForWidget.observe(document.body, { childList: true, subtree: true });
    });
} else {
    // DOM is al geladen, check direct of probeer te observeren
    console.log("WIDGET ENHANCER: DOM already loaded, starting bodyObserver.");
    const chatWidgetRoot = document.querySelector('.n8n-chat');
    if (chatWidgetRoot) {
        initializeChatToggleButtonText();
    } else {
        bodyObserverForWidget.observe(document.body, { childList: true, subtree: true });
    }
}
