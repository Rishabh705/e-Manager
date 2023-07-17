export async function getRecords(url){
    const res = await fetch(url)
    if(!res.ok){
        throw{
            message: "Failed to fetch records",
            statusText: res.statusText,
            status: res.status
        }
    }
    const data = await res.json()
    return data
}

export async function getRecord(url,id) {
    const res = await fetch(`${url}/${id}`)
    if (!res.ok) {
        throw {
            message: "Failed to fetch record.",
            statusText: res.statusText,
            status: res.status
        }
    }
    const data = await res.json()
    return data
}