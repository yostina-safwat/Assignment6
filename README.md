# Assignment 6 — Express.js with MongoDB

Each of the 19 questions is solved twice:

- **MongoDB Shell** — see [`mongosh-solutions.txt`](./mongosh-solutions.txt)
- **Express.js with MongoDB** — the API in this repository

Bonus (LeetCode *Roman to Integer*) is in [`bonus.js`](./bonus.js).

## Project structure

```
Assignment6/
├── config/
│   └── db.js                 # MongoDB connection
├── controllers/
│   ├── collectionController.js
│   ├── bookController.js
│   └── logController.js
├── routes/
│   ├── collectionRoutes.js
│   ├── bookRoutes.js
│   └── logRoutes.js
├── server.js                 # App entry point
├── mongosh-solutions.txt     # Same questions solved in the MongoDB shell
├── bonus.js                  # LeetCode: Roman to Integer
├── .env.example
└── package.json
```

## Setup

```bash
npm install
cp .env.example .env   # adjust MONGO_URI / DB_NAME if needed
npm start
```

Requires a running MongoDB instance (local or Atlas). Set the connection
string via `MONGO_URI` in `.env`.

## Endpoints

| #  | Method | URL                                   | Description |
|----|--------|---------------------------------------|-------------|
| 1  | POST   | `/collection/books`                   | Create explicit `books` collection with non-empty `title` validation |
| 2  | POST   | `/collection/authors`                 | Create implicit `authors` collection by inserting a document |
| 3  | POST   | `/collection/logs/capped`             | Create capped `logs` collection (1MB) |
| 4  | POST   | `/collection/books/index`             | Create index on `books.title` |
| 5  | POST   | `/books`                              | Insert one book |
| 6  | POST   | `/books/batch`                        | Insert multiple books (≥ 3) |
| 7  | POST   | `/logs`                               | Insert a log |
| 8  | PATCH  | `/books/Future`                       | Update book "Future" → year 2022 |
| 9  | GET    | `/books/title?title=Brave New World`  | Find a book by title |
| 10 | GET    | `/books/year?from=1990&to=2010`       | Find books published in a year range |
| 11 | GET    | `/books/genre?genre=Science Fiction`  | Find books by genre |
| 12 | GET    | `/books/skip-limit`                   | Skip 2, limit 3, sort by year desc |
| 13 | GET    | `/books/year-integer`                 | Find books where `year` is an integer |
| 14 | GET    | `/books/exclude-genres`               | Exclude "Horror" and "Science Fiction" |
| 15 | DELETE | `/books/before-year?year=2000`        | Delete books published before 2000 |
| 16 | GET    | `/books/aggregate1`                   | Aggregation: after 2000, sort year desc |
| 17 | GET    | `/books/aggregate2`                   | Aggregation: after 2000, project title/author/year |
| 18 | GET    | `/books/aggregate3`                   | Aggregation: unwind genres |
| 19 | GET    | `/books/aggregate4`                   | Aggregation: join books with logs |

### Request body examples

`POST /books`
```json
{ "title": "Future", "author": "John Doe", "year": 2019, "genres": ["Science Fiction"] }
```

`POST /books/batch`
```json
[
  { "title": "Brave New World", "author": "Aldous Huxley", "year": 1932, "genres": ["Science Fiction", "Dystopia"] },
  { "title": "1984", "author": "George Orwell", "year": 1949, "genres": ["Science Fiction", "Dystopia"] },
  { "title": "The Shining", "author": "Stephen King", "year": 1977, "genres": ["Horror"] }
]
```

`POST /logs`
```json
{ "book": "Future", "action": "created" }
```
