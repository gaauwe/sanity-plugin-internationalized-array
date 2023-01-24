import type {ArraySchemaType} from 'sanity'
import type {FieldDefinition} from 'sanity'
import {Plugin as Plugin_2} from 'sanity'
import type {Rule} from 'sanity'
import type {RuleTypeConstraint} from 'sanity'
import type {SanityClient} from 'sanity'

export declare type AllowedType = 'string' | 'number' | 'boolean' | 'text' | 'reference'

export declare type ArrayConfig = {
  name: string
  type: AllowedType
  languages: Language[]
  title?: string
  group?: string
  hidden?: boolean | (() => boolean)
  readOnly?: boolean | (() => boolean)
  validation?: Rule | Rule[]
  field?: {
    [key: string]: any
    options: {
      [key: string]: any
    }
  }
}

export declare type ArraySchemaWithLanguageOptions = ArraySchemaType & {
  options: {
    select?: Record<string, string>
    languages: Language[] | LanguageCallback
    apiVersion: string
  }
}

export declare const clear: () => void

export declare const internationalizedArray: Plugin_2<PluginConfig>

export declare type Language = {
  id: Intl.UnicodeBCP47LocaleIdentifier
  title: string
}

export declare type LanguageCallback = (
  client: SanityClient,
  selectedValue: Record<string, unknown>
) => Promise<Language[]>

export declare type PluginConfig = {
  /**
   * https://www.sanity.io/docs/api-versioning
   * @defaultValue '2022-11-27'
   */
  apiVersion?: string
  /**
   * Specify fields that should be available in the language callback:
   * ```tsx
   * {
   *   select: {
   *     markets: 'markets'
   *   },
   *   languages: (client, {markets}) =>
   *     query.fetch(groq`*[_type == "language" && market in $markets]{id,title}`, {markets})
   * }
   * ```
   */
  select?: Record<string, string>
  /**
   * You can give it an array of language definitions:
   * ```tsx
   * {
   *   languages: [
   *     {id: 'en', title: 'English'},
   *     {id: 'fr', title: 'French'}
   *   ]
   * }
   * ```
   * You can load them async by passing a function that returns a promise:
   * ```tsx
   * {
   *   languages: async () => {
   *     const response = await fetch('https://example.com/languages')
   *     return response.json()
   *   }
   * }
   * ```
   * You can query your dataset for languages::
   * ```tsx
   * {
   *   languages: (client) =>
   *     query.fetch(groq`*[_type == "language"]{id,title}`)
   * }
   * ```
   */
  languages: Language[] | LanguageCallback
  /**
   * Can be a string matching core field types, as well as custom ones:
   * ```tsx
   * {
   *   fieldTypes: [
   *     "date", "datetime", "file", "image", "number", "string", "text", "url"
   *   ]
   * }
   * ```
   * You can also define a type directly:
   * ```tsx
   * {
   *   fieldTypes: [
   *     defineField({
   *       name: 'featuredProduct',
   *       type: 'reference',
   *       to: [{type: 'product'}]
   *       hidden: (({document}) => !document?.title)
   *     })
   *   ]
   * }
   * ```
   */
  fieldTypes: (string | RuleTypeConstraint | FieldDefinition)[]
}

export declare type Value = {
  _key: string
  value?: string
}

export {}
