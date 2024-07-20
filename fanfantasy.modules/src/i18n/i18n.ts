import { createI18n } from 'vue-i18n';

const messages = {
  en: {
    NAVBAR: {
      HOME:"Home",
      STANDINGS:"Standings",
      RANKINGS:"Rankings",
      NEXT_GEN:"Next Gen Fanfastats"
    }
  },
  pt: {
    NAVBAR: {
      HOME:"Home",
      STANDINGS:"Classificação",
      RANKINGS:"Rankings",
      NEXT_GEN:"Next Gen Fanfastats"
    }
  }
};

// Crie a instância do i18n
const i18n = createI18n({
  locale: 'pt',
  messages,
});

export default i18n;