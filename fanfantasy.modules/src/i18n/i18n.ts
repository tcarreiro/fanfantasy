import { createI18n } from 'vue-i18n';

const messages = {
  en: {
    NAVBAR: {
      HOME:"Home",
      STANDINGS:"Standings",
      RANKINGS:"Rankings",
      FLATICONS:"FlatIcons",
      NEXT_GEN:"Next Gen Fanfastats",
      DRAFT_LIST:"Draft"
    }
  },
  pt: {
    NAVBAR: {
      HOME:"Home",
      STANDINGS:"Classificação",
      RANKINGS:"Rankings",
      FLATICONS:"FlatIcons",
      NEXT_GEN:"Next Gen Fanfastats",
      DRAFT_LIST:"Draft"
    },
    STANDINGS: {
      CONFERENCE_NAME: "Fanfas Conference",
      ALL_TEAMS: "Times",
      TEAM: "Time",
      WINS: "V",
      LOSSES: "D",
      DRAWS: "E",
      TOTAL_PERCENT: "PCT",
      POINTS_FOR: "PF",
      POINTS_AGAINST: "PC",
      NET_POINTS: "Saldo",
      HOME_RECORD: "Mdt",
      AWAY_RECORD: "Vst",
      DIVISION_RECORD: "Div",
      DIVISION_PERCENT: "PCT",
      STREAK: "Sqc",
      LAST_FIVE: "Últ. 5"
    }

  }
};

// Crie a instância do i18n
const i18n = createI18n({
  locale: 'pt',
  messages,
});

export default i18n;