const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/my-camp", {
  useNewUrlParser: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "63468019949f27c2e89bf773",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      images: [
        {
          url: "https://res.cloudinary.com/dlfk5yjoe/image/upload/v1665854822/MyCamp/vwskafw035n4dhhikihv.jpg",
          filename: "MyCamp/vwskafw035n4dhhikihv",
        },
        {
          url: "https://res.cloudinary.com/dlfk5yjoe/image/upload/v1665854822/MyCamp/y7rcaxcelvwctrqnso3e.jpg",
          filename: "MyCamp/y7rcaxcelvwctrqnso3e",
        },
      ],
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat saepe quo accusamus id, molestias harum explicabo ea eum perferendis liber Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, rem!",
      price,
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
