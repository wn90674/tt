import { blueBright,  redBright } from 'chalk';
import * as express from 'express';
import { readFileSync } from 'fs';
import { methodList } from './app';
import { getFileNameByPath } from '../utils/path';
import { getType } from '../utils/equal';
import { mock} from 'mockjs'
const isEqual = require('lodash.isequal');

const app = express();
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

interface ReqBank {
  method: string;
  [key: string]: any;
}
/**
 * 查询结果
 */
interface QueryResult {
  query: any;
  data: Object;
}

app.post('/api', (req, res) => {
  const { method }: ReqBank = req.query;

  // 查找是否存在对应的apiJSON文件
  const filepath = methodList.find(
    (_path: string) => getFileNameByPath(_path) === method,
  );

  if (filepath) {
    const content = readFileSync(filepath, { encoding: 'utf-8' });
    let jsonContent = JSON.parse(content).result;

    let result: object;
    if (getType(jsonContent) === 'Array') {
      // 如果为数组，匹配查询条件返回结果
      result =
        (jsonContent as Array<QueryResult>).find((item) => {
          return isEqual(item.query, req.body);
        })?.data;
    } else {
      // 对象直接作为结果返回
      result = jsonContent
    }

    const mockResult = mock(result)
    res.set('Content-Type', 'application/json');
    res.send(mockResult);
  } else {
    res.status(404).send({
      code: 404,
    });
  }
});

/**
 * 查询所有接口名称
 */
app.get('/apiList', (req, res) => {
    // dynamic import
    import('../MockData/login').then(res => {
        // 尽管是动态引入，但是内容引入后不会动态修改
        console.log(redBright(JSON.stringify(res)))
    }) 
    try {
        const apiList = methodList.map(_path => getFileNameByPath(_path))
        res.send({
            data: apiList,
            code: 0
        });        
    } catch (error) {
        res.send({
            data: error,
            code: -1
        })
    }
});

app.listen(3000, () => {
  console.log(blueBright('success'));
});
