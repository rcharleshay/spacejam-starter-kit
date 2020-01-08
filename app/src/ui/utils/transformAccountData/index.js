const transformAccountData = (category, filter, accountData, numberOfAccounts) => {
  const { content, productInstanceId } = accountData
  switch (category) {
    case 'mobility':
      const newData = { ...accountData, numberOfAccounts }
      delete Object.assign(newData, { account: content }).content
      return newData
    default:
      return {
        account: content,
        [filter]: {
          productInstanceId,
          numberOfAccounts
        }
      }
  }
}

export default transformAccountData
