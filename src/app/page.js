import Image from 'next/image'

async function getData() {
  const res = await fetch('http://localhost:3000/api/pokemon')
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
 
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}

export default async function Home() {

  const data = await getData();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {data.data.results.map(p => (
        <div key={p.id}>
          <h1>{p.name}</h1>
          <Image
            src={p.image}
            width={250}
            height={250}
            alt="Picture of the pokemon"
          >
          </Image>
        </div>
      ))}
    </main>
  )
}
