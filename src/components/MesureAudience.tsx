"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Lang } from "@/lib/i18n";
import { indexationOuverte } from "@/lib/indexation";

/**
 * Mesure d'audience (Google Analytics 4) et bandeau de consentement.
 *
 * **Rien n'est chargé avant « Accepter ».** Le mode consentement de Google sait
 * charger gtag.js en « refusé » et envoyer des signaux sans cookie ; la CNIL ne
 * tient pas ces signaux pour exemptés, et un site de réservation n'a pas besoin
 * de ce gain marginal. Tant que le visiteur n'a pas accepté, aucune requête ne
 * part vers Google.
 *
 * **Actif seulement sur le domaine définitif** : il faut l'identifiant
 * (`NEXT_PUBLIC_GA_ID`) *et* l'indexation ouverte. La préproduction ne pollue
 * donc pas la propriété — qui garde l'historique du WordPress — et le bandeau
 * n'apparaît qu'à la bascule, en même temps que le site s'ouvre aux moteurs.
 *
 * Le choix est gardé six mois, durée recommandée par la CNIL, puis redemandé.
 * Refuser doit être aussi simple qu'accepter : même taille, même poids, même
 * écran. Le lien « Cookies » du pied de page rouvre le bandeau (`BoutonCookies`).
 */

const ID_MESURE = process.env.NEXT_PUBLIC_GA_ID ?? "";
export const MESURE_ACTIVE =
  /^G-[A-Z0-9]+$/.test(ID_MESURE) && indexationOuverte();

const CLE = "ast-consentement";
const DUREE_MS = 182 * 24 * 60 * 60 * 1000;
export const OUVRIR_BANDEAU = "ast:ouvrir-bandeau-cookies";

type Choix = "accepte" | "refuse";

const TEXTES: Record<
  Lang,
  { titre: string; texte: string; politique: string; accepter: string; refuser: string; chemin: string }
> = {
  en: {
    titre: "Cookies and audience measurement",
    texte:
      "With your consent, we use Google Analytics to count visits and see which pages help travellers — nothing is used for advertising. Refusing changes nothing to your booking.",
    politique: "Cookie policy",
    accepter: "Accept",
    refuser: "Refuse",
    chemin: "/cookie-policy-uk/",
  },
  fr: {
    titre: "Cookies et mesure d’audience",
    texte:
      "Avec votre accord, nous utilisons Google Analytics pour compter les visites et savoir quelles pages aident les voyageurs — rien n’est utilisé à des fins publicitaires. Refuser ne change rien à votre réservation.",
    politique: "Politique de cookies",
    accepter: "Accepter",
    refuser: "Refuser",
    chemin: "/fr/politique-cookies/",
  },
  de: {
    titre: "Cookies und Reichweitenmessung",
    texte:
      "Mit Ihrer Einwilligung nutzen wir Google Analytics, um Besuche zu zählen und zu sehen, welche Seiten Reisenden helfen — nichts davon dient der Werbung. Eine Ablehnung ändert nichts an Ihrer Buchung.",
    politique: "Cookie-Richtlinie",
    accepter: "Akzeptieren",
    refuser: "Ablehnen",
    chemin: "/de/cookie-richtlinie/",
  },
  it: {
    titre: "Cookie e misurazione del pubblico",
    texte:
      "Con il tuo consenso usiamo Google Analytics per contare le visite e capire quali pagine aiutano i viaggiatori — nulla viene usato a fini pubblicitari. Rifiutare non cambia nulla alla tua prenotazione.",
    politique: "Informativa sui cookie",
    accepter: "Accetta",
    refuser: "Rifiuta",
    chemin: "/it/informativa-cookie/",
  },
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function lireChoix(): Choix | null {
  try {
    const brut = localStorage.getItem(CLE);
    if (!brut) return null;
    const { choix, date } = JSON.parse(brut) as { choix: Choix; date: number };
    if (Date.now() - date > DUREE_MS) return null;
    return choix === "accepte" || choix === "refuse" ? choix : null;
  } catch {
    return null;
  }
}

function ecrireChoix(choix: Choix) {
  try {
    localStorage.setItem(CLE, JSON.stringify({ choix, date: Date.now() }));
  } catch {
    /* Navigation privée : le bandeau reviendra à la prochaine visite. */
  }
}

function chargerAnalytics() {
  if (document.getElementById("ga4")) return;
  (window as unknown as Record<string, unknown>)[`ga-disable-${ID_MESURE}`] = false;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // gtag.js attend l'objet `arguments`, pas un tableau.
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", ID_MESURE);
  const script = document.createElement("script");
  script.id = "ga4";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${ID_MESURE}`;
  document.head.appendChild(script);
}

/** Retrait du consentement : on coupe l'envoi et on efface les cookies `_ga`. */
function couperAnalytics() {
  (window as unknown as Record<string, unknown>)[`ga-disable-${ID_MESURE}`] = true;
  const domaines = ["", location.hostname, `.${location.hostname.replace(/^www\./, "")}`];
  for (const nom of document.cookie.split(";").map((c) => c.split("=")[0].trim())) {
    if (!nom.startsWith("_ga")) continue;
    for (const domaine of domaines) {
      document.cookie = `${nom}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domaine ? `; domain=${domaine}` : ""}`;
    }
  }
}

export default function MesureAudience({ lang }: { lang: Lang }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!MESURE_ACTIVE) return;
    const choix = lireChoix();
    if (choix === "accepte") chargerAnalytics();
    else if (choix === null) setVisible(true);
    const ouvrir = () => setVisible(true);
    window.addEventListener(OUVRIR_BANDEAU, ouvrir);
    return () => window.removeEventListener(OUVRIR_BANDEAU, ouvrir);
  }, []);

  if (!MESURE_ACTIVE || !visible) return null;
  const t = TEXTES[lang];

  const choisir = (choix: Choix) => {
    ecrireChoix(choix);
    if (choix === "accepte") chargerAnalytics();
    else couperAnalytics();
    setVisible(false);
  };

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label={t.titre}
      className="fixed inset-x-0 bottom-0 z-50 border-t border-alpine-900/10 bg-white px-4 py-4 shadow-[0_-8px_24px_rgba(0,0,0,0.08)]"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="text-sm text-alpine-900">
          <p className="font-semibold">{t.titre}</p>
          <p className="mt-1 max-w-3xl">
            {t.texte}{" "}
            <Link href={t.chemin} className="underline">
              {t.politique}
            </Link>
          </p>
        </div>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => choisir("refuse")}
            className="min-w-28 rounded border border-alpine-900 px-5 py-2.5 text-sm font-semibold text-alpine-900 hover:bg-alpine-900/5"
          >
            {t.refuser}
          </button>
          <button
            type="button"
            onClick={() => choisir("accepte")}
            className="min-w-28 rounded border border-alpine-900 bg-alpine-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-alpine-800"
          >
            {t.accepter}
          </button>
        </div>
      </div>
    </div>
  );
}
