/** Raw product shape from Fake Store API */
export type FakeStoreProduct = {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: {
    rate: number
    count: number
  }
}

export type Review = {
  id: string
  author: string
  rating: number
  date: string
  body: string
}
