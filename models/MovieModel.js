const mongoose = require("mongoose");
const slugify = require("slugify");
// const validator = require("validator");

// CREATE SCHEMA or FORMAT OF COLLECTION
const movieSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Movie Must Have A Title"],
        trim: true,
        // prettier-ignore
        maxlength: [40, "A Movie name must have less or equal than 40 characters"],
    },
    slug: String,
    year: {
        type: Number,
        required: [true, "Movie Must Have A Release Year"],
    },
    runtime: {
        type: Number,
        required: [true, "A Movie Must Have a Runtime Duration"],
    },
    poster: String,
    plot: {
        type: String,
        required: [true, "A Movie must have a plot"],
        trim: true,
    },
    fullplot: {
        type: String,
        trim: true,
    },
    type: {
        type: String,
        default: "movie",
    },
    directors: {
        type: [String],
        required: [true, "A Movie must have directors."],
    },
    cast: {
        type: [String],
        required: [true, "A Movie must have a cast crew."],
    },
    countries: {
        type: [String],
        required: [true, "A Movie must be releasing in a country."],
    },
    genere: {
        type: [String],
        required: [true, "A Movie must be associated with a genere."],
    },
    imageCover: {
        type: String,
        required: [true, "A Movie Must Have a Cover Image"],
    },
    images: [String],
    releaseDate: {
        type: Date,
        defaut: new Date(),
        required: [true, "A Movie Must Have a release date"],
    },
});

// DOCUMENT MIDDLEWARE: runs before .save() and .create()
movieSchema.pre("save", function (next) {
    // console.log(this);
    this.slug = slugify(this.title, { lower: true });
    next();
});

// CREATE MODEL TO USE DB
const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
