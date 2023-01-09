const hasDescriptor = (property) => Object.prototype.hasOwnProperty.call(property, 'descriptor')
const propertyKey = (property, index) => {
    const hasDataField = Object.prototype.hasOwnProperty.call(property, 'datafield') 
    return hasDataField ? `${property.datafield}_${index}` : `anon_${index}`
}
const hasLegend = (property) => Object.prototype.hasOwnProperty.call(property, 'text')

const is = (propertyname, property, payload) => {
    const hasIs = Object.prototype.hasOwnProperty.call(property, propertyname)
    if (hasIs) {
        if (typeof property[propertyname] === 'function') return property[propertyname](payload)
        else if (typeof property[propertyname] === 'boolean') return property[propertyname]
        else throw new Error(typeof property[propertyname])
    }
    return false
}
const isHidden = (property, payload) => is('hidden', property, payload)
const isVisible = (property, payload) => !isHidden(property, payload)
const isEditable = (property, payload) => is('canedit', property, payload)
const isPropertyVisible = (property, payload, index) => isVisible(property, payload, index) && !isHidden(property, payload, index)
const resolvePropertyClass = ({ propClass }, payload) => {
  return propClass !== undefined && typeof propClass === 'function' 
    ? propClass(payload)
    : propClass
}
const resolveValueClass = ({ valueClass }, payload) => {
    return valueClass !== undefined && typeof valueClass === 'function'
        ? valueClass(payload)
        : valueClass
}
const resolveLabelClass = ({ labelClass }, payload) => {
    return labelClass !== undefined && typeof labelClass === 'function'
        ? labelClass(payload)
        : labelClass
}
export default {
    hasDescriptor,
    propertyKey,
    hasLegend,
    isHidden,
    isVisible,
    isEditable,
    isPropertyVisible,
    resolvePropertyClass,
    resolveLabelClass,
    resolveValueClass
}