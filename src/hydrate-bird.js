export default function hydrateBird(bird) {
const hydratedBird = 
    {
        id: bird.id,
        common: bird.common,
        scientific: bird.scientific,
        group: {
            id: bird.group_id,
            name: bird.group_name
        }
    }
return hydratedBird
}


