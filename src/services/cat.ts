export const fetchCatImage = async () => {
  const response = await fetch('https://api.thecatapi.com/v1/images/search')
  const json = await response.json()
  if (!response.ok) throw new Error(json.message)
  return json[0].url
}

/**
 * 先に画像を読み込んでキャッシュしておく。ポップアップ表示ですぐに表示できるようにするため。
 * @param imageUrl
 */
export const prefetchCatImage = async (imageUrl: string) => {
  const imgElement = document.createElement('img')
  imgElement.src = imageUrl
  imgElement.style.display = 'none'
  document.body.appendChild(imgElement)
  await imgElement.decode()
  document.body.removeChild(imgElement)
}
