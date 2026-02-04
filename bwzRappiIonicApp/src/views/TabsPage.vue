<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom" class="tab-bar">
        <ion-tab-button tab="tab1" href="/tabs/tab1" class="tab-button">
          <ion-icon aria-hidden="true" :icon="triangle" />
          <ion-label>Play </ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab2" href="/tabs/tab2" class="tab-button">
          <ion-icon aria-hidden="true" :icon="ellipse" />
          <ion-label>History </ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab3" href="/tabs/tab3" class="tab-button">
          <ion-icon aria-hidden="true" :icon="square" />
          <ion-label>Help </ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab4" href="/tabs/tab4" class="tab-button">
          <ion-icon aria-hidden="true" :icon="square" />
          <ion-label>Settings </ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { ellipse, square, triangle } from 'ionicons/icons';
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

.tab-bar {
  height: 80px !important;
  padding-bottom: 8px !important;
}

.tab-button {
  font-size: 16px !important;
}

ion-tab-button ion-icon {
  font-size: 32px !important;
}

ion-tab-button ion-label {
  font-size: 14px !important;
}
</style>