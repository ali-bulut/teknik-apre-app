import Pusher from "pusher-js";

const pusher = new Pusher(process.env.REACT_APP_PUSHER_KEY, {
  cluster: "eu",
  encrypted: true,
});

export default pusher;
