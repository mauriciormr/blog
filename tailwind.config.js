/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
module.exports = {
  theme: {
    colors: {
      base: 'var(--bg-background-base)',
      primary: 'var(--bg-background-primary)',
      primarySelected: 'var(--bg-background-primary--selected)',
      secondary: 'var(--bg-background-secondary)',
      ternary: 'var(--bg-background-ternary)'
    },
    backgroundColor: theme => ({
      base: theme('colors.base'),
      primary: theme('colors.primary'),
      primarySelected: theme('colors.primarySelected'),
      secondary: theme('colors.secondary'),
      ternary: theme('colors.ternary')
    }),
    textColor: {
      primary: 'var(--text-primary)',
      secondary: 'var(--text-secondary)'
    },
    fill: theme => ({
      base: theme('colors.base'),
      primary: theme('colors.primary'),
      ternary: theme('colors.ternary')
    }),
    // https://tailwindcss.com/docs/breakpoints
    // https://tailwindcss.com/docs/container
    screens: {
      tablet: '768px',
      laptop: '1024px',
      desktop: '1280px'
    }
  },
  variants: {},
  plugins: []
}
