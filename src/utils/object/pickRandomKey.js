import pickRandomlyFromArray from "../array/pickRandomlyFromArray";

function pickRandomKey(object) {
  return pickRandomlyFromArray(Object.keys(object));
}

export default pickRandomKey;
