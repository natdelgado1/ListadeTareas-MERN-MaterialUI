"use client";
import { useRouter } from "next/navigation";
import { use, useEffect } from "react";
import { useState } from "react";

export default function Home() { 
  const router = useRouter();
  const[user, setUser] = useState();


  const fetchUser = async () => {
    return JSON.parse(localStorage.getItem("user"));
  }

useEffect(() => {
  setUser(fetchUser());
}, []);

useEffect(()=>{
  if(!user){
    router.push("/login")
  }else{
    router.push("/list")
  }
  },[user])

  return (
    <main>   
    </main>
  );
}
