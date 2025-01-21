/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  	extend: {backgroundImage: {
      'PS5': "url('/public/Ps5.png')",
      'WomenCollection' : "url('/public/Women collection.png')" ,
      'Speaker': "url('/public/Speaker.png')",
      'Perfume': "url('/public/Perfume.png')",
    },
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}