import { isArray, cloneDeep } from 'lodash'
import md5 from 'md5'
// import swal from 'sweetalert2'
export const PROJECT = process.env.PROJECT
export const URL = process.env.URL
export const API = process.env.API
export const VERSION = process.env.VERSION
export const SUBVERSION = Number(process.env.SUBVERSION) + 1
export const TITLE = process.env.TITLE
export const NODE_ENV = process.env.NODE_ENV

export function HostPort (url) {
  const location = window.location
  const hostPort = location.protocol + '//' + location.host + '/' + process.env.API + '/'
  return url ? hostPort + url : hostPort
}

export function encrypt (password) {
  return md5(password)
}

export function dataTypeFunc (value, type) {
  if (value === undefined) {
    return value
  }
  if (type === 'number') {
    return Number(value)
  }
  if (type === 'boolean') {
    return Boolean(value)
  }
  if (type === 'string') {
    return String(value)
  }
  return value
}

export function treeFormat (list, key = 'id', parentKey = 'parentId', childKey = 'children') {
  let sNodes = cloneDeep(list)
  let i, j, k, l, len, len1, r, tmpMap
  if (isArray(sNodes)) {
    r = []
    tmpMap = []
    for (k = 0, len = sNodes.length; k < len; k++) {
      i = sNodes[k]
      i.text = i.label
      tmpMap[i[key]] = i
    }
    for (l = 0, len1 = sNodes.length; l < len1; l++) {
      j = sNodes[l]
      if (tmpMap[j[parentKey]] && j[key] !== j[parentKey]) {
        if (!tmpMap[j[parentKey]][childKey]) {
          tmpMap[j[parentKey]][childKey] = []
        }
        tmpMap[j[parentKey]][childKey].push(j)
      } else {
        r.push(j)
      }
    }
    return r
  } else {
    return [sNodes]
  }
}

export function treeChildren (tree, value, parentKey = 'parentId') {
  const children = tree.filter(item => item[parentKey] === value).map(({value}) => value)
  if (children.length) {
    return children.reduce((result, child) => {
      return [...result, ...treeChildren(tree, child, parentKey)]
    }, [value])
  }
  // console.log([value])
  return [value]
}

export function treeFirstLeaf (tree) {
  if (tree[0].children) {
    return treeFirstLeaf(tree[0].children)
  }
  return tree[0]
}

export function groupFormat (arr, id) {
  let map = {}
  let dest = []
  for (let i = 0; i < arr.length; i++) {
    let ai = arr[i]
    if (!map[ai[id]]) {
      dest.push({
        id: ai[id],
        options: [ai]
      })
      map[ai[id]] = ai
    } else {
      for (let j = 0; j < dest.length; j++) {
        let dj = dest[j]
        if (dj.id === ai[id]) {
          dj.options.push(ai)
          break
        }
      }
    }
  }
  return dest
}

export function rmb (num) {
  const numArray = num.split('.')
  const numList = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
  const radiceList = ['', '拾', '佰', '仟']
  const unitList = ['', '万', '亿', '兆']
  const decList = ['角', '分']
  const num1 = numArray[0].split('').reverse().map((num, index) => {
    const unit = unitList[index / 4] || ''
    return numList[Number(num)] + radiceList[index % 4] + unit
  }).reverse()
  const num2 = numArray[1] === '00' ? ['整'] : numArray[1].split('').map((num, index) => numList[Number(num)] + decList[index])
  return [
    ...num1,
    '元',
    ...num2
  ].join('')
}
export function timeFormat (timestamp) {
  const unitList = ['天', '小时', '分', '秒']
  const valueList = [365, 24, 60, 60]
  const secends = parseInt(timestamp / 1000)
  const minutes = parseInt(secends / 60)
  const hours = parseInt(minutes / 60)
  const days = parseInt(hours / 24)
  return [days, hours, minutes, secends].map((num, index) => {
    return num ? num % valueList[index] + unitList[index] : ''
  }).join('')
}

export function getCallerName (id, data) {
  return data.stepInstances ? data.stepInstances.find(item => item.stepDefineId === id).callerName : ''
}

export function valueFormat (value, dataType) {
  if (!dataType) {
    return value
  }
  if (dataType === 'boolean') {
    if (value && value !== 'false') {
      return true
    } else {
      return false
    }
  }
  if (dataType === 'number') {
    return Number(value)
  }
  return value
}

export const filterByToFilterText = (filterBy = []) => {
  return filterBy.map(({name, type, value}) => `${name}|${type}|${value}`).join(';')
}

export const getFileURL = (shortUrl) => {
  return URL + API + 'download/' + shortUrl
}

// export const swalPrompt = (options, resolve, reject) => {
//   const {
//     title = '提示',
//     text = '',
//     type = 'question',
//     confirmButtonText = '确定',
//     cancelButtonText = '取消' } = options
//   swal({
//     title: title,
//     text: text,
//     type: type,
//     showCancelButton: true,
//     focusConfirm: false,
//     buttonsStyling: false,
//     confirmButtonClass: 'btn btn-complete',
//     cancelButtonClass: 'btn btn-default',
//     confirmButtonText: confirmButtonText,
//     cancelButtonText: cancelButtonText
//   }).then((result) => {
//     resolve && resolve()
//   }, (dismiss) => {
//     reject && reject()
//   })
// }
