import React,{useState, useEffect} from "react";


function Loading(){
    let [loading, setLoading] = useState(true)

    useEffect(()=>{
        setTimeout(()=>{
            setLoading(false)
        }, "2000")
    })
    console.log(loading)
    return (
        <>
            <p>{loading.toString()}</p>
            <p>{loading?"Page is loading":"page loaded!"}</p>
        </>
    )
}

export default Loading