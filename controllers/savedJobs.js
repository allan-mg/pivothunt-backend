const SavedJob = require('../models/savedJob');

const createError = (statusCode, message) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

function getSavedJobs(req, res, next) {
  SavedJob.find({
    user: req.user._id,
  })
    .sort({ savedAt: -1 })
    .then((savedJobs) => res.send(savedJobs))
    .catch(next);
}

function saveJob(req, res, next) {
  const {
    jobId, title, company, location, level, description, url,
  } = req.body;

  SavedJob.create({
    user: req.user._id,
    jobId,
    title,
    company,
    location,
    level,
    description,
    url,
  })
    .then((savedJob) => res.status(201).send(savedJob))
    .catch((err) => {
      if (err.code === 11000) {
        return next(createError(409, 'This job is already saved.'));
      }

      if (err.name === 'ValidationError') {
        return next(createError(400, 'Invalid saved job data.'));
      }

      return next(err);
    });
}

function deleteSavedJob(req, res, next) {
  const { savedJobId } = req.params;

  SavedJob.findOneAndDelete({
    _id: savedJobId,
    user: req.user._id,
  })
    .then((savedJob) => {
      if (!savedJob) {
        return next(createError(404, 'Saved job not found.'));
      }

      return res.send({
        message: 'Saved job deleted successfully.',
      });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(createError(400, 'Invalid saved job ID.'));
      }

      return next(err);
    });
}

module.exports = {
  getSavedJobs,
  saveJob,
  deleteSavedJob,
};
