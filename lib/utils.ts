import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function mergeDeep<T extends Record<string, any>>(target: T, source: Partial<T>): T {
  const output = { ...target };
  
  // 1. Temel durumlar
  if (!source || typeof source !== 'object') return output;
  
  // 2. Kaynak nesnesinin tüm anahtarlarında döngü
  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      // 3. Eğer değer bir nesneyse ve hedefte de varsa -> recursive merge
      if (source[key] instanceof Object && key in target && target[key] instanceof Object) {
        output[key] = mergeDeep(target[key], source[key]!);
      } 
      // 4. Değilse -> doğrudan atama
      else {
        output[key] = source[key] as T[Extract<keyof T, string>];
      }
    }
  }
  
  return output;
}

export const safeMerge = <T extends Record<string, any>>(
  defaults: T,
  updates: Partial<T>
): T => {
  const result = { ...defaults };
  
  for (const key in updates) {
    if (!updates[key]) continue;

    // Nesneleri recursive merge et
    if (typeof updates[key] === 'object' && !Array.isArray(updates[key])) {
      result[key] = mergeDeep(defaults[key] || {}, updates[key]!);
    } else {
      result[key] = updates[key] as T[Extract<keyof T, string>];
    }
  }
  
  return result;
};
