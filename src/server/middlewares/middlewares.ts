export const ensureLoggedIn = loginUrl => {
  return (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    const nextUrl = req.originalUrl;
    return res.redirect(`${loginUrl}?nextUrl=${nextUrl}`);
  };
};


/*var url = require('url');

function fullUrl(req) {
  return url.format({
    protocol: req.protocol,
    host: req.get('host'),
    path: req.originalUrl
  });
}*/
