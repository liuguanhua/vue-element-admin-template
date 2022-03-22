interface Dictionary<T = any> {
  [index: string]: T
}

type DictionaryArray<T = any> = Dictionary<T>[]
