const Application = require('../models/application');

const createError = (statusCode, message) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

function createApplication(req, res, next) {
  const {
    jobId, jobTitle, company, location, notes,
  } = req.body;

  Application.findOne({
    user: req.user._id,
    jobId,
  })
    .then((existingApplication) => {
      if (existingApplication) {
        return next(createError(409, 'You have already applied to this job.'));
      }

      return Application.create({
        user: req.user._id,
        jobId,
        jobTitle,
        company,
        location,
        notes,
      });
    })
    .then((application) => {
      if (!application) {
        return null;
      }

      return res.status(201).send(application);
    })
    .catch((err) => {
      if (err.code === 11000) {
        return next(createError(409, 'You have already applied to this job.'));
      }

      if (err.name === 'ValidationError') {
        return next(createError(400, 'Invalid application data.'));
      }

      return next(err);
    });
}

function getApplications(req, res, next) {
  Application.find({
    user: req.user._id,
  })
    .sort({ appliedAt: -1 })
    .then((applications) => res.send(applications))
    .catch(next);
}

function updateApplicationStatus(req, res, next) {
  const { applicationId } = req.params;
  const { status } = req.body;

  Application.findOneAndUpdate(
    {
      _id: applicationId,
      user: req.user._id,
    },
    {
      status,
    },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((application) => {
      if (!application) {
        return next(createError(404, 'Application not found.'));
      }

      return res.send(application);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(createError(400, 'Invalid application status.'));
      }

      return next(err);
    });
}

function updateApplicationNotes(req, res, next) {
  const { applicationId } = req.params;
  const { notes } = req.body;

  Application.findOneAndUpdate(
    {
      _id: applicationId,
      user: req.user._id,
    },
    {
      notes,
    },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((application) => {
      if (!application) {
        return next(createError(404, 'Application not found.'));
      }

      return res.send(application);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(createError(400, 'Invalid application notes.'));
      }

      return next(err);
    });
}

function deleteApplication(req, res, next) {
  const { applicationId } = req.params;

  Application.findOneAndDelete({
    _id: applicationId,
    user: req.user._id,
  })
    .then((application) => {
      if (!application) {
        return next(createError(404, 'Application not found.'));
      }

      return res.send({
        message: 'Application deleted successfully.',
      });
    })
    .catch(next);
}

module.exports = {
  createApplication,
  getApplications,
  updateApplicationStatus,
  updateApplicationNotes,
  deleteApplication,
};
