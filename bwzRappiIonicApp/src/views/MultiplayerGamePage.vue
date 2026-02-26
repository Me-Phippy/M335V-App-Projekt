<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/tabs/tab1"></ion-back-button>
        </ion-buttons>
        <ion-title>Mehrspieler</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <div class="game-container">
        <!-- Spieler Info -->
        <div class="players-info">
          <div class="player-card" :class="{ active: player1.isActive }">
            <h3>{{ player1.name }}</h3>
            <div class="player-stats">
              <ion-icon :icon="trophyOutline"></ion-icon>
              <span>{{ player1.pairsFound }} Paare</span>
            </div>
            <div class="player-stats">
              <ion-icon :icon="timeOutline"></ion-icon>
              <span>{{ player1.totalTime }}s</span>
            </div>
          </div>

          <div class="vs-divider">VS</div>

          <div class="player-card" :class="{ active: player2.isActive }">
            <h3>{{ player2.name }}</h3>
            <div class="player-stats">
              <ion-icon :icon="trophyOutline"></ion-icon>
              <span>{{ player2.pairsFound }} Paare</span>
            </div>
            <div class="player-stats">
              <ion-icon :icon="timeOutline"></ion-icon>
              <span>{{ player2.totalTime }}s</span>
            </div>
          </div>
        </div>

        <!-- Aktueller Spieler Anzeige -->
        <div class="current-player">
          <ion-icon :icon="personOutline"></ion-icon>
          Am Zug: <strong>{{ activePlayer.name }}</strong>
        </div>

        <!-- Spielfeld -->
        <div class="card-grid" :class="gridClass">
          <div
            v-for="card in cards"
            :key="card.id"
            class="card"
            :class="{ 'flipped': card.isFlipped || card.isMatched, 'matched': card.isMatched }"
            @click="flipCard(card)"
          >
            <div class="card-inner">
              <div class="card-front">
                <img src="/images/card-back.png" alt="Card back" />
              </div>
              <div class="card-back">
                <img :src="`/images/${card.value}`" :alt="card.value" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, watch, computed } from 'vue'
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton, IonIcon, alertController } from '@ionic/vue'
import { trophyOutline, timeOutline, personOutline } from 'ionicons/icons'
import { useMultiplayerGameService } from '@/composables/multiplayerGameService'
import { useSettingsService } from '@/composables/settingsService'

const { cards, player1, player2, activePlayer, winner, totalPairs, isGameWon, initializeGame, flipCard, resetGame, cleanup } = useMultiplayerGameService()
const { cardCount } = useSettingsService()

const gridClass = computed(() => {
  switch (cardCount.value) {
    case 24: return 'grid-4x6'
    case 36: return 'grid-6x6'
    default: return 'grid-4x4'
  }
})

onMounted(async () => {
  // Namen abfragen
  const alert = await alertController.create({
    header: 'Spieler Namen',
    inputs: [
      {
        name: 'player1',
        type: 'text',
        placeholder: 'Spieler 1 Name',
        value: 'Spieler 1'
      },
      {
        name: 'player2',
        type: 'text',
        placeholder: 'Spieler 2 Name',
        value: 'Spieler 2'
      }
    ],
    buttons: [
      {
        text: 'Start',
        handler: (data) => {
          initializeGame(
            cardCount.value,
            data.player1 || 'Spieler 1',
            data.player2 || 'Spieler 2'
          )
        }
      }
    ],
    backdropDismiss: false
  })
  await alert.present()
})

onUnmounted(() => {
  cleanup()
})

watch(isGameWon, async (won) => {
  if (won && winner.value) {
    const loser = winner.value === player1.value ? player2.value : player1.value
    
    const alert = await alertController.create({
      header: 'Spiel beendet!',
      message: `
        <strong>🏆 ${winner.value.name} gewinnt!</strong><br><br>
        <strong>${winner.value.name}:</strong> ${winner.value.pairsFound} Paare in ${winner.value.totalTime}s<br>
        <strong>${loser.name}:</strong> ${loser.pairsFound} Paare in ${loser.totalTime}s
      `,
      buttons: [
        {
          text: 'Neues Spiel',
          handler: () => {
            resetGame()
          }
        },
        {
          text: 'Zurück',
          handler: () => {
            window.history.back()
          }
        }
      ]
    })
    await alert.present()
  }
})
</script>

<style scoped>
.game-container {
  padding: 20px;
  max-width: 1180px;
  margin: 0 auto;
}

.players-info {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 20px;
  gap: 20px;
  flex-wrap: wrap;
}

.player-card {
  background: linear-gradient(135deg, #2a2a3e 0%, #1a1a2e 100%);
  border: 3px solid var(--ion-color-medium);
  border-radius: 12px;
  padding: 15px 25px;
  min-width: 200px;
  transition: all 0.3s;
}

.player-card.active {
  border-color: var(--ion-color-primary);
  box-shadow: 0 0 20px rgba(77, 166, 255, 0.5);
  transform: scale(1.05);
}

.player-card h3 {
  margin: 0 0 10px 0;
  color: var(--ion-color-primary);
  font-size: 1.3rem;
}

.player-stats {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 5px 0;
  font-size: 1.1rem;
}

.player-stats ion-icon {
  font-size: 20px;
  color: var(--ion-color-primary);
}

.vs-divider {
  font-size: 2rem;
  font-weight: bold;
  color: var(--ion-color-primary);
}

.current-player {
  text-align: center;
  font-size: 1.3rem;
  margin-bottom: 20px;
  padding: 10px;
  background: linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.current-player ion-icon {
  font-size: 24px;
  color: var(--ion-color-primary);
}

.card-grid {
  display: grid;
  gap: 10px;
  max-width: 600px;
  margin: 0 auto;
}

.card-grid.grid-4x4 {
  grid-template-columns: repeat(4, 1fr);
}

.card-grid.grid-4x6 {
  grid-template-columns: repeat(4, 1fr);
}

.card-grid.grid-6x6 {
  grid-template-columns: repeat(6, 1fr);
  max-width: 700px;
}

.card {
  aspect-ratio: 1;
  perspective: 1000px;
  cursor: pointer;
}

.card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.6s;
  transform-style: preserve-3d;
}

.card.flipped .card-inner {
  transform: rotateY(180deg);
}

.card-front,
.card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  overflow: hidden;
}

.card-front {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.card-back {
  background: white;
  transform: rotateY(180deg);
}

.card-front img,
.card-back img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card.matched {
  opacity: 0.6;
  cursor: default;
}
</style>
