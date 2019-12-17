var express = require('express');
var router = express.Router();

// work with the Car model
var Car = require('../models/car');

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    next();
  } else {
    res.redirect('/')
  }
}

router.use(isLoggedIn)

// basic page for cars display
router.get("/", function(req, res, next){
  // res.send("details about cars");
  // get our cars from the database
  Car.find(function(err, cars){
    if(err){
      res.render('error', {
        message: "Car Query Failed",
        error: err,
        user: req.user
      });
    } else {
      res.render('cars', {
        cars: cars,
        title: "Cars",
        user: req.user
      });
    }
  })
})

// GET /cars/add to show the add form
router.get('/add', function(req, res, next){
  res.render('add-car', {
    title: 'Add a new Car',
    user: req.user
  });
})

// add our POST handler for /cars/add
router.post('/add', function(req, res, next){
  // get the data from the form
  // then redirect the user to the list of cars
  Car.create({
    color: req.body.color,
    make: req.body.make,
    model: req.body.model,
    year: req.body.year,
    isAutomatic: !!req.body.isautomatic
  }, function(err){
    if(err){
      res.render('error', {
        message: "Couldn't create a Car",
        error: err,
        user: req.user
      });
    } else {
      res.redirect('/cars')
    }
  })
})

// get path for deleting a car
// :id is the variable for our car to delete
router.get('/delete/:id', function(req, res, next){
  // grab the car ID from the url
  var id = req.params.id;

  // get rid of the unwanted car. We like new things
  Car.remove({ _id: id }, function(err){
    if(err){
      res.render('error', {
        message: "Couldn't delete Car " + id,
        error: err,
        user: req.user
      })
    } else {
      res.redirect('/cars');
    }
  })
})

// get route for editing the car
router.get('/:id', function(req, res, next){
  // collect the ID from the url
  var id = req.params.id;

  Car.findById(id, function(err, car){
    if(err){
      res.render('error', {
        message: "Could not load Car",
        error: err,
        user: req.user
      })
    } else {
      res.render('edit-car', {
        title: 'Edit Car',
        car: car,
        user: req.user
      })
    }
  })
})

// post to handle edit of car
router.post('/:id', function(req, res, next){
  // get the car id from the url
  var id = req.params.id;

  var carDetails = {
    color: req.body.color,
    make: req.body.make,
    model: req.body.model,
    year: Number(req.body.year),
    isAutomatic: !!req.body.isautomatic
  }

  // update the record in the database
  Car.update({ _id: id }, carDetails, function(err){
    if(err){
      renderError(res, "Could not update Car", err);
    } else {
      res.redirect('/cars')
    }
  })
})

function renderError(res, mess, err){
  res.render('error', {
    message: mess,
    error: err,
    user: req.user
  })
}

module.exports = router;
