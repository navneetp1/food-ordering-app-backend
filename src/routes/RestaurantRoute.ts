import express from 'express'
import { param } from 'express-validator';
import RestaurantController from '../conttollers/RestaurantController';

const router = express.Router();

router.get("/search/:city",
        param("city").
        isString().
        trim().
        notEmpty().
        withMessage("City parameter must be a valid string"),
        RestaurantController.searchRestaurant
)

export default router