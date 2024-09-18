import Link from "next/link";

export default function Success() {
  return (
    <div className="success flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-6xl">Success!</h1>
      <Link href="/" className="border-b text-xl">
        Go to home
      </Link>
    </div>
  );
}
