import { NextFunction, Request, Response } from "express";
import { FirebaseError } from "firebase-admin";
import { unauthorizedUser } from "../utils/apiResponses";
import { FirebaseApp } from "../utils/firebase";

const authorizeRequest =
  () => async (req: Request, res: Response, next: NextFunction) => {
    try {
      const idToken = req.headers.authorization;
      if (idToken?.startsWith("Bearer ")) {
        return FirebaseApp.auth()
          .verifyIdToken(idToken)
          .then((decodedToken) => {
            const uid = decodedToken.uid;
            res.locals = { usersId: uid };
            return next();
          })
          .catch((error: FirebaseError) => {
            return unauthorizedUser({ res, message: error.message });
          });
      }

      return unauthorizedUser({ res });
    } catch (e) {
      res.sendStatus(400).send(e + "");
    }
  };

export default authorizeRequest;
