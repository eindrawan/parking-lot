var ipAccess = {};
module.exports = limiter = (req, res) => {
  var ip =
    req.ip ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;

  let now = new Date().getTime();
  if (!ipAccess[ip]) {
    // first access, register ip address
    ipAccess[ip] = {
      lastAccess: new Date(),
      accessCount: 1
    };
    req.next();
  } else if ((now - ipAccess[ip].lastAccess.getTime()) / 1000 > 10) {
    // if request more than 10s, reset counter
    ipAccess[ip] = {
      lastAccess: new Date(),
      accessCount: 1
    };
    req.next();
  } else if (ipAccess[ip].accessCount < 10) {
    // if request less than 10s, add counter
    ipAccess[ip].accessCount++;
    req.next();
  } else {
    // reach max 10reqs/10s block access
    res.send({
      success: false,
      error: "You have reached your request limit, please wait a while."
    });
  }
};
