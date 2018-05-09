import moment from 'moment'
import {
  padStart,
  padEnd,
  isFunction,
  isObject,
  isString
} from 'lodash'

const renders = {
  /**
   * 选择下拉
   */
  select: ({data, column}) => {
    const option = column.options.find(option => option.value === data)
    return option ? option.label : data
  },
  /**
   * 下拉多选类型
   */
  multiselect: ({data, column}) => {
    return data.map(value => {
      const item = column.options.find(option => option.value === value)
      return item ? item.label : ''
    }).join(',')
  },
  /**
   * 时间类型
   */
  time: ({data, column}) => {
    return data ? moment(data).format(column.dateType) : '-'
  },
  /* 字符拼接 *
  * @padRender 字符串拼接在字符串前{start}或后{end}
  * @length    拼接长度
  * @charWith  使用拼接的字符串或数字
  *  */
  padString: ({data, column}) => {
    const { padRender = 'start', length = 0, charWith = '' } = column.render
    const padFunc = {
      'start': padStart,
      'end': padEnd
    }
    return padFunc[padRender](data, length, charWith)
  },
  /**
   * 金钱符号拼接
   */
  money: ({ data, column }) => {
    return `￥${data}`
  }
  /* 超链接
  * @path     请求的路径或路由命名
  * @params   命名的路由 请求参数
  * @query    带查询参数，变成 ${path}?${query.key}=${query.value}
  * @linkType 链接类型
  * */
  // link: ({data, column}) => {
  //   const {path = '', params = '', query = {}, linkType = 'init'} = column.render
  //   const _renders = {
  //     'init': this.$router.push(path),
  //     'params': this.$router.push({ name: path, params: params }),
  //     'query': this.$router.push({ path: path, query: query })
  //   }
  //   path ? _renders[linkType] : '-'
  //   return data
  // }
}

function itemRender ({ data, column, full, index }) {
  if (isFunction(column.render)) {
    return column.render({ data, full, index, column })
  }
  if (data === null || data === undefined) {
    return ''
  }
  if (isObject(column.render) || isString(column.render)) {
    const type = column.render.type || column.render
    return renders[type]({data, column, full, index})
  }
  return data
}

export function infoRender ({data, column, full, index}) {
  const result = itemRender({data, column, full, index})
  return result === 'null' || result === 'undefined' || result === '' ? '-' : result
}
