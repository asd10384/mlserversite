import "dotenv/config";
import { Router } from "express";
import { join } from "path";
import { readdirSync, readFileSync } from "fs";

export default Router().get("/install", async (req, res) => {
  const domain = `${req.protocol}://${req.headers.host}`;
  const defaultpath = join(__dirname, "../..", "install");
  const data = readFileSync(join(defaultpath, "main.txt"), { encoding: "utf8" });
  var output = `<div class="text">${data.replace(/\r\n/g,"<br/>").replace(/\<link\>/g,`<img src="${domain}/image/`).replace(/\<\/link\>/g,'"/>')}</div>`;
  return res.status(200).render("install", {
    install: output
  });
});