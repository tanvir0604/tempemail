import EmailContainer from "@/components/EmailContainer";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

export default async function TempEmailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-4xl font-bold text-zinc-50">Temporary Email</h1>
          <p className="text-zinc-400">
            Disposable email address for temporary use
          </p>
        </div>

        <Suspense
          fallback={
            <div>
              <Skeleton className="h-22 w-full" />
              <Skeleton className="h-22 w-full" />
              <Skeleton className="h-22 w-full" />
              <Skeleton className="h-22 w-full" />
              <Skeleton className="h-22 w-full" />
            </div>
          }
        >
          <EmailContainer id={id} />
        </Suspense>
      </div>
    </div>
  );
}
