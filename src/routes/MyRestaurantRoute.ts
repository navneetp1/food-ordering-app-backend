import express from "express";
import multer from "multer";
import MyRestaurantController from "../conttollers/MyRestaurantController";
import { jwtCheck, jwtParse } from "../middleware/auth";
import { validateMyRestaurantRequest } from "../middleware/validation";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, //5 megb
  },
});

//patch means updating only a certain part of the entity
router.patch(
  "/order/:orderId/status",
  jwtCheck,
  jwtParse,
  MyRestaurantController.updateOrderStatus
);

router.get(
  "/order",
  jwtCheck,
  jwtParse,
  MyRestaurantController.getMyRestaurantOrders
);

router.get("/", jwtCheck, jwtParse, MyRestaurantController.getMyRestaurant);

//api/my/restaurant
router.post(
  "/",
  upload.single("imageFile"),
  validateMyRestaurantRequest,
  jwtCheck,
  jwtParse,
  MyRestaurantController.createMyRestaurant
);

router.put(
  "/",
  upload.single("imageFile"),
  validateMyRestaurantRequest,
  jwtCheck,
  jwtParse,
  MyRestaurantController.updateMyRestaurant
);

export default router;
