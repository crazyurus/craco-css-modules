const { throwUnexpectedConfigError } = require('@craco/craco');
const AutoCSSModulesWebpackPlugin = require('auto-css-modules-webpack-plugin');

function throwError(message, githubIssueQuery) {
  return throwUnexpectedConfigError({
    packageName: 'craco-css-modules',
    githubRepo: 'crazyurus/craco-css-modules',
    message,
    githubIssueQuery,
  });
}

function overrideWebpackConfig({ context, webpackConfig }) {
  const oneOfRule = webpackConfig.module.rules.find(rule => rule.oneOf);

  if (!oneOfRule) {
    throwError(
      "Can't find a 'oneOf' rule under module.rules in the " +
      `${context.env} webpack config!`,
      "webpack+rules+oneOf"
    );
  }

  const extensions = ['css', 'less', '(scss|sass)'];

  extensions.forEach(extension => {
    const styleRule = oneOfRule.oneOf.find(rule => rule.test && rule.test.toString() === `/\\.${extension}$/`);
    const styleModuleRule = oneOfRule.oneOf.find(rule => rule.test && rule.test.toString() === `/\\.module\\.${extension}$/`);

    if (!styleRule) {
      return;
    }

    styleRule.oneOf = [
      {
        resourceQuery: /modules/,
        use: styleModuleRule.use,
      },
      {
        use: styleRule.use,
      }
    ];

    delete styleRule.use;
  });

  webpackConfig.plugins.push(new AutoCSSModulesWebpackPlugin());

  return webpackConfig;
}

module.exports = {
  overrideWebpackConfig,
};
