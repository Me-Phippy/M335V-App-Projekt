import { readonly, ref } from 'vue'
import { Storage } from '@ionic/storage'

const localStoreAsync = new Storage().create()

export function useStorageService<T>(name: string, defaultValue: T) {
  const data = ref<T>(defaultValue)

  const loadData = async () => {
    const localStore = await localStoreAsync
    const dataRaw = await localStore.get(name)
    data.value = dataRaw ? JSON.parse(dataRaw) : defaultValue
  }

  const setData = async (toSet: T) => {
    data.value = toSet
    const localStore = await localStoreAsync
    await localStore.set(name, JSON.stringify(toSet))
  }

  loadData()
  
  return {
    data: readonly(data),
    setData,
  }
}
