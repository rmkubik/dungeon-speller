function update(array, index, newValue) {
  return [...array.slice(0, index), newValue, ...array.slice(index + 1)];
}

export default update;
