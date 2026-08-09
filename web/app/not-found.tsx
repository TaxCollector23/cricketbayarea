import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <h1 className="text-2xl font-semibold">Page not found</h1>
      <p className="mt-2 text-neutral-600">
        We could not find the page you were looking for.
      </p>
      <Link
        href="/"
        className="mt-6 inline-block text-sm underline underline-offset-2"
      >
        Return home
      </Link>
    </div>
  );
}
