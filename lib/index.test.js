const CracoLessPlugin = require('craco-less');
const CracoCSSModulesPlugin = require('./index');
const { applyCracoConfigPlugins, applyWebpackConfigPlugins } = require('@craco/craco/dist/lib/features/plugins');
const { craPaths, loadWebpackDevConfig } = require('@craco/craco/dist/lib/cra');
const { getStyleRuleByName } = require('./utils');
const environment = 'development';
const context = { env: environment, paths: craPaths };

process.env.NODE_ENV = environment;

const applyCracoConfigAndOverrideWebpack = cracoConfig => {
  let webpackConfig = loadWebpackDevConfig({
    reactScriptsVersion: 'react-scripts',
  });
  cracoConfig = applyCracoConfigPlugins(cracoConfig, context);
  webpackConfig = applyWebpackConfigPlugins(
    cracoConfig,
    webpackConfig,
    context
  );

  return webpackConfig;
};

test('module.css is modified correctly', () => {
  const webpackConfig = applyCracoConfigAndOverrideWebpack({
    plugins: [
      { plugin: CracoCSSModulesPlugin }
    ],
  });
  const oneOfRule = webpackConfig.module.rules.find(r => r.oneOf);

  expect(oneOfRule).not.toBeUndefined();

  const [cssRule, cssModuleRule] = getStyleRuleByName('css', oneOfRule.oneOf);

  expect(cssRule).not.toBeUndefined();
  expect(cssModuleRule).not.toBeUndefined();
  expect(cssRule.oneOf).toContainEqual({
    resourceQuery: /modules/,
    use: cssModuleRule.use,
  });
  expect(cssRule.use).toBeUndefined();
});

test('module.less is modified correctly', () => {
  const webpackConfig = applyCracoConfigAndOverrideWebpack({
    plugins: [
      { plugin: CracoLessPlugin },
      { plugin: CracoCSSModulesPlugin }
    ],
  });
  const oneOfRule = webpackConfig.module.rules.find(r => r.oneOf);

  expect(oneOfRule).not.toBeUndefined();

  const [lessRule, lessModuleRule] = getStyleRuleByName('less', oneOfRule.oneOf);

  expect(lessRule).not.toBeUndefined();
  expect(lessModuleRule).not.toBeUndefined();
  expect(lessRule.oneOf).toContainEqual({
    resourceQuery: /modules/,
    use: lessModuleRule.use,
  });
  expect(lessRule.use).toBeUndefined();
});

test('module.scss is modified correctly', () => {
  const webpackConfig = applyCracoConfigAndOverrideWebpack({
    plugins: [
      { plugin: CracoCSSModulesPlugin }
    ],
  });
  const oneOfRule = webpackConfig.module.rules.find(r => r.oneOf);

  expect(oneOfRule).not.toBeUndefined();

  const [sassRule, sassModuleRule] = getStyleRuleByName('(scss|sass)', oneOfRule.oneOf);

  expect(sassRule).not.toBeUndefined();
  expect(sassModuleRule).not.toBeUndefined();
  expect(sassRule.oneOf).toContainEqual({
    resourceQuery: /modules/,
    use: sassModuleRule.use,
  });
  expect(sassRule.use).toBeUndefined();
});

test('has AutoCSSModulesWebpackPlugin', () => {
  const { plugins } = applyCracoConfigAndOverrideWebpack({
    plugins: [{ plugin: CracoCSSModulesPlugin }],
  });
  const autoCSSModulesWebpackPlugin = plugins.find(
    plugin => plugin.constructor.name.trim() === 'AutoCssModulesWebpackPlugin'
  );

  expect(autoCSSModulesWebpackPlugin).not.toBeUndefined();
});
