export const formatPhoneNumber = (phoneNumber) => phoneNumber.replace(/^(\d{3})(\d{3})(\d{0,4})$/, '$1-$2-$3')

export const formatName = (name) => {
  if (name) return name.length < 18 ? name : `${name.substring(0, 17)}...`
  return false
}

export const formatString = (string, key, value) => (
  string ? string.replace(`{{${key}}}`, value) : value
)
