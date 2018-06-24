// regular exps to use for string manipulation/
module.exports = {
  boundary: /(boundary="(.*?)")/g,
  _colon_: /.*:\s.*/g,
  colon: /: /g,
  qoutes: /"/g,
  asterix: /\*/g,
  blank: /\r\n\r\n/g,
  line: /\r\n/g,
};
