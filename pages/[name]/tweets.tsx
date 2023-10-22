import { useRouter } from "next/router";
import useSWR from "swr";
import Link from "next/link";
import Loader from "@/components/Loader";

export default () => {
  const router = useRouter();
  const { name } = router.query;
  const { data, mutate } = useSWR(`/api/users/${name}/tweets`);

  if (!data) {
    return <Loader />;
  }

  return (
    <div className="mx-auto flex max-w-lg flex-col justify-center space-y-5 px-2 py-20">
      <div className="flex w-full items-center justify-between">
        <Link href="/">
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="
            hover:scale-110
           transition r-k200y r-1cvl2hr r-4qtqp9 r-yyyyoo r-5sfk15 r-dnmrzs r-kzbkwu r-bnwqim r-1plcrui r-lrvibr h-10 w-10 self-start fill-sky-500"
          >
            <g>
              <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path>
            </g>
          </svg>
        </Link>
        <h1 className="text-3xl font-bold">{data?.userTweets[0].user.name}의 트윗 모아보기!</h1>
      </div>
      <div>
        <h3 className="text-2xl font-bold">{data?.name}</h3>
        <p className="mt-4 text-sm text-gray-600">
          가입일: {new Date(data?.userTweets[0].user.createdAt).toLocaleString()}
        </p>
      </div>
      <div className="w-full  border-t-2 divide-y-2 border-b-2">
        {data?.userTweets.map((t: any) => (
          <div key={t.id} className="py-6">
            <h4 className="font-bold">{t.user.name}</h4>
            <p>{t.text}</p>
            <div className="mt-5 flex justify-between">
              <p className="text-sm text-gray-600">작성일: {new Date(t.createdAt).toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
