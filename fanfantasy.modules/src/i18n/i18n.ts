import { createI18n } from 'vue-i18n';

const messages = {
  en: {
    NAVBAR: {
      HOME:"Home",
      STANDINGS:"Standings",
      RANKINGS:"Rankings",
      FLATICONS:"FlatIcons",
      NEXT_GEN:"Next Gen Fanfastats",
      DRAFT_LIST:"Draft",
      LOGIN:"Login"
    },
    STANDINGS: {
      HEADER: "Standings",
      LEAGUE: "League",
      DIVISION: "Division",
      CONFERENCE_NAME: "Fanfas Conference",
      ALL_TEAMS: "Teams",
      TEAM: "Team",
      LINKS: {
        HEADER:"Links",
        TIE_BREAK: "Tie Breaking Procedure",
        COMPLETE_STANDINGS: "Complete Standings",
      },
      LEGEND: {
        HEADER: "Legend",
        LABEL : {
          WINS: "W",
          LOSSES: "L",
          TIES: "T",
          WINNING_PERC: "PCT",
          HOME_RCD: "Home",
          ROAD_RCD: "Road",
          DIV_RCD: "Div Record",
          DIV_PERC: "PCT",
          POINTS_FOR: "PF",
          POINTS_AGAINST: "PA",
          NET_POINTS: "Net Pts",
          STREAK: "Strk",
          LAST_FIVE: "Last 5"
        },
        VALUE : {
          WINS: "Wins",
          LOSSES: "Losses",
          TIES: "Ties",
          WINNING_PERC: "Winning Percentage",
          HOME_RCD: "Home Record",
          ROAD_RCD: "Road Record",
          DIV_RCD: "Division Record",
          DIV_PERC: "Division Winning Percentage",
          POINTS_FOR: "Total Points For",
          POINTS_AGAINST: "Total Points Against",
          NET_POINTS: "Net Points",
          STREAK: "Streak",
          LAST_FIVE: "Last 5"
        }
      }
    }
  },
  pt: {
    ORDENAL: "º",
    BUDGET: "Orçamento",
    NAVBAR: {
      HOME:"Home",
      STANDINGS:"Classificação",
      RANKINGS:"Rankings",
      FLATICONS:"FlatIcons",
      NEXT_GEN:"Next Gen Fanfastats",
      DRAFT_LIST:"Draft",
      TEAMS:"Times",
      LOGIN:"Login"
    },
    NAVBAR_SEC: {
      HOME:"Home",
      STANDINGS:"Classificação",
      RANKINGS:"Rankings",
      FLATICONS:"FlatIcons",
      NEXT_GEN:"Next Gen Fanfastats",
      DRAFT_LIST:"Draft",
      TEAMS:"Times",
    },
    STANDINGS: {
      HEADER: "Classificação",
      LEAGUE: "Liga",
      DIVISION: "Divisão",
      CONFERENCE_NAME: "Fanfas Conference",
      ALL_TEAMS: "Times",
      TEAM: "Time",
      LINKS: {
        HEADER:"Links",
        TIE_BREAK: "Critérios de Desempate",
        COMPLETE_STANDINGS: "Classificação Completa",
      },
      LEGEND: {
        HEADER: "Legenda",
        LABEL : {
          WINS: "V",
          LOSSES: "D",
          TIES: "E",
          WINNING_PERC: "PCT",
          HOME_RCD: "Mdt",
          ROAD_RCD: "Vst",
          DIV_RCD: "Div",
          DIV_PERC: "PCT",
          POINTS_FOR: "PF",
          POINTS_AGAINST: "PC",
          NET_POINTS: "Saldo",
          STREAK: "Sqc",
          LAST_FIVE: "Últ. 5",
        },
        VALUE : {
          WINS: "Vitórias",
          LOSSES: "Derrotas",
          TIES: "Empates",
          WINNING_PERC: "Percentual de Vitória",
          HOME_RCD: "Record Como Mandante",
          ROAD_RCD: "Record Como Visitante",
          DIV_RCD: "Record na Divisão",
          DIV_PERC: "Percentual de Vitória na Divisão",
          POINTS_FOR: "Pontos Feitos",
          POINTS_AGAINST: "Pontos Cedidos",
          NET_POINTS: "Saldo de Pontos",
          STREAK: "Sequência",
          LAST_FIVE: "Últ. 5",
        }
      }
    },
    TEAMS: {
      HEADER: "Informações do Time",
    },
    AUTH: {
      HEADER: "Login"
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