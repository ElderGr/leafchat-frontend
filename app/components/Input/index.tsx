import { w, W } from 'windstitch';

export const Input = w.input(
  `
    shadow appearance-none border 
    rounded w-full py-2 px-3 
    text-gray-700 leading-tight 
    focus:outline-none 
    focus:shadow-outline
    `
);
export type InputProps = W.Infer<typeof Input>;