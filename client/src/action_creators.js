export function setUsers(state) {
  return {
      type: 'SET_USERS',
      payload: state
  };
}

export function vote(entry) {
  return {
      meta: { remote: true },
      type: 'VOTE',
      entry
  };
}

export function next() {
  return {
      meta: { remote: true },
      type: 'NEXT'
  };
}
