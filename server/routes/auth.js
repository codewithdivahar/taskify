const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/User");
const { REDIRECT_SUCCESS_URL, REDIRECT_URL } = require("../constant/urls");

// @desc Auth with google
// @route GET /auth/google
router.get("/google", (req, res, next) => {
  const { deviceType } = req?.query;
  if (!deviceType) {
    res.status(400).send({ message: "deviceType missing in query parameter" });
  }
  const state = deviceType
    ? Buffer.from(JSON.stringify({ deviceType })).toString("base64")
    : undefined;
  const authenticator = passport.authenticate("google", {
    scope: ["profile", "email"],
    state,
  });
  authenticator(req, res, next);
});

// @desc Google Auth Callback
// @route GET /auth/google/callback
router.get(
  "/google/callback",
  passport.authenticate("google"),
  async (req, res) => {
    const { state } = req?.query;
    const { deviceType } = JSON.parse(Buffer.from(state, "base64").toString());
    const { user } = req;
    let redirectUrl = "";
    if (deviceType === "web") {
      user["userType"] = "admin";
      redirectUrl = REDIRECT_SUCCESS_URL;
    } else if (deviceType === "mobile") {
      user["userType"] = "user";
    }
    try {
      if (req.user) {
        const { googleId } = req?.user;
        let user = await User.findOne({ googleId });
        if (!user) {
          user = await User.create(req.user);
        }
        if (deviceType === "mobile") {
          res.status(200).send("Success");
        } else {
          res.status(200).redirect(redirectUrl);
        }
      } else {
        if (deviceType === "web") {
          res.status(401).redirect(REDIRECT_URL);
        } else {
          res.status(401).send({ error: true, message: "User un authorized" });
        }
      }
    } catch (err) {
      console.error("DB error --->", err);
    }
  }
);

router.get("/loginSuccess", (req, res) => {
  const { user } = req;
  if (user) {
    res.status(200).send({
      error: false,
      message: "User Authorized",
      user: user,
    });
  } else {
    res
      .status(401)
      .send({ error: true, message: "User UnAuthorized", user: null });
  }
});

router.get("/logout", (req, res) => {
  const { deviceType } = req?.query;
  req.logout(() => {
    if (deviceType === "web") {
      res.redirect(REDIRECT_URL);
    } else if (deviceType === "mobile") {
      res.status(200).send({ success: true });
    }
  });
});

module.exports = router;
