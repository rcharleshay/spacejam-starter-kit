const filterMobilityActiveAccounts = (response) => {
  const { firstName, lastName, email, bans } = response
  let bansFormatted = []
  const formattedName = `${firstName} ${lastName}`
  const wirelessBans = bans.filter(ban => ban.type === 'wireless')
  bansFormatted =  wirelessBans.map(({ type, ban, products, typeCd, subTypeCd, encryptedBan, isManager }) =>
    ({ content: ban, numberOfSubs: products, typeCd, subTypeCd, email, formattedName, encryptedBan, isManager })
  )
  return bansFormatted
}

export default filterMobilityActiveAccounts
