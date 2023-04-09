function clamp(value, min, max) {
  const minClampedValue = Math.max(value, min);

  return Math.min(minClampedValue, max);
}

export default clamp;
