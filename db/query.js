const pool = require("../config.js");
const express = require("express");
const router = express.Router();

// query untuk menampilkan semua isi di table film
router.get("/films", (req, res) => {
  const findQuery = `SELECT * FROM film`;

  pool.query(findQuery, (err, response) => {
    if (err) throw err;

    res.status(200).json(response.rows);
  });
});

// query untuk menampilkan film by id
router.get("/films/:film_id", (req, res) => {
  console.log(req.params);
  const { film_id } = req.params;

  const findQuery = `SELECT * FROM film WHERE film_id = $1`;

  pool.query(findQuery, [film_id], (err, response) => {
    if (err) throw err;

    res.status(200).json(response.rows[0]);
  });
});

// query untuk menampilkan film dan jenis kategorinya
router.get("/film_category", (req, res) => {
  const findQuery = `
  SELECT
    film.title AS title,
    cat.name AS name_category,
    fc.category_id AS film_category
  FROM film
    INNER JOIN film_category AS fc
      ON fc.category_id = film.film_id
    INNER JOIN category AS cat
      on cat.category_id = film.film_id
  `;

  pool.query(findQuery, (err, response) => {
    if (err) throw err;

    res.status(200).json(response.rows);
  });
});

// query untuk menampilkan jenis kategori film
router.get("/category", (req, res) => {
  const findQuery = `SELECT * FROM category`;

  pool.query(findQuery, (err, response) => {
    if (err) throw err;

    res.status(200).json(response.rows);
  });
});

//query untuk menampilkan list film berdasarkan kategori

module.exports = router;
