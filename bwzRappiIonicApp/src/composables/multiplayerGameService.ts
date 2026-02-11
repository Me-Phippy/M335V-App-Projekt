import { ref, computed } from 'vue'

export interface Card {
  id: number
  value: string
  isFlipped: boolean
  isMatched: boolean
}

export interface PlayerStats {
  name: string
  pairsFound: number
  totalTime: number
  isActive: boolean
}

export function useMultiplayerGameService() {
  const cards = ref<Card[]>([])
  const flippedCards = ref<Card[]>([])
  const isProcessing = ref(false)
  const currentTime = ref<Date>(new Date())
  
  const player1 = ref<PlayerStats>({
    name: 'Spieler 1',
    pairsFound: 0,
    totalTime: 0,
    isActive: true
  })
  
  const player2 = ref<PlayerStats>({
    name: 'Spieler 2',
    pairsFound: 0,
    totalTime: 0,
    isActive: false
  })

  const playerStartTime = ref<Date | null>(null)
  const gameStartTime = ref<Date | null>(null)
  let timerInterval: ReturnType<typeof setInterval> | null = null

  const startTimer = () => {
    if (timerInterval) return
    timerInterval = setInterval(() => {
      currentTime.value = new Date()
      
      // Track active player time
      if (playerStartTime.value) {
        const activePlayer = player1.value.isActive ? player1 : player2
        const elapsed = (currentTime.value.getTime() - playerStartTime.value.getTime()) / 1000
        activePlayer.value.totalTime = Math.floor(elapsed)
      }
    }, 100)
  }

  const stopTimer = () => {
    if (timerInterval) {
      clearInterval(timerInterval)
      timerInterval = null
    }
  }

  const totalPairs = computed(() => cards.value.length / 2)
  const totalPairsFound = computed(() => player1.value.pairsFound + player2.value.pairsFound)
  const isGameWon = computed(() => totalPairsFound.value === totalPairs.value && totalPairs.value > 0)
  
  const activePlayer = computed(() => player1.value.isActive ? player1.value : player2.value)
  const winner = computed(() => {
    if (!isGameWon.value) return null
    if (player1.value.pairsFound > player2.value.pairsFound) return player1.value
    if (player2.value.pairsFound > player1.value.pairsFound) return player2.value
    // Bei Gleichstand: Schnellerer gewinnt
    return player1.value.totalTime < player2.value.totalTime ? player1.value : player2.value
  })

  const switchPlayer = () => {
    // Speichere Zeit des aktuellen Spielers
    if (playerStartTime.value) {
      const activePlayer = player1.value.isActive ? player1 : player2
      const elapsed = (new Date().getTime() - playerStartTime.value.getTime()) / 1000
      activePlayer.value.totalTime += Math.floor(elapsed)
    }

    // Wechsle Spieler
    player1.value.isActive = !player1.value.isActive
    player2.value.isActive = !player2.value.isActive
    
    // Starte Zeit für neuen Spieler
    playerStartTime.value = new Date()
  }

  const initializeGame = (gridSize: number = 16, p1Name: string = 'Spieler 1', p2Name: string = 'Spieler 2') => {
    stopTimer()

    const symbols = Array.from({ length: 18 }, (_, i) => `card-${i}.png`)
    const pairCount = gridSize / 2
    const selectedSymbols = symbols.slice(0, pairCount)

    const cardPairs: Card[] = []
    selectedSymbols.forEach((symbol, index) => {
      cardPairs.push(
        { id: index * 2, value: symbol, isFlipped: false, isMatched: false },
        { id: index * 2 + 1, value: symbol, isFlipped: false, isMatched: false }
      )
    })

    cards.value = cardPairs.sort(() => Math.random() - 0.5)
    flippedCards.value = []
    isProcessing.value = false
    
    player1.value = { name: p1Name, pairsFound: 0, totalTime: 0, isActive: true }
    player2.value = { name: p2Name, pairsFound: 0, totalTime: 0, isActive: false }
    
    gameStartTime.value = null
    playerStartTime.value = null
  }

  const flipCard = (card: Card) => {
    if (isProcessing.value || card.isFlipped || card.isMatched) return
    if (flippedCards.value.length >= 2) return

    // Start timer on first card flip
    if (!gameStartTime.value) {
      gameStartTime.value = new Date()
      playerStartTime.value = new Date()
      currentTime.value = new Date()
      startTimer()
    }

    card.isFlipped = true
    flippedCards.value.push(card)

    if (flippedCards.value.length === 2) {
      isProcessing.value = true
      checkForMatch()
    }
  }

  const checkForMatch = () => {
    const [card1, card2] = flippedCards.value

    if (card1.value === card2.value) {
      // Match found
      card1.isMatched = true
      card2.isMatched = true
      
      const activePlayer = player1.value.isActive ? player1 : player2
      activePlayer.value.pairsFound++
      
      flippedCards.value = []
      isProcessing.value = false

      // Bei Match darf der Spieler nochmal (2.3)
      // Kein Spielerwechsel!

      // Check for win
      if (totalPairsFound.value === totalPairs.value) {
        stopTimer()
      }
    } else {
      // No match - wait and flip back
      setTimeout(() => {
        card1.isFlipped = false
        card2.isFlipped = false
        flippedCards.value = []
        isProcessing.value = false
        
        // Kein Match: Spielerwechsel (2.2)
        switchPlayer()
      }, 1000)
    }
  }

  const resetGame = () => {
    const p1Name = player1.value.name
    const p2Name = player2.value.name
    initializeGame(cards.value.length, p1Name, p2Name)
  }

  const cleanup = () => {
    stopTimer()
  }

  return {
    cards,
    player1,
    player2,
    activePlayer,
    winner,
    totalPairs,
    totalPairsFound,
    isGameWon,
    initializeGame,
    flipCard,
    resetGame,
    cleanup
  }
}
