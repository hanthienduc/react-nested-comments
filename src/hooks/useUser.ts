export function useUser() {
  const pattern = /userId=(?<id>[^;]+);?$/
  return {
    id: document.cookie.match(pattern)?.groups?.id ?? '',
  }
}
