export type Mode = 'system' | 'light' | 'dark'

export const mode = {
  // used for mode event listners
  darkListener({ matches }: { matches: boolean }) {
    document.documentElement.classList.toggle('dark', matches)
  },

  darkMedia: window.matchMedia('(prefers-color-scheme: dark)'),

  get isDark() {
    return this.value === 'system'
      ? this.darkMedia.matches
      : this.value === 'dark'
  },

  get isPreferredDark() {
    return this.darkMedia.matches
  },

  modes: ['system', 'light', 'dark'] as Mode[],

  set(_mode: Mode) {
    if (_mode === 'system') {
      localStorage.removeItem('mode')
      this.darkListener({ matches: this.darkMedia.matches })
      this.darkMedia.addEventListener('change', this.darkListener)
    } else {
      localStorage.mode = _mode
      this.darkListener({ matches: _mode === 'dark' })
      this.darkMedia.removeEventListener('change', this.darkListener)
    }
  },

  toggleColorMode() {
    const currentMode = mode.value
    if (currentMode === 'system' || currentMode === 'dark') mode.set('light')
    else mode.set('dark')
  },
  toggleSystemMode() {
    const modes = mode.modes
    const newMode = modes[(modes.indexOf(mode.value) + 1) % modes.length]
    mode.set(newMode)
  },
  get value() {
    return (localStorage.getItem('mode') || 'system') as Mode
  },
}

// initial mode load
mode.set(mode.value)
