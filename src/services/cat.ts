export const fetchCatImage = async () => {
  const response = await fetch('https://api.thecatapi.com/v1/images/search')
  const json = await response.json()
  if (!response.ok) throw new Error(json.message)
  return json[0].url
}
