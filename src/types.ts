import { config } from './config/tailwind'

/**
 * Utility type to make a property optional
 */
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/**
 * Utility type to transform Tailwind config to Plugin UI checked options
 */
export type TransformConfig<T> = {
  [K in keyof T]: T[K] extends object
    ? { [P in keyof T[K]]: boolean }
    : boolean;
};

/**
 * 4D structure to model group > name > key > value
 */
export interface Config {
  [key: string]: Record<string, Record<string | number, string | number>>
}

export type ConfigChoices = TransformConfig<typeof config>

/**
 * 3D structure to model group > name > checked
 */
export type OptionsState = Record<string, Record<string, boolean>>

/**
 * Options to pass to variables creation function
 */
export type VariableOptions = {
  name: string
  type: VariableResolvedDataType
  scopes: VariableScope[]
  prop: string
}
