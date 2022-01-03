import {config} from 'dotenv'
config()

export const URL_mongoBD = process.env.URL_mongoBD || 'mongodb://localhost/test'
export const PUERTO_SERVIDOR = process.env.PORT || 3000