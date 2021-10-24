import Prismic from '@prismicio/client'

const REPOSITORY = process.env.PRISMIC_REPOSITORY_NAME
const PRISMIC_URL = `https://${REPOSITORY}.cdn.prismic.io/api/v2`

export const API_TOKEN = process.env.PRISMIC_API_TOKEN
export const API_LOCALE = process.env.PRISMIC_REPOSITORY_LOCALE

export const PrismicClient = Prismic.client(PRISMIC_URL, {
    accessToken: API_TOKEN,
})
