import {
  minLength,
  maxLength,
  required,
  requiredIf,
  sameAs,
  numeric
} from 'vuelidate/lib/validators'

import {
  req,
  withParams,
  regex
} from 'vuelidate/lib/validators/common'

const min = min =>
  withParams({type: 'min', min}, value =>
    !req(value) || (!/\s/.test(value) && min <= value))

const max = max =>
  withParams({type: 'max', max}, (value) =>
    !req(value) || (!/\s/.test(value) && max >= value))

const reg = value => regex('reg', value)

const formRules = {
  required: (value, rule) => {
    return rule.dataType === 'boolean' ? requiredIf(false) : required
  },
  minLength: (value) => {
    return minLength(value)
  },
  maxLength: (value) => {
    return maxLength(value)
  },
  min: (value) => {
    return min(value)
  },
  max: (value) => {
    return max(value)
  },
  reg: (value) => {
    return reg(value)
  },
  sameAs: (value) => {
    return sameAs(value)
  },
  number: numeric
}

export const validations = ({formList, columns}) => {
  let formValues = {}
  formList.map(formItem => {
    const rules = columns[formItem].form.rules
    if (rules && rules.length) {
      formValues[formItem] = {}
      rules.map(rule => {
        const { type, value } = rule
        formValues[formItem][type] = formRules[type](value, rule)
      })
    }
  })
  return {
    formValues
  }
}
