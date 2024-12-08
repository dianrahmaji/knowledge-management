import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

const greetingQueryOptions = queryOptions({
  queryKey: ["greeting"],
  queryFn: async (): Promise<{ message: string }> => {
    const response = await fetch("http://localhost:3000");
    return await response.json();
  },
});

export const Route = createFileRoute("/")({
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(greetingQueryOptions),
  component: Index,
});

function Index() {
  const { data } = useSuspenseQuery(greetingQueryOptions);
  return <div>{data.message}</div>;
}
