/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
module.exports = {
  theme: {
    backgroundColor: theme => ({
      base: 'var(--bg-background-base)',
      primary: 'var(--bg-background-primary)',
      primarySelected: 'var(--bg-background-primary--selected)',
      secondary: 'var(--bg-background-secondary)',
      ternary: 'var(--bg-background-ternary)'
    }),
    textColor: {
      primary: 'var(--text-primary)',
      secondary: 'var(--text-secondary)'
    }
  },
  variants: {},
  plugins: []
}
