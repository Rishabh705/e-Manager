import { FaTrash } from 'react-icons/fa';

export default function Delete({id,path,setData}) {
    async function handleDelete(id) {
        try {
            const confirmed = confirm("Are you sure?")
            if (confirmed) {
                const res = await fetch(`/api/${path}?id=${id}`, { method: 'DELETE' })
                if (res.ok){
                    setData(prev=>prev.filter(obj=>obj._id!==id))
                }
            }
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <button onClick={() => handleDelete(id)}>
            <FaTrash width={50} height={10} />
        </button>
    )
}
