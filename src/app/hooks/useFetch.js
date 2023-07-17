import { useEffect, useState } from 'react'
import { getRecords } from '@/app/utils/api'

export function useFetchedData(url, filterState) {
  const [data, setData] = useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        const records = await getRecords(url)
        setData(records)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [url])


  //convert dot notation into bracket notation
  function convertDotToBracket(obj, dotNotation) {
    const properties = dotNotation.split('.');
    let result = obj;

    for (let prop of properties) {
      result = result[prop];
    }

    return result;
  }

  //filter records otherwise just return the fetched data
  const filteredData = filterState ? data.filter(item => {
    const { search, filterValue } = filterState.filter
    const { query, queryValue } = filterState.tableQuery

    const convertedFV = convertDotToBracket(item, filterValue);
    return query && queryValue
      ? convertedFV.toString().toLowerCase().includes(search.toLowerCase())
      && item[query.toLowerCase()].toString() == queryValue
      : convertedFV.toString().toLowerCase().includes(search.toLowerCase())
  })
   : data

  return [filteredData, setData]
}