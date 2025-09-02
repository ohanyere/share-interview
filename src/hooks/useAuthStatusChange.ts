import { useState, useEffect, useRef } from "react";
import {  onAuthStateChanged} from "firebase/auth";
import { auth } from "../firebase.config";

type AuthStatusReturnType = {
    checkingStatus: boolean,
    authStatus : boolean
}
const useAuthStatusChange = (): AuthStatusReturnType => {
    const [checkingStatus, setCheckingStatus] = useState<boolean>(true)
    const [authStatus, setAuthStatus] = useState<boolean>(false)
    const ismounted = useRef(true)


    useEffect(() => {
        if(ismounted.current){
            onAuthStateChanged(auth, (user) => {
                if(user){
                    setAuthStatus(true)
                }
                setCheckingStatus(false)
            })
        }

        return () => {ismounted.current = false}
    })
    return {checkingStatus, authStatus}
}

export default useAuthStatusChange