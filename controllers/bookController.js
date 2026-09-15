const { getDB } = require("../config/db");

const books = () => getDB().collection("books");

// Q5. Insert one document into the books collection.
// URL: POST /books
exports.insertOne = async (req, res, next) => {
  try {
    const doc = Object.keys(req.body || {}).length
      ? req.body
      : { title: "Future", author: "John Doe", year: 2019, genres: ["Science Fiction"] };
    const result = await books().insertOne(doc);
    res.status(201).json({ message: "Book inserted", insertedId: result.insertedId });
  } catch (err) {
    next(err);
  }
};

// Q6. Insert multiple documents (at least three) into the books collection.
// URL: POST /books/batch
exports.insertMany = async (req, res, next) => {
  try {
    const docs = Array.isArray(req.body) && req.body.length
      ? req.body
      : [
          { title: "Brave New World", author: "Aldous Huxley", year: 1932, genres: ["Science Fiction", "Dystopia"] },
          { title: "1984", author: "George Orwell", year: 1949, genres: ["Science Fiction", "Dystopia"] },
          { title: "The Shining", author: "Stephen King", year: 1977, genres: ["Horror"] },
          { title: "The Old Man and the Sea", author: "Ernest Hemingway", year: 1952, genres: ["Fiction"] },
        ];
    const result = await books().insertMany(docs);
    res.status(201).json({ message: "Books inserted", insertedCount: result.insertedCount, insertedIds: result.insertedIds });
  } catch (err) {
    next(err);
  }
};

// Q8. Update the book with title "Future" -> change the year to 2022.
// URL: PATCH /books/Future  (implemented as PATCH /books/:title)
exports.updateByTitle = async (req, res, next) => {
  try {
    const { title } = req.params;
    const update = Object.keys(req.body || {}).length ? req.body : { year: 2022 };
    const result = await books().updateOne({ title }, { $set: update });
    res.json({ message: `Book '${title}' updated`, matchedCount: result.matchedCount, modifiedCount: result.modifiedCount });
  } catch (err) {
    next(err);
  }
};

// Q9. Find a Book with title "Brave New World".
// URL: GET /books/title?title=Brave New World
exports.findByTitle = async (req, res, next) => {
  try {
    const { title } = req.query;
    const result = await books().find({ title }).toArray();
    res.json(result);
  } catch (err) {
    next(err);
  }
};

// Q10. Find all books published between 1990 and 2010.
// URL: GET /books/year?from=1990&to=2010
exports.findByYearRange = async (req, res, next) => {
  try {
    const from = parseInt(req.query.from, 10);
    const to = parseInt(req.query.to, 10);
    const result = await books().find({ year: { $gte: from, $lte: to } }).toArray();
    res.json(result);
  } catch (err) {
    next(err);
  }
};

// Q11. Find books where the genre includes "Science Fiction".
// URL: GET /books/genre?genre=Science Fiction
exports.findByGenre = async (req, res, next) => {
  try {
    const { genre } = req.query;
    const result = await books().find({ genres: genre }).toArray();
    res.json(result);
  } catch (err) {
    next(err);
  }
};

// Q12. Skip the first two books, limit to the next three, sorted by year desc.
// URL: GET /books/skip-limit
exports.skipLimit = async (req, res, next) => {
  try {
    const result = await books()
      .find({})
      .sort({ year: -1 })
      .skip(2)
      .limit(3)
      .toArray();
    res.json(result);
  } catch (err) {
    next(err);
  }
};

// Q13. Find books where the year field is stored as an integer.
// URL: GET /books/year-integer
exports.findYearInteger = async (req, res, next) => {
  try {
    const result = await books().find({ year: { $type: "int" } }).toArray();
    res.json(result);
  } catch (err) {
    next(err);
  }
};

// Q14. Find all books where the genres field does NOT include "Horror" or "Science Fiction".
// URL: GET /books/exclude-genres
exports.excludeGenres = async (req, res, next) => {
  try {
    const result = await books()
      .find({ genres: { $nin: ["Horror", "Science Fiction"] } })
      .toArray();
    res.json(result);
  } catch (err) {
    next(err);
  }
};

// Q15. Delete all books published before 2000.
// URL: DELETE /books/before-year?year=2000
exports.deleteBeforeYear = async (req, res, next) => {
  try {
    const year = parseInt(req.query.year, 10);
    const result = await books().deleteMany({ year: { $lt: year } });
    res.json({ message: `Deleted books published before ${year}`, deletedCount: result.deletedCount });
  } catch (err) {
    next(err);
  }
};

// Q16. Aggregation: filter books published after 2000 and sort by year descending.
// URL: GET /books/aggregate1
exports.aggregate1 = async (req, res, next) => {
  try {
    const result = await books()
      .aggregate([
        { $match: { year: { $gt: 2000 } } },
        { $sort: { year: -1 } },
      ])
      .toArray();
    res.json(result);
  } catch (err) {
    next(err);
  }
};

// Q17. Aggregation: books published after 2000, project only title, author, year.
// URL: GET /books/aggregate2
exports.aggregate2 = async (req, res, next) => {
  try {
    const result = await books()
      .aggregate([
        { $match: { year: { $gt: 2000 } } },
        { $project: { _id: 0, title: 1, author: 1, year: 1 } },
      ])
      .toArray();
    res.json(result);
  } catch (err) {
    next(err);
  }
};

// Q18. Aggregation: break an array of genres into separate documents.
// URL: GET /books/aggregate3
exports.aggregate3 = async (req, res, next) => {
  try {
    const result = await books()
      .aggregate([{ $unwind: "$genres" }])
      .toArray();
    res.json(result);
  } catch (err) {
    next(err);
  }
};

// Q19. Aggregation: join the books collection with the logs collection.
// URL: GET /books/aggregate4
exports.aggregate4 = async (req, res, next) => {
  try {
    const result = await books()
      .aggregate([
        {
          $lookup: {
            from: "logs",
            localField: "title",
            foreignField: "book",
            as: "logs",
          },
        },
      ])
      .toArray();
    res.json(result);
  } catch (err) {
    next(err);
  }
};
