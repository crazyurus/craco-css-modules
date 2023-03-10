const { getStyleRuleByName } = require('./utils');

test('the style rule matcher can match the rules correctly', () => {
  const rules = [
    { test: /\.css$/, flag: 'css' },
    { test: /\.module\.css$/, flag: 'module.css' },
    { test: /\.less$/, flag: 'less' },
    { test: /\.module\.less$/, flag: 'module.less' },
    { test: /\.(scss|sass)$/, flag: 'scss' },
    { test: /\.module\.(scss|sass)$/, flag: 'module.scss' },
  ];
  const [cssRule, cssModuleRule] = getStyleRuleByName('css', rules);
  const [lessRule, lessModuleRule] = getStyleRuleByName('less', rules);
  const [sassRule, sassModuleRule] = getStyleRuleByName('(scss|sass)', rules);

  expect(cssRule.flag).toEqual('css');
  expect(cssModuleRule.flag).toEqual('module.css');
  expect(lessRule.flag).toEqual('less');
  expect(lessModuleRule.flag).toEqual('module.less');
  expect(sassRule.flag).toEqual('scss');
  expect(sassModuleRule.flag).toEqual('module.scss');
});
