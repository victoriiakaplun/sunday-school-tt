export function getNotifications() {
  return state => state.notifications;
}

export function getTimetables() {
  return state => state.timetables;
}

export function getTimetableLoading() {
  return state => state.loading;
}

export function getTimetableError() {
  return state => state.error;
}
