import i18next from 'i18next';
import ogmaBackend from 'i18next-ogma-backend';

i18next
.use(ogmaBackend)
.init({
  fallbackLng: 'en_US',
  backend: {
    url: 'http://localhost:3000',
    id: '5999740bef40d9d358d2edea',
    token: '82eaaa70abecaa8ac307871f820472f37b0c1ed4833c9a40a90b4759c314e0185117be994379dbfee4a090ffc2025d59'
  }
});

export default i18next;
