const SavedJob = require("../models/savedJob");

function getSavedJobs(req, res) {
  SavedJob.find({
    user: req.user._id,
  })
    .sort({ savedAt: -1 })
    .then((savedJobs) => {
      res.send(savedJobs);
    })
    .catch((err) => {
      console.error(err);

      return res.status(500).send({
        message: "An error occurred while getting saved jobs.",
      });
    });
}

function saveJob(req, res) {
  const { jobId, title, company, location, level, description, url } = req.body;

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
    .then((savedJob) => {
      res.status(201).send(savedJob);
    })
    .catch((err) => {
      console.error(err);

      if (err.code === 11000) {
        return res.status(409).send({
          message: "This job is already saved.",
        });
      }

      if (err.name === "ValidationError") {
        return res.status(400).send({
          message: "Invalid saved job data.",
        });
      }

      return res.status(500).send({
        message: "An error occurred while saving the job.",
      });
    });
}

function deleteSavedJob(req, res) {
  const { jobId } = req.params;

  SavedJob.findOneAndDelete({
    user: req.user._id,
    jobId,
  })
    .then((savedJob) => {
      if (!savedJob) {
        return res.status(404).send({
          message: "Saved job not found.",
        });
      }

      return res.send({
        message: "Saved job deleted successfully.",
      });
    })
    .catch((err) => {
      console.error(err);

      return res.status(500).send({
        message: "An error occurred while deleting the saved job.",
      });
    });
}

module.exports = {
  getSavedJobs,
  saveJob,
  deleteSavedJob,
};
