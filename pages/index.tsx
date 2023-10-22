import { useRouter } from "next/router";
import React, { Suspense, useEffect, useState } from "react";
import useSWR from "swr";
import { useForm } from "react-hook-form";
import { Tweet, User } from "@prisma/client";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import Loader from "@/components/Loader";

interface ITweetWithUser extends Tweet {
  user: User;
}

interface ITweetData {
  ok: boolean;
  allTweet: ITweetWithUser[];
}

export default () => {
  const router = useRouter();
  const { data: userData, error } = useSWR("/api/users/home");
  const { data: tweets, mutate } = useSWR<ITweetData>("/api/tweets");
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);

  const onValid = async (data: any) => {
    if (!loading) {
      setLoading(true);

      try {
        const request = await fetch("/api/tweets", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (request.status === 201) {
          mutate();
          reset();
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    reset();
  };

  useEffect(() => {
    if (error) {
      router.replace("/create");
      console.log(error);
    }
  }, [router, error]);

  if (!tweets) {
    return <Loader />;
  }

  const onLogout = async () => {
    const request = await fetch("/api/users/logout", {
      method: "POST",
    });

    if (request.status === 200) {
      router.reload();
    } else {
      console.log("로그아웃 실패");
    }
  };

  return (
    <div className="mx-auto flex max-w-lg flex-col justify-center space-y-10 px-2 py-20">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">모든 트윗을 확인하세요</h1>
        <button
          onClick={onLogout}
          className="w-1/6 rounded-2xl bg-sky-400 font-semibold text-white  text-sm
    shadow-sm hover:bg-sky-300 transition"
        >
          로그아웃
        </button>
      </div>
      <div className="flex w-full items-center justify-between">
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="
           hover:scale-110
           transition
          r-k200y r-1cvl2hr r-4qtqp9 r-yyyyoo r-5sfk15 r-dnmrzs r-kzbkwu r-bnwqim r-1plcrui r-lrvibr h-10 w-10 self-start fill-sky-500"
        >
          <g>
            <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path>
          </g>
        </svg>
        <div className="text-sm">{`${userData ? userData?.name : "당신은...! "}로 로그인 되었습니다.`}</div>
      </div>
      {tweets?.allTweet?.length! > 0 ? (
        <div className="w-full  border-t-2 divide-y-2 border-b-2">
          {tweets?.allTweet.map((t) => (
            <div className="py-6" key={t.id}>
              <div className="flex justify-between">
                <h4 className="font-bold">
                  <Link className=" hover:text-gray-500" href={`/${t.user.name}/tweets`}>
                    {t.user.name}
                  </Link>
                </h4>
                <p className="test-xs">{formatDistanceToNow(new Date(t?.createdAt), { addSuffix: true })}</p>
              </div>
              <Link className=" hover:text-gray-400" href={`/tweet/${t.id}`}>
                <p>{t.text}</p>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center w-full h-80 space-y-2">
          <svg
            className="w-32 h-32"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-md font-semibold text-gray-700">아직 작성된 메세지가 없습니다.</p>
          <p className="text-lg font-bold text-gray-600">지금 트윗을 작성해보세요!</p>
        </div>
      )}
      {/* 트윗 입력 */}
      <form onClick={handleSubmit(onValid)} className="flex w-full gap-2">
        <textarea
          {...register("text", { required: true })}
          placeholder="무슨 일이 일어나고 있나요? 지금 공유하세요!"
          className="w-3/4 p-3 border border-gray-300 rounded-2xl shadow-sm placeholder-gray-400 
    focus:outline-none focus:ring-sky-500 focus:border-sky-500"
        ></textarea>
        <button
          type="submit"
          className="w-1/4 rounded-2xl bg-sky-500 px-3 py-2 font-semibold text-white 
    shadow-sm hover:bg-sky-400 transition"
        >
          트윗
        </button>
      </form>
    </div>
  );
};
