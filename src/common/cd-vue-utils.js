 function componentProperties(component) {
  return (Array.from(Object.keys(component.props))
    .map(name => ({
      name,
      prop: component.props[name]
    }))
    .map(m => ({
      name: m.name,
      type: m.prop.type,
      required: m.prop.required,
      default: m.prop.default,
      description: m.prop.description
    })
  ))
}

export default {
  isComponentDescribed(component) {
    return (componentProperties(component)).every(property => 
      (property.description !== undefined && 
        typeof property.description === 'string' &&
        property.description.length > 0))
  },
  componentProperties
}