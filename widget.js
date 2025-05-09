import { createChat } from 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js';

createChat({
  webhookUrl: 'https://hallostroom.app.n8n.cloud/webhook/.../chat',
  defaultLanguage: 'nl',
  theme: {
    'chat-primary-color':               '#1477D7',
    'chat-secondary-color':             '#005EC6',
    'chat-header-background-color':     '#FFFFFF',
    'chat-header-font-color':           '#1477D7',
    'chat-widget-background-color':     '#f7f8fc',
    'chat-message-bot-background-color':'#ffffff',
    'chat-message-bot-font-color':      '#333333',
    'chat-message-user-background-color':'#1477D7',
    'chat-message-user-font-color':     '#ffffff',
    'chat-button-background-color':     '#1477D7',
    'chat-button-font-color':           '#ffffff',
  },
  i18n: {
    nl: {
      title:           'HalloBot',
      subtitle:        '',  // voorkom het “subtitle” placeholder tekstje
      inputPlaceholder:'Stel uw vraag hier…',
      closeButtonTooltip: 'Sluit chat',
      getStarted:      'Nieuw gesprek',
    },
    en: {
      title:           'HalloBot',
      subtitle:        '',
      inputPlaceholder:'Type your question…',
    }
  },
  initialMessages: [
    'Hallo! Hoe kan ik u vandaag helpen? Heeft u vragen over onze diensten, producten of eventuele technische problemen?'
  ],
  showWelcomeScreen: false,
});

/* Optional: je “vragen? klik hier”-logica volgt hier */
