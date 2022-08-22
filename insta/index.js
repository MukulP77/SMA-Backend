const SocialPost = require("social-post-api");
const schedule = require("node-schedule");
const API_KEY = "9ZCV75F-Y28M83P-JAPEN3T-CM3H12Q";
const social = new SocialPost(API_KEY);

const insta = async (data) => {
  const { content, datetime } = data;
  const someDate = new Date(datetime);
  console.log(someDate);

  schedule.scheduleJob(someDate, async () => {
    const post = await social
      .post({
        post: content,
        platforms: ["instagram"],
        mediaUrls: [
          "https://images.unsplash.com/photo-1500534623283-312aade485b7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        ],
      })
      .catch(console.error);
    console.log(post);
  });
  console.log("Hello");
};

module.exports = insta;
