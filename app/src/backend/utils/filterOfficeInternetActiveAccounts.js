import flatMap from 'array.prototype.flatmap'
import groupBy from 'lodash.groupby'
import { compose } from '@telus/isomorphic-core'
import { formatName } from 'src/backend/utils/format'

function flatMapChildProducts(
  accountName,
  billingAccountNum,
  parentProductInstanceId
) {
  return ({ products: childProducts = [], productInstanceId, ...product }) => [
    {
      productInstanceId,
      accountName,
      billingAccountNum,
      parentProductInstanceId,
      ...product
    },
    ...flatMap(
      childProducts,
      flatMapChildProducts(accountName, billingAccountNum, productInstanceId)
    )
  ]
}

function flatMapProducts({ billingAccountNum, products, accountName }) {
  return flatMap(products, flatMapChildProducts(accountName, billingAccountNum))
}

const getFlatProductList = (cans) => flatMap(cans, flatMapProducts)

function mapChildProducts(hsia, allProducts) {
  return hsia.map(
    ({ parentProductInstanceId, productInstanceId, ...hsiaProduct }) => ({
      ...hsiaProduct,
      productInstanceId,
      products: allProducts.filter(
        (product) =>
          product.parentProductInstanceId &&
          product.parentProductInstanceId === productInstanceId
      )
    })
  )
}

const isHsia = ({ productTypes = [] }) => productTypes.includes('HSIA')

const groupProducts = (products) =>
  groupBy(products, ({ billingAccountNum }) => billingAccountNum)
const hasMoreThan = (len) => (list) => list.length > len
const some = (predicate) => (list) => list.some(predicate)

const hasConsolidatedCan = compose(
  some(hasMoreThan(1)),
  Object.values,
  groupProducts
)

const filterOfficeInternetActiveAccounts = ({ cans }) => {
  const allProducts = getFlatProductList(cans)
  const hsiaProducts = allProducts.filter(isHsia)

  if (hsiaProducts.length === 0) {
    return {}
  }

  if (hasConsolidatedCan(hsiaProducts)) {
    return {}
  }

  const filteredProducts = mapChildProducts(hsiaProducts, allProducts)

  return filteredProducts.map(
    ({ billingAccountNum, productInstanceId }) => ({
      content: billingAccountNum,
      productInstanceId
    })
  )
}

export default filterOfficeInternetActiveAccounts
