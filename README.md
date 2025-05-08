# 📘 Projektbeskrivning
Detta projekt är en Angular-applikation som läser in kursdata från en extern JSON-fil och visar informationen i tabellformat på en webbsida. Användaren kan balnd annat:

- Filtrera kurser med hjälp av ett sökfält (på kurskod och kursnamn).

- Sortera kurser efter kurskod, kursnamn och progression.

- Växla mellan stigande och fallande sorteringsordning.

## 🔧 Så byggdes applikationen
1. Skapa Angular-projektet
Ett nytt Angular-projekt skapades med Angular CLI.

2. Konfigurera app.config.ts
I app.config.ts aktiverades provideHttpClient() för att kunna använda HttpClient.

3. Skapa en service
En tjänst (service) skapades med hjälp av HttpClient för att hämta data från en JSON-fil med kursinformation. Länken till JSON-filen hårdkodades i service-filen.

4. Definiera en modell
Ett Course-interface skapades i mappen models/ för att ge en strukturerad och tydlig typning av kursobjekten som används i projektet.

5. Presentera datan i HTML
Data som hämtas från tjänsten presenteras i en tabell i komponentens HTML-fil. Tabellen innehåller kolumner för: Kurskod, Kursnamn, Progression

6. Implementera filtrering och sortering
I komponentens TypeScript-fil (course.component.ts) implementerades funktionalitet för att filtrera och sortera kurslistan. Metoder som använts är:

- ngOnInit()
Laddar kursdata från CourseService när komponenten startar.

- applyFilters()
Filtrerar kurslistan utifrån användarens sökterm (matchning mot kurskod och kursnamn) och anropar sorteringsfunktionen.

- sortFunction()
Hantera sorteringslogik: alltså sorterar listan efter den kolumn som användaren valt (code, coursename eller progression).
Använder localeCompare() för bokstavsordning.
Tar hänsyn till om sorteringsordningen är stigande eller fallande.

- toggleSortDirection()
Växlar mellan stigande och fallande sortering när användaren klickar på sorteringsknappen.

### publicering
Projektet är publicerad till en publikt tillgänglig webbhost /githup-pages har använts. 
