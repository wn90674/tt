
import * as glob from 'glob'
import { resolve } from 'path'

export const methodList = glob.sync('MockData/*.@(json|ts)')
    .map(p => {
        return resolve(__dirname, `../${p}`)
    })