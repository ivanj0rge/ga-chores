"use client";
import Hero from "public/cleaning.png";
import Image from "next/image";
import styles from "./page.module.css";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import LoginBtn from "@/components/LoginBtn/LoginBtn";
import { useContext, useEffect } from "react";
import { UserContext } from "@/context/UserContext";

function Login() {
  const session = useSession();
  const router = useRouter();
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    async function createUser() {
      if (session.status === "authenticated") {
        try {
          const data = {
            name: session.data.user.name,
            email: session.data.user.email,
            imgURL: session.data.user.image,
            households: [],
          };
          // console.log(data);
          const res = await fetch("http://localhost:3000/api/users", {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(data),
          });
          const response = await res.json();
          // console.log(response);
          if (res.ok) {
            setUser(response.user);
            router.push(response.redirect);
          } else {
            throw new Error("Failed to create a user");
          }
        } catch (error) {
          // console.log(error);
        }
      }
    }

    createUser();
  });

  if (session.status === "loading") {
    return <p>loading...</p>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <LoginBtn />
      </div>
      <div className={styles.item}>
        <Image        
        src="/_next/static/media/cleaning.e35c6e32.png"
        alt="Cleaning"
        width={500}
        height={300}
        priority={true} />
      </div>
    </div>
  );
}

export default Login;
