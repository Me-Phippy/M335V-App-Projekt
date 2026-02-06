import { computed } from 'vue'
import { useStorageService } from './storageService'

export interface GameSettings {
  cardCount: 16 | 24 | 36
  playerName: string
  showTimer: boolean
}

const defaultSettings: GameSettings = {
  cardCount: 16,
  playerName: '',
  showTimer: true
}

const { data: settings, setData: setSettings } = useStorageService<GameSettings>('gameSettings', defaultSettings)

export function useSettingsService() {
  const cardCount = computed(() => settings.value.cardCount)
  const playerName = computed(() => settings.value.playerName)
  const showTimer = computed(() => settings.value.showTimer)

  const setCardCount = async (count: 16 | 24 | 36) => {
    await setSettings({ ...settings.value, cardCount: count })
  }

  const setPlayerName = async (name: string) => {
    await setSettings({ ...settings.value, playerName: name })
  }

  const setShowTimer = async (show: boolean) => {
    await setSettings({ ...settings.value, showTimer: show })
  }

  return {
    settings,
    cardCount,
    playerName,
    showTimer,
    setCardCount,
    setPlayerName,
    setShowTimer
  }
}
