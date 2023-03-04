const argon2 = require("argon2");

const jwt = require("jsonwebtoken");
const models = require("../models");

class UserController {
  static browse = (req, res) => {
    models.user
      .findAll()
      .then(([rows]) => {
        res.send(rows);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  static read = (req, res) => {
    models.user
      .find(req.params.id)
      .then(([rows]) => {
        if (rows[0] == null) {
          res.sendStatus(404);
        } else {
          res.send(rows[0]);
        }
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  static edit = (req, res) => {
    const item = req.body;

    // TODO validations (length, format...)

    item.id = parseInt(req.params.id, 10);

    models.user
      .update(item)
      .then(([result]) => {
        if (result.affectedRows === 0) {
          res.sendStatus(404);
        } else {
          res.sendStatus(204);
        }
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  static register = async (req, res) => {
    const {
      firstname,
      lastname,
      password,
      email,
      // eslint-disable-next-line camelcase
      phone_number,
      status,
      // eslint-disable-next-line camelcase
      github_address,
    } = req.body;
    if (!firstname || !lastname || !email || !password) {
      res.status(400).send({ error: "Tous les champs doivent être remplis" });
      return;
    }

    try {
      const hash = await argon2.hash(password);
      models.user
        .insert({
          firstname,
          lastname,
          password: hash,
          email,
          // eslint-disable-next-line camelcase
          phone_number,
          status,
          // eslint-disable-next-line camelcase
          github_address,
        })
        .then(([result]) => {
          res.status(201).send({ id: result.insertId, password, email });
        })
        .catch((err) => {
          console.error(err);
          res.sendStatus(500);
        });
    } catch (err) {
      console.error(err);
      res.status(500).send({ error: err.message });
    }
  };

  static login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).send({ error: "Please specify both email and password" });
    }

    models.user
      .findByMail(email)
      .then(async ([rows]) => {
        if (rows[0] == null) {
          res.status(403).send({
            error: "Invalid email",
          });
        } else {
          const { id, password: hash } = rows[0];

          if (await argon2.verify(hash, password)) {
            const token = jwt.sign({ id, email }, process.env.JWT_AUTH_SECRET, {
              expiresIn: "1h",
            });

            res
              .cookie("usertoken", token, {
                httpOnly: true,

                secure: false,
              })
              .status(200)
              .send({
                id,
                email,
                token,
              });
          } else {
            res.status(403).send({
              error: "Invalid password",
            });
          }
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send({
          error: err.message,
        });
      });
  };

  static delete = (req, res) => {
    models.user
      .delete(req.params.id)
      .then(() => {
        res.sendStatus(204);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  static authorization = (req, res) => {
    const token = req.cookies.usertoken;
    if (!token) {
      return res.sendStatus(401);
    }
    try {
      jwt.verify(token, process.env.JWT_AUTH_SECRET);
      return res.sendStatus(200);
    } catch {
      return res.status(401).send("Vous n'êtes pas connecter");
    }
  };
}

module.exports = UserController;
