/* eslint-disable security/detect-non-literal-fs-filename */
const bcrypt = require("bcryptjs");
const request = require("supertest");
const { app } = require("../../../app");
const v = require("../../../config").prefix;
const httpCodes = require("../../../constants/http-codes");
const { sampleDB } = require("../../../services/database.service");

const acceptableLoginPasswordBody = {
  login: "newuser",
  password: "newuserpw12",
};

const unacceptableLoginPasswordBody = {
  login: "newuser1",
  password: "123",
};

describe("Testing authorizing operations signup and login", () => {
  let User;
  beforeAll(async () => {
    await sampleDB.connect();
    ({ User } = sampleDB.models);
  });

  afterAll(async () => {
    await User.deleteMany({});
    await sampleDB.disconnect();
    jest.restoreAllMocks();
  });

  describe("POST /users/signup", () => {
    it("should signup a user successfully", async () => {
      const response = await request(app)
        .post(`/${v}/users/signup`)
        .send(acceptableLoginPasswordBody);
      
      expect(response.status).toBe(httpCodes.OK);
      expect(response.body.message).toBe("signup success");

      const signedUpUser = await User.findOne({ login: acceptableLoginPasswordBody.login });
      expect(signedUpUser).not.toBeNull();
      expect(bcrypt.compareSync(acceptableLoginPasswordBody.password, signedUpUser.password)).toBe(true);
    });

    it("should reject if login already used", async () => {
      const response = await request(app)
        .post(`/${v}/users/signup`)
        .send(acceptableLoginPasswordBody);
      
      expect(response.status).toBe(httpCodes.BAD_REQUEST);
      expect(response.body.message).toBe("login already taken");
    });

    it("should reject if password is not long enough", async () => {
      const response = await request(app)
        .post(`/${v}/users/signup`)
        .send(unacceptableLoginPasswordBody);
      
      expect(response.status).toBe(httpCodes.UNPROCESSABLE_ENTITY);
      expect(response.body.message).toBe("password: has to be from 6 to 12 symbols");
    });
  });

  describe("POST /users/login", () => {
    it("should login a user successfully", async () => {
      const response = await request(app)
        .post(`/${v}/users/login`)
        .send(acceptableLoginPasswordBody);
      
      expect(response.status).toBe(httpCodes.OK);
      expect(response.body.message).toBe("login success");
      expect(response.headers.authorization.split(" ")[0]).toBe("Bearer");
    });

    it("should reject if login doesnt exist", async () => {
      const response = await request(app)
        .post(`/${v}/users/login`)
        .send({ login: "nonexistantLogin", password: "nonexistantPassword"});
      
      expect(response.status).toBe(httpCodes.BAD_REQUEST);
      expect(response.body.message).toBe("user not found");
    });

    it("should reject if password is incorrect", async () => {
      const response = await request(app)
        .post(`/${v}/users/login`)
        .send({ ...acceptableLoginPasswordBody, password: "madeUpPassword"});
      
      expect(response.status).toBe(httpCodes.BAD_REQUEST);
      expect(response.body.message).toBe("incorrect password");
    });
  });
});
