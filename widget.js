// widget.js
import { createChat } from 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js';

createChat({
  webhookUrl: 'https://hallostroom.app.n8n.cloud/webhook/…/chat',
  theme: {
    'chat-primary-color':              '#1477D7',
    'chat-secondary-color':            '#005EC6',
    /* … alle theme-props zoals hierboven … */
  },
  defaultLanguage: 'nl',
  i18n: {
    nl: {
      title:      'HalloBot',
      inputPlaceholder: 'Stel uw vraag hier…',
      /* … etc. … */
    },
    en: {
      title: 'HalloBot',
      inputPlaceholder: 'Type your question…',
    }
  },
  initialMessages: [
    'Hallo! Hoe kan ik u vandaag helpen?'
  ],
  showWelcomeScreen: false,
});

/* Tekst-label logica */
function initToggleText() {
  const root = document.querySelector('.n8n-chat');
  const toggle = root?.querySelector('.chat-window-toggle');
  const container = root?.querySelector('.chat-container');
  if (!root || !toggle || !container) return;

  const label = root.querySelector('.chat-toggle-text-label')
    ?? (() => {
        const el = document.createElement('div');
        el.className = 'chat-toggle-text-label';
        el.textContent = 'Vragen? Klik hier';
        root.appendChild(el);
        return el;
      })();

  const svgOpen = `<svg>…open path…</svg>`;
  const svgClose= `<svg>…close path…</svg>`;

  function sync(opened) {
    toggle.innerHTML = opened ? svgClose : svgOpen;
    label.classList.toggle('hidden-by-js', opened);
  }

  sync(container.classList.contains('open'));

  new MutationObserver(muts => {
    muts.forEach(m => {
      if (m.type === 'attributes' && m.attributeName === 'class') {
        sync(container.classList.contains('open'));
      }
    });
  }).observe(container, { attributes: true });
}

new MutationObserver((_, obs) => {
  if (document.querySelector('.n8n-chat')) {
    obs.disconnect();
    initToggleText();
  }
}).observe(document.body, { childList: true, subtree: true });
