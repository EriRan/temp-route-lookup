# Solidabis Code Challenge of April
# Solidabiksen Huhtikuun koodihaaste

## In English

This is a submission to Solidabis' code challenge that was posted in April of 2020. The challenge page can be found here: https://koodihaaste.solidabis.com/ . Goal of the code challenge was to create a route search web application where the user could select a route between two stops and receive the fastest possible route to get between the two stops using the available bus lines. It was developed with Windows 10 operating system.

### Description

This application uses the provided route data json to first render the bus stops and the roads between them. Bus stops are rendered in a crawling style: we first start from one of the stops and then render the neighbouring stops and their neighbours and so on. Neighbours are placed in one of the eight available directions and the duration between the stops affects the lenght of the road when possible. Route calculation between the stops is done using adapted [Dijkstra's algorithm](https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm) which takes into account which bus line should be used between the roads as well.

### Technologies used

* React ja React-Redux
  * Core of the application
* Jest
  * Testing
* Material UI
  * User Interface components
* Lodash
  * General purpose conditions

### How to run

#### Required dependencies

1. If you do not have Node.js or npm on your computer, start by downloading it from here: https://www.npmjs.com/get-npm

#### Running the application

1. Download this repository and extract it
2. Open your preferred command line at the extracted folder
3. Type `npm install`
4. After installation is complete, type `npm start`
5. Browser window should now open with the application

## Suomeksi

Tämä repositorio on vastaus Solidabiksen koodihaasteeseen, joka julkaistiin 2020 huhtikuussa. Haaste löytyy täältä: https://koodihaaste.solidabis.com/ . Tavoitteena oli toteuttaa verkkosivu, jossa pystyy hakemaan nopeimman reitin kahden valitun bussipysäkin välille käyttäen saatavilla olevia bussilinjoja. Sovellus koodattiin Windows 10 -käyttöjärjestelmällä.

### Kuvaus

Sovellus käyttää haasteen JSON -dataa piirtämään bussipysäkit ja tiet, jotka yhdistävät niitä. Piirtäminen aloitetaan ensimmäisestä pysäkistä, jonka jälkeen siirrytään pysäkin naapureihin ja niiden naapureihin. Naapurit sijoitetaan yhteen kahdeksasta mahdollisesta suunnasta ja tiellä olevaa kesto-arvoa käytetään tien pituuden määrittämisessä, kun mahdollista. Reittien laskuun käytetään [Dijkstran algoritmia](https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm), joka ottaa huomioon bussilinjat, joita käytetään pysäkkien välillä.

### Käytetyt teknologiat

* React ja React-Redux
  * Sovelluksen ydin
* Jest
  * Testaus
* Material UI
  * Käyttöliittymäkomponentit
* Lodash
  * Yleiskäyttöiset ehtolauseet

### Käyttöohjeet

#### Tarvitut muut sovellukset

1. Jos sinulla ei ole Node.js eikä npm:ää tietokoneellasi, lataa ja asenna se täältä: https://www.npmjs.com/get-npm

#### Miten ajaa

1. Lataa tämä repositorio ja pura se
2. Avaa jokin komentokehoite puretussa kansiossa
3. Kirjoita komentokehoitteeseen `npm install`
4. Kun asennus on valmis, kirjoita `npm start`
5. Sovelluksen pitäisi nyt aueta selaimeesi