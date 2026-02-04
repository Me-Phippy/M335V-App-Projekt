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

      <div class="container">
        <h1 class="beauty-title">Willkommen bei Fischli's Memory von Jeffrey Goldfischli</h1>
        <p class="subtitle">Wähle deinen Spielmodus</p>

        <ion-button expand="full" size="large" class="mode-button" router-link="/game">
          1P - Einzelspieler
        </ion-button>

        <ion-button expand="full" size="large" class="mode-button" disabled>
          2P - Mehrspieler
        </ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/vue';
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