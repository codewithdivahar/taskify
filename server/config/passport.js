const { CALLBACK_URL_HOST } = require("../constant/urls");

const GoogleStrategy = require("passport-google-oauth20").Strategy;

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: CALLBACK_URL_HOST + "/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, cb) => {
        const user = {
          googleId: profile.id,
          email: profile.emails[0].value,
          displayName: profile.displayName,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          image: profile.photos[0].value,
        };
        return cb(null, user);
      }
    )
  );

  passport.serializeUser((user, cb) => cb(null, user));

  passport.deserializeUser((user, cb) => cb(null, user));
};
