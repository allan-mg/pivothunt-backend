const router = require('express').Router();

const auth = require('../middlewares/auth');

const {
  validateCreateApplication,
  validateApplicationId,
  validateApplicationStatus,
  validateApplicationNotes,
} = require('../middlewares/validation');

const {
  createApplication,
  getApplications,
  updateApplicationStatus,
  updateApplicationNotes,
  deleteApplication,
} = require('../controllers/applications');

router.get('/', auth, getApplications);

router.post('/', auth, validateCreateApplication, createApplication);

router.patch(
  '/:applicationId/status',
  auth,
  validateApplicationStatus,
  updateApplicationStatus,
);

router.patch(
  '/:applicationId/notes',
  auth,
  validateApplicationNotes,
  updateApplicationNotes,
);

router.delete(
  '/:applicationId',
  auth,
  validateApplicationId,
  deleteApplication,
);

module.exports = router;
