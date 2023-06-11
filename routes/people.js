const expres = require("express");
const router = expres.Router();
const Person = require("../models/person");
const person = require("../models/person");
//get all
router.get("/", async (req, res) => {
  try {
    const people = await Person.find();
    res.status(202).json(people);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  res.send("Hello world");
});
//get one
router.get("/:id", getPerson, (req, res) => {
  res.send(res.person.name);
});
//upload one
router.post("/", async (req, res) => {
  const person = new Person({
    name: req.body.name,
    lastName: req.body.lastName,
  });
  try {
    const personToSave = await person.save();
    res.status(201).json(personToSave);
  } catch (error) {
    res.json({ error: error.message });
  }
});
//update one
router.patch("/:id", getPerson, async (req, res) => {
  if (req.body.name !== null) {
    res.person.name = req.body.name;
  }
  if (req.body.lastName !== null) {
    res.person.lastName = req.body.name;
  }

  try {
    const updatedPerson = await res.person.save();
    res.status(202).json(updatedPerson);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
//delete one
router.delete("/:id", getPerson, async (req, res) => {
  try {
    await res.person.remove();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//middleware

async function getPerson(req, res, next) {
  let person;
  try {
    person = await Person.findById(req.params.id);
    if (person == null) {
      return res.status(404).json({ message: "Person not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.person = person;
  next();
}
module.exports = router;
