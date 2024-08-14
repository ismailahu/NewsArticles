const {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} = require("../Middlewares/ErrorHandling/Errors");

const NewsModel = require("../Models/NewsModel");
const CategoryModel = require("../Models/CategoryModel");
const { broadcastNews } = require('../websocketServer');

const GetAllNews = async (req, res, next) => {
  try {
    let allNews;
    allNews = await NewsModel.find({}, ["Title", "CategoryName", "Detail", "UserName"]);

    return res.status(200).json(allNews);
  } catch (ex) {
    next(ex);
  }
};

const GetNews = async (req, res, next) => {
  try {
    const { NewsTitle } = req.params;

    const news = await NewsModel.findOne({ Title: NewsTitle });

    if (!news) {
      return res.status(404).json({ error: "News not found" });
    }

    if (!req.UserName) {
      return res.status(200).json({
        Title: news.Title,
        CategoryName: news.CategoryName,
        Detail: news.Detail,
        UserName: news.UserName
      });
    }

    return res.status(200).json(news);
  } catch (ex) {
    next(ex);
  }
};

const AddNews = async (req, res, next) => {
  try {
    let { Title, Detail, CategoryName, UserName } = req.body;

    // if (!UserName) {
    //   return next(new UnauthorizedError());
    // }

    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return res.status(401).json({message : "Invalid username or password"});
    }

    const getCategory = await CategoryModel.findOne({Name : CategoryName})

    if(!getCategory){
      return res.status(404).json({error : "Mentioned category not found"})
    }

    const news = await NewsModel.create({
      Title,
      Detail,
      UserName,
      CategoryName,
    });

    getCategory.Count += 1;
    getCategory.save()

    broadcastNews(news);

    return res.status(200).json(news);
  } catch (ex) {
    next(ex);
  }
};

const EditNews = async (req, res, next) => {
  const { oldTitle, newTitle, newDetail, newCategory, UserName } = req.body;

  (req.body)

  try {
    // Check if required fields are provided
    if (!oldTitle || !newTitle || !newDetail || !newCategory) {
      return next(new BadRequestError("All fields (oldTitle, newTitle, newDetail, newCategoryName) are required"));
    }

    (oldTitle);

    // Find the existing news entry
    const news = await NewsModel.findOne({ Title: oldTitle });
    if (!news) {
      return next(new NotFoundError("News not found"));
    }

    // Update the news entry
    news.Title = newTitle;
    news.Detail = newDetail;
    news.CategoryName = newCategory;

    // Save the updated news entry
    await news.save();

    // Broadcast the updated news
    broadcastNews(news);

    return res.status(200).json(news);
  } catch (ex) {
    next(ex);
  }
};

module.exports = { GetAllNews, GetNews, AddNews, EditNews };
