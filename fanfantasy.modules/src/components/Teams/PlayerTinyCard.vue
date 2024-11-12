<script setup lang="ts">
import type { Player } from '@/models/player.model';
import { useProTeamStore } from '@/stores/app';
import { PLAYER_PROFILE_PIC_URL } from '@/utils/constants';
import { ref } from 'vue';
import noPicture from '@/assets/img/league/default-player.png';
import { getPositionNameById } from '@/utils/players';


  type Props = {
    player: Player;
  }

  const props = defineProps<Props>();
  const {getProTeamById} = useProTeamStore();
  const fallbackImage = ref();

  const getProfilePic = () => {
    return fallbackImage.value ?
    noPicture :
    props.player.playerId < 0 ?
    getProTeamById(props.player.proTeamId)?.logoUrl :
    PLAYER_PROFILE_PIC_URL.replace("%s", props.player.playerId.toString());
  };

  const onImageError = () => {
    fallbackImage.value = noPicture;
  };
</script>

<template>
  <div class="player-tiny-card flex text-align-left">
    <img :src="getProfilePic()" alt="" class="player-photo mr-1" @error="onImageError()">
    <div>
      <div class="player-upper-info">{{ props.player.fullName }}</div>
      <div v-if="props.player.playerId !== -1" class="player-lower-info">
        {{ getProTeamById(props.player.proTeamId)?.teamAbbrev }}
        <strong class="ml-1">{{ getPositionNameById(props.player.defaultPositionId) }}</strong>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .player-tiny-card {
    align-items: center;
  }

  .player-photo {
    width: 48px;
    height: 35px;
    object-fit: cover;
  }

  .player-upper-info {
    display: flex;
    color: var(--ff-c-light-blue);
  }

  .player-lower-info {
    display: flex;
    font-size: 10px;
    color: var(--ff-c-medium-grey);
  }

</style>
