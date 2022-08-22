const Twit = require("twit");
const schedule = require("node-schedule");
const dotenv = require("dotenv");
dotenv.config();

const T = new Twit({
  consumer_key: "dkXWvymclOIixwxoeva9XCyCw",
  consumer_secret: "25UHkJ1LxMDfKXycBPbrClfCMHhRyfj0rWg0OOHjvQrfG2Bmv8",
  access_token: "1517124816557547521-C1e4NZPj7UqOK4f9S2b7UeygWdjhon",
  access_token_secret: "KpeWlEbQpVC31I06b21t3rX1UA8TmRUYLFjKyv5wMqTPE",
});

const tweet = (data) => {
  const { content, datetime } = data;
  const someDate = new Date(datetime);
  console.log(someDate);

  schedule.scheduleJob(someDate, () => {
    T.post("statuses/update", { status: content }, onFinish);
  });

  const onFinish = (err, reply) => {
    if (err) {
      console.log("Error: ", err.message);
    } else {
      console.log("Success: ", reply);
    }
  };

  // T.post(
  //   "statuses/destroy/1517124816557547500",
  //   { id: "1524011408694079500" },
  //   function (err, data, response) {
  //     console.log(data);
  //   }
  // );
  // T.get("account/verify_credentials", { skip_status: true })
  //   .catch(function (err) {
  //     console.log("caught error", err.stack);
  //   })
  //   .then(function (result) {

  //     console.log("data", result.data);
  //   });
};

module.exports = tweet;

//*Ataparticular Date&Time
