const middlewareLogger = store => next => action => {
  // store.getState().scheduleMessages.scheduleMessages.map((s) => {
  //   moment(s.service_date).format("L");
  // }),
  //   store.getState().logger.logsList.map((log) => {
  //     log.createdAt = moment(log.createdAt).format('LLL')
  //   })

  next(action);
};
export default middlewareLogger;
