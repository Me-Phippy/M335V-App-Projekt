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
