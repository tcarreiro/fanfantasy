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
    },
    STANDINGS: {
      HEADER: "Standings",
      CONFERENCE_NAME: "Fanfas Conference",
      ALL_TEAMS: "Teams",
      TEAM: "Team",
      WINS: "W",
      LOSSES: "L",
      DRAWS: "D",
      TOTAL_PERCENT: "PCT",
      POINTS_FOR: "PF",
      POINTS_AGAINST: "PA",
      NET_POINTS: "Net points",
      HOME_RECORD: "Home",
      AWAY_RECORD: "Away",
      DIVISION_RECORD: "Div",
      DIVISION_PERCENT: "Pct",
      STREAK: "Strk",
      LAST_FIVE: "Last 5"
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
      HEADER: "Classificação",
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
  legacy: false,
  locale: 'pt',
  messages,
});

export default i18n;