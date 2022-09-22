import * as express from "express";
import { loadListingByFilter } from "../api/listing/index.api.listing";
import authorizeRequest from "../services/authentication.service";
const app = express();

/**
 * @swagger
 *
 */
app.post("/user/addListingToWishlist", authorizeRequest(), loadListingByFilter);
