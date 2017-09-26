export default function ({store, error}) {
  if (!store.state.user.id) {
    error({
      message: 'not authed',
      statusCode: 403
    })
  }
}
