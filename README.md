# GameShelf

GameShelf is een React- en ASP.NET Core-app voor een bordspelclub. We volgen de opbouw uit ASP.NET-les 1, 2 en 3:

```text
Controller -> Service -> Repository -> AppDbContext -> SQLite
```

De API en database draaien nu op de computer van degene die de app start. Elk teamlid heeft dus een eigen lokale database; de databasebestanden worden niet gedeeld via Git.

## Wat staat er al?

### Gedeelde basis

Dit is door alle onderdelen nodig. Gebruik deze basis; maak deze klassen niet nog een keer aan:

- `GameShelf.Api/Models/Member.cs` en `Game.cs`: gedeelde modellen volgens de ERD.
- `GameShelf.Api/Models/IEntity.cs`: interface voor entiteiten met één `Id`.
- `GameShelf.Api/Data/AppDbContext.cs`: bestaande databasecontext en relaties.
- `GameShelf.Api/Repositories/IRepository.cs` en `Repository.cs`: generieke databasebewerkingen voor entiteiten met één `Id`.
- `GameShelf.Api/Program.cs`: SQLite-, repository-, CORS- en OpenAPI-configuratie.
- `GameShelf.Api/Migrations/`: de initiële migratie voor `MEMBER`, `GAME`, `WISHLIST_ITEM` en `TRADE_OFFER`.
- Een aanvullende migratie voorkomt dat wishlist-items met aanbiedingen worden verwijderd en zo de trade-historie verliezen.

`GET /api/members` en `GET /api/games` geven alleen namen/keuzes terug voor de huidige pagina. Registreren, inloggen en de volledige gamecatalogus beheren zijn nog niet gebouwd. De API voegt bij het starten een paar ontwikkelleden en catalogusspellen toe; dit zijn geen echte accounts.

### Status van de vier onderdelen

| Onderdeel | Status in de API |
|---|---|
| Wishlists & Trading | Aangesloten op SQLite en de React-pagina. Wishlist-items kunnen worden gelezen, toegevoegd, aangepast en (zonder aanbiedingen) verwijderd. Aanbiedingen hebben hun eigen levenscyclus; de historie blijft bewaard. |
| Collections & Shelves | Nog niet aangesloten. |
| Lending | Nog niet aangesloten. |
| Game Sessions | Nog niet aangesloten. |

De basis van jouw onderdeel staat in `WishlistItem` en `TradeOffer`. De andere onderdelen moeten hun eigen tabellen en API-lagen toevoegen aan de bestaande gedeelde basis.

## Wat doet een service?

Een service is de laag waar de feature het werk doet. De controller weet hoe HTTP werkt; de repository weet hoe gegevens uit de database komen. De service zit ertussen en voert de bedrijfsregels uit:

```text
React-pagina
  -> my-project/src/api/wishlist.ts
  -> Controller (HTTP-request en statuscode)
  -> IWishlistService (afspraak/contract)
  -> WishlistService (regels, database-aanroepen en mapping)
  -> IRepository<TEntity>
  -> Repository<TEntity> (EF Core)
  -> AppDbContext -> SQLite
```

In de code:

- `IWishlistService` zegt welke wishlistbewerkingen bestaan. De controller hangt af van dit contract, niet van de concrete implementatie.
- `WishlistService` voert die bewerkingen uit. Bijvoorbeeld bij een nieuw wishlist-item controleert de service of het lid en spel bestaan, maakt een `WishlistItem`, laat de repository opslaan en zet het resultaat om naar een DTO.
- `Repository<TEntity>` voert de algemene databasebewerkingen uit via `AppDbContext`. Services en controllers gebruiken `AppDbContext` niet rechtstreeks.
- `CatalogService` is bewust klein: die geeft alleen de spel- en ledenkeuzes voor de formulieren terug. Het is nog geen volledige catalogus- of accountfeature.
- DTO's zijn de JSON-vormen voor de frontend. De database-entiteiten worden niet direct over HTTP verstuurd.

Een voorbeeld: de React-pagina verstuurt een `POST` met `memberId`, `gameId`, prioriteit en notitie. `WishlistItemsController` ontvangt de HTTP-request, `WishlistService` controleert de gegevens en bewaart het item via de repository. De controller antwoordt daarna met `201 Created` en de nieuwe DTO. Zo blijft de controller klein en staan de regels op één plek.

De React-pagina zelf staat in `my-project/src/pages/Wishlist.tsx`. `my-project/src/hooks/useWishlist.ts` houdt het laden en aanpassen van data bij. De formulieren en wishlist-kaarten staan apart in `my-project/src/components/Wishlist`, zodat de pagina vooral de schermonderdelen samenvoegt.

### Wat kan de wishlist-API al?

- `GET /api/wishlistitems` en `GET /api/wishlistitems/{id}` lezen wishlist-items.
- `POST /api/wishlistitems` maakt een item.
- `PUT /api/wishlistitems/{id}` wijzigt het spel, de prioriteit en de notitie. Alleen de eigenaar mag dit doen; de eigenaar wordt voor nu via `actorMemberId` meegestuurd.
- `DELETE /api/wishlistitems/{id}?actorMemberId={id}` verwijdert een item alleen als de aanroeper de eigenaar is en er geen aanbiedingen zijn.
- Aanbiedingen kunnen aangemaakt, gelezen, geaccepteerd, afgewezen of geannuleerd worden. Ze hebben bewust geen delete-endpoint.

Aanbiedingen zijn historie: daarom weigert de API het verwijderen van een item zodra er een aanbieding aan gekoppeld is (`409 Conflict`). Het gewenste spel kan dan ook niet meer worden gewijzigd, maar prioriteit en notitie wel. De foreign key voorkomt daarnaast dat EF Core aanbiedingen per ongeluk mee verwijdert. Dit is geen echte toegangsbeveiliging: inloggen en server-side gebruikersidentiteit zijn nog niet gebouwd; `actorMemberId` is alleen een tijdelijke demo-oplossing.

## Eerst lokaal opstarten

Benodigd: .NET 10 SDK, Node.js en npm. Installeer de EF Core CLI eenmalig als die nog niet op je computer staat:

```powershell
dotnet tool install --global dotnet-ef --version 10.0.*
```

Is een oudere versie al geïnstalleerd, gebruik dan:

```powershell
dotnet tool update --global dotnet-ef --version 10.0.*
```

### 1. Start de API en maak jouw database aan

Open een terminal in `GameShelf.Api`:

```powershell
dotnet restore
dotnet ef database update
dotnet run
```

`dotnet ef database update` maakt `gameshelf.db` aan als die nog niet bestaat en voert alle beschikbare migraties uit. De API draait op `http://localhost:5182`.

### 2. Start de frontend

Open een tweede terminal in `my-project`:

```powershell
npm install
npm run dev -- --port 5173
```

Open daarna `http://localhost:5173`. De wishlistpagina haalt de spellen, leden en wishlist-items op uit de API. Voorbeelden van API-verzoeken staan in `GameShelf.Api/Wishlist.http`.

### 3. Wat wordt wel en niet gedeeld?

- `GameShelf.Api/gameshelf.db` bevat jouw lokale gegevens en wordt niet naar Git gestuurd.
- De C#-migraties in `GameShelf.Api/Migrations/` zijn code en moeten wel naar Git.
- Een migratie deelt de **tabelstructuur**, niet jouw lokale wishlist-items of andere databasegegevens.
- De migratiegeschiedenis in de database wordt door EF Core bijgehouden. Bewerk die niet zelf.

### Git: code delen met het team

Git deelt de **broncode** via de gedeelde GitHub-repository. Het deelt niet jouw lokale SQLite-gegevens. Een migratiebestand is broncode met instructies om tabellen te maken of aan te passen; daarom delen we dat bestand wel.

Een normale samenwerking ziet er zo uit:

1. Haal de nieuwste teamcode op voordat je begint: `git pull`.
2. Werk aan jouw onderdeel en controleer wat je hebt aangepast: `git status`.
3. Voeg alleen de bestanden van jouw werk toe. Commit de modellen, services, controllers, frontendcode en eventuele migratiebestanden; voeg nooit `gameshelf.db` toe.
4. Sla jouw wijziging op in Git met `git commit -m "Add lending feature"` en stuur die naar GitHub met `git push` (of maak de pull request die jullie team gebruikt).
5. Een teamgenoot haalt de wijziging op met `git pull`. Als er een nieuwe migratie is meegekomen, voert diegene daarna `dotnet ef database update` uit vanuit `GameShelf.Api`.

Controleer vóór een commit altijd `git status`. Als `gameshelf.db` daar toch verschijnt, commit dat bestand niet; het hoort genegeerd te worden.

## Stap 0: ruim de dummydata van jouw onderdeel op

Begin voordat je nieuwe code schrijft met het zoeken naar nepgegevens van jouw eigen onderdeel. Verwijder de lokale voorbeeldrecords/lijsten; laat de componenten, styling en afbeeldingen staan. De pagina kan tijdelijk leeg zijn totdat jouw API-GET klaar is. Verwijder geen gedeelde catalogusbestanden zonder eerst met de andere onderdelen af te stemmen.

- **Wishlists:** de oude nep-wishlist is al vervangen door API-data.
- **Game Sessions:** `tempSessions` in `my-project/src/pages/GameSession.tsx` is voorbeelddata. `SessionCards` zijn de navigatiekaarten op de pagina, geen databasegegevens.
- **Collections & Shelves:** `my-project/src/components/Collections&Shelves/Collections/games.json` bevat voorbeeldspellen en wordt gebruikt door zowel `Collections.tsx` als `All-Games.tsx`. Dit is gedeelde catalogusdata; spreek af wie de echte gamecatalogus-API maakt en vervang de imports voordat je dit bestand verwijdert.
- **Lending:** `Lending.tsx` bevat nu vooral statische knoppen/placeholder-teksten; er is nog geen lijst met echte leningen.

Vervang de nepgegevens later door data uit jouw API. Verzin geen nieuwe frontend-dummyrecords om de lege pagina op te vullen.

## Stappenplan voor jouw onderdeel

Werk één onderdeel tegelijk uit. Gebruik de ERD die in Discord/de opdracht is gedeeld. Een game of lid in jouw tabel is een foreign key naar `Game` of `Member`; sla niet nog een kopie van de naam of titel op.

### Stap 1. Bepaal welke tabellen en regels bij jouw onderdeel horen

Gebruik de tabelnamen uit de ERD:

- **Collections & Shelves:** `COLLECTION_RECORD`, `SHELF`, `SHELF_GAME`.
- **Lending:** `GAME_BOX`, `LOAN_REQUEST`, `LOAN`.
- **Game Sessions:** `GAME_SESSION`, `SIGNUP`.
- **Wishlists & Trading:** `WISHLIST_ITEM`, `TRADE_OFFER` (al toegevoegd).

Lees ook de regels in de projectopdracht. Denk bijvoorbeeld aan wie een lening mag goedkeuren of wie een sessie mag wijzigen. Spreek onduidelijke regels eerst met het team af.

### Stap 2. Maak de modellen en relaties

1. Maak voor elke tabel een C#-model in `GameShelf.Api/Models`.
2. Gebruik de bestaande `Member` en `Game` als foreign-keydoelen; maak ze niet opnieuw.
3. Voeg voor iedere nieuwe entiteit een `DbSet` toe aan `Data/AppDbContext.cs`.
4. Configureer de foreign keys, delete-regels en ERD-tabel-/kolomnamen in `OnModelCreating`.

De generieke repository verwacht een entiteit met één `Id`. `SHELF_GAME` heeft volgens de ERD een samengestelde primary key (`shelf_id` en `collection_record_id`), dus maak daar niet zomaar een nep-ID voor. Bespreek voor die koppeltabel met het team of jullie EF Core's many-to-many-relatie of een aparte repository gebruiken.

### Stap 3. Maak een migratie en pas die lokaal toe

Een migratie is een automatisch gegenereerd stappenplan voor wijzigingen in de tabellen. Je database verandert pas wanneer je `database update` uitvoert:

1. `dotnet ef migrations add AddCollectionsShelves` vergelijkt de modellen/context met de vorige snapshot en maakt migratiebestanden. Het past de database nog niet aan.
2. `dotnet ef database update` voert die migratie uit op jouw lokale `gameshelf.db`.

Voer deze opdrachten uit vanuit `GameShelf.Api`. Vervang `AddCollectionsShelves` door een korte naam voor jouw wijziging.

**Belangrijk voor het team:** maak niet allemaal tegelijk migraties vanuit verschillende versies van de modellen. Spreek af wie na het samenvoegen van de modelwijzigingen de migratie maakt. Die persoon commit de nieuwe migratiebestanden; de rest haalt ze op en voert `dotnet ef database update` uit. Laat `InitialCreate` staan: die maakt de eerste gedeelde tabellen. Verwijder geen migraties en deel geen `.db`-bestand.

### Stap 4. Voeg DTO's, service en controller toe

Volg daarna de lagen uit ASP.NET-les 1 en 2:

1. Maak request-/response-DTO's in `GameShelf.Api/Dtos`. Stuur geen EF-model rechtstreeks terug naar React.
2. Maak een service-interface en service in `GameShelf.Api/Services`. Zet databasewerk, mapping en bedrijfsregels in de service.
3. Gebruik de bestaande `IRepository<TEntity>` voor gewone entiteiten met één `Id`; maak niet voor elk model een nieuwe generieke repository.
4. Maak een controller in `GameShelf.Api/Controllers`. De controller ontvangt de HTTP-request, roept de service aan en geeft bijvoorbeeld `200`, `201`, `204`, `400`, `404` of `409` terug.
5. Registreer de service in `GameShelf.Api/Program.cs` met dependency injection, net als `IWishlistService`.

Voeg voor elk endpoint een requestvoorbeeld toe aan een `.http`-bestand. Test ook wat er gebeurt met een onbekend ID of ongeldige invoer.

### Stap 5. Koppel de React-pagina aan de API

1. Maak een API-bestand in `my-project/src/api`, één per feature/controller. De bestaande `http.ts` bevat de gedeelde URL en foutafhandeling.
2. Haal de gegevens met `fetch` uit de API; voeg en wijzig gegevens via `POST`, `PUT` of `DELETE` waar jouw feature dat nodig heeft.
3. Vervang de nep-lijst in jouw pagina door de opgehaalde API-data. Toon een laadstatus en een foutmelding.
4. Controleer dat de frontend op `http://localhost:5173` draait. Alleen dat origin staat nu in de CORS-configuratie van de API.

### Stap 6. Controleer je onderdeel

Vanuit `GameShelf.Api`:

```powershell
dotnet build
dotnet ef database update
```

Vanuit `my-project`:

```powershell
npm run build
npm run lint
```

Start beide programma's en controleer de requests in de browser. De endpoints, services en tabellen die al voor Wishlists & Trading bestaan, staan als voorbeeld in `GameShelf.Api/Controllers`, `Services`, `Models` en `Dtos`.

## Opdracht en lessen

- [GameShelf-opdracht en functionele regels](https://github.com/hogeschool/INFWAD/blob/main/Project%20cases/Case%20-%20GameShelf.md)
- [ASP.NET-les 1: data lezen van API tot database](https://github.com/hogeschool/INFWAD/blob/main/Lessons/4%20-%20Track%201%20-%20ASP.NET/ASP.NET%201%20-%20Reading%20data%20end%20to%20end.md)
- [ASP.NET-les 2: data schrijven en architectuur](https://github.com/hogeschool/INFWAD/blob/main/Lessons/4%20-%20Track%201%20-%20ASP.NET/ASP.NET%202%20-%20Writing%20data%2C%20and%20the%20architecture%20behind%20it.md)
- [ASP.NET-les 3: frontend verbinden en data lezen](https://github.com/hogeschool/INFWAD/blob/main/Lessons/4%20-%20Track%201%20-%20ASP.NET/ASP.NET%203%20-%20Connecting%20the%20frontend%2C%20reading.md)
