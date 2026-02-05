import { useStorageService } from './storageService'

export interface HistoryEntry {
  id: number
  playerName: string
  time: number
  date: Date
}

export function useHistoryService() {
  const { data: history, setData: setHistory } = useStorageService<HistoryEntry[]>('gameHistory', [])

  const addEntry = async (playerName: string, time: number) => {
    const newEntry: HistoryEntry = {
      id: Date.now(),
      playerName,
      time,
      date: new Date()
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
