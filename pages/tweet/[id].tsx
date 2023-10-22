import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
import Link from "next/link";
import useMutation from "@/libs/client/useMutation";
import Loader from "@/components/Loader";

export default () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, mutate, error } = useSWR(`/api/users/tweet/${id}`); // tweet의 id
  const [isLiked, setIsLiked] = useState(data?.userTweet.isLiked);
  const [like, { loading }] = useMutation(`/api/tweets/${router?.query.id}/like`);

  if (!data) {
    return <Loader />;
  }

  const handleLike = async () => {
    if (loading) return;

    try {
      like({});
      setIsLiked(() => !isLiked);
      // Like의 상태 불러와서 업데이트 해줘야 정확할 것.
    } catch (error) {
      console.log("handleLike", error);
    }
  };

  return (
    <div className="mx-auto flex max-w-lg flex-col justify-center space-y-5 px-2 py-20">
      <div className="flex w-full items-center justify-between">
        <Link href="/">
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
        </Link>
        <h1 className="text-3xl font-bold">트윗 살펴보기</h1>
      </div>
      <div>
        <Link href={`/${data?.userTweet.user.name}/tweets`}>
          <h3 className="text-2xl font-bold text-gray-700 ">{data?.userTweet.user.name}</h3>
        </Link>
      </div>
      {/* 트윗 상세 */}
      <div className="w-full  border-t-2 divide-y-2 border-b-2">
        <div className="py-6">
          <h4 className="font-bold"></h4>
          <p className="text-gray-700">{data?.userTweet.text}</p>
          <div className="mt-5 flex justify-between">
            <p className="text-sm text-gray-600">작성일: {new Date(data?.userTweet.createdAt).toLocaleString()}</p>
            <button onClick={handleLike} className="mr-2">
              {isLiked ? (
                <svg
                  className="w-4 text-red-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  />
                </svg>
              ) : (
                <svg
                  className="w-4 hover:text-red-500 transition"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
