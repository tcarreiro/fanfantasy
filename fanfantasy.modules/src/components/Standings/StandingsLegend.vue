<script setup lang="ts">
import { useI18n } from 'vue-i18n';

  const { t } = useI18n();

  const getLegend = (name:string):string => {
    return `<strong>${t("STANDINGS.LEGEND.LABEL."+name).toUpperCase()}</strong>: ${t("STANDINGS.LEGEND.VALUE."+name)}`;
  };

</script>

<template>
  <div class="legend-container mt-4">
    <div class="left-section">
      <div class="legend-header mt-3 ml-2 mr-2">
        <h2><span>{{t('STANDINGS.LEGEND.HEADER').toUpperCase()}}</span></h2>
      </div>
      <div class="grid mt-1 text-left ml-2 mr-2">
        <div class="col-4 legend-column">
          <span class="mb-1" v-html="getLegend('WINS')"></span>
          <span class="mb-1" v-html="getLegend('LOSSES')"></span>
          <span class="mb-1" v-html="getLegend('TIES')"></span>
          <span class="mb-1" v-html="getLegend('WINNING_PERC')"></span>
          <span class="mb-1" v-html="getLegend('HOME_RCD')"></span>
        </div>
        <div class="col-4 legend-column">
          <span class="mb-1" v-html="getLegend('ROAD_RCD')"></span>
          <span class="mb-1" v-html="getLegend('DIV_RCD')"></span>
          <span class="mb-1" v-html="getLegend('POINTS_FOR')"></span>
          <span class="mb-1" v-html="getLegend('POINTS_AGAINST')"></span>
          <span class="mb-1" v-html="getLegend('NET_POINTS')"></span>
        </div>
        <div class="col-4 legend-column">
          <span class="mb-1" v-html="getLegend('STREAK')"></span>
        </div>
      </div>
    </div>
    <div class="right-section">
      <div class="legend-header mt-3 ml-2 mr-2">
        <h2><span>{{t('STANDINGS.LINKS.HEADER').toUpperCase()}}</span></h2>
      </div>
      <div class="grid mt-1 text-left ml-2 mr-2">
        <div class="col-12 legend-column">
          <span class="mb-1"><a href="/">{{t('STANDINGS.LINKS.TIE_BREAK')}}</a></span>
          <span class="mb-1"><a href="/">{{t('STANDINGS.LINKS.COMPLETE_STANDINGS')}}</a></span>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
  .legend-container {
    display: flex;
    width: 100%;
    overflow-x: auto;
    box-sizing: border-box;
    background-color: white;
    padding-bottom: 15px;

    .left-section {
      width: 73%;
    }

    .right-section {
      width: 23%;
    }

    .legend-header {
      display: flex;
      justify-content: left;
      border-bottom: 1px solid #CCC;

      >h2 {
        color: #757575;
        text-transform: uppercase;
        padding-bottom: 3px;
        font-weight: 500;
        font-size: 14px;
        font-weight: bold!important;
      }
    }

    .legend-column {
      color: var(--ff-c-dark-grey);
      display: flex;
      flex-direction: column;
      font-size: 14px;
      font-family: All-ProSans, Helvetica, Arial, sans-serif;
      font-weight: 500;
    }

    .text-left {
      text-align: left!important;
    }
  }

</style>
