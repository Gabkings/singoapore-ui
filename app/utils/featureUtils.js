export function getFeatureIsOn(featureList, featureName, defaultIsOn) {
  if (featureList.state === 'SUCCESS'){
    const featureSwitches = featureList.data.results.filter(feature => feature.name === featureName)
    if(featureSwitches.length === 0) {
      return defaultIsOn
    }
    return featureSwitches[0].is_on
  }
  return defaultIsOn
}
