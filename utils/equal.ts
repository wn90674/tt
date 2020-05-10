/**
 * 判断两个对象是否具有相同的key&value
 */
interface _Object {
  [key: string]: any;
}
export function isEqualObjs(obj1: Object, obj2: Object): boolean {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1 === keys2) {
    for (const key in obj1) {
      const val1 = obj1[key];
      const val2 = obj2[key];
      const type1 = getType(val1);
      const type2 = getType(val2);

      if (type1 === type2) {
        if (type1 === 'Array') {
          // 只考虑数组与对象
          // 判断对象出现不相等的情况 return false 即可
          if(val1.length === val2.length) {
            val1.forEach((item,index) => {
              // 每一项都需要循环递归
              isEqualObjs(val1[index],val2[index])
            });
          } else {
            return false
          }
        } else if (type1 === 'Object') {
          isEqualObjs(val1,val2)
        } else {
          return false;
        }
      } else {
        return false;
      }
    }
  } else {
    return false;
  }
  return true;
}

export  function getType(value: any) {
  return Object.prototype.toString.call(value).slice(8, -1);
}
