const express = require("express");
const router = express.Router();
const controller = require("../controllers/collectionController");

// Q1. POST /collection/books
router.post("/books", controller.createBooksCollection);

// Q2. POST /collection/authors
router.post("/authors", controller.createAuthorsCollection);

// Q3. POST /collection/logs/capped
router.post("/logs/capped", controller.createLogsCappedCollection);

// Q4. POST /collection/books/index
router.post("/books/index", controller.createBooksTitleIndex);

module.exports = router;
