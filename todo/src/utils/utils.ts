// По факту проверяет что x - строка, но не гарантирует что это селектор.
export function isSelector(x: any): x is string {
  return typeof x === "string" && x.length > 1;
}

export type SelectorCollection<T> = string | NodeListOf<Element> | T[];

/**
 * Убеждается что все элементы существуют
 * @param selectorElement
 * @param context
 */
export function ensureAllElements<T extends HTMLElement>(
  selectorElement: SelectorCollection<T>,
  context: HTMLElement = document as unknown as HTMLElement
): T[] {
  if (isSelector(selectorElement)) {
    return Array.from(context.querySelectorAll(selectorElement)) as T[];
  }
  if (selectorElement instanceof NodeList) {
    return Array.from(selectorElement) as T[];
  }
  if (Array.isArray(selectorElement)) {
    return selectorElement;
  }
  throw new Error(`Unknown selector element`);
}

export type SelectorElement<T> = T | string;
/**
 * Убеждается что элемент существует
 * @param selectorElement — может быть селектором, элементом или коллекцией элементов
 * @param context
 */
export function ensureElement<T extends HTMLElement>(
  selectorElement: SelectorElement<T>,
  context?: HTMLElement
): T {
  if (isSelector(selectorElement)) {
    const elements = ensureAllElements<T>(selectorElement, context);
    if (elements.length > 1) {
      console.warn(`selector ${selectorElement} return more then one element`);
    }
    if (elements.length === 0) {
      throw new Error(`selector ${selectorElement} return nothing`);
    }
    return elements.pop() as T;
  }
  if (selectorElement instanceof HTMLElement) {
    return selectorElement as T;
  }
  throw new Error("Unknown selector element");
}
