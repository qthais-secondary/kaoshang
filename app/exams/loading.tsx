export default function Loading() {
    console.log("Loading UI is rendering...")
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <main className="mx-auto flex max-w-7xl flex-1 flex-col px-6 py-8">
        <div className="flex flex-col flex-1">

          {/* TITLE SKELETON */}
          <div className="flex flex-col gap-2 p-4 mb-6">
            <div className="h-10 w-2/3 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
            <div className="h-4 w-1/2 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
          </div>

          {/* GRID SKELETON */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="rounded-2xl p-4 bg-white dark:bg-slate-800 shadow-sm"
              >
                <div className="h-32 bg-slate-200 dark:bg-slate-700 rounded-lg mb-4 animate-pulse" />
                <div className="h-5 w-3/4 bg-slate-200 dark:bg-slate-700 rounded mb-2 animate-pulse" />
                <div className="h-4 w-1/2 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
              </div>
            ))}
          </div>

        </div>
      </main>
    </div>
  )
}