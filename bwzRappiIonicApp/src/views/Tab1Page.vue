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

        <ion-button expand="full" size="large"  class="mode-button">
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
import './TabPages.css';
</script>
