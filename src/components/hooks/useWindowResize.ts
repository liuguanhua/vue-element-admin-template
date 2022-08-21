import { reactive, onMounted, onUnmounted } from 'vue'
import { debounce } from 'throttle-debounce'

export default function useWindowResize(delay: number = 500) {
  const state = reactive({
    width: 0,
    height: 0,
  })

  const listener = debounce(delay, () => {
    state.width = window.innerWidth
    state.height = window.innerHeight
  })

  onMounted(() => {
    listener()
    window.addEventListener('resize', listener)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', listener)
  })
  return state
}
