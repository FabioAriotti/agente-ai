---
titolo: Pipeline multilingua end-to-end
autore: Fabio Ariotti
ambito: wp-blog-agent
fase: scrittura
versione: 1.0
---

# 34 - Pipeline multilingua

Scrittura, traduzione, adattamento culturale e SEO internazionale in un solo
flusso. Orchestra le regole 30, 32 e 33 e produce anche gli asset hreflang.

**Limite duro**: da 10 lingue di destinazione in su ci si ferma **prima** di
scrivere. Si spiega il rischio di contenuto scalato di bassa qualità e si
richiedono lotti rivisti da non più di 9 lingue. Pubblicare lo stesso pezzo in
quindici lingue in un colpo solo è esattamente il pattern che i sistemi
antispam cercano.

## Fase 1 - Configurazione

Si estraggono argomento, lingue di destinazione, lingua di origine e formato.
Ogni codice si valida con le regole della 32. Il formato si rileva dal progetto
o si impone esplicitamente. Se una destinazione coincide con l'origine, si
scarta con avviso.

Struttura di uscita, tutta dentro la radice del progetto:

```
multilingual/
  {lingua-origine}/
  {lingua-1}/
  {lingua-2}/
```

## Fase 2 - Scrittura dell'originale

Regola 30 completa: selezione del template, statistiche con fonte, priorità allo
schema Article, zone di link interno, grafici, immagini. Uscita in
`multilingual/{origine}/{slug}.{est}`.

## Fase 3 - Traduzione

Regola 32 per ogni lingua. Si può procedere in parallelo.
Uscita in `multilingual/{lingua}/{slug-localizzato}.{est}`.

## Fase 4 - Adattamento culturale

Regola 33 per ogni versione tradotta, salvo esclusione esplicita. Il percorso
generato si risolve dentro `multilingual/`, si rifiutano i symlink e si crea un
backup prima di sovrascrivere.

## Fase 5 - SEO internazionale

### 5a. Tag hreflang

```html
<link rel="alternate" hreflang="{origine}" href="https://esempio.it/{url-origine}" />
<link rel="alternate" hreflang="{lingua-1}" href="https://esempio.it/{url-1}" />
<link rel="alternate" hreflang="x-default" href="https://esempio.it/{url-fallback}" />
```

Regole, tutte obbligatorie:

- **Ogni pagina referenzia tutte le alternative, sé stessa inclusa** (auto-riferimento).
- Ogni `href`, incluso `x-default`, è un URL assoluto `https://` completo.
- `x-default` punta al fallback per lingue non coperte - un selettore di lingua o la pagina di mercato di default. **Non deve necessariamente essere la versione nella lingua di origine.**
- Tutti gli URL usano lo stesso protocollo e la stessa convenzione sulla barra finale.
- **Bidirezionalità**: ogni relazione è reciproca. Se A dichiara B, B deve dichiarare A. Un hreflang non reciproco viene ignorato da Google.

Salvataggio in `multilingual/hreflang-tags.html`.

### 5b. Frammento di sitemap

Un blocco `<url>` per ogni locale, e **ogni blocco contiene l'insieme completo e
identico** di `<xhtml:link>` per tutti i locali, più sé stesso e l'`x-default`
opzionale, con URL assoluti `https://`.

```xml
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>https://esempio.it/{url-origine}</loc>
    <xhtml:link rel="alternate" hreflang="{origine}" href="..." />
    <xhtml:link rel="alternate" hreflang="{lingua-1}" href="..." />
    <xhtml:link rel="alternate" hreflang="x-default" href="..." />
  </url>
  <!-- un blocco identico per ogni altra lingua -->
</urlset>
```

Salvataggio in `multilingual/hreflang-sitemap.xml`.

### 5c. Mappa JSON per il CMS

```json
{
  "sourceSlug": "", "sourceLanguage": "it", "generatedDate": "AAAA-MM-GG",
  "versions": [{
    "lang": "de", "locale": "de-DE", "hreflang": "de-DE",
    "slug": "", "file": "de/....md",
    "url": "https://esempio.it/de/.../",
    "canonical": "https://esempio.it/de/.../",
    "xDefault": false, "title": "", "description": ""
  }],
  "hreflang": { "method": "html", "x-default": "https://esempio.it/" }
}
```

Salvataggio in `multilingual/hreflang-map.json`.

### 5d. Schema localizzato (obbligatorio)

Su ogni versione, JSON-LD Article/BlogPosting con `inLanguage` e
`translationOfWork`:

```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "[titolo localizzato]",
  "description": "[descrizione localizzata]",
  "inLanguage": "[codice]",
  "isPartOf": { "@type": "Blog", "inLanguage": "[codice]" },
  "translationOfWork": {
    "@type": "BlogPosting",
    "inLanguage": "[origine]",
    "url": "[url originale]"
  }
}
```

Lo stack prioritario resta Article/BlogPosting + Person + Organization +
BreadcrumbList (regola 43).

## Fase 6 - Consegna

```
## Blog multilingua completato: [titolo]
### Originale: lingua, file
### Traduzioni
| Lingua | File | Localizzato | Keyword adattate |
### Asset SEO internazionali
- hreflang-tags.html / hreflang-sitemap.xml / hreflang-map.json
- Schema Article localizzato per versione
### Totali
### Passi successivi
- Sostituire i segnaposto negli URL con URL assoluti HTTPS reali
- Unire il frammento di sitemap alla sitemap esistente
- Verifica di completezza (regola 57)
- Risolvere i marcatori [INTERNAL-LINK] con URL specifici per locale
```

## Gestione degli errori

| Scenario | Azione |
|---|---|
| Una traduzione fallisce | Si completano le altre, si riportano i risultati parziali e si suggerisce il comando per riprovare |
| Origine uguale a una destinazione | Si salta con avviso |
| 10 o più lingue | **Si ferma prima di scrivere.** Lotti rivisti di massimo 9 |

---

*Metodologia adattata da claude-blog (MIT, © 2025-2026 AgriciDaniel), a sua volta derivata da claude-blog-multilingual di Chris Mueller. Riscritta per la pipeline wp-blog-agent.*
