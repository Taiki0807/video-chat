module.exports = {
  prompt: ({ inquirer }) => {
    const questions = [
      {
        type: 'input',
        name: 'dir',
        message:
          'どのディレクトリに作成しますか？ ex: app/components/parts',
      },
      {
        type: 'input',
        name: 'name',
        message: 'コンポーネント名は何ですか？ ex: Button',
      },
      {
        type: 'confirm',
        name: 'have_props',
        message: 'Propsは持ちますか？',
        choices: ['Yes', 'No'],
        initial: 'Yes',
      },
    ];
    return inquirer.prompt(questions).then((answers) => {
      const { dir, name, have_props } = answers;
      const { join } = require('node:path');
      const path = join(`${dir || 'app/'}`, '/', name);
      const props = have_props
        ? '(props: Props): JSX.Element'
        : '(): JSX.Element';
      return { ...answers, path, props };
    });
  },
};
