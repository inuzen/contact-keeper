const express = require('express');
const router = express.Router();

// @route POST api/users
// @desc Register a user
// @access Public
router.post('/', (req,res) => {
  res.send('Register a user');
}); // '/' in this file means /api/users since we are  redirected from server

module.exports = router;
