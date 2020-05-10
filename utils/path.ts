/**
 * 通过文件路径获取文件名
 * /Users/sukidayo/Documents/tt/tt/MockData/deleteList.json => deleteList
 */

 export function getFileNameByPath(path:string): string {
   const splitList = path.split(/\/|\./)
   return splitList[splitList.length-2]
 }