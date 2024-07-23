import { on, showUI } from '@create-figma-plugin/utilities'
import { createVariables, skipPrivate } from '../utils'
import { variableOptions } from '../config/variables'
import { config } from '../config/tailwind'
import { ConfigChoices } from '../types'

function onSubmit(collectionId: string, options: ConfigChoices) {
  // get the collection
  const collection: VariableCollection | null = collectionId
    ? figma.variables.getVariableCollectionById(collectionId)
    : figma.variables.createVariableCollection(collectionId)

  // if we have a collection, create variables
  if (collection) {
    // loop over options and reconcile with config
    for (const [group, groupValue] of Object.entries(options)) {
      for (const [name, checked] of Object.entries(groupValue)) {
        // only create checked options
        if (checked) {
          // variables
          // @ts-ignore
          const varConfig = config[group][name]
          const varProps = group === 'colors'
            ? variableOptions.colors.all
            : variableOptions[group][name]
          const varOptions = {
            ...varProps,
            name: varProps.name?.replace('$NAME', name) || name,
            prop: name,
          }
          createVariables(collection, varConfig, varOptions)
        }
      }
    }
  }
}

function onResize(size: { width: number, height: number }) {
  const { width, height } = size
  figma.ui.resize(width, height)
}

export default function () {
  on('CREATE', onSubmit)
  on('RESIZE', onResize)

  const props = {
    config: skipPrivate(config),
    collections: figma.variables
      .getLocalVariableCollections()
      .map(({ id, name }) => ({ id, name })),
  }

  showUI({
    width: 420,
    height: 800,
  }, props)
}
