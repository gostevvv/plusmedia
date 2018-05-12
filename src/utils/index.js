import _ from 'lodash'

export function getCardNRows(card, n) {
  const result = _.take(_.keys(card).sort(), n)
  return result
}