const bcrypt = require("bcryptjs");
const logger = require("../../../services/logger.service")(module);
const { OK, BAD_REQUEST } = require("../../../constants/http-codes");
const JwtService = require("../../../services/jwt.service");
const jwtConfig = require("../../../config").jwt;
const { sampleDB } = require("../../../services/database.service");
/**
 * GET /user/login
 * Служебный эндпоинт для получения токена авторизации произвольного пользователя.
 * @param {Object} req
 * @param {Object} res
 * @return {Promise<void>}
 */
async function login(req, res) {
  const { User } = sampleDB.models;

  try {
    logger.init("post user login");
    const { login, password } = req.body;
  
    const user = await User.findOne({ login });
  
    if (!user) {
      return res.status(BAD_REQUEST).json({ message: "user not found" });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      return res.status(BAD_REQUEST).json({ message: "incorrect password" });
    }
  
    const token = new JwtService(jwtConfig).encode(user).data;
  
    res.header("Authorization", `Bearer ${token}`);
    logger.success();
    return res.status(OK).json({ message: "login succes" });
  } catch (error) {
    return res.status(BAD_REQUEST);
  }
}

/**
 * GET /user/signup
 * Служебный эндпоинт для получения токена авторизации произвольного пользователя.
 * @param {Object} req
 * @param {Object} res
 * @return {Promise<void>}
 */
async function signup(req, res) {
  const { User } = sampleDB.models;

  try {
    logger.init("post user signup");
    const { login, password } = req.body;
  
    const hashPassword = bcrypt.hashSync(password, 10);
    const user = new User({ login, password: hashPassword });
    await user.save();
  
    logger.success();
    return res.status(OK).json({ message: "signup succes" });
  } catch (error) {
    return res.status(BAD_REQUEST).json({ message: error.message });
  }
}

module.exports = {
  login,
  signup
};
