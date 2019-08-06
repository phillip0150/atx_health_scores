const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/atxfoodscores"
);

const userSeed = [
  {
    email: "phillip0150@gmail.com",
    name: "Stephen King",
    image: "google.com",
    favs: [{"restaurant_name": "Zachary Scott Theatre",
    "zip_code": "78704",
    "inspection_date": "2018-10-17T19:00:00.000",
    "score": "100",
    "address_address": "1510 TOOMEY RD",
    "address": {
    "type": "Point",
    "coordinates": [
    -97.75874441878,
    30.263978314039
    ]
    },
    "facility_id": "2801255",
    "address_state": "TX",
    "process_description": "Routine Inspection",
    "address_city": "AUSTIN",
    "address_zip": "78704"},
    {"restaurant_name": "Double Dave's Pizza",
"zip_code": "78750",
"inspection_date": "2016-12-19T18:00:00.000",
"score": "85",
"address_address": "13343 N US 183 HWY",
"address": {
"type": "Point",
"coordinates": [
-97.786905868616,
30.445910803674
]
},
"facility_id": "2802971",
"address_state": "TX",
"process_description": "Routine Inspection",
"address_city": "AUSTIN",
"address_zip": "78750"
    }],
    date: new Date(Date.now())
  }
];

db.User
  .remove({})
  .then(() => db.User.collection.insertMany(userSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
