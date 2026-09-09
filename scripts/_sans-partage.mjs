/**
 * Le site ne vend que du transfert privé — décision du 9 septembre 2026.
 *
 * Le WordPress, lui, proposait partout un « shared transfer » : 748 mentions sur
 * 142 modules de station et de trajet, avec ses propres prix par personne.
 * Annoncer un service qu'on n'opère pas est le plus coûteux des défauts : le
 * visiteur le demande, on le refuse, et la vente est perdue deux fois.
 *
 * ## Pourquoi une table et pas des expressions régulières
 *
 * Une première tentative réécrivait par motifs. Elle a été abandonnée : sur
 * Courchevel, retirer la phrase consacrée au partagé laissait la suivante —
 * « These typically have scheduled departure times and may include multiple
 * stops » — s'appliquer au privé, c'est-à-dire annoncer l'inverse du service
 * vendu. Un texte faux est pire qu'un texte à corriger.
 *
 * Ici, chaque entrée est une **chaîne exacte, lue et jugée**. Ce qui n'est pas
 * dans la table n'est pas touché : le script liste les restes, et ils se
 * traitent à la main. Il ne devine jamais.
 *
 * Un mot d'attention : « shared » n'annonce pas toujours une offre. Val d'Isère
 * décrit « 300 km of ski slopes shared with Tignes », La Clusaz « 125 km of
 * piste shared with Manigod » — des domaines skiables, pas des transferts.
 * C'est exactement ce qu'une règle automatique aurait détruit.
 */

/**
 * Remplacements exacts, vérifiés un par un.
 *
 * Appliqués du plus long au plus court, pour qu'un fragment court n'ampute pas
 * une phrase qu'une entrée plus complète traite entièrement.
 */
export const REMPLACEMENTS = new Map([
  // ---------------------------------------------------------------- titres
  ["Top Ski Resorts in France for Private & Shared Transfers", "Top Ski Resorts in France for Private Transfers"],
  ["Top Ski Resorts in Austria for Private & Shared Transfers", "Top Ski Resorts in Austria for Private Transfers"],
  ["Top Ski Resorts in Italy for Private & Shared Transfers", "Top Ski Resorts in Italy for Private Transfers"],
  ["Top Ski Resorts in Switzerland for Private & Shared Transfers", "Top Ski Resorts in Switzerland for Private Transfers"],

  // ------------------------------------------------- étapes de réservation
  ["Select your transfer type – Choose between a shared or private ski transfer.", "Select your vehicle – Standard, Business or Premium."],
  ["Select your transfer type – Private or shared options available.", "Select your vehicle – Standard, Business or Premium."],
  ["Choose your transfer type – Private or shared ski transfer options available.", "Choose your vehicle – Standard, Business or Premium."],
  ["Choose your transfer type – Private or shared transfer options available.", "Choose your vehicle – Standard, Business or Premium."],
  ["Choose your transfer type – Private or shared options available.", "Choose your vehicle – Standard, Business or Premium."],
  ["Choose your transfer type – Select between private or shared transfers.", "Choose your vehicle – Standard, Business or Premium."],
  ["Choose your transfer type – Opt for a private or shared transfer based on your preference.", "Choose your vehicle – Standard, Business or Premium, according to your group."],
  ["Choose your transfer type – Opt for a private or shared ski transfer.", "Choose your vehicle – Standard, Business or Premium."],
  ["Choose your transfer type – Private or shared ski transfer.", "Choose your vehicle – Standard, Business or Premium."],
  ["Choose your transfer type – Private or shared.", "Choose your vehicle – Standard, Business or Premium."],
  ["Select your transfer type – Private or shared.", "Select your vehicle – Standard, Business or Premium."],
  ["Pick your transfer type – Private or shared options available.", "Pick your vehicle – Standard, Business or Premium."],
  ["Pick your transfer type – Select from private or shared transfer options.", "Pick your vehicle – Standard, Business or Premium."],
  ["Pick your transfer type – Private or shared depending on your budget and group size.", "Pick your vehicle – according to your group size and your luggage."],
  ["Pick your transfer type – Private or shared transfer based on your budget and preferences.", "Pick your vehicle – Standard, Business or Premium, according to your group."],
  ["Choose your transfer option – private or shared.", "Choose your vehicle – Standard, Business or Premium."],
  ["Choose between a private or shared transfer based on your preference.", "Choose the vehicle category that fits your group."],
  ["Select your preferred transfer option – Private or shared.", "Select your vehicle – Standard, Business or Premium."],
  ["Choose private or shared transfer based on your preference.", "Choose the vehicle category that fits your group."],
  ["Simply enter your pick-up airport, select private or shared transfer, and confirm your booking.", "Simply enter your pick-up airport, choose your vehicle, and confirm your booking."],
  ["Choose Your Transfer – Select between private or shared transfer options.", "Choose Your Vehicle – Standard, Business or Premium."],
  ["Choose Your Option – Select between a shared or private transfer based on your preference and budget.", "Choose Your Vehicle – Standard, Business or Premium, according to your group."],
  ["Choose Your Transfer Type – Select between a private or shared transfer, depending on your needs and budget.", "Choose Your Vehicle – Standard, Business or Premium, according to your group."],
  ["Choose Your Transfer Type – Select between a shared or private transfer.", "Choose Your Vehicle – Standard, Business or Premium."],
  ["Select Your Transfer Type – Choose between a private or shared transfer based on your budget and preferences.", "Select Your Vehicle – Standard, Business or Premium, according to your group."],
  ["Select your transfer type – Choose between a private transfer or a shared shuttle.", "Select your vehicle – Standard, Business or Premium."],
  ["Select your transfer type – Choose between shared or private options.", "Select your vehicle – Standard, Business or Premium."],

  // ------------------------------------------------ formules d'accroche
  ["Private & shared options available!", "Private, door to door, fixed price!"],
  ["Private & shared options available.", "Private transfers, door to door."],
  ["Private & shared ski transfers available.", "Private ski transfers, door to door."],
  ["Private & shared transfers available.", "Private transfers, door to door."],
  ["Private and shared transfer options available.", "Private transfers, in three vehicle categories."],
  ["Shared & private options available.", "Private transfers, in three vehicle categories."],
  ["Private & shared options.", "Private, door to door."],
  ["Private & shared ski transfers.", "Private ski transfers."],
  ["Private & shared option, Book your ride now!", "Private, door to door. Book your ride now!"],
  ["Private & shared transfers with door-to-door service.", "Private transfers with door-to-door service."],
  ["Private & shared ski transfers with reliable service.", "Private ski transfers, reliable and direct."],
  ["Fast, reliable ski transfers with private & shared options.", "Fast, reliable private ski transfers."],
  ["Private & shared options, best prices, and reliable service.", "Fixed prices per vehicle, and reliable service."],
  ["Private & shared options, best prices, door-to-door service.", "Fixed prices per vehicle, door-to-door service."],
  ["Private & shared options, best prices, and door-to-door service.", "Fixed prices per vehicle, and door-to-door service."],
  ["Private & shared options, best prices, and hassle-free booking.", "Fixed prices per vehicle, and hassle-free booking."],
  ["Private & shared options, door-to-door service, best prices.", "Private door-to-door service, best prices."],
  ["Private & shared transfers from Zurich, Geneva & more.", "Private transfers from Zurich, Geneva & more."],
  ["Private & shared transfers from Geneva, Zurich & more.", "Private transfers from Geneva, Zurich & more."],
  ["Private & shared transfers from Innsbruck, Munich, Zurich & Salzburg.", "Private transfers from Innsbruck, Munich, Zurich & Salzburg."],
  ["Private & shared airport transfers from Geneva, Lyon, Grenoble & Chambéry", "Private airport transfers from Geneva, Lyon, Grenoble & Chambéry"],
  ["Private & shared ski transfers available for individuals, families, and groups.", "Private ski transfers for individuals, families and groups."],
  ["Competitive rates for both private and shared transfers.", "Competitive rates, quoted per vehicle."],
  ["Competitive Prices – Affordable rates for both private and shared transfers.", "Competitive Prices – One fixed rate per vehicle, tolls included."],
  ["Book your private or shared ride online today", "Book your private ride online today"],
  ["Book now for a private or shared transfer to the slopes.", "Book now for a private transfer to the slopes."],
  ["Private and shared options – Travel in comfort, no matter your budget.", "Three vehicle categories – Travel in comfort, whatever your group."],
  ["Private and shared transfers – Flexible options to match your budget and travel preferences.", "Three vehicle categories – Flexible options to match your group and your budget."],
  ["Flexible booking and competitive prices – Choose between shared or private transfers.", "Flexible booking and competitive prices – Three vehicle categories to choose from."],
  ["Flexible options – Choose between shared or private transfers.", "Flexible options – Three vehicle categories to choose from."],
  ["Flexible booking options – Private transfers for comfort, shared transfers for budget-friendly travel.", "Flexible booking options – Three vehicle categories, from the 8-seat Transporter to the Premium saloon."],

  // ------------------------------------------------------- facteurs de prix
  ["Type of Transfer: Shared transfers are generally more affordable, while private transfers offer exclusivity at a higher price.", "Vehicle category: the size of the vehicle sets the price, and your group and luggage set the size."],
  ["Prices vary based on airport, transfer type (private or shared), and number of passengers.", "Prices vary based on the airport, the vehicle category and the number of passengers."],
  ["The type of transfer (private, shared, or VIP).", "The vehicle category."],
  ["The type of transfer (private or shared)", "The vehicle category"],
  ["the type of transfer (private or shared)", "the vehicle category"],
  ["Type of Transfer: Private vs. shared.", "Vehicle category: Standard, Business or Premium."],
  ["whether the transfer is private or shared", "the vehicle category"],
  ["type of service (private or shared)", "vehicle category"],

  // -------------------------------------------- comparaisons de prestataires
  ["Evaluate Options: Consider the types of transfers available, such as private versus shared services.", "Evaluate options: compare the vehicle categories and what each one includes."],
  ["Evaluate Options: Look at the types of transfers offered, such as shared transfers or private ski options.", "Evaluate options: compare the vehicle categories and what each one includes."],
  ["Evaluate Options: Consider factors such as transfer types (private vs. shared), pricing, and additional services offered.", "Evaluate options: compare the vehicle categories, what each one includes, and the total price for your group."],
  ["Compare Options: Evaluate private versus shared transfers based on your needs and budget.", "Compare options: evaluate the vehicle categories against your group and your luggage."],
  ["Shared Transfers vs. Private Ski Options: Determine which suits your needs.", "Vehicle categories: determine which one suits your group and your luggage."],
  ["Compare prices between private and shared transfers.", "Compare the price of each vehicle category."],
  ["Compare transfer options for private and shared services.", "Compare vehicle categories and pick the one that fits your group."],

  // ---------------------------------------------------- tournures courantes
  ["Unlike shared transfers, private transfers offer personalized service, ensuring that you and your party travel alone in the vehicle.", "A private transfer means you and your party travel alone in the vehicle."],
  ["Unlike shared transfers, private transfers offer personalized schedules and routes, ensuring a more comfortable and efficient journey.", "A private transfer follows your own schedule and route, which makes the journey both more comfortable and quicker."],
  ["Unlike shared transfers, private transfers offer exclusive use of the vehicle, ensuring comfort and flexibility.", "A private transfer gives you exclusive use of the vehicle, with the comfort and flexibility that follow."],
  ["Unlike shared transfers, private transfers provide a personalized experience, ensuring comfort and convenience.", "A private transfer provides a personalised experience, with comfort and convenience."],
  ["Avoid the hassle of public transport and enjoy a private or shared transfer with our experienced drivers.", "Avoid the hassle of public transport and enjoy a private transfer with our experienced drivers."],
  ["Say goodbye to the inconvenience of public transport or rental cars, and enjoy a private or shared transfer designed to meet your travel needs.", "Say goodbye to the inconvenience of public transport and rental cars, and enjoy a private transfer designed to meet your travel needs."],
  ["Whether you prefer a private ski transfer or a shared option, our service guarantees a stress-free and efficient travel experience.", "Whichever vehicle category you choose, our service guarantees a stress-free and efficient journey."],
  ["When traveling to Sestriere, booking a private or shared ski transfer ensures efficiency, comfort, and affordability.", "Booking a private ski transfer to Sestriere ensures efficiency, comfort and a price known in advance."],
  ["our private and shared ski transfer options provide a stress-free journey", "our private ski transfers provide a stress-free journey"],
  ["shared shuttle delays", "crowded shuttles"],
  ["shared shuttles", "crowded shuttles"],
  ["a shared shuttle", "a crowded shuttle"],

  // ------------------------------------------------- fragments génériques
  /*
   * Morceaux dont le sens ne dépend pas de ce qui les entoure : ils reviennent
   * d'une page à l'autre avec seulement le nom du lieu qui change.
   */
  ["Private & Shared Ski Transfers to ", "Private Ski Transfers to "],
  ["Private & Shared ", "Private "],
  ["a choice between private or shared options", "a choice of three vehicle categories"],
  ["Private or shared, and when to book", "Which vehicle, and when to book"],
  ["Private or shared, depending on your budget and preference.", "Standard, Business or Premium, depending on your group."],
  ["private and shared ski transfers", "private ski transfers"],
  ["private and shared transfer options", "private transfers in three vehicle categories"],
  ["private and shared transfers", "private transfers"],
  ["shared and private ski transfers", "private ski transfers"],
  ["shared and private transfers", "private transfers"],
  ["private or shared ski transfers", "private ski transfers"],
  ["private or shared transfers", "private transfers"],
  ["Private or shared transfer.", "Standard, Business or Premium."],
  ["Private or shared transfer", "Vehicle category"],
  ["both private and shared", "private"],
  ["private & shared", "private"],

  /*
   * Cinquième lot : les accroches de meta description, déclinées en une
   * vingtaine de variantes autour de « Private & shared options, … ». La casse
   * y est irrégulière — « Private & shared » avec un P majuscule et un s
   * minuscule — d'où ces entrées en plus des formes déjà couvertes.
   */
  ["Private & shared options available", "Private transfers"],
  ["Private & shared ski transfers", "Private ski transfers"],
  ["Private & shared transfers", "Private transfers"],
  ["Private & shared options", "Private transfers"],
  ["Private & shared", "Private"],
  ["shared & private ski transfers", "private ski transfers"],
  ["shared & private transfers", "private transfers"],
  ["shared & private", "private"],

  // Ce que le partagé servait à dire, redit avec ce que le site vend.
  ["Choosing a private transfer category premium over a shared transfer means enjoying:", "Choosing the Premium category means enjoying:"],
  ["Comfortable Vehicles – Choose between luxury sedans, spacious minivans, and shared transfers.", "Comfortable Vehicles – Luxury saloons, spacious minivans and 8-seat Transporters."],
  ["Comfortable Vehicles: Choose from private transfers for a luxury experience or shared transfers for a budget-friendly option.", "Comfortable Vehicles: three categories, from the Premium saloon to the 8-seat Transporter."],
  ["Comfortable, high-quality vehicles with a shared schedule.", "Comfortable, high-quality vehicles, and a pick-up time that follows your flight."],
  ["For budget-conscious travelers, our shared ski transfers provide:", "For groups watching the budget, a price per vehicle rather than per seat provides:"],
  ["Options for budget-friendly shared transfers or exclusive private transfers", "Three vehicle categories, from budget-friendly to premium"],
  ["Our shared ski transfers allow you to save money while still enjoying a comfortable and efficient service.", "Travelling as a group is what brings the cost per person down: the price is per vehicle, so six people pay what two would."],
  ["Our shared transfers allow you to save money while still enjoying a smooth, reliable transfer to Obergurgl-Hochgurgl.", "Travelling as a group is what brings the cost per person down: the price is per vehicle, so six people pay what two would."],
  ["Private transfers are priced higher for exclusive service, while shared transfers offer a more affordable option.", "The price follows the vehicle category: a Premium saloon costs more than a Standard Transporter."],
  ["Shared transfers are typically more affordable, but may involve longer travel times due to multiple stops.", "The price is quoted per vehicle rather than per seat, so it does not change with the number of passengers."],
  ["Shared vs Private Transfers – Which Is Best for You?", "Which Vehicle Is Best for You?"],
  ["Shared transfers vs. private ski transfers", "the vehicle categories"],
  ["service types (shared transfers vs. private ski transfers)", "the vehicle categories on offer"],
  ["In shared transfers, the driver cannot wait beyond the scheduled departure time.", "Your driver waits for you in the arrivals hall, whatever time you actually land."],
  ["We offer private ski transfers and shared transfers to Obergurgl-Hochgurgl, ensuring that every traveler finds the perfect transport solution.", "We offer private ski transfers to Obergurgl-Hochgurgl in three vehicle categories, so that every group finds one that fits."],
  ["We offer private ski transfers and shared transfers, allowing you to choose the best service for your needs:", "We offer private ski transfers in three vehicle categories, so you can pick the one that fits your group:"],
  ["We provide private transfers for maximum comfort and shared ski transfers for a more budget-friendly option.", "We provide private transfers in three vehicle categories, from the Premium saloon to the 8-seat Transporter."],
  ["Our Cervinia ski transfers cater to all travelers, whether you're looking for a budget-friendly shared transfer or a luxury private option.", "Our Cervinia ski transfers cater to all travellers, from a compact saloon to an 8-seat Transporter."],
  ["With a fleet of luxury vehicles, spacious minivans, and cost-effective shared transfers, we cater to all travel needs.", "With a fleet of luxury saloons, spacious minivans and 8-seat Transporters, we cater to all travel needs."],
  ["With options ranging from luxury vehicles to budget-friendly shared transfers, we cater to solo travelers, families, and groups looking for a comfortable and convenient way to reach Cortina d'Ampezzo.", "With three vehicle categories, we cater to solo travellers, families and groups looking for a comfortable way to reach Cortina d'Ampezzo."],
  ["our private and shared transfer services ensure a hassle-free journey", "our private transfer service ensures a hassle-free journey"],
  ["Are there shared transfer options available to Selva Val Gardena?", "What vehicle options are available for Selva Val Gardena?"],
  ["Private or Shared Cortina Ski Transfers ?", "Which Vehicle for Cortina?"],
  ["Fast, affordable shared & private transfers.", "Fast, affordable private transfers."],
  ["Fast, reliable shared & private ski transfers.", "Fast, reliable private ski transfers."],

  /*
   * Sixième et dernier lot. Ne restent ici que des cas uniques : titres de
   * section comparatifs, phrases décrivant le partagé, et quatre meta
   * descriptions. Les usages **légitimes** du mot ne sont volontairement pas
   * traités — les domaines skiables reliés entre eux (La Clusaz avec Manigod,
   * Val d'Isère avec Tignes, la Voie Lactée, l'Évasion Mont-Blanc) et la clause
   * de confidentialité des conditions générales, où « shared » est le terme
   * juste et où le retirer changerait le sens.
   */
  ["Whether you’re looking for a direct private transfer or a budget-friendly shared transfer, we ensure a comfortable, hassle-free experience.", "Whichever vehicle category you choose, we ensure a comfortable, hassle-free journey."],
  ["Private vs. Shared Andermatt Ski Transfers", "Which Vehicle for Andermatt"],
  ["Private vs Shared Sestriere Ski Transfers – Which One to Choose?", "Which Vehicle for Sestriere?"],
  ["Private vs Shared Ski Transfers – What’s the Best Option?", "Which Vehicle Is the Best Option?"],
  ["Shared Transfers to Gstaad", "Transfers to Gstaad"],
  ["Shared Kitzbühel Ski Transfers", "Kitzbühel Ski Transfers"],
  ["Shared transfers are more budget-friendly but may include multiple stops.", "The price is per vehicle rather than per seat, so it does not change with the number of passengers."],
  ["Shared ski transfers available for budget-conscious travelers.", "A price per vehicle rather than per seat, which brings the cost down for a group."],
  ["Shared transfers vs. custom private transfers – Compare flexibility, cost, and time.", "Standard booking vs. custom private transfer – Compare flexibility, cost and time."],
  ["Private transfers offer direct, door-to-door service tailored to your schedule, while shared transfers are a cost-effective option where you share the vehicle with other passengers heading to the same destination.", "The vehicle is yours alone, with direct door-to-door service and a pick-up time that follows your flight rather than a timetable."],
  ["Private transfers offer a personalized, direct service tailored to your schedule, while shared transfers are a cost-effective option where you share the vehicle with other passengers heading in the same direction.", "The vehicle is yours alone, with a direct service and a pick-up time that follows your flight rather than a timetable."],
  ["Private transfers offer a direct, personalized service from the airport to your accommodation, ensuring comfort and convenience. Shared transfers are a cost-effective alternative, where you share the vehicle with other passengers heading to the same destination.", "Private transfers offer a direct, personalised service from the airport to your accommodation. The price is quoted per vehicle rather than per seat, so it does not change with the number of passengers."],
  // Meta descriptions : la casse et l'ordre varient d'une page à l'autre.
  ["Shared or private transfers, best prices, and hassle-free booking.", "Private transfers, best prices, and hassle-free booking."],
  ["Shared or private transfers, best prices, door-to-door service.", "Private transfers, best prices, door-to-door service."],
  ["Shared & private ski transfers available.", "Private ski transfers available."],
  ["Shared & private options, fast booking, great prices.", "Private transfers, fast booking, great prices."],
  /*
   * L'article de blog comparait les deux formules pour aider à choisir. La
   * comparaison n'a plus d'objet, mais le conseil qu'elle portait — vérifier ce
   * qu'un prix recouvre avant de comparer — reste le bon.
   */
  ["For two people, shared is usually cheaper. From four upwards, private frequently wins outright — and it always wins on time.", "A private transfer is priced per vehicle, not per seat: from four people up it frequently costs less than buying seats one by one, and it always wins on time."],

  /*
   * Quatrième lot : les accroches courtes des chapôs et des meta descriptions.
   * « private or shared » y désigne une alternative qui n'existe plus ; le
   * membre privé suffit et la phrase reste intacte.
   */
  ["Avoid the Hassle of Public Transport & Shared Transfers", "Avoid the Hassle of Public Transport & Crowded Shuttles"],
  ["a private or shared ride", "a private ride"],
  ["a shared or private ride", "a private ride"],
  ["private or shared ski transfer", "private ski transfer"],
  ["shared or private ski transfer", "private ski transfer"],
  ["private or shared options", "private transfer options"],
  ["shared or private options", "private transfer options"],
  ["private or shared transfer", "private transfer"],
  ["shared or private transfer", "private transfer"],
  ["private or shared", "private"],
  ["shared or private", "private"],
  /*
   * Formules rédigées à la main sur les pages de station et de trajet : elles
   * mettaient les deux formules en balance au moment de choisir. Ce qui reste à
   * choisir est la catégorie de véhicule, et c'est le coffre qui la décide.
   */
  ["A shared transfer costs less per person and suits couples and solo travellers with flexible timings, at the price of waiting for other passengers and stopping on the way.", "The category is set by your group and your luggage: in winter the boot fills up before the seats do, so tell us how many bags and ski carriers you have."],
  ["A shared transfer costs less per person, with a wait at the airport and stops at Saint-Martin or Val Thorens on the way.", "The category is set by your group and your luggage: in winter the boot fills up before the seats do, so tell us how many bags and ski carriers you have."],
  ["A shared transfer costs less per seat and suits flexible timings, with a wait at the airport and stops on the way up.", "The category is set by your group and your luggage: in winter the boot fills up before the seats do, so tell us how many bags and ski carriers you have."],
  ["A shared transfer is cheaper per person and fits flexible timings, with a wait and intermediate stops.", "The category is set by your group and your luggage: in winter the boot fills up before the seats do, so tell us how many bags and ski carriers you have."],
  ["A shared transfer is priced per seat and fills the vehicle with other passengers, which means waiting at the airport and stopping on the way.", "A private transfer is priced per vehicle, so the price does not change with the number of passengers — from four people up it usually costs less than buying seats."],
  ["A shared ski transfer is a great affordable option for solo travelers or small groups looking to save money while still enjoying a convenient, pre-booked transfer.", "Travelling as a group is what brings the cost per person down: the price is per vehicle, so six people pay what two would."],

  // ------------------------------------------ troisième lot (trajets, 9 sept.)
  ["Select Your Transfer Type – Choose between a shared or private transfer.", "Select Your Vehicle – Standard, Business or Premium."],
  ["Choose Your Transfer Type – Select between shared or private transfer options.", "Choose Your Vehicle – Standard, Business or Premium."],
  ["Choose Your Transfer Type – Select a private or shared transfer based on your budget and preferences.", "Choose Your Vehicle – Standard, Business or Premium, according to your group."],
  ["Choose your transfer type – Select a shared or private transfer based on your needs.", "Choose your vehicle – Standard, Business or Premium, according to your group."],
  ["Step 1: Select your transfer type (shared or private) and travel date.", "Step 1: Select your vehicle and travel date."],
  ["Competitive prices – Affordable shared transfers & luxury private transfers.", "Competitive prices – One fixed rate per vehicle, tolls included."],
  ["With private transfers, you avoid the inconvenience of public transport and shared transfers, ensuring a safe, direct, and personalized journey.", "With a private transfer, you avoid the inconvenience of public transport and crowded shuttles, for a safe, direct and personalised journey."],
  /*
   * Deux formules rédigées à la main, reprises de la page de station : elles
   * comparaient le privé au partagé au moment de choisir. Le choix qui reste
   * est celui de la catégorie de véhicule, et c'est le boot qui le décide.
   */
  ["A shared transfer is cheaper per person with flexible timings.", "The vehicle category is set by your group and your luggage — in winter the boot fills before the seats do."],
  ["A shared transfer costs less per person if your timings are flexible.", "The vehicle category is set by your group and your luggage — in winter the boot fills before the seats do."],
  ["A shared transfer costs less per seat if your timings are flexible.", "The vehicle category is set by your group and your luggage — in winter the boot fills before the seats do."],
  ["A shared transfer is cheaper per person if your timings are flexible.", "The vehicle category is set by your group and your luggage — in winter the boot fills before the seats do."],
  ["– Private or shared, fast & reliable.", "– Private, fast & reliable."],
  ["Yes, shared transfers are available and can be a cost-effective option.", "Every transfer is private: the vehicle is yours alone, and the price is per vehicle rather than per seat."],

  /*
   * Rattrapages. Réduire « private and shared transfers » à « private
   * transfers » laisse des « both » et des « choose between » sans second
   * terme. Ces entrées les recollent ; plus courtes, elles passent après.
   */
  ["can choose between private transfers", "can choose private transfers"],
  ["choose between private and shared transport", "choose private transport"],
  ["choose between private or shared transfer options", "choose the vehicle category"],
  ["choose between private ski transfers", "choose private ski transfers"],
  ["choose between private transfers", "choose private transfers"],
  ["Choose between private transfers", "Choose private transfers"],
  ["We offer both private ski transfers, allowing", "We offer private ski transfers, allowing"],
  ["We offer both private transfers", "We offer private transfers"],
  ["We provide both private transfers", "We provide private transfers"],
  ["offer both private ski transfers and", "offer private ski transfers and"],
  ["both private ski transfers", "private ski transfers"],
  ["both private transfers", "private transfers"],
]);

/**
 * Retire la subordonnée « Whether … or a shared …, » qui ouvre la plupart des
 * chapôs et des meta descriptions repris du WordPress.
 *
 * Le motif est régulier et sans piège : « Whether you prefer a private transfer
 * for comfort **or a shared transfer for a budget-friendly option**, we provide
 * a seamless journey. » La subordonnée pose une alternative qui n'existe plus ;
 * la principale, elle, reste vraie telle quelle. On la garde, on remet sa
 * majuscule, et le sens est intact.
 *
 * La règle ne s'applique qu'à une subordonnée **qui mentionne le partagé** et
 * qui ouvre sa phrase. Ailleurs, la table de remplacements fait le travail.
 */
export function sansSubordonneeAlternative(texte) {
  if (typeof texte !== "string" || !/shared/i.test(texte)) return texte;
  /*
   * `.*?` et non `[^,]*` avant « shared » : la subordonnée contient souvent
   * elle-même une virgule — « for a direct, luxurious ride or a shared
   * transfer… » — et une classe qui exclut la virgule s'y arrêtait, laissant la
   * phrase intacte. Après « shared », en revanche, on va jusqu'à la première
   * virgule : c'est elle qui ouvre la principale.
   */
  const OUVERTURE = /^(Whether\b.*?\bshared\b[^,]*,\s*)(.)/i;
  return texte
    .split(/(?<=[.!?])\s+/)
    .map((phrase) => phrase.replace(OUVERTURE, (_, __, premiere) => premiere.toUpperCase()))
    .join(" ");
}

/** Applique la table à un texte. Renvoie le texte inchangé s'il n'y a rien à faire. */
export function sansPartage(texte) {
  if (typeof texte !== "string" || !/shared/i.test(texte)) return texte;
  let sortie = sansSubordonneeAlternative(texte);
  const entrees = [...REMPLACEMENTS.entries()].sort((a, b) => b[0].length - a[0].length);
  for (const [avant, apres] of entrees) sortie = sortie.split(avant).join(apres);
  return sortie;
}

/**
 * Un item de liste entièrement consacré au transfert partagé.
 *
 * Le WordPress affichait, sur presque chaque page de trajet, une ligne de prix
 * par personne : « Shared Transfers: More budget-friendly, starting at €45 per
 * person, with fixed schedules. » Il n'y a rien à y réécrire — le service
 * n'existe pas, et le prix n'a jamais été validé. La ligne se retire.
 *
 * La détection porte sur le **début** de l'item, après une éventuelle puce
 * décorative. Un item qui mentionne le partagé au milieu d'une phrase utile
 * n'est pas concerné : il passe par la table de remplacements.
 */
export function estItemPartage(texte) {
  const sansPuce = texte.replace(/^[^\p{L}\p{N}]+/u, "");
  return /^shared\s+(?:ski\s+)?transfers?\s*(?:price\s+range)?\s*[:—–-]/i.test(sansPuce);
}

/**
 * Retire les segments à puce consacrés au partagé **à l'intérieur** d'une chaîne.
 *
 * Le WordPress empilait souvent plusieurs points dans un seul paragraphe, séparés
 * par des puces décoratives plutôt que par une vraie liste :
 *
 *     "✅ Private Transfers: Direct and flexible.✅ Shared Transfers: Budget-
 *      friendly, with pre-arranged departure times.✅ Child seats on request."
 *
 * `estItemPartage` ne voit rien ici — la chaîne ne *commence* pas par le
 * partagé. On découpe donc sur les puces et on ne retire que le segment
 * concerné, en laissant les autres intacts.
 */
export function sansSegmentsPartage(texte) {
  if (typeof texte !== "string" || !/shared/i.test(texte)) return texte;

  const PUCES = /(?=[✅✔⭐\u{1F4B0}\u{1F680}-\u{1F6FF}])/u;
  const morceaux = texte.split(PUCES);
  if (morceaux.length < 2) return texte;

  const gardes = morceaux.filter((m) => !estItemPartage(m));
  return gardes.length === morceaux.length ? texte : gardes.join("").trim();
}
