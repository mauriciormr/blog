/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
module.exports = {
  theme: {
    extend: {
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
        ternary: theme('colors.ternary'),
        input: 'var(--bg-input)',
        inputSelected: 'var(--bg-input--selected)'
      }),
      textColor: {
        primary: 'var(--text-primary)',
        secondary: 'var(--text-secondary)',
        input: 'var(--text-input)'
      },
      fill: theme => ({
        base: theme('colors.base'),
        primary: theme('colors.primary'),
        ternary: theme('colors.ternary')
      }),
      stroke: theme => ({
        primary: theme('colors.primary')
      }),
      // https://tailwindcss.com/docs/breakpoints
      // https://tailwindcss.com/docs/container
      screens: {
        tablet: '768px',
        laptop: '1024px',
        desktop: '1280px'
      },
      spacing: {
        14: '3.5rem'
      },
      fontFamily: {
        raleway: 'Raleway, sans-serif',
        poppins: 'Poppins, sans-serif'
      },
      fontSize: {
        baseSize: '1rem',
        '7xl': '5rem',
        '8xl': '6rem',
        '9xl': '7rem',
        '10xl': '8rem'
      },
      flex: {
        1: '1 1 0%',
        2: '2 1 0%',
        3: '3 1 0%',
        4: '4 1 0%',
        5: '5 1 0%',
        6: '6 1 0%',
        7: '7 1 0%',
        8: '8 1 0%',
        9: '9 1 0%',
        10: '10 1 0%',
        11: '11 1 0%',
        12: '12 1 0%'
      },
      borderColor: {
        input: 'var(--border-input)',
        inputFocus: 'var(--border-input--focus)',
        divContainer: 'var(--border-div-container)'
      }
    }
  },
  variants: {},
  plugins: []
}
