//  ts -> .d.ts 翻译文件 @types/superagent -> js
import fs from 'fs';
import path from 'path';
import superagent from 'superagent';
import cheerio from 'cheerio';

interface Course {
  title: string;
}
interface Content {
  [propName: number]: Course[];
}

interface CourseResult {
  time: number;
  data: Course[];
}
class Crowller {
  private secret = 'secretKey';
  private url = `http://www.dell-lee.com/typescript/demo.html?secret=${this.secret}`;

  constructor() {
    console.log('constructor--->', this.url);
    this.init();
  }
  async init() {
    const filePath = path.resolve(__dirname, '../dist/data.json');
    const text = await this.getRowHtml();
    const infos = this.getCourseInfo(text);
    const fileContent = this.saveDataToFile(infos);
    fs.writeFileSync(filePath, JSON.stringify(fileContent));
    console.log('---???', infos);
  }
  // 获取页面数据
  async getRowHtml() {
    const { text } = await superagent.get(this.url);
    return text;
  }
  // 数据清洗：str -》 json
  getCourseInfo(html: string) {
    const $ = cheerio.load(html);
    const items = $('.course-item');
    const infos: Course[] = [];
    items.map((index, item) => {
      const descs = $(item).find('.course-desc');
      const title = descs.eq(0).text();
      // const count = parseInt(descs.eq(1).text().split('：')[1], 10);
      infos.push({ title });
    });
    return {
      time: new Date().getTime(),
      data: infos,
    };
  }
  // 数据存储到文件
  saveDataToFile(courseInfo: CourseResult) {
    const filePath = path.resolve(__dirname, '../dist/data.json');
    let fileData = {};
    let fileContent: Content = {};
    // 是否有这个文件
    if (fs.existsSync(filePath)) {
      fileContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }
    fileContent[courseInfo.time] = courseInfo.data;
    return fileContent;
  }
}

const crowller = new Crowller();
