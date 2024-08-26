import SessionModel, {findEmail} from "../models/sessions.model.js";


const authMiddleware = {
  authentication: async (req, res, next) => {
    const {apikey} = req.query;
    const apikeyUserId = apikey.split('$')[1]
    const apikeyEmail = apikey.split('$')[2]
    const apiKey = apikey.split('$')[3]
    try {
      const isAuthenticated = await findEmail({apikeyEmail}); // Kiểm tra xem người dùng đã được xác thực hay chưa
      if (isAuthenticated.apikey === apiKey) {
        // Người dùng đã được xác thực, cho phép truy cập
            next()
        
      } else {
        throw new Error("Unauthorized"); // Trả về lỗi 401 nếu không được xác thực
      }
    } catch (error) {
      res.status(401).send({
        message: error.message,
      });
    }
  },
  authhorizationAdmin: (req, res, next) => {
    const userRole = "admin"; // Vai trò của người dùng (ví dụ: admin hoặc user)
    if (userRole === "admin") {
      next(); // Cho phép truy cập vào route
    } else {
      res.status(403).send("Forbidden"); // Trả về lỗi 403 nếu không có quyền truy cập
    }
  },
};
export default authMiddleware;
