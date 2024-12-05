const express = require("express");
const app = express();

require("dotenv").config();

const db = require("./config/db");

app.set("view engine", "ejs");

// For form and json data:
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Static middleware:
app.use(express.static("public"));
app.use(express.static("views"));

//Home route
app.get("/", (req, res) => {
  const allData = "select * from book_store";
  db.query(allData, (err, rows) => {
    if (err) {
      res.send(err);
    } else {
      res.render("home.ejs", { rows });
    }
  });
});

// User route
app.get("/user/register", (req, res) => {
  res.redirect("/user.register.html");
});

app.post("/user/register", (req, res) => {
  const { name, email, contact, address, password } = req.body;

  try {
    db.query(`SELECT * FROM user WHERE email = ?`, [email], (err, rows) => {
      if (rows.length > 0) {
        res.status(409).send({ Message: "User already exists" });
      } else {
        db.query(
          "INSERT INTO user (name, email, contact, address, password) VALUES (?,?,?,?,?)",
          [name, email, contact, address, password],
          (err, result) => {
            if (err) {
              console.error("Error inserting user:", err);
              return res.status(500).send({ Message: "Internal Server Error" });
            }
            res.redirect("/user/login");
          }
        );
      }
    });
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).send({ Message: "Unexpected error occurred" });
  }
});

app.get("/user/login", (req, res) => {
  res.redirect("/user.login.html");
});

app.post("/user/login", (req, res) => {
  const { email, password } = req.body;

  db.query(`SELECT * FROM user WHERE email = ?`, [email], (err, rows) => {
    if (rows.length === 0) {
      return res.status(409).send({ Message: "Email not found" });
    }

    const user = rows[0];

    if (user.password !== password) {
      return res.status(409).send({ Message: "Password not matched" });
    }

    res.redirect("/book-store");
  });
});

// ========================== User Part ends herer ==================================

// Admin route starts here

app.get("/admin/login", (req, res) => {
  res.redirect("/admin.login.html");
});

app.post("/admin/login", (req, res) => {
  const { email, password } = req.body;

  db.query(`SELECT * FROM admin WHERE email = ?`, [email], (err, rows) => {
    if (rows.length === 0) {
      return res.status(409).send({ Message: "Email not found" });
    }

    const user = rows[0];

    if (user.password !== password) {
      return res.status(409).send({ Message: "Password not matched" });
    }

    res.redirect("/admin-dashboard");
  });
});

app.get("/admin-dashboard", (req, res) => {
  res.redirect("/admin.dashboard.html");
});

//Delete user
app.get("/delete-user", (req, res) => {
  const deleteData = "delete from user where user_id=?";
  db.query(deleteData, [req.query.id], (err, rows) => {
    if (err) {
      res.send(err);
    } else {
      res.redirect("/show-user");
    }
  });
});

//Update user
app.get("/update-user", (req, res) => {
  db.query(
    "select * from user where user_id=?",
    [req.query.id],
    (err, eachRow) => {
      if (err) {
        res.send(err);
      } else {
        result = JSON.parse(JSON.stringify(eachRow[0]));
        res.render("edit.user.ejs", { result });
      }
    }
  );
});

//Final update:
app.post("/updated-user", (req, res) => {
  var user_id = req.body.user_id;
  var name = req.body.name;
  var email = req.body.email;
  var contact = req.body.contact;
  var address = req.body.address;
  var password = req.body.password;

  db.query(
    "UPDATE user SET name=?, email=?, contact=?, address=?, password=? WHERE user_id=?",
    [name, email, contact, address, password, user_id],
    (err, rows) => {
      if (err) {
        res.send(err);
      } else {
        res.redirect("/show-user");
      }
    }
  );
});

app.get("/show-user", (req, res) => {
  const allData = "select * from user";
  db.query(allData, (err, rows) => {
    if (err) {
      res.send(err);
    } else {
      res.render("read.user.ejs", { rows });
    }
  });
});

//=======================  Managed User ========================================================

app.get("/show-books", async (req, res) => {
  const allData = "select * from book_store";
  db.query(allData, (err, rows) => {
    if (err) {
      res.send(err);
    } else {
      res.render("read.book.ejs", { rows });
    }
  });
});

// Add Book
app.get("/add-book", (req, res) => {
  res.redirect("/book.register.html");
});

app.post("/added-book", (req, res) => {
  const { isbn, name, edition, author, publisher, type, quantity, price } =
    req.body;

  db.query(`SELECT * FROM book_store WHERE isbn = ?`, [isbn], (err, rows) => {
    if (rows.length > 0) {
      res.status(409).send({ Message: "Book already exists" });
    } else {
      db.query(
        "INSERT INTO book_store (isbn, name, edition, author, publisher, type, quantity,price) VALUES (?,?,?,?,?,?,?,?)",
        [isbn, name, edition, author, publisher, type, quantity, price],
        (err, result) => {
          res.redirect("/show-books");
        }
      );
    }
  });
});

//Delete Book
app.get("/delete-book", (req, res) => {
  const deleteData = "delete from book_store where isbn=?";
  db.query(deleteData, [req.query.id], (err, rows) => {
    if (err) {
      res.send(err);
    } else {
      res.redirect("/show-books");
    }
  });
});

//Update Book
app.get("/update-book", (req, res) => {
  db.query(
    "select * from book_store where isbn=?",
    [req.query.id],
    (err, eachRow) => {
      if (err) {
        res.send(err);
      } else {
        result = JSON.parse(JSON.stringify(eachRow[0]));
        res.render("edit.book.ejs", { result });
      }
    }
  );
});

//Final update:
app.post("/updated-book", (req, res) => {
  var isbn = req.body.isbn;
  var name = req.body.name;
  var edition = req.body.edition;
  var author = req.body.author;
  var publisher = req.body.publisher;
  var type = req.body.type;
  var quantity = req.body.quantity;
  var price = req.body.price;

  db.query(
    "UPDATE book_store SET name=?, edition=?, author=?, publisher=?, type=?, quantity=?,price=?   WHERE isbn=?",
    [name, edition, author, publisher, type, quantity, price, isbn],
    (err, rows) => {
      if (err) {
        res.send(err);
      } else {
        res.redirect("/show-books");
      }
    }
  );
});

//================== Managed Book ================================================================================

//Book Store:
app.get("/book-store", (req, res) => {
  const allData = "select * from book_store";
  db.query(allData, (err, rows) => {
    if (err) {
      res.send(err);
    } else {
      res.render("book.store.ejs", { rows });
    }
  });
});

app.get("/book-store/rent", (req, res) => {
  db.query(
    "select * from book_store where isbn=?",
    [req.query.id],
    (err, eachRow) => {
      if (err) {
        res.send(err);
      } else {
        result = JSON.parse(JSON.stringify(eachRow[0]));
        res.render("rent.form.ejs", { result });
      }
    }
  );
});

app.post("/book-store/rented", (req, res) => {
  var starting_date = new Date();

  var {
    name,
    edition,
    author,
    publisher,
    quantity,
    price,
    uName,
    return_date,
    cNumber,
    address,
  } = req.body;

  db.query(
    "select * from book_store where quantity=?",
    [quantity],
    (err, eachRow) => {
      result = JSON.parse(JSON.stringify(eachRow[0]));

      if (result.quantity === 0) {
        res.redirect("/book.stockout.html");
      } else {
        db.query(
          "INSERT INTO `rent_book`( `bName`, `editon`, `author`, `publisher`, `price`, `uName`, `starting_date`, `return_date`, `cNumber`, `address`) VALUES(?,?,?,?,?,?,?,?,?,?)",
          [
            name,
            edition,
            author,
            publisher,
            price,
            uName,
            starting_date,
            return_date,
            cNumber,
            address,
          ],
          (err, result) => {
            if (err) {
              res.send(err);
            } else {
              res.redirect("/rent.successful.html");
            }
          }
        );
      }
    }
  );
});

//For invalid route:
app.use((req, res, next) => {
  res.status(404).json({ message: "Invalid route" });
});

//For server error:
app.use((err, req, res, next) => {
  res.status(404).json({ message: err.message + "Server error" });
});

module.exports = app;
