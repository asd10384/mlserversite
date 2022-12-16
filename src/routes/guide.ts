import "dotenv/config";
import { Router } from "express";
import { join } from "path";
import { readdirSync, readFileSync } from "fs";

export default Router().get("/guide", async (req, res) => {
  const defaultpath = join(__dirname, "../..", "guide");
  const guides = readdirSync(defaultpath, { encoding: "utf8" });
  let output = guides.map(file => `<div class="text"><a href="/guide/${file}">${file}</a></div>`);
  return res.status(200).render("guide", {
    title: "가이드 목록",
    guides: output.join("\n  "),
    datas: undefined
  });
}).get("/guide/:getguide", async (req, res) => {
  const defaultpath = join(__dirname, "../..", "guide");
  const guides = readdirSync(defaultpath, { encoding: "utf8" });
  if (guides.includes(req.params.getguide)) {
    const datas = readdirSync(join(defaultpath, req.params.getguide), { encoding: "utf8" });
    if (datas && datas[0] == "main.txt") {
      const datass: string = readFileSync(join(defaultpath, req.params.getguide, "main.txt"), { encoding: "utf8" });
      return res.status(200).render("guide", {
        title: `${req.params.getguide}`,
        guides: "",
        datas: `<div class="text">${datass.replace(/\r\n/g,"<br/>")}</div>`
      });
    }
    let output = datas.map(file => {
      const datass: string = readFileSync(join(defaultpath, req.params.getguide, file), { encoding: "utf8" });
      return `<div class="text"><div class="title">${file.replace(".txt","")}</div>${datass.replace(/\r\n/g,"<br/>")}</div>`;
    });
    return res.status(200).render("guide", {
      title: `${req.params.getguide} 목록`,
      guides: "",
      datas: output.join("\n  ")
    });
  }
  return res.status(200).render("guide", {
    title: "가이드 오류",
    guides: "",
    datas: `<div class="err">가이드 이름을 찾을수 없음</div>`
  });
})
// .get("/guide/:getguide/:getdata", async (req, res) => {
//   const defaultpath = join(__dirname, "../..", "guide");
//   const datas = readdirSync(join(defaultpath, req.params.getguide), { encoding: "utf8" });
//   if (datas.includes(req.params.getdata+".txt")) {
//     const datass: string = readFileSync(join(defaultpath, req.params.getguide, req.params.getdata+".txt"), { encoding: "utf8" });
//     return res.status(200).render("guide", {
//       title: `${req.params.getguide}의 ${req.params.getdata}`,
//       guides: "/"+req.params.getguide,
//       datas: `<div class="text">${datass.replace(/\r\n/g,"<br/>")}</div>`
//     });
//   }
//   return res.status(200).render("guide", {
//     title: `${req.params.getguide} 목록 오류`,
//     guides: "/"+req.params.getguide,
//     datas: `<div class="err">${req.params.getdata}는 처음봄 다시 입력하셈</div>`
//   });
// });