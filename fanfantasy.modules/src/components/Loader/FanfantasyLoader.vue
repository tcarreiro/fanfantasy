<template>
  <div class="shine-container">
    <img src="@/assets/img/league/fanfantasy-cropped.svg" alt="" class="shine-image"/>
  </div>
</template>

<style>

.shine-container {
  position: relative;
  display: inline-block;
}

.shine-image {
  display: block;
  width: 50%;
  height: auto;
}

.shine-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: -50%;
  width: 100%;
  height: 100%;
  background: linear-gradient(120deg, rgba(255, 255, 255, 0) 30%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 70%);
  transform: skewX(-25deg);
  animation: shine 3s infinite;
}

@keyframes shine {
  0% {
    left: -50%;
  }
  100% {
    left: 10%;
  }
}

</style>
