function intersectionOfStrings(a, b) {
  return a.split("").filter((aChar) => b.includes(aChar));
}

export default intersectionOfStrings;
