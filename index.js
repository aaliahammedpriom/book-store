const app = require("./app");

require("dotenv").config();

require("./config/db");

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
