import nodeGeocoder from 'node-geocoder'
import dotenv from 'dotenv'

dotenv.config()

const options = {
  provider: `${process.env.GEOCODER_PROVIDER}`,
  apiKey: `${process.env.API_KEY}`
}

const geocoder= nodeGeocoder(options)

export default geocoder