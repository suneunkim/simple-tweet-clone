import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import useMutation from "@/libs/client/useMutation";

export default () => {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onValid = async (data: any) => {
    if (!loading) {
      setLoading(true);

      const request = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (request.status === 404) {
        alert("가입된 이메일이 아닙니다.");
      }

      if (request.status === 200) {
        setLoading(false);
        router.push("/");
      } else {
        setLoading(false);
      }
    }
  };

  return (
    <div className="mx-auto flex max-w-sm flex-col justify-center space-y-10 px-5 py-20">
      <Link href="/">
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="r-k200y r-1cvl2hr r-4qtqp9 r-yyyyoo r-5sfk15 r-dnmrzs r-kzbkwu r-bnwqim r-1plcrui r-lrvibr h-10 w-10 self-start fill-sky-500"
        >
          <g>
            <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path>
          </g>
        </svg>
      </Link>
      <h1 className="text-4xl font-bold">지금 일어나고 있는 일</h1>
      <h2 className="text-2xl font-bold">트윗에서 확인하세요.</h2>
      <form onSubmit={handleSubmit(onValid)}>
        <div>
          <input
            placeholder="이메일을 입력하세요"
            className="appearance-none w-full px-3 py-2 border border-gray-300 rounded-2xl shadow-sm 
        placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500"
            type="email"
            {...register("email", { required: true })}
          />
        </div>
        <button
          type="submit"
          className="mt-5 w-full rounded-2xl bg-sky-500 px-3 py-2 
        font-semibold text-white shadow-sm hover:bg-sky-400 transition"
        >
          로그인 하기
        </button>
      </form>
    </div>
  );
};

//rgb(29, 155, 240)
