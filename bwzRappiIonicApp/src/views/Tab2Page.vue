<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>History</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">History</ion-title>
        </ion-toolbar>
      </ion-header>

      <div class="container">
        <div class="header-section">
          <h1 class="beauty-title">Bestenliste</h1>
          <ion-button 
            v-if="history.length > 0" 
            color="danger" 
            fill="outline" 
            @click="handleClearHistory"
          >
            <ion-icon slot="start" :icon="trashOutline"></ion-icon>
            History löschen
          </ion-button>
        </div>

        <ion-list v-if="history.length > 0" class="history-list">
          <ion-item v-for="(entry, index) in history" :key="entry.id">
            <ion-label>
              <div class="entry-header">
                <h2>
                  <ion-icon 
                    v-if="index === 0" 
                    :icon="trophyOutline" 
                    class="trophy-icon"
                  ></ion-icon>
                  {{ entry.playerName }}
                </h2>
                <p class="time">{{ entry.time }}s</p>
              </div>
              <p class="date">{{ formatDate(entry.date) }}</p>
            </ion-label>
          </ion-item>
        </ion-list>

        <div v-else class="empty-state">
          <ion-icon :icon="timeOutline" class="empty-icon"></ion-icon>
          <p>Noch keine Spiele gespielt</p>
          <p class="subtitle">Starte ein Spiel, um deine Bestzeit zu setzen!</p>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonButton, IonIcon, alertController } from '@ionic/vue'
import { trophyOutline, timeOutline, trashOutline } from 'ionicons/icons'
import { useHistoryService } from '@/composables/historyService'

const { history, clearHistory } = useHistoryService()

const formatDate = (date: Date) => {
  const d = new Date(date)
  return d.toLocaleDateString('de-CH', { 
    day: '2-digit', 
    month: '2-digit', 
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
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
.container {
  display: flex;
  flex-direction: column;
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.beauty-title {
  font-family: 'Comic Sans MS', cursive, sans-serif;
  font-size: 2rem;
  color: var(--ion-color-primary);
  margin: 0;
}

.history-list {
  width: 100%;
}

.entry-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.entry-header h2 {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0;
  font-size: 1.2rem;
}

.trophy-icon {
  color: gold;
  font-size: 1.5rem;
}

.time {
  font-size: 1.1rem;
  font-weight: bold;
  color: var(--ion-color-primary);
}

.date {
  font-size: 0.9rem;
  color: var(--ion-color-medium);
  margin-top: 4px;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
}

.empty-icon {
  font-size: 80px;
  color: var(--ion-color-medium);
  margin-bottom: 20px;
}

.empty-state p {
  font-size: 1.2rem;
  margin: 10px 0;
}

.subtitle {
  font-size: 1rem;
  color: var(--ion-color-medium);
}
</style>