/*
  本地存储封装模块
*/

export const getItem = name => {
  const data = window.localStorage.getItem(name)
  // 因为 data 可能不是json格式字符串,尝试把 data 转为 JavaScript对象 如果不是 原样返回
  try {
    return JSON.parse(data)
  } catch (err) {
    return data
  }
}

export const setItem = (name, value) => {
  // 如果 value 是对象就转换成 json 字符串再存储
  if (typeof value === 'object') value = JSON.stringify(value)
  window.localStorage.setItem(name, value)
}

export const removeItem = name => window.localStorage.removeItem(name)
