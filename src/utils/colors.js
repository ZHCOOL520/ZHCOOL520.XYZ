export function accentGradient(accent) {
  return accent.replace('text-', 'from-').replace('-400', '-500/20');
}

export function accentBorder(accent) {
  const base = accent.replace('text-', '').replace('-400', '');
  return `border-${base}-400/20 hover:border-${base}-400/40`;
}

export function iconBg(accent) {
  return `from-${accent.replace('text-', '').replace('-400', '-500')}/20`;
}
