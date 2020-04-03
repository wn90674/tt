import { blueBright,cyan,redBright } from 'chalk'
import { resolve } from 'path'
import * as express from 'express'
import { readFileSync } from 'fs'
import { methodList } from './app'

const app = express()

interface ReqBank {
    method: string,
    [key: string]: any,
}

app.get('/list', (req, res) => {
    const method = req.query.method
    let result: string = ''
    methodList.forEach((_path: string) => {
        console.log(blueBright(_path))
        console.log(cyan(method))
        if (_path.includes(method)) {
            result = readFileSync(_path, { encoding: 'utf-8' })
            console.log(redBright(result))
        }
    });
    res.send(result)
})

app.get('/red', (req, res) => {
    res.send({
        code: 0,
        data: {
            str: 'redirect'
        }
    })
})


app.listen(3000, () => {
    console.log(blueBright('listen 3000 success'))
})