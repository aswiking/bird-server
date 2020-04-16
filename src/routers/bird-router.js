import express from "express";

const router = express.Router();

let birds = [
  {
    id: 1,
    name: "blackbird",
    scientific: "Turdus merula",
    location: "Leicester",
    date: "13 April 2020",
    image: "https://twootz.com/assets/images/bird/Blackbird.jpg",
  },
  {
    id: 2,
    name: "robin",
    scientific: "Erithacus rubecula",
    location: "Leicester",
    date: "10 January 2020",
    image:
      "https://images.immediate.co.uk/production/volatile/sites/23/2014/12/GettyImages-511380252-08b8a2e.jpg",
  },
];

router.get("/api/birds", (req, res) => {
  res.status(200).json(birds);
});

export default router;
