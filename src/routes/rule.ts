import "dotenv/config";
import { Router } from "express";
import { join } from "path";
import { readdirSync, readFileSync } from "fs";

export default Router().get("/rule", async (req, res) => {
  const defaultpath = join(__dirname, "../..", "rule");
  const rules = readdirSync(defaultpath, { encoding: "utf8" });
  var output = [];
  for (let file of rules) {
    const data = readFileSync(join(defaultpath, file), { encoding: "utf8" });
    output.push(`<div class="text">${file.replace(".txt","")}. ${data.replace(/\r\n/g,"<br/>")}</div>`);
  }
  return res.status(200).render("rule", {
    rules: output.join("\n  ")
  });
});