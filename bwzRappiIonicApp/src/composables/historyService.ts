import { useStorageService } from './storageService'

export interface HistoryEntry {
  id: number
  playerName: string
  time: number
  date: Date
  cardCount: number
}

export function useHistoryService() {
  const { data: history, setData: setHistory } = useStorageService<HistoryEntry[]>('gameHistory', [])

  const addEntry = async (playerName: string, time: number, cardCount: number) => {
    const newEntry: HistoryEntry = {
      id: Date.now(),
      playerName,
      time,
      date: new Date(),
      cardCount
    }

    const updatedHistory = [...history.value, newEntry]
    // Sort by time (fastest first)
    updatedHistory.sort((a, b) => a.time - b.time)

    await setHistory(updatedHistory)
  }

  const clearHistory = async () => {
    await setHistory([])
  }

  return {
    history,
    addEntry,
    clearHistory
  }
}
