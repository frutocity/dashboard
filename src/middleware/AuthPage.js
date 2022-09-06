import { useRouter } from "next/router";
import { useState } from "react";

export default function AuthPage({ children }) {
    const [user, setUser] = useState("")
    const router = useRouter()

    useEffect(() => {
        const authCheck = localStorage.getItem("user");


        if (!authCheck) {
            return router.push("/pages/login")
        }

        setUser(JSON.parse(authCheck));

    }, []);

    return (
        <>

            {user ? children : null}

        </>
    );
};


