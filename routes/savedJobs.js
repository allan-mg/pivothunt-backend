const router = require('express').Router();

const auth = require('../middlewares/auth');

const {
  validateSaveJob,
  validateSavedJobId,
} = require('../middlewares/validation');

const {
  getSavedJobs,
  saveJob,
  deleteSavedJob,
} = require('../controllers/savedJobs');

router.get('/', auth, getSavedJobs);

router.post('/', auth, validateSaveJob, saveJob);

router.delete('/:savedJobId', auth, validateSavedJobId, deleteSavedJob);

module.exports = router;
