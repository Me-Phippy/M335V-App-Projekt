<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/tabs/tab1"></ion-back-button>
        </ion-buttons>
        <ion-title>Einzelspieler</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <div class="game-container">
        <h2>Memory Spiel</h2>
        <p>Hier kommt später das Spiel hin...</p>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton } from '@ionic/vue';
</script>

<style scoped>
.game-container {
  padding: 20px;
  text-align: center;
}

h2 {
  margin-top: 20px;
  font-size: 24px;
}
</style>
