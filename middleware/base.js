export default function ({isServer, store}) {
  if (isServer) {
    store.dispatch('base/pullBaseInfo')
  }
}
