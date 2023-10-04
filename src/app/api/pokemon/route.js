export async function GET(request) {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon', {
        headers: {
        'Content-Type': 'application/json'
        }
    })
    const data = await res.json()
    const allPromises = data.results.map(
        async (pokemon) => {
            const res = await fetch(pokemon.url, {
                headers: {
                'Content-Type': 'application/json'
                }
            })
            const data = await res.json()
            pokemon.id = data.id
            pokemon.type = data.types[0].type.name
            pokemon.image = data.sprites.other['official-artwork'].front_default
            
        }
    );
    await Promise.all(allPromises)
    return Response.json({ data })
}