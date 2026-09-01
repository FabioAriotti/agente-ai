---
titolo: Tag, categorie e tassonomia
autore: Fabio Ariotti
ambito: wp-blog-agent
fase: elementi
versione: 1.0
---

# 44 - Tassonomia

Tag e categorie: come si propongono, come si sincronizzano con il CMS, come si
tiene pulita la tassonomia di un sito nel tempo.

## Perché conta

Una tassonomia gonfia crea decine di pagine archivio con due articoli ciascuna.
Sono pagine sottili, che sprecano budget di scansione e non servono a nessuno.
Il problema quasi mai è "mancano tag": è che ce ne sono troppi.

## Linee guida di sito

- Da 5 a 10 **categorie** principali. Non di più.
- Un **tag** merita una pagina archivio solo da 5 articoli in su.
- Slug sempre in minuscolo, separati da trattini.
- Ogni articolo ha **esattamente una** categoria primaria.
- Da 3 a 8 tag per articolo. **Mai oltre 15.**

## Proposta di tag

### 1. Struttura

Si estraggono tutti gli H2 e H3 (segnale tematico primario), le frasi in
grassetto e corsivo (segnale di enfasi), e i tag e le categorie già presenti nel
frontmatter.

### 2. Frequenza

Nel corpo del testo, escluse le parole vuote:

- termini di 1 parola: minimo 4 occorrenze;
- espressioni di 2 parole: minimo 3;
- espressioni di 3 parole: minimo 2.

Si escludono articoli, preposizioni, congiunzioni e pronomi.

### 3. Raggruppamento semantico

Si fondono singolare e plurale (resta la forma più frequente), le forme con e
senza trattino, e i sinonimi sotto il termine più frequente.

### 4. Deduplica e classifica

Confronto sfocato sugli slug normalizzati (distanza di Levenshtein ≤ 2).
**Gli slug sotto i 5 caratteri non si fondono automaticamente sulla sola
distanza di Levenshtein**: serve sovrapposizione di token o revisione manuale.
Altrimenti "seo" e "geo" diventano lo stesso tag.

Punteggio: `(frequenza × 2) + (presenza nei titoli × 5) + (enfasi × 1)`.
Si restituiscono le 5-10 proposte migliori.

```
## Proposte di tag: [titolo]
| Pos. | Tag | Punteggio | Origine |
|---|---|---|---|
| 1 | content-marketing | 18 | H2 + 6 menzioni |

### Categorie proposte
- Primaria / Secondaria (opzionale)
```

## Sincronizzazione con il CMS

| CMS | API | Autenticazione | Modello dei tag |
|---|---|---|---|
| WordPress | REST | Application Password (base64) | Entità di prima classe con ID |
| Shopify | GraphQL Admin | Token di accesso Admin | Array di stringhe sull'articolo |
| Ghost | REST Admin | Chiave API con firma JWT | Entità di prima classe |
| Strapi | REST o GraphQL | Token API (Bearer) | Tipo di contenuto definito dall'utente |
| Sanity | GROQ / Mutations | Token di progetto (Bearer) | Tipo di documento |

### WordPress

```
GET  {CMS_URL}/wp-json/wp/v2/tags?per_page=100&search={keyword}
POST {CMS_URL}/wp-json/wp/v2/tags          {"name","slug","description"}
GET  {CMS_URL}/wp-json/wp/v2/categories?per_page=100
POST {CMS_URL}/wp-json/wp/v2/categories    {"name","slug","parent":0}
POST {CMS_URL}/wp-json/wp/v2/posts/{id}    {"tags":[1,2,3],"categories":[4]}
```

Paginazione: si segue l'header `X-WP-TotalPages`.

> **In `wp-blog-agent` questo non si fa a mano.** La regola inviolabile del
> `CLAUDE.md` di progetto vale anche qui: le chiamate REST a WordPress passano
> da `scripts/publish.mjs`. Le tabelle sopra descrivono cosa fa lo script, non
> autorizzano a scavalcarlo.

### Shopify

I tag sono array di stringhe sull'articolo, non entità. Si aggiornano con
`articleUpdate` in GraphQL; si elencano paginando su `articles(first: 250,
after: $cursor)` finché `pageInfo.hasNextPage` è vero. Header
`X-Shopify-Access-Token`. L'API REST è legacy da ottobre 2024: per le
integrazioni nuove serve GraphQL.

### Ghost

`GET /ghost/api/admin/tags/?limit=all` e `POST` per creare. Il JWT si firma con
la chiave admin in formato `id:secret`, `iat` = adesso, `exp` = 5 minuti,
audience `/admin/`.

### Strapi

Endpoint generati dai tipi di contenuto. Paginazione incrementando
`pagination[page]`. **Attenzione alla versione**: Strapi v4 avvolge le risposte
in `data`/`attributes`, v5 ha una forma più piatta. Si rileva la versione o si
normalizzano entrambe le forme prima di deduplicare.

### Sanity

Query GROQ per leggere, API Mutations per scrivere. La versione dell'API si
prende dall'ambiente di progetto: **non si scrive fissa** nelle richieste
generate.

## Audit della tassonomia

Si costruisce la mappa `tag → [articoli]` e `categoria → [articoli]`, poi:

| Controllo | Soglia | Azione |
|---|---|---|
| Archivi sottili | meno di 5 articoli per tag | Valutare fusione o `noindex`, **dopo** aver controllato traffico, intento e link |
| Tag orfani | 0 articoli | Eliminare |
| Gonfiaggio | oltre `max(50, numero_articoli × 0.25)` tag totali | Consolidare |
| Profondità delle categorie | oltre 3 livelli | Appiattire |
| Articoli senza categoria | nessuna assegnata | Assegnare |
| Slug duplicati | stesso slug, nome diverso | Fondere sulla versione canonica |

Priorità: **critico** = tag orfani che creano pagine archivio vuote (spreco di
scansione); **alto** = tag sottili, dopo le verifiche; **medio** = gonfiaggio
oltre soglia; **basso** = incoerenze di nomenclatura.

Nota sulle soglie: prima di mettere `noindex` su un archivio sottile si guarda
se porta traffico, se intercetta un intento reale e se riceve link. Un archivio
con tre articoli ma che posiziona su una query di nicchia va tenuto.

## Credenziali

Le variabili d'ambiente necessarie: tipo di CMS, URL base HTTPS, allowlist di
host opzionale, username dove serve, chiave API.

**Mai in un file, mai nel controllo di versione.** Si leggono dall'ambiente a
tempo di esecuzione.

Regola di sicurezza sulle chiamate: HTTPS obbligatorio per le richieste
autenticate; si risolve il DNS e si bloccano loopback, IP privati, link-local e
riservati; i redirect si validano con gli stessi controlli o si disabilitano;
timeout massimo 10 secondi; si applica l'allowlist di host quando è impostata.

## Gestione degli errori

- **Variabili mancanti**: si dice **quale** manca e in che formato.
- **Credenziali non valide (401/403)**: si riporta l'errore e **non si riprova**.
- **Timeout**: si segnala e si suggerisce di verificare l'URL.
- **Slug duplicato**: si salta la creazione e si annota "tag già esistente".
- **Limite di frequenza (429)**: si rispetta `Retry-After` se presente, altrimenti backoff esponenziale e un solo ritentativo.
- **CMS non supportato**: si elencano le piattaforme valide e si esce.

---

*Metodologia adattata da claude-blog (MIT, © 2025-2026 AgriciDaniel) e riscritta per la pipeline wp-blog-agent.*
