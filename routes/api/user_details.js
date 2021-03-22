const express = require('express');
const router = express.Router();
const UserDetail = require('../../models/UserModel');

const validateUserInput = require('../../validations/user_input');


//@route - Get request to api/userDetail/test
//@desc - Test route
//@access - Public
router.get('/test', (req, res) => {
  res.json({ message: "Users works" })
});


//@route - POST request to api/userDetail
//@desc - Create user detail route
//@access - Public
router.post('/', (req, res) => {
  var { errors, isValid } = validateUserInput(req.body);
  if (!isValid) {
    res.status(400).json({ success: false, errors });
  }
  const newUser = new UserDetail({
    name: req.body.name,
    Image: req.body.Image,
  });
  newUser.save()
    .then(user => {
      res.json({ success: true, data: user });
    })
    .catch((err) => { console.log(err); res.json({ errors: "Error adding snippet", success: true }) });
});

//@route - Put request to api/userDetail/:id
//@desc - Update userdetail route
//@access - Public
router.put('/:id', (req, res) => {
  var { errors, isValid } = validateUserInput(req.body);
  if (!isValid) {
    res.status(400).json({ success: false, errors });
  }
  UserDetail.findOne({ _id: req.params.id })
    .then(user => {
      if (req.body.name) user.name = req.body.name;
      if (req.body.Image) user.Image = req.body.Image;

      UserDetail.findOneAndUpdate({ _id: req.params.id }, { $set: user }, { new: true })
        .then(updatedUser => {
          res.json({ success: true, data: updatedUser });
        })
        .catch(err => res.status(404).json({ success: false, errors: "Error updating user" }));

    })
    .catch(err => res.status(404).json({ success: false, errors: "No User with the id" }));
});


//@route - GET request to api/userDetail/:id
//@desc - get userDetail by id route
//@access - Public

router.get('/:id', (req, res) => {
  UserDetail.findOne({ _id: req.params.id })
    .then(user => res.json({ success: true, data: user }))
    .catch(err => res.status(404).json({ success: false, errors: "No Snippet with the id" }));
});



//@route - DELETE request to api/userDetail/:id
//@desc - Delete a userDetail by id route
//@access - Public

router.delete('/:id', (req, res) => {
  UserDetail.findOneAndRemove({ _id: req.params.id })
    .then((data) => {
      res.json({ "success": true, data: data._id });
    }).
    catch(() => {
      res.status(400).json({ "success": false, errors: "UserDetail not Found" })
    })
});

//@route - Get request to api/userDetail/list/all
//@desc - Get all userDetails
//@access - Public

router.get('/list/all', (req, res) => {

  UserDetail.find()
    .then((data) => {
      res.json({ "success": true, data });
    }).
    catch(() => {
      res.status(400).json({ "success": false, errors: "UserDetail not Found" })
    })
});





module.exports = router;
