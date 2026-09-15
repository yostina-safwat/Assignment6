const { getDB } = require("../config/db");

// Q7. Insert a new log into the logs collection.
// URL: POST /logs
exports.insertLog = async (req, res, next) => {
  try {
    const db = getDB();
    const doc = Object.keys(req.body || {}).length
      ? req.body
      : { book: "Future", action: "created", createdAt: new Date() };
    const result = await db.collection("logs").insertOne(doc);
    res.status(201).json({ message: "Log inserted", insertedId: result.insertedId });
  } catch (err) {
    next(err);
  }
};
