const Recipe = (props) =>{
    const recipe = props.recipe

    return(
        <div>
            <h2>{recipe.name}</h2>
            <ul>
            {recipe.ingredients.map(ingredient => 
               <li key={ingredient}>
                {ingredient}
               </li>
            )}
            </ul>

        </div>
    )
}

export default Recipe