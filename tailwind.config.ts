import type { Config } from "tailwindcss";

/**
 * Palette reprise de la maquette de la home validée par le client : bleu nuit de
 * fond, vert des blocs de réassurance, magenta des appels à l'action.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Bleu nuit : fond du formulaire de recherche, des bandeaux et du pied de page.
        alpine: {
          DEFAULT: "#1B2444",
          900: "#141B34",
          800: "#232D54",
          700: "#33406F",
          600: "#5A6690",
        },
        glacier: {
          400: "#8E9AB8",
          300: "#B9C2D6",
          200: "#DCE2EC",
          100: "#EDF1F6",
          50: "#F6F8FB",
        },
        neige: "#FFFFFF",
        // Vert des pastilles de réassurance et de la bande « Booking process ».
        alpes: {
          DEFAULT: "#12A37A",
          700: "#0E7F5F",
          300: "#5FC7A9",
          50: "#E7F6F1",
        },
        // Magenta des boutons d'action — la seule couleur qui appelle au clic.
        marque: {
          DEFAULT: "#E6007E",
          600: "#C10069",
          300: "#FF5FB2",
        },
      },
      /*
       * Une seule famille — Outfit, celle du site actuel et du logo. Les deux
       * noms restent distincts pour que les composants disent ce qu'ils veulent
       * (`font-display` sur un titre) sans dépendre du choix de police.
       */
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      /*
       * Une echelle de titres, plutot que des tailles choisies page par page.
       * Chaque pas porte sa hauteur de ligne : un titre de station sur deux
       * lignes ne doit pas respirer comme un paragraphe.
       */
      fontSize: {
        "titre-page": ["clamp(2rem, 1.4rem + 2vw, 3rem)", { lineHeight: "1.1" }],
        "titre-section": ["clamp(1.5rem, 1.2rem + 1vw, 2rem)", { lineHeight: "1.2" }],
        "titre-carte": ["1.125rem", { lineHeight: "1.35" }],
        chapo: ["clamp(1.0625rem, 1rem + 0.3vw, 1.25rem)", { lineHeight: "1.6" }],
      },
      maxWidth: { prose: "68ch" },
      /* Le rythme vertical des sections, au lieu de py-12 / py-14 au hasard. */
      spacing: {
        section: "3.5rem",
        "section-lg": "5rem",
      },
      boxShadow: {
        carte: "0 18px 45px -22px rgba(12, 34, 51, 0.35)",
        flottant: "0 30px 70px -30px rgba(12, 34, 51, 0.55)",
        /* Elevation discrete de l'en-tete quand la page defile. */
        entete: "0 1px 0 rgba(12, 34, 51, 0.06), 0 8px 24px -20px rgba(12, 34, 51, 0.4)",
      },
    },
  },
  plugins: [],
};

export default config;
