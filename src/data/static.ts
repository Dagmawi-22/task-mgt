import { useAtom } from 'jotai'
import { userDataAtom } from './atoms'

export default function Suggestions(): string[] {
  const [user] = useAtom(userDataAtom)

  return [
    user && user.given_name + ' ' + user.family_name + ' (You)',
    'Abebe Bikila',
    'Kenenisa Zenawi',
    'Ujulu Amare',
    'Mustefa Hailegiorgis',
    'Eden Geda',
    'Yusuf Hailemariam',
    'Kedija Gebremariam'
  ].filter(
    (suggestion): suggestion is string =>
      suggestion !== undefined && suggestion !== null
  )
}
