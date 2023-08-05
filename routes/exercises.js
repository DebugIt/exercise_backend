const express = require("express");
const Exercise = require("../models/exerciseModel");

const exercisesRouter = express.Router();

// Get all Exercises
exercisesRouter.get("/", async (req, res) => {
    Exercise.find()
    .then(exercises => res.status(200).json(exercises))
    .catch(err => res.status(400).json({message: `Error: ${err}`}))
})

exercisesRouter.post("/addExercise", (req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const newExercise = new Exercise({
        username,
        description,
        duration,
        date
    });

    newExercise.save().then(() => res.status(200).json({message: "Exercise Added", success: true}))
    .catch((error)=>res.status(501).json({message: `Error adding exercise: ${error}`, success: false}))

})

// getting a post with id
exercisesRouter.get("/:id", (req, res) => {
    Exercise.findById(req.params.id)
    .then(exercise => res.json({message: "Post Found", exercise}))
    .catch(err => res.status(400).json({message: `error: ${err}`}))
})

// deleting a post with id
exercisesRouter.delete('/:id', (req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.status(200).json({message: "Deletion status", success:true}))
    .catch(err => res.status(400).json(`error: ${err}`))
})

// updating a post
exercisesRouter.post("/update/:id", (req, res) => {
    Exercise.findById(req.params.id).then((exercise) => {
        exercise.username = req.body.username;
        exercise.description = req.body.description;
        exercise.duration = Number(req.body.duration);
        exercise.date = Date.parse(req.body.date);

        // saving 
        exercise.save().then(() => res.status(200).json({message: "Exercise updated", success:true}))
        .catch(err => res.status(400).json(`Error: ${err}`))
    }).catch(err => res.status(400).json(`Error: ${err}`))
})

module.exports = exercisesRouter;