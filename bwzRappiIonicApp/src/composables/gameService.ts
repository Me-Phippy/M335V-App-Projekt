import { ref, computed } from 'vue'

export interface Card {
  id: number
  value: string
  isFlipped: boolean
  isMatched: boolean
}

export function useGameService() {
  const cards = ref<Card[]>([])
  const flippedCards = ref<Card[]>([])
  const matchedPairs = ref(0)
  const startTime = ref<Date | null>(null)
  const endTime = ref<Date | null>(null)
  const isGameStarted = ref(false)
  const isProcessing = ref(false)

  const elapsedTime = computed(() => {
    if (!startTime.value) return 0
    const end = endTime.value || new Date()
    return Math.floor((end.getTime() - startTime.value.getTime()) / 1000)
  })

  const totalPairs = computed(() => cards.value.length / 2)

  const isGameWon = computed(() => matchedPairs.value === totalPairs.value && totalPairs.value > 0)

  const initializeGame = (gridSize: number = 16) => {
    // Use image paths from images folder (card-0.png to card-17.png)
    const symbols = Array.from({ length: 18 }, (_, i) => `card-${i}.png`)
    const pairCount = gridSize / 2
    const selectedSymbols = symbols.slice(0, pairCount)
    
    // Create pairs
    const cardPairs: Card[] = []
    selectedSymbols.forEach((symbol, index) => {
      cardPairs.push(
        { id: index * 2, value: symbol, isFlipped: false, isMatched: false },
        { id: index * 2 + 1, value: symbol, isFlipped: false, isMatched: false }
      )
    })

    // Shuffle cards
    cards.value = cardPairs.sort(() => Math.random() - 0.5)
    flippedCards.value = []
    matchedPairs.value = 0
    startTime.value = null
    endTime.value = null
    isGameStarted.value = false
    isProcessing.value = false
  }

  const flipCard = async (card: Card) => {
    // Don't flip if already processing, already flipped, or already matched
    if (isProcessing.value || card.isFlipped || card.isMatched) return
    if (flippedCards.value.length >= 2) return

    // Start timer on first card flip
    if (!isGameStarted.value) {
      startTime.value = new Date()
      isGameStarted.value = true
    }

    // Flip the card
    card.isFlipped = true
    flippedCards.value.push(card)

    // Check for match when 2 cards are flipped
    if (flippedCards.value.length === 2) {
      isProcessing.value = true
      await checkForMatch()
    }
  }

  const checkForMatch = async () => {
    const [card1, card2] = flippedCards.value

    if (card1.value === card2.value) {
      // Match found
      card1.isMatched = true
      card2.isMatched = true
      matchedPairs.value++
      flippedCards.value = []
      isProcessing.value = false

      // Check for win
      if (matchedPairs.value === totalPairs.value) {
        endTime.value = new Date()
      }
    } else {
      // No match - wait and flip back
      await new Promise(resolve => setTimeout(resolve, 1000))
      card1.isFlipped = false
      card2.isFlipped = false
      flippedCards.value = []
      isProcessing.value = false
    }
  }

  const resetGame = () => {
    initializeGame(cards.value.length)
  }

  return {
    cards,
    matchedPairs,
    elapsedTime,
    isGameWon,
    totalPairs,
    initializeGame,
    flipCard,
    resetGame
  }
}
