import i18next from 'i18next';
import ogmaBackend from 'i18next-ogma-backend';

i18next
.use(ogmaBackend)
.init({
  fallbackLng: 'en_US',
  backend: {
    url: process.env.REACT_APP_TRANSLATION_URL,
    id: process.env.REACT_APP_TRANSLATION_ID,
    token: process.env.REACT_APP_TRANSLATION_TOKEN
  }
});

export default i18next;
