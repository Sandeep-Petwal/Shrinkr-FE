/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
          colors: {
            dark: '#1F2937',
            primary: {
              DEFAULT: '#3B82F6', // Default blue color, adjust as needed
              dark: '#2563EB',    // Darker shade of primary
            },
            secondary: {
              DEFAULT: '#10B981', // Default green color, adjust as needed
              dark: '#059669',    // Darker shade of secondary
            }
          }
        }
      },
    plugins: [],
  }