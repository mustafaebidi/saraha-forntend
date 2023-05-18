/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./public/**/*.jpg",
    "./src/**/*.{js,jsx,ts,tsx,png,jpg}",
  ],
  theme: {
    screens: {
      'xl': {'max': '1199px'},
      // => @media (max-width: 1279px) { ... }

      'lg': {'max': '991px'},
      // => @media (max-width: 1023px) { ... }

      'md': {'max': '767px'},
      // => @media (max-width: 767px) { ... }

      'sm': {'max': '575px'},
      // => @media (max-width: 639px) { ... }
    },
    container:{
      screens: {
        mobile: "576px",
        tablet: "768px",
        desktop: "992px",
        monter: "1200px",
      },
      center: true, 
      padding: "2rem",
    },
    
    extend: {

      keyframes: {
        bounceIn:{

          '0%':{transform:'scale(.7)'},
          '45%':{transform:'scale(1.05)'},
          '80%':{transform:'scale(.95)'},
          '100%':{transform:'scale(1)'}

        }
      },

      animation: {
        bounceIn: 'bounceIn 0.35s ease',
      }




    },
  },
  plugins: [],
}