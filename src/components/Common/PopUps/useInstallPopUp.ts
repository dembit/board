import React, {  useState } from 'react'



const useActivePopUp = <D>(data?: D, active?: boolean) => {
    const [isActive, setIsActive] = useState( active ? true : false)
    const [content, setContent] = useState(data ? data : null)

    return {
        isActive,
        setIsActive,
        content,
        setContent
    }
}


export default useActivePopUp