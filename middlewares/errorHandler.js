export default function (err, req, res, next) {
  let { status = 500, message = 'Server Error' } = err;

  res
    .status(status)
    .json(message);
}
