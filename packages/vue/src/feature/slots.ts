import { createToken } from '@json2render/core'
import { Slots } from 'vue'

export const slotsToken = createToken<Slots>('slots')
