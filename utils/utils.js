import _ from 'lodash'

const fnFilterPostLabels = (labelsToOmit = [], labelsObj) => {
  _.remove(labelsObj, l => _.includes(labelsToOmit, l.name))
  return labelsObj
}

export { fnFilterPostLabels }
