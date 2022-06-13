import Header from "./Header"
import MyFooter from "./Footer"
import {Outlet} from "react-router-dom"

function Page(){
    return(
        <div>
            <Header/>
                <Outlet/>
            <MyFooter/>
        </div>
    )
}

export default Page