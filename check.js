import { writeFileSync } from 'fs';
import { transform } from 'transform-docs';

let nb = 0;
let nbDone = 0;

async function _list(path) {
  const data = await transform(`${path}/en`);
  const translated = await transform(`${path}/fr`);

  data
    .sort((d1, d2) => (d1.type > d2.type ? 1 : -1))
    .forEach(d =>
      d.content.list.sort((d1, d2) => (d1.file > d2.file ? 1 : -1)),
    );

  translated
    .sort((d1, d2) => (d1.type > d2.type ? 1 : -1))
    .forEach(d =>
      d.content.list.sort((d1, d2) => (d1.file > d2.file ? 1 : -1)),
    );

  return data
    .map(d => {
      let name = d.type;

      const frD = translated.find(t => t.type === name);

      const lines = d.content.list
        .map(item => {
          let tabs = '  ';

          const _item = frD?.content.list.find(i => i.file === item.file);

          const subItems = item.sections ?? item.tutorials ?? item.examples;
          const _subItems =
            _item?.sections ?? _item?.tutorials ?? _item?.examples;

          const sections = subItems?.map(({ title, name }, i) => {
            const done = !!_subItems?.find((s, _i) => _i === i);

            nb++;
            if (done) nbDone++;

            return {
              title: title ?? name,
              done,
            };
          });
          const sectionLines =
            sections
              ?.map(s => `      - [${s.done ? 'x' : ' '}] ${s.title}\n`)
              .join('') ?? '';

          const done = sections?.length
            ? !!sections?.every(s => s.done)
            : !!_item;

          if (!sections?.length) {
            nb++;
            if (done) nbDone++;
          }
          // console.log(item.file ?? item.name, done, sections);

          return `${tabs} - [${done ? 'x' : ' '}] ${
            item.file ?? item.name
          }\n${sectionLines}`;
        })
        .join('');

      return `## ${name}\n${lines}`;
    })
    .join('')
    .replaceAll('<', '\\<');
}

const str = await _list('svelte');

const output = `# TODO

${nbDone} / ${nb} (${((nbDone / nb) * 100).toFixed(2)} %)

${str}
`;

writeFileSync('./todo.md', output);
