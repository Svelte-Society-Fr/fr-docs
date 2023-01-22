import { join } from 'path';
import { existsSync, readdirSync, writeFileSync } from 'fs';

let nb = 0;
let nbDone = 0;

function list(path) {
  const dir = readdirSync(path, { withFileTypes: true });

  return dir
    .sort((a, b) => (a.name > b.name ? 1 : -1))
    .map(d => {
      const segments = path.split('/').splice(2);
      const tabs = segments.reduce(acc => acc + '  ', '');

      const done = existsSync(join(path.replace('/en', '/fr'), d.name));

      if (d.isDirectory()) {
        return `${tabs} - ${d.name}\n${list(join(path, d.name))}`;
      }

      if (done) {
        nbDone++;
      }

      if (d.name.endsWith('.js')) {
        return `${tabs} - ${d.name}\n`;
      }
      nb++;
      return `${tabs} - [${done ? 'x' : ' '}] ${d.name}\n`;
    })
    .reduce((acc, e) => acc + e, '');
}

const str = list('svelte/en');

const output = `# TODO

${nbDone} / ${nb}

${str}
`;

writeFileSync('./todo.md', output);
