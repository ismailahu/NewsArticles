const request = require("supertest");
const express = require("express");
const app = express();
app.use(express.json());

const { SignUp, SignIn } = require("../Controllers/UserController"); // Adjust path as needed
const UserModel = require("../Models/UserModel");

app.post("/signup", SignUp);
app.post("/signin", SignIn);

jest.mock("../Models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateAuthToken = () => "Bearer mocktoken"; // Adjust token generation as needed

describe("Auth Routes", () => {
  describe("POST /signup", () => {
    it("should return 400 if UserName or Password is missing", async () => {
      const res = await request(app)
        .post("/signup")
        .send({ UserName: "testuser" }); // Missing Password

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("error", "Please provide complete info!");
    });

    it("should create a new user and return a token on successful signup", async () => {
      const mockUser = { UserName: "testuser", Password: "hashedpassword" };
      UserModel.create.mockResolvedValue(mockUser);
      bcrypt.hash = jest.fn().mockResolvedValue("hashedpassword");
      jwt.sign = jest.fn().mockReturnValue("mocktoken");
 
      const res = await request(app)
        .post("/signup")
        .send({ UserName: "testuser", Password: "password123" });

      ("MY RES: " , res.status, res.body, res.body.user)

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("user");
      expect(res.body).toHaveProperty("token", "mocktoken");
      expect(res.body.user).not.toHaveProperty("Password");
    });
  });

  describe("POST /signin", () => {
    it("should return 401 if the user is not found", async () => {
      UserModel.findOne.mockResolvedValue(null);

      const res = await request(app)
        .post("/signin")
        .send({ UserName: "testuser", Password: "password123" });

      expect(res.status).toBe(401);
      expect(res.body).toHaveProperty("error", "Unauthorized");
    });

    it("should return 401 if password does not match", async () => {
      const mockUser = { UserName: "testuser", Password: "hashedpassword" };
      UserModel.findOne.mockResolvedValue(mockUser);
      bcrypt.compare = jest.fn().mockResolvedValue(false);

      const res = await request(app)
        .post("/signin")
        .send({ UserName: "testuser", Password: "wrongpassword" });

      expect(res.status).toBe(401);
      expect(res.body).toHaveProperty("error", "Unauthorized");
    });

    it("should return a user and token on successful signin", async () => {
      const mockUser = { UserName: "testuser", Password: "hashedpassword" };
      UserModel.findOne.mockResolvedValue(mockUser);
      bcrypt.compare = jest.fn().mockResolvedValue(true);
      jwt.sign = jest.fn().mockReturnValue("mocktoken");

      const res = await request(app)
        .post("/signin")
        .send({ UserName: "testuser", Password: "password123" });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("user");
      expect(res.body).toHaveProperty("token", "mocktoken");
      expect(res.body.user).not.toHaveProperty("Password");
    });
  });
});