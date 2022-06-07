import { Controller, Get } from "@midwayjs/decorator";

const https = require("https");
import cheerio from "cheerio";

@Controller("/")
export class HomeController {
  @Get("/")
  async home(): Promise<unknown> {
    const result = await this.getData();
    return result;
  }

  getData = () => {
    return new Promise(((resolve, reject) => {
      let data = "";
      https.get("https://www.baidu.com/", (result) => {
        result.on("data", (chunk) => {
          data += chunk;
        });
        result.on("end", () => {
          resolve(this.filterData(data));
        });
      });
    }));
  };

  filterData = (data) => {
    const $ = cheerio.load(data);
    let arr = [];
    $("#lg").children("img").each((index, el) => {
      $(el).each((pos, element) => {
        arr.push($(element).attr("src"));
      });
    });
    return arr.join();
  };
}
