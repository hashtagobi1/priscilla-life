import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-8 px-4">
        <h1 className="text-5xl md:text-7xl font-bold">Priscilla</h1>
        <p className="text-xl md:text-2xl text-muted-foreground">
          Music • Host • Food • Social
        </p>
        <div className="flex flex-wrap gap-4 justify-center mt-12">
          <Link
            href="/music"
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition"
          >
            Music
          </Link>
          <Link
            href="/host"
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition"
          >
            Host
          </Link>
          <Link
            href="/food"
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition"
          >
            Food
          </Link>
          <Link
            href="/social"
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition"
          >
            Social
          </Link>
        </div>
      </div>
    </div>
  )
}


