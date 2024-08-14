const request = require("supertest");
const express = require("express");
const app = express();
app.use(express.json());

const {
  GetAllNews,
  GetNews,
  AddNews,
} = require("../Controllers/NewsController"); // Adjust path as needed

const {
    SignIn,
    SignUp
  } = require("../Controllers/UserController");
const NewsModel = require("../Models/NewsModel");
const CategoryModel = require("../Models/CategoryModel");

app.get("/api/news", GetAllNews);
app.get("/api/news/:NewsTitle", GetNews);
app.post("/api/news", AddNews);

jest.mock("../Models/NewsModel");
jest.mock("../Models/CategoryModel");
const jwt = require("jsonwebtoken");

const generateAuthToken = () => "Bearer mocktoken"; // Adjust token generation as needed

describe("News Routes", () => {
  describe("GET /api/news", () => {
    it("should return all news with Title and CategoryName when no token is provided", async () => {
      await NewsModel.find.mockResolvedValue([
        {
          Title: "News 1",
          CategoryName: "Category 1",
          UserName: "User 1",
          Detail: "Detail 1",
        },
        {
          Title: "News 2",
          CategoryName: "Category 2",
          UserName: "User 2",
          Detail: "Detail 2",
        },
      ]);

      const res = await request(app).get("/api/news");

      expect(res.status).toBe(200);
      expect(res.body).toEqual([
        {
          Title: "News 1",
          CategoryName: "Category 1",
          UserName: "User 1",
          Detail: "Detail 1",
        },
        {
          Title: "News 2",
          CategoryName: "Category 2",
          UserName: "User 2",
          Detail: "Detail 2",
        },
      ]);
    });

    it("should return all news details when a valid token is provided", async () => {
      NewsModel.find.mockResolvedValue([
        {
          Title: "News 1",
          Detail: "Detail 1",
          CategoryName: "Category 1",
          UserName: "User 1",
        },
        {
          Title: "News 2",
          Detail: "Detail 2",
          CategoryName: "Category 2",
          UserName: "User 2",
        },
      ]);

      const res = await request(app)
        .get("/api/news")
        .set("Authorization", 'Bearer mocktoken');
 
      expect(res.status).toBe(200);
      expect(res.body).toEqual([
        {
          Title: "News 1",
          Detail: "Detail 1",
          CategoryName: "Category 1",
          UserName: "User 1",
        },
        {
          Title: "News 2",
          Detail: "Detail 2",
          CategoryName: "Category 2",
          UserName: "User 2",
        },
      ]);
    });
  });

  describe("GET api/news/:NewsTitle", () => {

    it("should return 404 if news is not found", async () => {
      NewsModel.findOne.mockResolvedValue(null);

      const res = await request(app).get("/api/news/NonExistentTitle");

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty("error", "News not found");
    });

    it("should return the news details when news is found and a valid token is provided", async () => {
      NewsModel.findOne.mockResolvedValue({
        Title: "News 1",
        Detail: "Detail 1",
        CategoryName: "Category 1",
        UserName: "User 1",
      });

      const res = await request(app)
        .get("/api/news/News%201")
        .set("Authorization", 'Bearer mocktoken');

      expect(res.status).toBe(200);
      expect(res.body).toEqual({
        Title: "News 1",
        Detail: "Detail 1",
        CategoryName: "Category 1",
        UserName: "User 1",
      });
    });

    it("should return only Title and CategoryName if no token is provided", async () => {
      NewsModel.findOne.mockResolvedValue({
        Title: "News 1",
        CategoryName: "Category 1",
      });

      const res = await request(app).get("/api/news/News%201");

      expect(res.status).toBe(200);
      expect(res.body).toEqual({
        Title: "News 1",
        CategoryName: "Category 1",
      });
    });
  });

  describe("POST /api/news", () => {
    it("should return 401 if no token is provided", async () => {
       await CategoryModel.findOne.mockResolvedValue({
            CategoryName: "Category 1",
            Count: 1
          });
      const res = await request(app).post("/api/news").send({
        Title: "New News",
        Detail: "Some detail",
        CategoryName: "Category 1",
      });

      expect(res.body.message).toBe("Invalid username or password");
    });

    // it("should return 404 if the category is not found", async () => {
    //   const mockToken = generateAuthToken();
    //   CategoryModel.findOne.mockResolvedValue(null);

    //   const res = await request(app)
    //     .post("/api/news")
    //     .set("Authorization", mockToken)
    //     .send({
    //       Title: "New News",
    //       Detail: "Some detail",
    //       CategoryName: "NonExistentCategory",
    //     });

    //   expect(res.status).toBe(404);
    //   expect(res.body).toHaveProperty("error", "Mentioned category not found");
    // });

    it("should add news and update category count if a valid token is provided", async () => {
      const mockToken = generateAuthToken();
      const mockCategory = { Count: 1, save: jest.fn() };
      CategoryModel.findOne.mockResolvedValue(mockCategory);
      NewsModel.create.mockResolvedValue({
        Title: "New News",
        Detail: "Some detail",
        CategoryName: "Category",
        UserName: "User",
      });

      const res = await request(app)
        .post("/api/news")
        .set("Authorization", mockToken)
        .send({
          Title: "New News",
          Detail: "Some detail",
          CategoryName: "Category",
        });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("Title", "New News");
      expect(res.body).toHaveProperty("Detail", "Some detail");
      expect(mockCategory.Count).toBe(2); // Assuming initial count was 1
      expect(mockCategory.save).toHaveBeenCalled();
    });
  });
});
