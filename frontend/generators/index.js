/* eslint-disable func-names */
module.exports = function (plop) {
  plop.setHelper('pageCase', (text) => {
    const finalText = text.slice(0, 1).toUpperCase() + text.slice(1);
    return `${finalText}Page`;
  });
  plop.setHelper('transformInArray', (text) =>
    text.split(',').map((str) => str.trim()));
  // create your generators here
  plop.setGenerator('Component', {
    description: 'Create a simple Component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of components?',
      },
      {
        type: 'list',
        name: 'typeComponent',
        message: 'Which type of Component?',
        choices: () => ['Stateless', 'React.Component'],
      },
    ], // array of inquirer prompts
    actions: (data) => {
      const { typeComponent } = data;
      const actions = [
        {
          type: 'add',
          path: '../app/components/{{properCase name}}/style.less',
          templateFile: './component/style.less.hbs',
          abortOnFail: true,
        },
      ];

      let templateFile = '';
      switch (typeComponent) {
        case 'Stateless':
          templateFile = './component/stateless.js.hbs';
          break;
        default:
          templateFile = './component/index.js.hbs';
          break;
      }

      actions.push({
        type: 'add',
        path: '../app/components/{{properCase name}}/index.js',
        templateFile,
        abortOnFail: true,
      });

      return actions;
    },
  });
  plop.setGenerator('Form', {
    description: 'Create a simple Form',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of Entity?',
      },
      {
        type: 'input',
        name: 'properties',
        message: 'Type properties separated by comma (,)',
      },
    ],
    actions: [
      {
        type: 'add',
        path: '../app/components/{{properCase name}}Form/style.less',
        templateFile: './component/style.less.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: '../app/components/{{properCase name}}Form/index.js',
        templateFile: './form/index.js.hbs',
        abortOnFail: true,
      },
    ],
  });
  plop.setGenerator('Page Container', {
    description: 'Create a simple Page Container',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of your page?',
      },
      {
        type: 'confirm',
        name: 'isPrivate',
        message: 'is It a Private Page?',
      },
      {
        type: 'list',
        name: 'typeEnhancement',
        message: 'Select the enhancement that you want',
        choices: () => [
          'Just with a List',
          'With CRUD of some entity',
          'Empty',
        ],
      },
      {
        type: 'input',
        name: 'properties',
        message:
          '(If you choose CRUD) Type properties separated by comma (,) (If dont, just press enter)',
      },
    ], // array of inquirer prompts
    actions: (data) => {
      const { typeEnhancement } = data;
      let actions = [
        {
          type: 'add',
          path: '../app/containers/{{pageCase name}}/loadable.js',
          templateFile: './container/loadable.js.hbs',
          abortOnFail: true,
        },
      ];
      switch (typeEnhancement) {
        case 'Just with a List':
          actions = [
            ...actions,
            {
              type: 'add',
              path: '../app/containers/{{properCase name}}Page/index.js',
              templateFile: './container/withListOnly/index.js.hbs',
              abortOnFail: true,
            },
            {
              type: 'add',
              path: '../app/containers/{{properCase name}}Page/actions.js',
              templateFile: './container/withListOnly/actions.js.hbs',
              abortOnFail: true,
            },
            {
              type: 'add',
              path: '../app/containers/{{properCase name}}Page/constants.js',
              templateFile: './container/withListOnly/constants.js.hbs',
              abortOnFail: true,
            },
            {
              type: 'add',
              path: '../app/containers/{{properCase name}}Page/normalizr.js',
              templateFile: './container/withListOnly/normalizr.js.hbs',
              abortOnFail: true,
            },
            {
              type: 'add',
              path: '../app/containers/{{properCase name}}Page/reducer.js',
              templateFile: './container/withListOnly/reducer.js.hbs',
              abortOnFail: true,
            },
            {
              type: 'add',
              path: '../app/containers/{{properCase name}}Page/saga.js',
              templateFile: './container/withListOnly/saga.js.hbs',
              abortOnFail: true,
            },
            {
              type: 'add',
              path: '../app/containers/{{properCase name}}Page/selectors.js',
              templateFile: './container/withListOnly/selectors.js.hbs',
              abortOnFail: true,
            },
          ];
          break;
        case 'With CRUD of some entity':
          actions = [
            ...actions,
            {
              type: 'add',
              path: '../app/containers/{{properCase name}}Page/index.js',
              templateFile: './container/crud/index.js.hbs',
              abortOnFail: true,
            },
            {
              type: 'add',
              path:
                '../app/containers/{{properCase name}}Page/components/{{properCase name}}CreateButton/index.js',
              templateFile:
                './container/components/EntityCreateButton/index.js.hbs',
              abortOnFail: true,
            },
            {
              type: 'add',
              path:
                '../app/containers/{{properCase name}}Page/components/{{properCase name}}EditButton/index.js',
              templateFile:
                './container/components/EntityEditButton/index.js.hbs',
              abortOnFail: true,
            },
            {
              type: 'add',
              path:
                '../app/containers/{{properCase name}}Page/components/{{properCase name}}Form/index.js',
              templateFile: './form/index.js.hbs',
              abortOnFail: true,
            },
            {
              type: 'add',
              path:
                '../app/containers/{{properCase name}}Page/components/{{properCase name}}List/index.js',
              templateFile: './container/components/EntityList/index.js.hbs',
              abortOnFail: true,
            },
            {
              type: 'add',
              path: '../app/containers/{{properCase name}}Page/actions.js',
              templateFile: './container/crud/actions.js.hbs',
              abortOnFail: true,
            },
            {
              type: 'add',
              path: '../app/containers/{{properCase name}}Page/constants.js',
              templateFile: './container/crud/constants.js.hbs',
              abortOnFail: true,
            },
            {
              type: 'add',
              path: '../app/containers/{{properCase name}}Page/normalizr.js',
              templateFile: './container/crud/normalizr.js.hbs',
              abortOnFail: true,
            },
            {
              type: 'add',
              path: '../app/containers/{{properCase name}}Page/reducer.js',
              templateFile: './container/crud/reducer.js.hbs',
              abortOnFail: true,
            },
            {
              type: 'add',
              path: '../app/containers/{{properCase name}}Page/saga.js',
              templateFile: './container/crud/saga.js.hbs',
              abortOnFail: true,
            },
            {
              type: 'add',
              path: '../app/containers/{{properCase name}}Page/selectors.js',
              templateFile: './container/crud/selectors.js.hbs',
              abortOnFail: true,
            },
          ];
          break;
        case 'Empty':
          actions = [
            ...actions,
            {
              type: 'add',
              path: '../app/containers/{{properCase name}}Page/index.js',
              templateFile: './container/empty/index.js.hbs',
              abortOnFail: true,
            },
            {
              type: 'add',
              path: '../app/containers/{{properCase name}}Page/style.less',
              templateFile: './container/empty/style.less.hbs',
              abortOnFail: true,
            },
          ];
          break;
        default:
          break;
      }
      return actions;
    },
  });
  plop.setGenerator('Form Container', {
    description: 'Create a Form Container',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of your entity?',
      },
      {
        type: 'input',
        name: 'properties',
        message: 'Type properties separated by comma (,)',
      },
    ], // array of inquirer prompts
    actions: () => {
      const hbsPath = './formContainer';
      const containerPath =
        '../app/containers/{{properCase name}}FormContainer';
      const componentPath = '../app/components/{{properCase name}}Form';
      return [
        {
          type: 'add',
          path: `${containerPath}/index.js`,
          templateFile: `${hbsPath}/container.js.hbs`,
          abortOnFail: true,
        },
        {
          type: 'add',
          path: `${containerPath}/actions.js`,
          templateFile: `${hbsPath}/actions.js.hbs`,
          abortOnFail: true,
        },
        {
          type: 'add',
          path: `${containerPath}/constants.js`,
          templateFile: `${hbsPath}/constants.js.hbs`,
          abortOnFail: true,
        },
        {
          type: 'add',
          path: `${containerPath}/reducer.js`,
          templateFile: `${hbsPath}/reducer.js.hbs`,
          abortOnFail: true,
        },
        {
          type: 'add',
          path: `${containerPath}/saga.js`,
          templateFile: `${hbsPath}/saga.js.hbs`,
          abortOnFail: true,
        },
        {
          type: 'add',
          path: `${containerPath}/selectors.js`,
          templateFile: `${hbsPath}/selectors.js.hbs`,
          abortOnFail: true,
        },
        {
          type: 'add',
          path: `${componentPath}/index.js`,
          templateFile: `${hbsPath}/component.js.hbs`,
          abortOnFail: true,
        },
        {
          type: 'add',
          path: `${componentPath}/style.less`,
          templateFile: `${hbsPath}/style.less.hbs`,
          abortOnFail: true,
        },
      ];
    },
  });
  plop.setGenerator('Pre Load HOC', {
    description: 'Create High Order Component for Preload Detail',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of your entity?',
      },
    ], // array of inquirer prompts
    actions: () => {
      const hbsPath = './preLoadHOC';
      const containerPath = '../app/containers/{{properCase name}}DetailHOC';
      return [
        {
          type: 'add',
          path: `${containerPath}/actions.js`,
          templateFile: `${hbsPath}/actions.js.hbs`,
          abortOnFail: true,
        },
        {
          type: 'add',
          path: `${containerPath}/constants.js`,
          templateFile: `${hbsPath}/constants.js.hbs`,
          abortOnFail: true,
        },
        {
          type: 'add',
          path: `${containerPath}/index.js`,
          templateFile: `${hbsPath}/index.js.hbs`,
          abortOnFail: true,
        },
        {
          type: 'add',
          path: `${containerPath}/reducer.js`,
          templateFile: `${hbsPath}/reducer.js.hbs`,
          abortOnFail: true,
        },
        {
          type: 'add',
          path: `${containerPath}/saga.js`,
          templateFile: `${hbsPath}/saga.js.hbs`,
          abortOnFail: true,
        },
        {
          type: 'add',
          path: `${containerPath}/selectors.js`,
          templateFile: `${hbsPath}/selectors.js.hbs`,
          abortOnFail: true,
        },
      ];
    },
  });

  plop.setGenerator('ListContainer', {
    description: 'Create List Container',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of your entity?',
      },
      {
        type: 'input',
        name: 'properties',
        message: 'Type properties separated by comma (,)',
      },
    ], // array of inquirer prompts
    actions: () => {
      const hbsPath = './paginationList';
      const containerPath =
        '../app/containers/{{properCase name}}ListContainer';
      const componentPath = '../app/components/{{properCase name}}List';
      return [
        {
          type: 'add',
          path: `${containerPath}/actions.js`,
          templateFile: `${hbsPath}/actions.js.hbs`,
          abortOnFail: true,
        },
        {
          type: 'add',
          path: `${componentPath}/index.js`,
          templateFile: `${hbsPath}/component.js.hbs`,
          abortOnFail: true,
        },
        {
          type: 'add',
          path: `${containerPath}/normalizr.js`,
          templateFile: `${hbsPath}/normalizr.js.hbs`,
          abortOnFail: true,
        },
        {
          type: 'add',
          path: `${containerPath}/constants.js`,
          templateFile: `${hbsPath}/constants.js.hbs`,
          abortOnFail: true,
        },
        {
          type: 'add',
          path: `${containerPath}/index.js`,
          templateFile: `${hbsPath}/index.js.hbs`,
          abortOnFail: true,
        },
        {
          type: 'add',
          path: `${containerPath}/reducer.js`,
          templateFile: `${hbsPath}/reducer.js.hbs`,
          abortOnFail: true,
        },
        {
          type: 'add',
          path: `${containerPath}/saga.js`,
          templateFile: `${hbsPath}/saga.js.hbs`,
          abortOnFail: true,
        },
        {
          type: 'add',
          path: `${containerPath}/selectors.js`,
          templateFile: `${hbsPath}/selectors.js.hbs`,
          abortOnFail: true,
        },
      ];
    },
  });
};
