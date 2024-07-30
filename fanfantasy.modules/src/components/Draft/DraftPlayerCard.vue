<script setup lang="ts">
  import { DraftListInfo } from '@/models/draft-list.model';
  import { COLOR_PER_POSITION } from '@/utils/constants';
  import fanfantasyLogo from '@/assets/img/league/fanfantasy.svg';
  import rookieFlag from '@/assets/img/league/rookie_flag.png';
  import faLogo from '@/assets/img/league/nfl-logo.png';
  import noPicture from '@/assets/img/league/default-player.png';

  type Props = {
    playerData: DraftListInfo;
  }

  const props = defineProps<Props>();

  const getTeamLogo = ():string => {
    return props.playerData.teamLogo === "" ? faLogo : props.playerData.teamLogo;
  }

  const getPlayerPicture = ():string => {
    return props.playerData.profilePictureUrl === "" ? noPicture : props.playerData.profilePictureUrl;
  }

  const getPositionalColor = ():string => {
    return COLOR_PER_POSITION[props.playerData.position as keyof typeof COLOR_PER_POSITION];
  }

  const getFirstName = (name:string):string => {
    return name.split(" ")[0];
  }

  const getLastName = (name:string):string => {
    let firstNameLength = getFirstName(name).length;
    return (name.substring(firstNameLength));
  }

  const calculateFontSize = (name:string): string => {
    if(getLastName(name).length >= 15) return "small-text";
    if(getLastName(name).length >= 11) return "medium-text";
    return "";
  }

  const getByeWeek = ():number|string => {
    return props.playerData.byeWeek>0?props.playerData.byeWeek:"-";
  }

</script>

<template>
  <div class="player-card">
    <div class="profile-img-wrapper">
      <img class="team-logo" :src="getTeamLogo()"/>
      <img class="player-picture" :src="getPlayerPicture()"/>
      <img v-if="props.playerData.rookie" class="rookie-flag" :src="rookieFlag"/>
    </div>
    <div class="player-info">
      <div class="upper-info" :style="`background-color: ${getPositionalColor()};`">
        <div class="player-position">{{ props.playerData.position }}</div>
        <div class="player-first-name">{{ getFirstName(props.playerData.fullName) }}</div>
        <div class="team-bye">{{ getByeWeek() }}</div>
      </div>
      <div :class="`lower-info ${calculateFontSize(props.playerData.fullName)}`">
        {{ getLastName(props.playerData.fullName) }}
        <img :src="fanfantasyLogo" alt="" class="faded-img"/>
      </div>
    </div>
  </div>
</template>

<style>
.player-card {
  margin-top: 20px;
  display: flex;
  width: fit-content;
}

.profile-img-wrapper {
  width: 90px;
}

.team-logo {
  position: absolute;
  z-index: -1;
  height: 56px;
  width: 56px;
}

.rookie-flag {
  translate: -75px 55px;
  position: absolute;
  z-index: 100;
  height: 20px;
  width: 20px;
}

.player-picture {
  border-radius: 20%;
  translate: 20px 5px;
  z-index: 10;
  height: 100px;
  width: 75px;
  object-fit: cover;
}

.upper-info {
  display: flex;
  width: 350px;
  justify-content: space-between;
}

.player-position,
.player-first-name,
.team-bye {
  color:white;
  font-weight: bold;
  font-size: 24px;
  display: flex;
  flex:1;
  justify-content: center;
  align-items: center;
  padding: 0px 8px 0px 8px;
}

.player-first-name{
  height: 33%;
  flex:6;
}

.lower-info {
  display: flex;
  font-weight: 800;
  font-size: 48px;
  justify-content: center;
  width: 100%;
  height: 67%;
  overflow: hidden;
  align-items: center;
  color: black;
}

.medium-text {
  display: flex;
  justify-content: center;
  font-size: 40px;
}

.small-text {
  display: flex;
  justify-content: center;
  font-size: 34px;
}

.faded-img {
  z-index: -1;
  position: absolute;
  width: 150px;
  opacity: .15;
}

</style>
