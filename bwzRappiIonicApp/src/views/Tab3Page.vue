<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Fischli's Memory</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Fischli's Memory</ion-title>
        </ion-toolbar>
      </ion-header>

      <ExploreContainer name="Help page" />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import ExploreContainer from '@/components/ExploreContainer.vue';
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  height: 100%;
}

.subtitle {
  font-size: 1.2rem;
  margin-bottom: 30px;
  color: var(--ion-color-medium);
}

.mode-button {
  width: 100%;
  max-width: 1000px;
  margin-bottom: 15px;
  height: 100%;
  max-height: 300px;
}

.beauty-title {
  font-family: 'Comic Sans MS', cursive, sans-serif;
  font-size: 2.5rem;
  color: var(--ion-color-primary);
  text-align: center;
  margin-bottom: 20px;
}
</style>