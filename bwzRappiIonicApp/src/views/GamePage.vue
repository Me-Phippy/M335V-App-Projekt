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
        <div class="game-info">
          <div class="info-item">
            <ion-icon :icon="trophyOutline"></ion-icon>
            <span>Paare: {{ matchedPairs }} / {{ totalPairs }}</span>
          </div>
          <div class="info-item">
            <ion-icon :icon="timeOutline"></ion-icon>
            <span>Zeit: {{ elapsedTime }}s</span>
          </div>
        </div>

        <div class="card-grid">
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
import { onMounted } from 'vue'
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton, IonIcon } from '@ionic/vue'
import { trophyOutline, timeOutline } from 'ionicons/icons'
import { useGameService } from '@/composables/gameService'

const { cards, matchedPairs, elapsedTime, totalPairs, initializeGame, flipCard } = useGameService()

onMounted(() => {
  initializeGame(16) // 4x4 grid
})
</script>

<style scoped>
.game-container {
  padding: 20px;
  max-width: 1180px;
  margin: 0 auto;
}

.game-info {
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-bottom: 20px;
  font-size: 18px;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.info-item ion-icon {
  font-size: 24px;
  color: var(--ion-color-primary);
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  max-width: 600px;
  margin: 0 auto;
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
