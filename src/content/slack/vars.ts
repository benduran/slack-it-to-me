export const vars = {
  PRIMARY_FOREGROUND: '--sk_primary_foreground',
  PRIMARY_BACKGROUND: '--sk_primary_background',
  INVERTED_FOREGROUND: '--sk_inverted_foreground',
  INVERTED_BACKGROUND: '--sk_inverted_background',
  FOREGROUND_MAX: '--sk_foreground_max',
  FOREGROUND_HIGH: '--sk_foreground_high',
  FOREGROUND_LOW: '--sk_foreground_low',
  FOREGROUND_MIN: '--sk_foreground_min',
  FOREGROUND_MAX_SOLID: '--sk_foreground_max_solid',
  FOREGROUND_HIGH_SOLID: '--sk_foreground_high_solid',
  FOREGROUND_LOW_SOLID: '--sk_foreground_low_solid',
  FOREGROUND_MIN_SOLID: '--sk_foreground_min_solid',
  HIGHLIGHT: '--sk_highlight',
  HIGHLIGHT_HOVER: '--sk_highlight_hover',
};

export type VarKey = keyof typeof vars;

export function getVarLabel(k: VarKey) {
  const [first, second] = k.split('_');
  let out = `${first.substring(0, 1)}${first.substring(1).toLowerCase()}`;
  if (second) out += `${second.substring(0, 1)}${second.substring(1).toLowerCase()}`;
  return out;
}

export function readVar(variable: VarKey) {
  return document.documentElement.style.getPropertyValue(vars[variable]) || '#000000';
}

export function setVar(variable: VarKey, val: string) {
  return document.documentElement.style.setProperty(vars[variable], val);
}
