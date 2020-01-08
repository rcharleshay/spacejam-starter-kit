const swapContentForAccount = (accountData) => {
  const newData = accountData
  delete Object.assign(newData, { account: newData.content }).content
  return newData
}

export default swapContentForAccount
