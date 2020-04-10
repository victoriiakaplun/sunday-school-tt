'use strict';
const passport = require('koa-passport');
const bcrypt = require('bcrypt');
const { User } = require('../db/models');
const LocalStrategy = require('passport-local').Strategy;
const HttpStatus = require('http-status-codes');

const PASSWORD_LENGTH = 8;
const SALT_ROUNDS = 10;

passport.serializeUser(async (user, done) => {
  try {
    if (!user) {
      return done(null, false);
    }
    return done(null, user.id);
  } catch (err) {
    return done(err);
  }
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findOne({ where: { id } });
    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  } catch (err) {
    return done(err);
  }
});

const localStrategyOptions = {
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true,
  session: true,
};

passport.use(new LocalStrategy(localStrategyOptions, verify));

async function verify(ctx, email, password, done) {
  const userInfo = await User.findOne({ where: { email } });
  if (!userInfo) {
    ctx.response.status = HttpStatus.BAD_REQUEST;
    return done(null, false, { message: 'Incorrect username.' });
  } else {
    const isValidPassword = await bcrypt.compare(password, userInfo.password);
    if (isValidPassword === false) {
      ctx.response.status = HttpStatus.BAD_REQUEST;
      return done(null, false, { message: 'Incorrect password.' });
    }
    const user = {
      id: userInfo.id,
      role: userInfo.role,
      name: userInfo.name,
      email: userInfo.email,
    };
    ctx.response.status = HttpStatus.OK;
    return done(null, user);
  }
}

async function login(ctx, next) {
  await passport.authenticate('local', async (err, user) => {
    if (!err && user) {
      await ctx.login(user);
      console.log(user);
      const userData = {
        id: user.id,
        role: user.role,
        name: user.name,
        email: user.email,
      };
      ctx.state.user = userData;
      ctx.response.status = HttpStatus.OK;
      ctx.response.body = userData;
      return ctx.response;
    } else {
      ctx.response.status = HttpStatus.BAD_REQUEST;
      ctx.response.body = 'Cant sign in with current params';
      return ctx.response;
    }
  })(ctx, next);
}

async function register(ctx) {
  const { name, email, password } = ctx.request.body;
  if (password.length < PASSWORD_LENGTH) {
    ctx.response.body = 'Password length must be more then 8 symbols';
    ctx.response.status = HttpStatus.BAD_REQUEST;
  }
  const salt = bcrypt.genSaltSync(SALT_ROUNDS);
  const user = {
    role: 'user',
    name: name,
    email: email,
    password: bcrypt.hashSync(password, salt),
  };
  const createdUserInfo = await User.create(user);
  if (createdUserInfo) {
    const createdUser = {
      id: createdUserInfo.id,
      role: createdUserInfo.role,
      name: createdUserInfo.name,
      email: createdUserInfo.email,
    };
    ctx.response.status = HttpStatus.CREATED;
    ctx.response.body = createdUser;
    return ctx.response;
  }
  ctx.response.status = HttpStatus.BAD_REQUEST;
  ctx.response.body = 'Bad request';
  return ctx.response;
}

async function logout(ctx) {
  try {
    ctx.logout();
    ctx.response.status = HttpStatus.OK;
  } catch (err) {
    ctx.response.status = HttpStatus.BAD_REQUEST;
  }
}

module.exports = {
  passport,
  login,
  logout,
  register,
};
