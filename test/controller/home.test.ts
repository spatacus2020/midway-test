import { createApp, close, createHttpRequest } from '@midwayjs/mock';
import { Framework } from '@midwayjs/koa';

describe('test/controller/home.test.ts', () => {

  it('should GET /', async () => {
    // create app
    const app = await createApp<Framework>();
    //记录请求前当前时间
    const req_start=+new Date();
    // make request
    const result = await createHttpRequest(app).get('/');
    //记录返回后当前时间
    const req_end=+new Date();

    // 如果接口请求时间超过1秒钟，则Assert断言失败
    const res=(req_end-req_start)<1000
    expect(res).toBe(true)
    //  如果接口返回值不等于"//www.baidu.com/img/bd_logo1.png"，则Assert断言失败
    expect(result.text).toBe("//www.baidu.com/img/flexible/logo/pc/index.png");

    // close app
    await close(app);
  });

});
