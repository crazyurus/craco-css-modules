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

  const extensions = ['css', 'less', '(scss|sass)'];

  extensions.forEach(extension => {
    const styleRule = oneOfRule.oneOf.find(rule => rule.test.toString() === `/\\.${extension}$/`);
    const styleModuleRule = oneOfRule.oneOf.find(rule => rule.test.toString() === `/\\.module\\.${extension}$/`);

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
