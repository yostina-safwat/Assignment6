const express = require("express");
const router = express.Router();
const controller = require("../controllers/bookController");

// --- Literal GET routes (declared before the ":title" param route) ---

// Q9. GET /books/title?title=Brave New World
router.get("/title", controller.findByTitle);

// Q10. GET /books/year?from=1990&to=2010
router.get("/year", controller.findByYearRange);

// Q11. GET /books/genre?genre=Science Fiction
router.get("/genre", controller.findByGenre);

// Q12. GET /books/skip-limit
router.get("/skip-limit", controller.skipLimit);

// Q13. GET /books/year-integer
router.get("/year-integer", controller.findYearInteger);

// Q14. GET /books/exclude-genres
router.get("/exclude-genres", controller.excludeGenres);

// Q16. GET /books/aggregate1
router.get("/aggregate1", controller.aggregate1);

// Q17. GET /books/aggregate2
router.get("/aggregate2", controller.aggregate2);

// Q18. GET /books/aggregate3
router.get("/aggregate3", controller.aggregate3);

// Q19. GET /books/aggregate4
router.get("/aggregate4", controller.aggregate4);

// Q15. DELETE /books/before-year?year=2000
router.delete("/before-year", controller.deleteBeforeYear);

// --- Insert / update routes ---

// Q6. POST /books/batch
router.post("/batch", controller.insertMany);

// Q5. POST /books
router.post("/", controller.insertOne);

// Q8. PATCH /books/Future  ->  PATCH /books/:title
router.patch("/:title", controller.updateByTitle);

module.exports = router;
