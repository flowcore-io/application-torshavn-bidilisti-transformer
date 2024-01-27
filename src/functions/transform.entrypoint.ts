// -----------------------------------------------------------------------------
// Purpose: Transform entrypoint
// this is the entrypoint that will be called when the transformer is invoked
// to transform an event, the return value of this function will be passed to
// the read model adapter.
// -----------------------------------------------------------------------------
interface Input<T = any> {
  eventId: string;
  validTime: string;
  payload: T;
}

export default async function (input: Input) {
  console.info(`Received event ${input.eventId}, with payload ${JSON.stringify(input.payload)} and valid time ${input.validTime}`);
  if (input.aggregator === "borgari") {
    if (input.eventType === "delete") {
      return {
        borgaraid: input.payload.borgaraid,
      };
    }
    // If there is no borgaraid, then the event should be ignored
    if (!input.payload.borgaraid) {
      return null;
    }
  }
  return {
    eventid: input.eventId,
    validtime: input.validTime,
    ...input.payload,
  };
}
