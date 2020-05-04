export default function errorHandlingMW(err, req, res, next) {
  console.error(err);
  if (err.status) {
    res.status(err.status).json({
      status: err.status,
      messages: err.messages,
    });
  } else {
    res.status(500).json({
      status: 500,
      messages: ["Internal server error"],
    });
  }
}
