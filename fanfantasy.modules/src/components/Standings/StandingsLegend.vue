<script setup lang="ts">
</script>

<template>
  <div class="legend-container mt-4 mb-4">
    <div class="left-section">
      <div class="legend-header mt-3 ml-2 mr-2">
        <h2><span>Legenda</span></h2>
      </div>
      <div class="grid mt-1 text-left ml-2 mr-2">
        <div class="col-4 legend-column">
          <span class="mb-1"><strong>V</strong> : Vitórias</span>
          <span class="mb-1"><strong>D</strong> : Derrotas</span>
          <span class="mb-1"><strong>E</strong> : Empates</span>
        </div>
        <div class="col-4 legend-column">
          <span class="mb-1"><strong>PCT</strong> : Percentagem de Vitórias</span>
          <span class="mb-1"><strong>Mdt</strong> : Record como mandante</span>
          <span class="mb-1"><strong>Vst</strong> : Record como visitante</span>
        </div>
        <div class="col-4 legend-column">
          <span class="mb-1"><strong>Div</strong> : Vitórias</span>
          <span class="mb-1"><strong>Sqc</strong> : Sequência</span>
          <span class="mb-1"><strong>Últ. 5</strong> : Record nas últimas 5 partidas</span>
        </div>
      </div>
    </div>
    <div class="right-section">
      <div class="legend-header mt-3 ml-2 mr-2">
        <h2><span>Links</span></h2>
      </div>
      <div class="grid mt-1 text-left ml-2 mr-2">
        <div class="col-12 legend-column">
          <span class="mb-1"><a href="/">Critérios de desempate</a></span>
          <span class="mb-1"><a href="/">Classificação geral</a></span>
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
