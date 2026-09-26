const router = require('express').Router();

const usersRouter = require('./users');
const applicationsRouter = require('./applications');
const savedJobsRouter = require('./savedJobs');

router.use('/users', usersRouter);
router.use('/applications', applicationsRouter);
router.use('/saved-jobs', savedJobsRouter);

module.exports = router;
