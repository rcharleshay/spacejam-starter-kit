export const formatPhone = (phoneNumber) => phoneNumber.replace(/^(\d{3})(\d{3})(\d{0,4})$/, '$1-$2-$3')
export const formatName = (name) => (name ? (name.length < 18 ? name : `${name.substring(0, 17)}...`) : false)
