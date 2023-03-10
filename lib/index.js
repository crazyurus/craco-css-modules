const { throwUnexpectedConfigError } = require('@craco/craco');
const AutoCSSModulesWebpackPlugin = require('auto-css-modules-webpack-plugin');
const { getStyleRuleByName } = require('./utils');

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
  const extensions = ['css', 'less', '(scss|sass)'];

  if (!oneOfRule) {
    throwError(
      "Can't find a 'oneOf' rule under module.rules in the " +
      `${context.env} webpack config!`,
      "webpack+rules+oneOf"
    );
  }

  extensions.forEach(extension => {
    const [styleRule, styleModuleRule] = getStyleRuleByName(extension, oneOfRule.oneOf);

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
