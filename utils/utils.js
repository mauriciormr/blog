import _ from 'lodash'

const filterPostLabels = (labelsToOmit = [], labelsObj) => {
  _.remove(labelsObj, l => _.includes(labelsToOmit, l.name))
  return labelsObj
}

export { filterPostLabels }
