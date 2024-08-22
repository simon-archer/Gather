import { AppProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";

export default function App({ Component }: AppProps) {
  return (
    <>
      <Head>
        <title>Gather - Hunt Information</title>
        <link rel="stylesheet" href="/styles.css" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <Component />
    </>
  );
}
