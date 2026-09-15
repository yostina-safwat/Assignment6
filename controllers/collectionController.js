const { getDB } = require("../config/db");

// Q1. Create an explicit collection "books" with a validation rule so each
// document has a non-empty "title" field.
// URL: POST /collection/books
exports.createBooksCollection = async (req, res, next) => {
  try {
    const db = getDB();
    await db.createCollection("books", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["title"],
          properties: {
            title: {
              bsonType: "string",
              minLength: 1,
              description: "title must be a non-empty string and is required",
            },
          },
        },
      },
      validationLevel: "strict",
      validationAction: "error",
    });
    res.status(201).json({ message: "Collection 'books' created with title validation" });
  } catch (err) {
    if (err.codeName === "NamespaceExists") {
      return res.status(200).json({ message: "Collection 'books' already exists" });
    }
    next(err);
  }
};

// Q2. Create an implicit collection "authors" by inserting data directly.
// URL: POST /collection/authors
exports.createAuthorsCollection = async (req, res, next) => {
  try {
    const db = getDB();
    const doc = Object.keys(req.body || {}).length
      ? req.body
      : { name: "George Orwell", nationality: "British" };
    const result = await db.collection("authors").insertOne(doc);
    res.status(201).json({
      message: "Implicit collection 'authors' created by inserting a document",
      insertedId: result.insertedId,
    });
  } catch (err) {
    next(err);
  }
};

// Q3. Create a capped collection "logs" with a size limit of 1MB.
// URL: POST /collection/logs/capped
exports.createLogsCappedCollection = async (req, res, next) => {
  try {
    const db = getDB();
    await db.createCollection("logs", {
      capped: true,
      size: 1024 * 1024, // 1MB
    });
    res.status(201).json({ message: "Capped collection 'logs' created with a 1MB size limit" });
  } catch (err) {
    if (err.codeName === "NamespaceExists") {
      return res.status(200).json({ message: "Collection 'logs' already exists" });
    }
    next(err);
  }
};

// Q4. Create an index on the books collection for the title field.
// URL: POST /collection/books/index
exports.createBooksTitleIndex = async (req, res, next) => {
  try {
    const db = getDB();
    const indexName = await db.collection("books").createIndex({ title: 1 });
    res.status(201).json({ message: "Index created on books.title", indexName });
  } catch (err) {
    next(err);
  }
};
