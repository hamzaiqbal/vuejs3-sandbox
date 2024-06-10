import en from '@/i18n/en.json'

export type MessageSchema = typeof en

// define number format schema
export type NumberSchema = {
  currency: {
    style: 'currency'
    currencyDisplay: 'symbol'
    currency: string
  }
}

export type i18n = { message: MessageSchema; number: NumberSchema }
