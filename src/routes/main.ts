import "dotenv/config";
import { Router } from "express";

export default Router().get("/", async (req, res) => {;
  return res.status(200).render("main", {});
});