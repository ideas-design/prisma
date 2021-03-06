export function serializeRawParameters(data: any): string {
  return JSON.stringify(replaceDates(data))
}

/**
 * Replaces Date as needed in https://github.com/prisma/prisma-engines/pull/835
 * @param data parameters
 */
export function replaceDates(data: any): any {
  const type = Object.prototype.toString.call(data)

  if (type === '[object Date]') {
    return {
      prisma__type: 'date',
      prisma__value: data.toJSON(),
    }
  }

  if (type === '[object Object]') {
    const tmp = {}
    for (let key in data) {
      if (key !== '__proto__') {
        tmp[key] = replaceDates(data[key])
      }
    }
    return tmp
  }

  if (type === '[object Array]') {
    let k = data.length
    let tmp
    for (tmp = new Array(k); k--; ) {
      tmp[k] = replaceDates(data[k])
    }
    return tmp
  }

  return data
}
