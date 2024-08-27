import { AuthContext } from "@/lib/auth/auth"
import { useContext } from "react"

export const useAuth = () => {
    return useContext(AuthContext)
}