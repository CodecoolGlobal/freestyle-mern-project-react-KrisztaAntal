<a id="readme-top"></a>

<div align="center">
  <img src="https://github.com/user-attachments/assets/1dbf64f1-262b-48d0-931a-31aa42615c56" alt="Logo">
  <p>
    This two-sprint school project was about to learn MERN stack by creating a website that uses an external API, Vite for the frontend and Express with MongoDB as backend server.</br>
    We chose Google's Books API for a site where the user can search from a list of books, filtering them by title, author, genre or publication year.
    Clicking on the Show details button, we can see a short description of the book and reviews added by logged in users. </br>
    If the user logs in, they can also add reviews and on the library page an extra Add to collection button appears for each book. The user can add books to their collection and set which page they currently read and it shows their reading progress.
  </p>
  <img src="https://github.com/user-attachments/assets/0afb1d50-d0a9-48a5-a643-2d385f464d45" alt="main-page" width="600px">
</div>

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#built-with">Built With</a></li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li>
      <a href="#usage">Usage</a>
      <ul>
        <li><a href="#filter">Filter</a></li>
        <li><a href="#details-page">Details page</a></li>
        <li><a href="#reviews">Reviews</a></li>
        <li><a href="#collection">Collection</a></li>
      </ul>
    </li>
  </ol>
</details>

## Built with

[![JavaScript]](#) [![React][React.js]][React-url] [![Vite]][Vite-url]  [![CSS]](#) [![Bootstrap]][Bootstrap-url] 

[![Express.js]][Express.js-url] [![NodeJS]][NodeJS-url] [![npm]][npm-url] 

[![Git]][Git-url] [![Visual-Studio-Code]][Visual-Studio-Code-url] [![MongoDB]][MongoDB-url] [![Google]][Google-books-url] 

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Getting Started

### Prerequisites

* Register to MongoDB and create a free <a href="https://www.mongodb.com/resources/products/fundamentals/mongodb-cluster-setup">cluster</a>
* npm
  ```sh
  npm install npm@latest -g
  ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>


### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/CodecoolGlobal/freestyle-mern-project-react-KrisztaAntal.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Create environment variable: MONGO_DB_URL = "your-MongoDB-cluster-url"
4. Open a terminal and step into the server directory in the project's directory
5. Write command: ```node testdata.js```
6. Write command: ```node migration.js```
7. Write command: ```node server.js```
8. Open a new terminal and step into the book-worms directory which is inside the client directory which is inside the project's directory
9. Write command: ```npm run dev```


Currently the site has a test user "admin" so to see the behaviour of the site with a logged in user please write admin in the login input.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Usage
<div align="center"> 
  <h3>Filter</h3>
    <p>
      The user can filter books by title, author, genre and publication year.
      The filtering is case insensitive and the value put into the input field can be anywhere in the searched part, for exaxple writing "ill" into the title filter will show three books titled: Papillon, The Pillars of the Earth and Will You be There?
    </p>
    <img src="https://github.com/user-attachments/assets/79a4bc44-7633-4f78-a631-3275430d21d0" alt="filtering" width="600px">
  <p align="right">(<a href="#readme-top">back to top</a>)</p>
  <h3>Details page</h3>
    <p>
      Here the user can see the title, author, category, publishing year, number of pages and a summary of the book and the reviews given by other logged in users. 
      Clicking on the Back button steps back to the Main library page
    </p>
    <img src="https://github.com/user-attachments/assets/ac3a4b22-2146-4d3c-9551-93cb62d33617" alt"details-page" width="600px">
  <p align="right">(<a href="#readme-top">back to top</a>)</p>
  <h3>Reviews</h3>
    <p>
      A logged in user can add a review with a short text and a rate from 1 to 5. Non registered users can only see them.
    </p>
    <img src="https://github.com/user-attachments/assets/8c8a25dc-dfdf-412f-96a1-c1a06813994c" alt="review" width="600px">
  <p align="right">(<a href="#readme-top">back to top</a>)</p>
  <h3>Collection</h3>
    <p>A registered user can add books to their collection and can set their reading progress by writing which page they are on currently.</p>
    <img src="https://github.com/user-attachments/assets/92748350-f90d-4e76-a04b-d548807d9b4c" alt="collection" width="600px">
  <p align="right">(<a href="#readme-top">back to top</a>)</p>
</div>


[JavaScript]: https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=000

[React.js]: https://img.shields.io/badge/React-%2320232a.svg?logo=react&logoColor=%2361DAFB
[React-url]: https://reactjs.org/

[CSS]: https://img.shields.io/badge/CSS-1572B6?logo=css3&logoColor=fff

[Git]: https://img.shields.io/badge/Git-F05032?logo=git&logoColor=fff
[Git-url]: https://git-scm.com/

[MongoDB]: https://img.shields.io/badge/MongoDB-%234ea94b.svg?logo=mongodb&logoColor=white
[MongoDB-url]: https://www.mongodb.com/

[Bootstrap]: https://img.shields.io/badge/Bootstrap-7952B3?logo=bootstrap&logoColor=fff
[Bootstrap-url]: https://getbootstrap.com/

[Express.js]: https://img.shields.io/badge/Express.js-%23404d59.svg?logo=express&logoColor=%2361DAFB
[Express.js-url]: https://expressjs.com/en/starter/installing.html

[NodeJS]: https://img.shields.io/badge/Node.js-6DA55F?logo=node.js&logoColor=white
[NodeJS-url]: https://nodejs.org/en

[npm]: https://img.shields.io/badge/npm-CB3837?logo=npm&logoColor=fff
[npm-url]: https://docs.npmjs.com/downloading-and-installing-node-js-and-npm

[Vite]: https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=fff
[Vite-url]: https://vite.dev/guide/

[Google]: https://img.shields.io/badge/Google-4285F4?logo=google&logoColor=white
[Google-books-url]: https://developers.google.com/books

[Visual-Studio-Code]: https://custom-icon-badges.demolab.com/badge/Visual%20Studio%20Code-0078d7.svg?logo=vsc&logoColor=white
[Visual-Studio-Code-url]: https://code.visualstudio.com/
