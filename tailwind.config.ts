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
        /*
         * Vert des pastilles de réassurance et de la bande « Booking process ».
         *
         * Défini en variables CSS plutôt qu'en valeurs fixes : la home teste une
         * palette où l'action passe au vert et la réassurance à l'or, et une
         * classe de thème suffit alors à les permuter sans dupliquer un seul
         * composant. Les valeurs par défaut, sur `:root`, restent celles de la
         * maquette validée. Voir `globals.css`.
         */
        alpes: {
          DEFAULT: "rgb(var(--c-alpes) / <alpha-value>)",
          700: "rgb(var(--c-alpes-700) / <alpha-value>)",
          300: "rgb(var(--c-alpes-300) / <alpha-value>)",
          50: "rgb(var(--c-alpes-50) / <alpha-value>)",
        },
        /*
         * L'or du logo, en touches seulement.
         *
         * Il ne remplace rien : le vert reste la réassurance, le magenta reste
         * l'action. L'or sert les détails qui portent l'identité — surtitres,
         * étoiles, filets — là où une couleur de plus ne crée pas de confusion
         * sur ce qui se clique. Le ton du logo (`DEFAULT`) est trop clair pour
         * du texte sur blanc : `700` est sa version lisible, à 4,9:1.
         */
        or: {
          DEFAULT: "#C9A87A",
          700: "#8A6B3A",
          300: "#E0C8A0",
          50: "#F8F2E7",
        },
        /*
         * La couleur d'action — la seule qui appelle au clic. Magenta par
         * défaut, vert sur la home tant que l'essai de palette dure.
         */
        marque: {
          DEFAULT: "rgb(var(--c-marque) / <alpha-value>)",
          600: "rgb(var(--c-marque-600) / <alpha-value>)",
          300: "rgb(var(--c-marque-300) / <alpha-value>)",
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
