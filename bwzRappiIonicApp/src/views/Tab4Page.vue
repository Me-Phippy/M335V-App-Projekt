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

      <div class="settings-container">
        <h2 class="settings-title">Settings</h2>

        <!-- Spielfeldgrösse -->
        <div class="setting-section">
          <h3 class="setting-label">Spielfeldgrösse</h3>
          <div class="button-group">
            <ion-button
              class="setting-button"
              size="large"
              :fill="cardCount === 16 ? 'solid' : 'outline'"
              @click="setCardCount(16)"
            >16 Karten</ion-button>
            <ion-button
              class="setting-button"
              size="large"
              :fill="cardCount === 24 ? 'solid' : 'outline'"
              @click="setCardCount(24)"
            >24 Karten</ion-button>
            <ion-button
              class="setting-button"
              size="large"
              :fill="cardCount === 36 ? 'solid' : 'outline'"
              @click="setCardCount(36)"
            >36 Karten</ion-button>
          </div>
        </div>

        <!-- Spielername -->
        <div class="setting-section">
          <h3 class="setting-label">Spielername</h3>
          <ion-input
            class="name-input"
            placeholder="Name eingeben..."
            fill="outline"
            :value="playerName"
            @ionInput="handleNameInput"
          ></ion-input>
        </div>

        <!-- Spielzeit anzeigen -->
        <div class="setting-section">
          <h3 class="setting-label">Spielzeit anzeigen</h3>
          <div class="button-group">
            <ion-button
              class="setting-button"
              size="large"
              :fill="showTimer ? 'solid' : 'outline'"
              @click="setShowTimer(true)"
            >An</ion-button>
            <ion-button
              class="setting-button"
              size="large"
              :fill="!showTimer ? 'solid' : 'outline'"
              @click="setShowTimer(false)"
            >Aus</ion-button>
          </div>
        </div>

        <!-- History zurücksetzen -->
        <div class="setting-section">
          <ion-button
            class="reset-button"
            size="large"
            color="danger"
            expand="block"
            @click="handleClearHistory"
          >
            History zurücksetzen
          </ion-button>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonInput, alertController } from '@ionic/vue'
import { useSettingsService } from '@/composables/settingsService'
import { useHistoryService } from '@/composables/historyService'

const { cardCount, playerName, showTimer, setCardCount, setPlayerName, setShowTimer } = useSettingsService()
const { clearHistory } = useHistoryService()

const handleNameInput = (event: CustomEvent) => {
  const value = event.detail.value || ''
  setPlayerName(value)
}

const handleClearHistory = async () => {
  const alert = await alertController.create({
    header: 'History löschen?',
    message: 'Möchtest du wirklich alle Einträge löschen?',
    buttons: [
      {
        text: 'Abbrechen',
        role: 'cancel'
      },
      {
        text: 'Löschen',
        role: 'destructive',
        handler: () => {
          clearHistory()
        }
      }
    ]
  })
  await alert.present()
}
</script>

<style scoped>
.settings-container {
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 30px;
}

.settings-title {
  font-size: 2rem;
  text-align: center;
  margin-bottom: 10px;
}

.setting-section {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.setting-label {
  font-size: 1.3rem;
  margin: 0;
}

.button-group {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.setting-button {
  --padding-top: 20px;
  --padding-bottom: 20px;
  --padding-start: 25px;
  --padding-end: 25px;
  font-size: 1.1rem;
  min-height: 60px;
}

.name-input {
  font-size: 1.2rem;
  --padding-top: 15px;
  --padding-bottom: 15px;
}

.reset-button {
  --padding-top: 25px;
  --padding-bottom: 25px;
  font-size: 1.2rem;
  margin-top: 20px;
}
</style>
