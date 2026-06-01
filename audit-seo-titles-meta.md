# Audit SEO — Titles & Meta Descriptions triplezero.fr

> Date de l'audit : 10 mai 2026
> Périmètre : 14 pages (accueil + 10 catégories + 3 pages éditoriales). Les ~30 pages produits ne sont pas incluses.
> Source : extraction `curl` des balises `<title>` / `<meta name="description">` + parsing du contenu visible de chaque page pour fonder les propositions sur des faits vérifiés.

---

## Faits vérifiés utilisés dans les propositions

Sources extraites du site lui-même :

- **Société** : SARL TRIPLE ZERO, RCS Castres, siège : 1 Chemin de la Fontaine, 81540 **Durfort** (Tarn). Magasin physique à Durfort + vente par correspondance et en ligne.
- **Tagline footer officielle** : « Fabrication artisanale française d'équipement en duvet d'oie — Léger et chaud ».
- **Matière** : pur duvet d'oie qualité « 000 », minimum **800 CUIN**, sans traitement chimique / sans additif.
- **Origine du duvet** : producteurs français en **Périgord**, partenariat contractuel avec cahier des charges qualité.
- **Outil emblématique** : trieuse en bois et métal de **1932**, encore en service.
- **Plage thermique sacs de couchage** : **+10 °C à -40 °C** (annoncée sur la page catégorie).
- **Couettes** : grammages **120 g/m²** (légère), **225 g/m²** (Pyrénéenne), **300 g/m²** (Nordique). Enveloppe **percale coton bio 103 fils/cm²**, piquage carreaux cloisonnés 40×40 cm.
- **Édredons** : piquage main sur machine « Sauterelle », enveloppe satin coton.
- **Doudounes** : architecture cloisonnée 30 à 42 compartiments, modèles allant du bivouac (Antza) à l'expédition (Ukerdi).
- **Combinaisons** : Combi Maïté pour 7 000–8 000 m, testée en descente snow sur l'Everest.
- **Moufles & chaussons** : pur duvet d'oie 800 cuin, isolation jusqu'à -30 °C.
- **Oreillers** : deux gammes — **Morphée** (pur duvet) et **Super-Doux** (demi-duvet plumettes + duvet).
- **Quilt** : créé dans les années 2000 en collaboration avec le forum Randonner Léger, dérivé du modèle ANSABERE.

Faits **non vérifiables** sur le site et donc **exclus** des propositions :

- Année de fondation de l'entreprise.
- Garantie à vie.
- Livraison offerte à partir d'un montant.
- Politique de retour à 30 jours (les CGV n'évoquent qu'un délai de réclamation d'une semaine pour non-conformité).
- Ancrage « Pyrénées » : le siège est dans le **Tarn (Durfort)**, pas dans les Pyrénées au sens strict. Les producteurs de duvet sont en Périgord.

---

## Diagnostic global — 6 problèmes systémiques

| #   | Problème                                                                                                                                                    | Impact                                                   |
| --- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| 1   | **Title homepage dupliqué** : la phrase complète apparaît 2 fois (>200 caractères)                                                                          | Title illisible dans la SERP, signal de mauvaise qualité |
| 2   | **Template `Marque longue – Page`** : la tagline marque (90 car.) précède le nom de page → la spécificité de chaque page est tronquée par Google (~60 car.) | Toutes les pages se ressemblent dans la SERP, CTR ↓      |
| 3   | **Descriptions catégories trop longues** (250–400 caractères)                                                                                               | Google tronque à ~155, perte du CTA                      |
| 4   | **Pages éditoriales (savoir-faire, CGV, mentions) utilisent la meta description générique de l'accueil**                                                    | Pas d'unicité, gaspille un signal de pertinence          |
| 5   | **Aucun déclencheur de clic factuel** : pas de chiffres concrets (°C, CUIN, g/m², lieu de fabrication)                                                      | CTR sous-exploité face à Valandré/Millet                 |
| 6   | **Marque en tête au lieu de queue** : `Marque – Page` cache le mot-clé. Best practice : `Mot-clé principal \| Marque`                                       | Le mot-clé acheteur n'est pas en position 1              |

---

## Tableau Avant / Après

> 📏 = nombre de caractères. Cible : Title 50–60, Meta 150–160.
> Toutes les propositions s'appuient uniquement sur les faits listés ci-dessus.

### 🏠 Accueil — `/fr`

|           | Actuel                                                                                                                                                                                                                                                    | Proposé                                                                                                                                                                   |
| --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Title** | `TRIPLE ZERO – Équipements et vêtements haut de gamme en duvet d'oie fabriqués artisanalement en France - TRIPLE ZERO – …` (📏 ~230, dupliqué)                                                                                                            | `Équipement en duvet d'oie, fabrication artisanale française \| TRIPLE ZERO` (📏 73)                                                                                      |
| **Meta**  | `TRIPLE ZERO – Équipements et vêtements haut de gamme en duvet d'oie fabriqués artisanalement en France. Découvrez nos doudounes techniques, sacs de couchage, couettes, oreillers et accessoires outdoor pour confort, chaleur et performance.` (📏 240) | `Sacs de couchage, doudounes, couettes et oreillers en pur duvet d'oie 000, 800 cuin minimum. Fabrication artisanale française à Durfort, Tarn. Léger et chaud.` (📏 159) |

**Justification.** Suppression du doublon (bug critique). Mots-clés acheteur en tête (« duvet d'oie »). Reprise littérale de la tagline officielle « Léger et chaud ». Chiffres techniques vérifiés (000, 800 cuin) + ancrage géographique réel (Durfort, Tarn).

---

### 🛏️ Sacs de couchage — `/fr/c/sacs-de-couchage`

|           | Actuel                                                                                                                                                                      | Proposé                                                                                                                                                                           |
| --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Title** | `TRIPLE ZERO … - Sacs de couchage` (📏 ~140)                                                                                                                                | `Sacs de couchage duvet d'oie, +10 °C à -40 °C \| TRIPLE ZERO` (📏 60)                                                                                                            |
| **Meta**  | `Gamme polyvalente de sacs de couchage légers et chauds, de +10°C à -40°C […] Tous les sacs de couchage sont livrés avec sac de compression et sac de rangement.` (📏 ~410) | `Sacs de couchage en pur duvet d'oie 000, de +10 °C à -40 °C. Vélo, trek, alpinisme, expéditions polaires. Fabrication artisanale française, sac de compression inclus.` (📏 165) |

**Justification.** Plage thermique vérifiée (annoncée sur la page) en Title et Meta. Cas d'usage repris du texte existant.

---

### 🛌 Couettes — `/fr/c/couettes`

|           | Actuel                                                                                                   | Proposé                                                                                                                                                                        |
| --------- | -------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Title** | `TRIPLE ZERO … - Couettes` (📏 ~130)                                                                     | `Couette en duvet d'oie, percale coton bio \| TRIPLE ZERO` (📏 56)                                                                                                             |
| **Meta**  | `Couettes légères et chaudes en duvet d'oie pour toutes les saisons fabriquées en France. […]` (📏 ~310) | `Couettes en pur duvet d'oie 000, 3 grammages (120, 225, 300 g/m²). Enveloppe percale coton bio 103 fils/cm², carreaux cloisonnés. Fabrication artisanale française.` (📏 162) |

**Justification.** Tous les chiffres (3 modèles, grammages, 103 fils/cm², percale coton bio) sont issus du contenu de la page.

---

### 🪶 Édredons — `/fr/c/edredons`

|           | Actuel                                                                                                                       | Proposé                                                                                                                                                                         |
| --------- | ---------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Title** | `TRIPLE ZERO … - Édredons` (📏 ~130)                                                                                         | `Édredon en duvet d'oie, piqué main satin coton \| TRIPLE ZERO` (📏 60)                                                                                                         |
| **Meta**  | `Édredons gonflant en duvet d'oie naturel, confection française traditionnelle. […] agit comme une bouillotte […]` (📏 ~290) | `Édredons en pur duvet d'oie 000, piqués main sur machine Sauterelle, enveloppe satin coton. Effet bouillotte, gonflant et chaleur. Fabrication artisanale française.` (📏 163) |

**Justification.** « Effet bouillotte », « machine Sauterelle » et « satin coton » sont repris textuellement du contenu de la page.

---

### 🧥 Doudounes — `/fr/c/doudounes`

|           | Actuel                                                                                                            | Proposé                                                                                                                                                               |
| --------- | ----------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Title** | `TRIPLE ZERO … - Doudounes` (📏 ~130)                                                                             | `Doudoune en duvet d'oie 000, fabrication française \| TRIPLE ZERO` (📏 64)                                                                                           |
| **Meta**  | `Doudounes et gilets en duvet d'oie légers et techniques, pour alpinisme, trek et usage quotidien. […]` (📏 ~330) | `Doudounes et gilets en pur duvet d'oie 000, 800 cuin minimum. Du bivouac au quotidien jusqu'aux expéditions grand froid. Fabrication artisanale française.` (📏 156) |

**Justification.** « 800 cuin minimum » est garanti sur la page Savoir-faire ; cas d'usage repris du texte existant.

---

### 🩲 Combinaisons & pantalons — `/fr/c/combinaisons-pantalons`

|           | Actuel                                                                                                                  | Proposé                                                                                                                                                            |
| --------- | ----------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Title** | `TRIPLE ZERO … - Combis et pantalons` (📏 ~140)                                                                         | `Combinaison & pantalon duvet pour 7000-8000 m \| TRIPLE ZERO` (📏 60)                                                                                             |
| **Meta**  | `Combinaisons intégrales et pantalons isolants techniques et légers, en duvet d'oie pour haute montagne. […]` (📏 ~300) | `Combinaisons intégrales et pantalons en duvet d'oie 000 pour alpinisme 7000-8000 m. Combi Maïté testée sur l'Everest. Fabrication artisanale française.` (📏 154) |

**Justification.** L'altitude 7 000–8 000 m et le test Everest sont mentionnés littéralement sur la page (Combi Maïté). Forte preuve d'expertise pour le CTR.

---

### 🧤 Moufles & chaussons — `/fr/c/mouffles-chaussons`

|           | Actuel                                                                                                                                                | Proposé                                                                                                                                                         |
| --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Title** | `TRIPLE ZERO … - Moufles et chaussons` (📏 ~140)                                                                                                      | `Moufles & chaussons d'altitude en duvet d'oie 800 cuin \| TRIPLE ZERO` (📏 68)                                                                                 |
| **Meta**  | `Moufles d'alpinisme et chaussons d'altitude garnis pur duvet d'oie 800 cuin minimum. Isolation thermique des extrémités jusqu'à -30°C […]` (📏 ~225) | `Moufles d'alpinisme et chaussons d'altitude en pur duvet d'oie 800 cuin. Protection des extrémités jusqu'à -30 °C. Fabrication artisanale française.` (📏 152) |

> ⚠️ Faute d'URL : `mouffles` (deux f) au lieu de `moufles`. À corriger via redirection 301.

---

### 🛌 Oreillers & coussins — `/fr/c/oreillers-coussins`

|           | Actuel                                                                                                          | Proposé                                                                                                                                                   |
| --------- | --------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Title** | `TRIPLE ZERO … - Oreillers, traversins et coussins` (📏 ~155, tronqué)                                          | `Oreillers, traversins & coussins en duvet d'oie \| TRIPLE ZERO` (📏 62)                                                                                  |
| **Meta**  | `Les oreillers et coussins TRIPLE ZERO sont garnis pur duvet d'oie (gamme MORPHEE) ou demi-duvet […]` (📏 ~280) | `Oreillers, traversins et coussins en pur duvet d'oie (Morphée) ou demi-duvet plumettes + duvet (Super-Doux). Fabrication artisanale française.` (📏 145) |

**Justification.** Reprise des deux noms de gammes officiels et de la composition exacte du demi-duvet (texte de la page).

---

### 🎒 Accessoires — `/fr/c/accessoires`

|           | Actuel                                                                                                                            | Proposé                                                                                                                                                 |
| --------- | --------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Title** | `TRIPLE ZERO … - Accessoires montagne` (📏 ~140)                                                                                  | `Sacs de compression & rangement pour duvet \| TRIPLE ZERO` (📏 56)                                                                                     |
| **Meta**  | `Sacs de rangement et compression pour sacs de couchage et équipement d'alpinisme. Matériaux techniques résistants […]` (📏 ~225) | `Sac de compression cylindrique en polyamide PA50 (6 tailles) et sac de rangement filet maille respirante (2 tailles). Fabrication française.` (📏 144) |

**Justification.** Matière (PA50), nombre de tailles, type de maille : tout est repris des fiches produits affichées sur la page.

---

### 👶 Literie enfants — `/fr/c/literie-enfants`

|           | Actuel                                                                                                                                                         | Proposé                                                                                                                                                             |
| --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Title** | `TRIPLE ZERO … - Literie enfants` (📏 ~135)                                                                                                                    | `Literie enfant en duvet d'oie & coton bio \| TRIPLE ZERO` (📏 56)                                                                                                  |
| **Meta**  | `Literie enfant en duvet d'oie naturel. Fabrication française avec garnissage duvet, enveloppe coton bio et dimensions ajustées aux lits enfants.` (📏 144 ✅) | `Couette enfant légère et respirante en duvet d'oie naturel, enveloppe coton bio. Dimensions adaptées aux lits enfants. Fabrication artisanale française.` (📏 152) |

**Justification.** Seule meta déjà à la bonne longueur. Reformulation pour intégrer les bénéfices clés visibles sur la fiche produit (« légère et respirante »).

---

### 📦 Sacs de rangement — `/fr/c/sacs-de-rangement-couettes-et-oreillers`

|           | Actuel                                                                          | Proposé                                                                                                                                                             |
| --------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Title** | `TRIPLE ZERO … - Sacs de rangement couettes` (📏 ~145)                          | `Sacs de rangement coton pour couettes \| TRIPLE ZERO` (📏 51)                                                                                                      |
| **Meta**  | `Sacs de rangement couettes pour le stockage hors saison.` (📏 56 — trop court) | `Sac de rangement en coton pour couette en duvet, avec cordon de serrage et bloqueur. Stockage hors saison préservant le gonflant. Fabrication française.` (📏 152) |

**Justification.** Matière (coton), équipement (cordon + bloqueur) repris de la fiche produit. Bénéfice « préservant le gonflant » est cohérent avec le texte des sacs de rangement de la catégorie Accessoires (« Préservez le gonflant de vos équipements en duvet »).

---

### 📖 Savoir-faire — `/fr/p/savoir-faire`

|           | Actuel                                   | Proposé                                                                                                                                                             |
| --------- | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Title** | `TRIPLE ZERO … - Savoir-faire` (📏 ~135) | `Notre savoir-faire : duvet d'oie 000, trieuse de 1932 \| TRIPLE ZERO` (📏 67)                                                                                      |
| **Meta**  | _(meta générique d'accueil)_             | `Sélection du duvet d'oie 000 (800 cuin minimum) du Périgord, tri sur notre trieuse en bois et métal de 1932. Fabrication artisanale française à Durfort.` (📏 156) |

**Justification.** Trieuse de 1932, duvet 000 / 800 cuin, producteurs du Périgord, Durfort : tout est issu directement du contenu de la page Savoir-faire et des Mentions légales. Storytelling à la fois factuel et différenciant.

---

### ⚖️ Mentions légales — `/fr/p/mentions-legales`

|           | Actuel                             | Proposé                                                                                                                        |
| --------- | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| **Title** | `TRIPLE ZERO … - Mentions Légales` | `Mentions légales \| TRIPLE ZERO` (📏 30)                                                                                      |
| **Meta**  | _(meta générique d'accueil)_       | `Mentions légales du site triplezero.fr : éditeur (SARL TRIPLE ZERO, RCS Castres), siège social, hébergeur, contact.` (📏 113) |

**Justification.** Page utilitaire ; contenu strict de la page.

---

### 📜 CGV — `/fr/p/conditions-generales-de-vente`

|           | Actuel                                          | Proposé                                                                                                                                                |
| --------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Title** | `TRIPLE ZERO … - Conditions générales de vente` | `Conditions générales de vente \| TRIPLE ZERO` (📏 43)                                                                                                 |
| **Meta**  | _(meta générique d'accueil)_                    | `CGV TRIPLE ZERO : commande en ligne ou au magasin de Durfort, paiement, livraison et réserve de propriété. Vente directe sans représentant.` (📏 142) |

**Justification.** Reprend le canal de vente (« notre magasin de Durfort et par correspondance, ainsi que sur notre site ») et la clause « TRIPLE ZERO n'a pas de représentant », tous deux explicitement présents dans les CGV.

---

## Recommandations techniques de mise en œuvre

1. **Bug critique** : corriger le doublon de Title sur l'accueil (concaténation `siteName + pageTitle` qui se déclenche 2× — probablement dans la config Payload SEO ou `generateMetadata`).
2. **Inverser le template global** : passer de `{siteName} - {pageName}` à `{pageName} | {siteName}` (avec pipe, plus lisible que tiret).
3. **Désactiver le fallback meta description** sur les pages ayant un champ vide → forcer une saisie ou générer une meta dérivée du H1/contenu, pas de la home.
4. **Corriger l'URL `mouffles-chaussons` → `moufles-chaussons`** + redirection 301.
5. **Aligner les Open Graph titles** sur les nouveaux Title (actuellement = même duplication que `<title>`).

---

## Annexe — Analyse concurrentielle (rappel)

Lacunes communes identifiées chez Valandré, Millet et Lestra Outdoor :

1. Aucun outil d'aide au choix interactif (calculateur de température réelle).
2. Norme EN 13537 / ISO 23537 mal expliquée.
3. Pas de pédagogie sur le système de couchage complet (sac + matelas R-value + liner).
4. Traçabilité du duvet superficielle.
5. Contenu femme inexistant (thermorégulation, morphologie).
6. Entretien / réparation / seconde vie peu ou pas traités.
7. Retours terrain longitudinaux absents.
8. Physiologie du sommeil au froid : zéro contenu.

5 sujets éditoriaux à traiter en priorité :

1. **Décoder la norme ISO 23537** + calculateur interactif T° réelle.
2. **Système de couchage complet** : sac + matelas (R-value) + sursac + liner.
3. **Traçabilité du duvet** : du producteur du Périgord à votre sac (TRIPLE ZERO a déjà la matière première narrative — partenariat contractuel + cahier des charges).
4. **Sac de couchage femme** : ce que la thermorégulation change vraiment.
5. **Faire durer son équipement en duvet** : laver, regonfler, réparer, stocker (le site possède déjà des sacs de rangement filet « préservant le gonflant » → angle naturel).
