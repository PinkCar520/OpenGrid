import { useDark, useToggle } from '@vueuse/core'

export const isDark = useDark({
  selector: 'body',
  attribute: 'class',
  valueDark: 'dark',
  valueLight: 'light',

})
export const toggleDark = useToggle(isDark)