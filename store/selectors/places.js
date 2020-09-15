const STATE_KEY = 'places';

export const select = (state) => state[STATE_KEY];

export const selectById = (state, { id }) =>
  state[STATE_KEY].find((place) => place.id === id);
