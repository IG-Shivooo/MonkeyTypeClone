export type Lesson = {
  id: string;
  title: string;
  description: string;
  words: string;
  keys: string[];
};

export const lessons: Lesson[] = [
  {
    id: 'home-row-1',
    title: 'Home Row Basics',
    description: 'Practice the home row keys.',
    words: 'asdf jkl; asdf jkl; fdsa ;lkj fdsa ;lkj',
    keys: ['a', 's', 'd', 'f', 'j', 'k', 'l', ';'],
  },
  {
    id: 'home-row-2',
    title: 'Home Row Words',
    description: 'Type words using only the home row.',
    words: 'a sad fall; a lad asks; all fall; a flask;',
    keys: ['a', 's', 'd', 'f', 'j', 'k', 'l', ';'],
  },
  {
    id: 'top-row-1',
    title: 'Top Row Introduction',
    description: 'Learn the top row keys e, r, u, i.',
    words: 'de de ed ed ki ki ik ik fr fr rf rf ju ju uj uj',
    keys: ['a', 's', 'd', 'f', 'j', 'k', 'l', ';', 'e', 'r', 'u', 'i'],
  },
  {
    id: 'top-row-2',
    title: 'Top Row Words',
    description: 'Practice words with top row keys.',
    words: 'deer feed fire fur jury kite like ride true',
    keys: ['a', 's', 'd', 'f', 'j', 'k', 'l', ';', 'e', 'r', 'u', 'i'],
  },
  {
    id: 'bottom-row-1',
    title: 'Bottom Row Introduction',
    description: 'Learn the bottom row keys v, m, n, c.',
    words: 'cv cv vc vc mn mn nm nm cv mn vc nm',
    keys: ['a', 's', 'd', 'f', 'j', 'k', 'l', ';', 'v', 'm', 'n', 'c'],
  },
  {
    id: 'full-sentences-1',
    title: 'Simple Sentences',
    description: 'Practice typing with full sentences.',
    words: 'the quick brown fox jumps over the lazy dog. a quick movement of the enemy will jeopardize six gunboats.',
    keys: 'abcdefghijklmnopqrstuvwxyz. '.split(''),
  },
];
