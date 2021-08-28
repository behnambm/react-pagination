export const paginate = (data) => {
  const itemsPerPage = 9
  const pages = Math.ceil(data.length / itemsPerPage)

  const newFollowers = Array.from({ length: pages }, (_, idx) => {
    const start = idx * itemsPerPage
    const chunk = data.slice(start, start + itemsPerPage)
    return chunk
  })

  return newFollowers
}
