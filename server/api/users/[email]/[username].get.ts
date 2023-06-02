export default defineEventHandler(async (event) => {
  return { params: event.context.params };
});
