<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>JFPW Memory</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">JFPW Memory</ion-title>
        </ion-toolbar>
      </ion-header>

      <div class="help-container">
        <h2 class="help-title">Über das Spiel</h2>
        
        <div class="description-section">
          <h3>Was ist Memory?</h3>
          <p>
            Memory ist ein klassisches Kartenspiel, bei dem es darum geht, Paare von identischen Karten zu finden. 
            Alle Karten liegen verdeckt auf dem Spielfeld und werden nacheinander aufgedeckt.
          </p>

          <h3>Spielregeln</h3>
          <ul>
            <li>Decke zwei Karten auf, indem du sie antippst</li>
            <li>Wenn die Karten identisch sind, bleiben sie aufgedeckt</li>
            <li>Wenn sie nicht übereinstimmen, werden sie wieder verdeckt</li>
            <li>Merke dir die Position der Karten!</li>
            <li>Ziel ist es, alle Paare mit möglichst wenig Zügen zu finden</li>
          </ul>

          <h3>Spielmodi</h3>
          <p>
            <strong>Einzelspieler:</strong> Spiele alleine und versuche deine Bestzeit zu verbessern.
          </p>
          <p>
            <strong>Multiplayer:</strong> Spiele gegen einen Freund. Wer die meisten Paare findet, gewinnt!
          </p>

          <h3>Einstellungen</h3>
          <p>
            Im Settings-Tab kannst du die Spielfeldgrösse (16, 24 oder 36 Karten), deinen Spielernamen 
            und die Anzeige der Spielzeit anpassen.
          </p>
        </div>

        <div class="video-section">
          <h3>Tutorial Video</h3>
          <div class="video-container">
            <iframe 
              width="100%" 
              height="315" 
              src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
              title="Memory Tutorial" 
              frameborder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowfullscreen>
            </iframe>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
</script>

<style scoped>
.help-container {
  display: flex;
  flex-direction: column;
  padding: 30px 20px;
  gap: 30px;
  max-width: 900px;
  margin: 0 auto;
}

.help-title {
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 20px;
  font-weight: bold;
  color: var(--ion-color-primary);
}

.description-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.description-section h3 {
  font-size: 1.5rem;
  margin: 10px 0 5px 0;
  color: var(--ion-color-primary);
  font-weight: 600;
}

.description-section p {
  font-size: 1.1rem;
  line-height: 1.6;
  margin: 5px 0;
  color: var(--ion-color-step-850);
}

.description-section ul {
  font-size: 1.1rem;
  line-height: 1.8;
  padding-left: 25px;
  margin: 10px 0;
  color: var(--ion-color-step-850);
}

.description-section li {
  margin: 8px 0;
}

.description-section strong {
  color: var(--ion-color-primary);
  font-weight: 600;
}

.video-section {
  margin-top: 30px;
  padding-top: 30px;
  border-top: 2px solid var(--ion-color-light);
}

.video-section h3 {
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: var(--ion-color-primary);
  font-weight: 600;
}

.video-container {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; /* 16:9 Aspect Ratio */
  height: 0;
  overflow: hidden;
  border-radius: 10px;
  background-color: #000;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 10px;
}

.video-note {
  font-size: 0.95rem;
  color: var(--ion-color-medium);
  font-style: italic;
  margin-top: 15px;
  text-align: center;
}
</style>