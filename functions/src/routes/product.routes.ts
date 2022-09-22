import * as express from "express";
import {
  loadListingByFilter,
  searchListingByFilter,
} from "../api/listing/index.api.listing";
import authorizeRequest from "../services/authentication.service";
const app = express();

/**
 * @swagger
 *
 */
app.post("/listing/loadByFilter", authorizeRequest(), loadListingByFilter);
app.post("/listing/searchByFilter", authorizeRequest(), searchListingByFilter);
app.post("/listing/searchByFilter", authorizeRequest(), searchListingByFilter);
