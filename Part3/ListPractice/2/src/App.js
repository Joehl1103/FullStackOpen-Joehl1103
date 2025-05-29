import { recipes } from './data.js';
import Recipe from './Recipe.jsx'

export default function RecipeList() {
  return (
    <div>
      <h1>Recipes</h1>
      {recipes.map(recipe =>
        <div key={recipe.id}>
        <Recipe
          recipe={recipe}
        />
       </div>
      )}
       
    </div>
  );
}
