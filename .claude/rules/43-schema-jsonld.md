---
titolo: Dati strutturati JSON-LD
autore: Fabio Ariotti
ambito: wp-blog-agent
fase: elementi
versione: 1.0
---

# 43 - Schema JSON-LD

Marcatura completa e validata con il pattern `@graph`: un solo blocco che
contiene tutti i tipi, collegati fra loro con `@id` stabili.

## Stack prioritario

**BlogPosting + Person + Organization + BreadcrumbList.** Sono le quattro entità
che servono davvero. Tutto il resto è opzionale e va aggiunto solo quando
corrisponde a contenuto realmente presente sulla pagina.

## Estrazione

Dal pezzo si ricavano: titolo, autore (nome, ruolo, profili social, credenziali),
date di pubblicazione e modifica, descrizione, coppie domanda-risposta,
immagini con dimensioni e testo alternativo, dati dell'organizzazione, conteggio
parole approssimativo, tag e categorie, slug.

## BlogPosting

```json
{
  "@type": "BlogPosting",
  "@id": "{sito}/blog/{slug}#article",
  "headline": "Titolo conciso",
  "description": "Meta description specifica della pagina",
  "datePublished": "AAAA-MM-GG",
  "dateModified": "AAAA-MM-GG",
  "author": { "@id": "{sito}/autore/{slug-autore}#person" },
  "publisher": { "@id": "{sito}#organization" },
  "image": { "@id": "{sito}/blog/{slug}#primaryimage" },
  "mainEntityOfPage": { "@type": "WebPage", "@id": "{sito}/blog/{slug}" },
  "wordCount": 2400,
  "articleBody": "Primi 200 caratteri come estratto..."
}
```

La documentazione di Google **non definisce proprietà obbligatorie** per
Article. Si includono `headline`, `datePublished`, `author`, `publisher` e
`image` quando applicabili, si valida con il test dei risultati avanzati, e i
campi mancanti si trattano come avvisi, non come errori - a meno che la
superficie di destinazione non li richieda.

## Person

```json
{
  "@type": "Person",
  "@id": "{sito}/autore/{slug-autore}#person",
  "name": "", "jobTitle": "", "url": "{sito}/autore/{slug-autore}",
  "sameAs": ["https://linkedin.com/in/...", "https://x.com/..."]
}
```

Opzionali se disponibili: `alumniOf`, `worksFor`.

## Organization

```json
{
  "@type": "Organization",
  "@id": "{sito}#organization",
  "name": "", "url": "{sito}",
  "logo": { "@type": "ImageObject", "url": "{sito}/logo.png" },
  "sameAs": []
}
```

L'URL del logo deve essere scansionabile. **Non si inventano dimensioni fisse
del logo** se il progetto o la documentazione corrente non le richiedono.

## BreadcrumbList

```json
{
  "@type": "BreadcrumbList",
  "@id": "{sito}/blog/{slug}#breadcrumb",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "{sito}" },
    { "@type": "ListItem", "position": 2, "name": "Categoria", "item": "{sito}/blog/categoria/{slug}" },
    { "@type": "ListItem", "position": 3, "name": "Titolo", "item": "{sito}/blog/{slug}" }
  ]
}
```

Senza categoria si usa "Blog" come secondo elemento con `{sito}/blog`.

## ImageObject

```json
{
  "@type": "ImageObject",
  "@id": "{sito}/blog/{slug}#primaryimage",
  "url": "", "width": 1200, "height": 630,
  "caption": "Didascalia allineata al testo alternativo"
}
```

L'URL deve essere pubblicamente accessibile. Larghezza e altezza devono
riflettere le **dimensioni reali**, non quelle desiderate.

## VideoObject

Uno per video incorporato, con `@id` `#video-1`, `#video-2`, e i campi `name`,
`description`, `thumbnailUrl`, `uploadDate`, `contentUrl`, `embedUrl`,
`duration` in formato ISO 8601.

## FAQPage - opzionale, e quasi mai necessario

```json
{
  "@type": "FAQPage",
  "@id": "{sito}/blog/{slug}#faq",
  "mainEntity": [{
    "@type": "Question",
    "name": "",
    "acceptedAnswer": { "@type": "Answer", "text": "" }
  }]
}
```

**Google ha ritirato i rich result FAQ per tutti i siti il 7 maggio 2026.**
`FAQPage` non è un percorso verso i rich result né verso l'ottimizzazione per
l'AI generativa, e **non porta alcun credito** in SEO o prontezza AI.
Si emette solo quando c'è una FAQ visibile che aiuta davvero il lettore, con
almeno una `Question` valida e la risposta visibile corrispondente.
**Non si allunga una risposta per raggiungere una lunghezza e non si aggiunge
una FAQ solo per avere la marcatura.**

**Non si sostituisce con `QAPage`.** Google supporta `QAPage` per pagine
centrate su **una** domanda dove gli utenti possono inviare risposte. Le FAQ
editoriali, quelle di supporto e le sezioni Q&A di un blog non rientrano in
quel modello.

## Tipi da non raccomandare per l'idoneità Google

| Tipo | Stato su Google Search | Uso valido |
|---|---|---|
| `HowTo` | Nessun rich result attivo | Tipo schema.org valido per contenuto how-to genuino |
| `Dataset` | Usato da Dataset Search, non dai rich result generali | Solo per un vero dataset |
| `QAPage` | Solo per una domanda con risposte inviate dagli utenti | Mai per FAQ editoriali |
| `Course` | La lista corsi è distinta dall'esperienza Course Info ritirata | Solo se documentazione corrente e contenuto visibile combaciano |
| `ClaimReview`, `SpecialAnnouncement`, `Course Info`, `Estimated Salary`, `Learning Video`, `Vehicle Listing` | Esperienze ritirate | Restano validi in schema.org, **mai** raccomandati per idoneità Google |
| `PracticeProblem` | Rimosso da Google e dalla documentazione | Non raccomandare |
| Sitelinks Search Box | Nessun elemento visuale dedicato | Google genera i sitelink algoritmicamente |

## Validazione

1. Tutti i riferimenti `@id` risolvono a entità dentro il `@graph`.
2. `dateModified` è uguale o successiva a `datePublished`.
3. `headline` è conciso; si avvisa se rischia il troncamento o diventa poco chiaro.
4. `description` è concisa, specifica della pagina e **non duplicata** fra i post.
5. Tutti gli URL sono assoluti.
6. Le dimensioni delle immagini sono interi positivi.
7. Le posizioni del breadcrumb sono sequenziali a partire da 1.
8. Se c'è `FAQPage`, esiste contenuto Q&A visibile con almeno una `Question` valida.

**Nota sull'AI generativa**: i dati strutturati **non sono richiesti** per la
ricerca generativa di Google, e **non esiste uno schema speciale per l'AI**.
La priorità va ad Article/BlogPosting, Person, Organization e BreadcrumbList
accurati e coerenti con il contenuto visibile.

## Sicurezza dell'output

**Il JSON-LD si costruisce con un vero encoder JSON, mai per interpolazione di
stringhe.** Prima di incorporarlo nell'HTML si rende il testo sicuro per il
contesto script: si sostituisce `</` con `<\/` e `<` con `<`.

I campi controllabili dall'utente - titolo, descrizione, nome autore, URL
immagine, etichette del breadcrumb - entrano nel blocco **solo come valori
codificati JSON**. Altrimenti un apice nel titolo di un articolo diventa una
vulnerabilità.

## Uscita

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "BlogPosting", ... },
    { "@type": "Person", ... },
    { "@type": "Organization", ... },
    { "@type": "BreadcrumbList", ... },
    { "@type": "ImageObject", ... }
  ]
}
</script>
```

Perché `@graph`: un solo tag invece di molti, collegamento fra entità tramite
`@id` stabili, parsing corretto da parte di Google e dei sistemi AI,
manutenzione di un blocco solo.

Google elabora il JSON-LD generato da JavaScript quando è presente nel DOM
renderizzato. La marcatura resa dal server resta più portabile per i crawler
non-Google, ma il JSON-LD nel sorgente **non è un requisito di Google**. Per la
marcatura dinamica si valida l'URL renderizzato, si verifica che i valori
corrispondano al contenuto visibile, e si evitano richieste lente o fallite che
lascerebbero il DOM vuoto.

---

*Metodologia adattata da claude-blog (MIT, © 2025-2026 AgriciDaniel) e riscritta per la pipeline wp-blog-agent.*
