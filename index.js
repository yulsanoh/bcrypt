const bcrypt = require("bcrypt");

// const hashPassword = async (password) => {
//   const salt = await bcrypt.genSalt(12);
//   const hash = await bcrypt.hash(password, salt);
//   console.log(salt);
//   console.log(hash);
// };

const hashPassword = async (password) => {
  const hash = await bcrypt.hash(password, 12);
  console.log(salt);
  console.log(hash);
};

const login = async (password, hashedPassword) => {
  const result = await bcrypt.compare(password, hashedPassword);
  if (result) {
    console.log("LOGGED YOU IN! SUCCESSFUL MATCH");
  } else {
    console.log("INCORRECT");
  }
};

// hashPassword("monkey");
login("monkey", "$2b$12$tSa8mWLwKMfYXOrecfcGBe9tFyhvK61WmiD1wEgglDjNhNMhC4Mvy");
