function getStyleRuleByName(name, rules) {
  const modules = ['', '\\.module'];

  return modules.map(module => rules.find(rule => rule.test && rule.test.toString() === `/${module}\\.${name}$/`));
}

module.exports = {
  getStyleRuleByName,
};
