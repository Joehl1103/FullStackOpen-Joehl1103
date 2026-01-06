const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

/* add the token to the request to be used by the user extractor
*/
const tokenExtractor = (request, response, next) => {
  const authorization = request.get("authorization");

  if (authorization && authorization.startsWith("Bearer")) {
    let token = authorization.replace("Bearer ", "");
    request.token = token;
  }
  next();
};

/* */
const userExtractor = async (request, response, next) => {
  // console.log("entering user extractor");
  if (!request.token) {
    console.error("no token");
    return response.status(401).json({ error: "no token" });
  }
  // console.log("token", request.token);
  /**
   * verifies that the token in the request matches the secrets
   */
  let decodedToken
  try {
    decodedToken = jwt.verify(request.token, process.env.SECRET);
  } catch (e) {
      console.log('could not verify the token')
      throw e 
  }
  // console.log('decoded token', decodedToken)
  const user = await User.findById(decodedToken.id);
  if (!user){
    throw new Error('no user found with that information')
  }
  /**
   * attaches the user found from the decoded token to the request object
   */
  request.user = user;
  next();
};

const errorHandler = (error, request, response, next) => {
  if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (
    error.name === "MongoServerError" &&
    error.message.includes("E11000 duplicate key erro")
  ) {
    return response
      .status(400)
      .json({ error: "expected `username` to be unique" });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({ error: "token invalid" });
  } else if (error.name === "TokenExpiredError") {
    return response.status(401).json({ error: "token expired" });
  } else if (error.name === "TypeError") {
    return response.status(401).json({ error: "type error" });
  } else if (error.name === "MongoPoolClosedError") {
    console.log('MongoPoolClosedError')
    return response.status(401).json({ error: `${error.messsage}` });
  } else {
    console.log(`some other unknown error. ${error.name}`,error.stack)
    return response.status(401).json({ error: `${error.message}; error name: ${error.name}` });
  }

  next(error);
};

module.exports = { errorHandler, tokenExtractor, userExtractor };
