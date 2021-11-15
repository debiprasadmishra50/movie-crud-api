const Movie = require("./../models/MovieModel");
const APIFeatures = require("./../utils/apiFeatures");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

exports.deleteOne = catchAsync(async (req, res, next) => {
    const doc = await Movie.findByIdAndDelete(req.params.id);

    if (!doc)
        return next(
            new AppError(`No document found with id: ${req.params.id}`, 404)
        );

    res.status(204).json({
        status: "success",
        data: null,
    });
});

exports.updateOne = catchAsync(async (req, res, next) => {
    console.log(req.params.id);
    const doc = await Movie.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    if (!doc)
        return next(
            new AppError(`No document found with id: ${req.params.id}`, 404)
        );

    res.status(200).json({
        status: "success",
        data: {
            data: doc,
        },
    });
});

exports.createOne = catchAsync(async (req, res, next) => {
    const doc = await Movie.create(req.body);

    res.status(201).json({
        // Created
        status: "success",
        data: {
            data: doc,
        },
    });
});

exports.getOne = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    let query = Movie.findById(id);

    const doc = await query;

    if (!doc)
        return next(new AppError(`No document found with id: ${id}`, 404));

    res.status(200).json({
        status: "success",
        data: {
            data: doc,
        },
    });
});

exports.getAll = catchAsync(async (req, res, next) => {
    let filter = {};

    const features = new APIFeatures(Movie.find(filter), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();
    const doc = await features.query;
    // const doc = await features.query.explain();

    // SEND THE RESULT
    res.status(200).json({
        status: "success",
        requestedAt: req.requestTime,
        results: doc.length,
        data: {
            data: doc,
        },
    });
});
