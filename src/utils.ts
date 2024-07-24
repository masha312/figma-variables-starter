import { VariableOptions } from './types'

// ---------------------------------------------------------------------------------------------------------------------
// string
// ---------------------------------------------------------------------------------------------------------------------

/**
 * Capitalise a string
 */
export function capitalize(text: string): string {
  return text.trim().replace(/./, c => c.toUpperCase())
}

// ---------------------------------------------------------------------------------------------------------------------
// object
// ---------------------------------------------------------------------------------------------------------------------

/**
 * Assert a value is a true Object
 */
function isObject(value: any) {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
}

/**
 * Convert an object to entries, with entries sorted by value
 *
 * It seems that JS does not generate entries in the order of property creation when keys are numeric
 */
export function sortEntries(values: Record<string | number, string | number>): [string, number | string][] {
  const entries = Object.entries(values)
  if (entries[0] && typeof entries[0][1] === 'number') {
    return entries.sort((a, b) => {
      return <number>a[1] - <number>b[1]
    })
  }
  return entries
}

/**
 * Filter an object to skip values with underscored keys
 */
export function skipPrivate(values: Record<string, any>) {
  return Object.entries(values).reduce((output, [key, value]) => {
    if (!key.startsWith('_')) {
      output[key] = isObject(value)
        ? skipPrivate(value)
        : value
    }
    return output
  }, {} as any)
}

// ---------------------------------------------------------------------------------------------------------------------
// figma
// ---------------------------------------------------------------------------------------------------------------------

/**
 * Convert Hex to Figma RGB value
 */
export function hexToRgb(hex: string) {
  hex = hex.replace(/^#/, '')
  const bigint = parseInt(hex, 16)
  const r = ((bigint >> 16) & 255) / 255
  const g = ((bigint >> 8) & 255) / 255
  const b = (bigint & 255) / 255
  return { r, g, b }
}

/**
 * Create Figma variables
 */
export function createVariables(collection: VariableCollection, config: Record<string, any>, options: VariableOptions) {
  // extract variables
  const { type, scopes, name, prop } = options

  // sort entries, because JS ignores order
  const entries = sortEntries(config)

  // create!
  for (const entry of entries) {
    // props
    const key = entry[0]
    let value: any = entry[1]

    // value
    const fullName = `${name}/${key}`.replaceAll('.', '-')
    if (type === 'COLOR') {
      value = hexToRgb(value)
    }

    // find or create variable
    const existingVariableId = collection.variableIds.find((variableId: any) => figma.variables.getVariableById(variableId)?.name === fullName)
    const variable = existingVariableId
      ? figma.variables.getVariableById(existingVariableId)
      : figma.variables.createVariable(fullName, collection, type)

    // set values
    if (variable) {
      variable.setValueForMode(collection.modes[0].modeId, value)
      variable.setVariableCodeSyntax('WEB', `${prop}-${key}`)
      variable.scopes = scopes
    }
  }
}
