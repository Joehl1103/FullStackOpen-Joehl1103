import { recipes } from "./data.js";

export default function RecipeList() {
  
  return (
    <div>
      <h1>Recipes</h1>
      {recipes.map(recipe => {
        return (
        <div key={recipe.id}>
          <h2>{recipe.name}</h2>
          <h3>Ingredients</h3>
          <ul>
            {recipe.ingredients.map(ingredient => {
              console.log(ingredient)
            return (
              <li key={ingredient}>{ingredient}</li>
            )
            })}
          </ul>
        </div>
        )
    })}
    </div>
  );
}
