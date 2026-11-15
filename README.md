L'applicativo implementa i seguenti punti:

# PROGETTO: L'ORDINE AL BAR
### Menu, gestione dell'ordine e form di conferma

Realizzate da zero un'applicazione per il bar della scuola, che permetta di visualizzare il menu, aggiungere prodotti a un ordine, modificarne le quantità e confermarlo attraverso un form completo.

Il progetto è suddiviso in tre livelli progressivi e una sezione Extra Pro. Tutti partono dal livello Base.

---

# BASE: IL MENU E IL FORM DI CONFERMA

## 1. Il menu

- In `src/data/menu.ts` create il tipo `Product`, con le seguenti proprietà:
  - `id`
  - `name`
  - `price`
  - `category`, che può essere `'panini'`, `'bevande'` oppure `'dolci'`.
- Inserite almeno 8 prodotti, distribuiti tra tutte e tre le categorie.
- Dividete il menu per categoria, mostrando un titolo per ciascuna e sotto i relativi prodotti, utilizzando `filter`.
- Create in `utils/` una funzione `formatPrice` per formattare i prezzi in euro, ad esempio `1,50 €` invece di `1.5`, utilizzando `toLocaleString`.

## 2. Il form di conferma

- In `types.ts` create il tipo `Checkout`, contenente:
  - nome;
  - classe (es. «4B»);
  - ritiro («a ricreazione» oppure «a pranzo»);
  - pagamento («contanti» oppure «carta»);
  - note.
- Create il componente `components/CheckoutForm.tsx`.
- Il form deve essere un vero elemento HTML `<form>`, quindi deve poter essere inviato anche premendo Invio e impedire il ricaricamento della pagina.
- Ritiro e pagamento devono essere selezionabili attraverso due bottoni ciascuno, che non devono inviare il form.
- Il form deve passare ad `App` tutti i dati raccolti attraverso un oggetto `Checkout`.

## 3. La struttura iniziale dell'applicazione

- Organizzate l'applicazione in componenti e file separati.
- Prevedete una schermata con il menu e una sezione dedicata alla conferma dell'ordine.
- Quando l'ordine è vuoto, il pulsante «Conferma ordine» deve essere disattivato.

---

# MEDIO: LA GESTIONE DELL'ORDINE E LA VALIDAZIONE

## 1. Aggiunta dei prodotti

- Ogni prodotto del menu deve avere un pulsante «Aggiungi».
- Sotto il menu deve comparire una sezione dedicata all'ordine.
- L'ordine deve mostrare per ogni riga:
  - nome del prodotto;
  - quantità;
  - prezzo.
- Deve essere visualizzato anche il totale complessivo, calcolato utilizzando `reduce`.
- Nell'ordine devono essere salvati esclusivamente gli oggetti `{ productId, quantity }`.
- Nome e prezzo dei prodotti devono essere recuperati dal menu utilizzando `find`.
- Se un prodotto è già presente nell'ordine, non deve essere creata una nuova riga: deve aumentare la quantità.
- Lo stato non deve essere modificato direttamente: utilizzate `map` e create un nuovo oggetto per la riga modificata, ad esempio `{ ...item, quantity: item.quantity + 1 }`.

## 2. Validazione dei campi

Un singolo campo può avere più errori contemporaneamente. Tutti gli errori devono essere visualizzati sotto il rispettivo campo.

Le regole di validazione sono:

**Nome**
- Obbligatorio.
- Almeno 2 caratteri.
- Non deve contenere numeri.

**Classe**
- Obbligatoria.
- Deve contenere un numero da 1 a 5 seguito da una lettera maiuscola (es. 4B).

**Note**
- Facoltative.
- Massimo 100 caratteri.
- Devono essere inserite in un campo di testo su più righe (`textarea`).

---

# PRO: GESTIONE AVANZATA E CONFERMA DELL'ORDINE

## 1. Quantità dei prodotti

- In ogni riga dell'ordine devono esserci due pulsanti: «+» e «−».
- Il pulsante «−» diminuisce la quantità.
- Quando la quantità arriva a 0, la riga deve sparire utilizzando `filter`.
- Il pulsante «+» deve essere disattivato (`disabled`) quando la quantità raggiunge 5.
- Anche il pulsante «Aggiungi» presente nel menu non deve permettere di superare i 5 pezzi per prodotto.

## 2. Organizzazione dei componenti e dello stato

- `Menu` e `Order` devono diventare componenti separati, ciascuno nel proprio file.
- Lo stato dell'ordine deve rimanere in `App`.
- Lo stato e le funzioni necessarie per modificarlo devono essere passati ai componenti attraverso le props.
- Per l'aggiunta dei prodotti utilizzate una funzione con questa tipizzazione:

`onAdd: (id: number) => void`

## 3. Form collegato all'ordine

- Il form deve conoscere il totale dell'ordine.
- Se viene selezionato il pagamento con carta, l'importo minimo dell'ordine deve essere di 3 €.
- Se il totale è inferiore a 3 €, deve comparire un errore sotto il campo relativo al pagamento.
- Sotto il campo note deve essere presente un contatore dei caratteri, ad esempio «37/100».
- Quando si superano i 100 caratteri, il contatore deve diventare rosso.
- Dopo il primo tentativo di invio, gli errori devono aggiornarsi automaticamente.
- Ad esempio, se compare l'errore relativo al pagamento con carta perché l'ordine è inferiore a 3 €, aggiungendo un prodotto che porta il totale sopra i 3 € l'errore deve sparire immediatamente, senza dover interagire nuovamente con il form.

## 4. Conferma dell'ordine

- Il pulsante «Conferma ordine» deve controllare che:
  - il nome sia valido;
  - la classe sia valida;
  - tutti gli altri campi rispettino le regole previste;
  - l'ordine non sia vuoto;
  - il pagamento con carta rispetti il minimo di 3 €, se selezionato.
- Se il nome è vuoto o l'ordine è vuoto, deve comparire un errore.
- Se tutti i dati sono validi, deve essere mostrato un messaggio di conferma contenente le informazioni dell'ordine.

Esempio:

«Ordine per Giulia (4B), ritiro a ricreazione, contanti: 7,50 €».

- Dopo la conferma, il form deve svuotarsi e l'ordine deve essere azzerato.

---

# EXTRA PRO: FUNZIONALITÀ AGGIUNTIVE

## 1. Sezione «Da ritirare»

- Gli ordini confermati devono essere salvati in una sezione chiamata «Da ritirare».
- Ogni ordine deve mostrare:
  - nome;
  - classe;
  - modalità di ritiro;
  - prodotti ordinati;
  - totale.
- Ogni ordine deve avere un pulsante «Ritirato».
- Premendo «Ritirato», l'ordine deve essere rimosso dalla lista degli ordini da ritirare.

## 2. Limite degli ordini a ricreazione

- A ricreazione possono esserci al massimo 3 ordini ancora da ritirare.
- Quando si raggiunge il limite, il pulsante «Ricreazione» nel form deve essere disattivato.
- Se «Ricreazione» era già stata selezionata e viene raggiunto il limite, deve comparire un messaggio di errore che avvisi l'utente.

## 3. Codice sconto

- Aggiungete un campo per inserire un codice sconto.
- Il codice valido è `BAR10`.
- Il codice deve essere riconosciuto sia in maiuscolo sia in minuscolo.
- Se il codice inserito non esiste, deve comparire un messaggio di errore.
- Se il codice è corretto, deve essere applicato uno sconto del 10% sul totale dell'ordine.
- Il totale scontato deve essere visibile prima della conferma.
- Il minimo di 3 € richiesto per il pagamento con carta deve essere verificato sul totale dopo l'applicazione dello sconto.

---

# RISULTATO FINALE

L'applicazione deve permettere di:

1. Visualizzare il menu del bar suddiviso per categorie.
2. Aggiungere prodotti all'ordine e modificarne le quantità.
3. Visualizzare il riepilogo e il totale dell'ordine.
4. Applicare un codice sconto.
5. Compilare un form con nome, classe, modalità di ritiro, pagamento e note.
6. Visualizzare e correggere gli errori di validazione.
7. Confermare l'ordine e visualizzare il riepilogo.
8. Svuotare automaticamente il form e l'ordine dopo la conferma.
9. Visualizzare gli ordini nella sezione «Da ritirare».
10. Contrassegnare gli ordini come ritirati.
11. Gestire il limite massimo di 3 ordini da ritirare a ricreazione.
