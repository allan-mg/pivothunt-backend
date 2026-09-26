const Application = require("../models/application");

function createApplication(req, res) {
  const { jobId, jobTitle, company, location, notes } = req.body;

  Application.findOne({
    user: req.user._id,
    jobId,
  })
    .then((existingApplication) => {
      if (existingApplication) {
        res.status(409).send({
          message: "You have already applied to this job.",
        });

        return null;
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
      console.error(err);

      if (err.code === 11000) {
        return res.status(409).send({
          message: "You have already applied to this job.",
        });
      }

      if (err.name === "ValidationError") {
        return res.status(400).send({
          message: "Invalid application data.",
        });
      }

      return res.status(500).send({
        message: "An error occurred while creating the application.",
      });
    });
}

function getApplications(req, res) {
  Application.find({
    user: req.user._id,
  })
    .sort({ appliedAt: -1 })
    .then((applications) => {
      res.send(applications);
    })
    .catch((err) => {
      console.error(err);

      return res.status(500).send({
        message: "An error occurred while getting applications.",
      });
    });
}

function updateApplicationStatus(req, res) {
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
        return res.status(404).send({
          message: "Application not found.",
        });
      }

      return res.send(application);
    })
    .catch((err) => {
      console.error(err);

      if (err.name === "ValidationError") {
        return res.status(400).send({
          message: "Invalid application status.",
        });
      }

      return res.status(500).send({
        message: "An error occurred while updating the application.",
      });
    });
}

function updateApplicationNotes(req, res) {
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
        return res.status(404).send({
          message: "Application not found.",
        });
      }

      return res.send(application);
    })
    .catch((err) => {
      console.error(err);

      if (err.name === "ValidationError") {
        return res.status(400).send({
          message: "Invalid application notes.",
        });
      }

      return res.status(500).send({
        message: "An error occurred while updating application notes.",
      });
    });
}

function deleteApplication(req, res) {
  const { applicationId } = req.params;

  Application.findOneAndDelete({
    _id: applicationId,
    user: req.user._id,
  })
    .then((application) => {
      if (!application) {
        return res.status(404).send({
          message: "Application not found.",
        });
      }

      return res.send({
        message: "Application deleted successfully.",
      });
    })
    .catch((err) => {
      console.error(err);

      return res.status(500).send({
        message: "An error occurred while deleting the application.",
      });
    });
}

module.exports = {
  createApplication,
  getApplications,
  updateApplicationStatus,
  updateApplicationNotes,
  deleteApplication,
};
