const { throwUnexpectedConfigError } = require('@craco/craco');

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

  const lessRule = oneOfRule.oneOf.find(rule => rule.test.toString() === '/\\.less$/');
  const lessModuleRule = oneOfRule.oneOf.find(rule => rule.test.toString() === '/\\.module\\.less$/');

  lessRule.oneOf = [
    {
      resourceQuery: /modules/,
      use: lessModuleRule.use,
    },
    {
      use: lessRule.use,
    }
  ];

  delete lessRule.use;

  return webpackConfig;
}

function overrideCracoConfig({ cracoConfig }) {
  if (!cracoConfig.babel) {
    cracoConfig.babel = {};
  }

  if (!Array.isArray(cracoConfig.babel.plugins)) {
    cracoConfig.babel.plugins = [];
  }

  cracoConfig.babel.plugins.push('@umijs/babel-plugin-auto-css-modules');

  return cracoConfig;
}

module.exports = {
  overrideWebpackConfig,
  overrideCracoConfig,
};
