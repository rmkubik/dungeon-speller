/**
 * https://stackoverflow.com/questions/59200785/react-usereducer-how-to-combine-multiple-reducers
 */
const reduceReducers =
  (...reducers) =>
  (state, action) =>
    reducers.reduce((acc, nextReducer) => nextReducer(acc, action), state);

export default reduceReducers;
