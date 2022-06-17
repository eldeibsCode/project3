const crypto = require("crypto");

const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");

const User = require("../models/user");
const sendGrid = require("../usersData/data").sendGrid;

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: sendGrid,
    },
  })
);

exports.getLogin = (req, res, next) => {
  // const isLoggedIn = req.get("Cookie").trim().split("=")[1];
  // console.log(req.session);
  // console.log(req.flash('error'));
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("auth/login", {
    pageTitle: "Login",
    path: "/login",
    errorMessage: message,
  });
};

exports.getSignup = (req, res, next) => {
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("auth/signup", {
    path: "/signup",
    pageTitle: "Signup",
    errorMessage: message,
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  // console.log("postLogin");
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        req.flash("error", "Invalid email or password.");
        return res.redirect("/login");
      }
      bcrypt
        .compare(password, user.password)
        .then((isMatched) => {
          if (isMatched) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save((err) => {
              // console.log('postLogin 1', err);
              res.redirect("/");
            });
          }
          req.flash("error", "Invalid password or Email !!");
          return res.redirect("/login");
        })
        .catch((err) => {
          console.log(err);
          res.redirect("/login");
        });
    })
    .catch((err) => console.log('postLogin 2',err));
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  User.findOne({ email: email })
    .then((userDoc) => {
      if (userDoc) {
        req.flash("error", "this email is already used !!");
        return res.redirect("/signup");
      }
      return bcrypt
        .hash(password, 12)
        .then((hashedPassword) => {
          const user = new User({
            email: email,
            password: hashedPassword,
            cart: { items: [] },
          });
          return user.save();
        })
        .then((result) => {
          res.redirect("/login");
          return transporter.sendMail({
            to: email,
            from: "eldeib.info@gmail.com",
            subject: "Singup succeeded!",
            html: "<h1> you successfully signed up ! </h1>",
          });
        })
        .catch((err) => {
          console.log('postSignup',err);
        });
    })
    .catch((err) => {
      console.log('postSignup',err);
    });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    // console.log('postLogout',err);
    res.redirect("/");
  });
};

exports.getReset = (req, res, next) => {
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("auth/reset", {
    path: "/reset",
    pageTitle: "Reset password",
    errorMessage: message,
  });
};

exports.postReset = (req, res, next) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log('postReset',err);
      return res.redirect("/reset");
    }
    const token = buffer.toString("hex");
    User.findOne({ email: req.body.email })
      .then((user) => {
        if (!user) {
          // console.log("other dummy email");
          req.flash("error", "No account with that email");
          return res.redirect("/reset");
        }
        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + 3600000;
        return user.save();
      })
      .then((result) => {
        // console.log(result);
        res.redirect("/");
        transporter.sendMail({
          to: req.body.email,
          from: "eldeib.info@gmail.com",
          subject: "Password reset",
          html: `
            <p> You requested a password reset </p>
            <p> Click this link to set a new password</p>
            <a href="http://localhost:3000/reset/${token}">Link </a>
          `,
        });
      })
      .catch((err) => console.log('postReset',err));
  });
};

exports.getNewPassword = (req, res, next) => {
  const token = req.params.token;
  // console.log(token);
  User.findOne({ resetToken: token, resetTokenExpiration: { $gt: Date.now() } })
    .then((user) => {
      let message = req.flash("error");
      if (message.length > 0) {
        message = message[0];
      } else {
        message = null;
      }
      // console.log(user);
      res.render("auth/new-password", {
        path: "/new-password",
        pageTitle: "Reset password",
        errorMessage: message,
        userId: user._id.toString(),
        passwordToken: token,
      });
    })
    .catch((err) => console.log('getNewPassword',err));
};

exports.postNewPassword = (req, res, next) => {
  const userId = req.body.userId;
  const newPassword = req.body.password;
  const passwordToken = req.body.passwordToken;
  let resetUser;
  User.findOne({
    resetToken: passwordToken,
    resetTokenExpiration: { $gt: Date.now() },
    _id: userId,
  })
    .then((user) => {
      // console.log(user);
      resetUser = user;
      return bcrypt.hash(newPassword, 12)
    })
    .then(hashedPassword => {
      resetUser.password = hashedPassword;
      resetUser.resetToken = undefined;
      resetUser.resetTokenExpiration = undefined;
      return resetUser.save();
    }).then(result => {
      res.redirect('/login')
    })
    .catch((err) => console.log('postNewPassword',err));
};
