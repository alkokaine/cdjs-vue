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
    return true
}

const isVisible = (property, payload) => is('isvisible', property, payload)
const isEditable = (property, payload) => is('canedit', property, payload)
export default {
    hasDescriptor, propertyKey, hasLegend, isVisible, isEditable
}