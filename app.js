const { useState, useMemo } = React;

const foods = [
  {
    id: 1,
    name: 'Avocado Salad',
    category: 'Vegetables',
    calories: 180,
    protein: 4,
    fat: 14,
    carbs: 12,
    description: 'A fresh mix of avocado, greens, and citrus dressing.',
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 2,
    name: 'Berry Smoothie',
    category: 'Smoothies',
    calories: 220,
    protein: 6,
    fat: 3,
    carbs: 42,
    description: 'A nutrient-packed smoothie with berries and almond milk.',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    name: 'Grilled Salmon',
    category: 'Protein',
    calories: 320,
    protein: 28,
    fat: 18,
    carbs: 4,
    description: 'Lean salmon fillet grilled to perfection with herbs.',
    image: 'https://images.unsplash.com/photo-1514516870921-6f8c865e0a22?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 4,
    name: 'Quinoa Bowl',
    category: 'Whole Grains',
    calories: 290,
    protein: 10,
    fat: 9,
    carbs: 40,
    description: 'Colorful quinoa bowl loaded with veggies and seeds.',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 5,
    name: 'Greek Yogurt Parfait',
    category: 'Snacks',
    calories: 170,
    protein: 12,
    fat: 5,
    carbs: 18,
    description: 'Creamy yogurt layered with granola and fresh fruits.',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=60',
  },
];

const healthTips = [
  {
    title: 'Hydrate regularly',
    text: 'Drinking water supports digestion, energy, and overall wellness.',
  },
  {
    title: 'Choose whole foods',
    text: 'Fresh fruits, vegetables, and whole grains keep you fuller longer.',
  },
  {
    title: 'Balance your plate',
    text: 'Aim for protein, fiber, healthy fats, and plenty of color.',
  },
];

function FoodCard({ food }) {
  return (
    <article className="food-card">
      <img src={food.image} alt={food.name} />
      <div className="food-card-content">
        <h3>{food.name}</h3>
        <p>{food.description}</p>
        <span className="tag">{food.category}</span>
        <div className="badge">
          {food.calories} kcal • {food.protein}g protein
        </div>
      </div>
    </article>
  );
}

function FoodHealthApp() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');

  const categories = useMemo(
    () => ['All', ...Array.from(new Set(foods.map((item) => item.category)))],
    []
  );

  const filteredFoods = useMemo(() => {
    return foods.filter((food) => {
      const matchesQuery = food.name.toLowerCase().includes(query.toLowerCase()) ||
        food.description.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = category === 'All' || food.category === category;
      return matchesQuery && matchesCategory;
    });
  }, [query, category]);

  const summary = useMemo(() => {
    const total = filteredFoods.length;
    const calories = filteredFoods.reduce((sum, food) => sum + food.calories, 0);
    const protein = filteredFoods.reduce((sum, food) => sum + food.protein, 0);
    const carbs = filteredFoods.reduce((sum, food) => sum + food.carbs, 0);
    const fat = filteredFoods.reduce((sum, food) => sum + food.fat, 0);
    return { total, calories, protein, carbs, fat };
  }, [filteredFoods]);

  return (
    <div className="app-shell">
      <div className="header">
        <div>
          <h1>Food Health App</h1>
          <p>Discover balanced meals, track nutrition, and explore healthy recipes with your personalized food guide.</p>
        </div>
        <div className="card">
          <h3>Daily nutrition snapshot</h3>
          <div className="stats-grid">
            <div className="stat-box">
              <h3>Recipes</h3>
              <p>{summary.total}</p>
            </div>
            <div className="stat-box">
              <h3>Calories</h3>
              <p>{summary.calories}</p>
            </div>
            <div className="stat-box">
              <h3>Protein</h3>
              <p>{summary.protein}g</p>
            </div>
            <div className="stat-box">
              <h3>Carbs</h3>
              <p>{summary.carbs}g</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="controls">
          <input
            type="search"
            placeholder="Search meals, ingredients, or tips"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <select value={category} onChange={(event) => setCategory(event.target.value)}>
            {categories.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <button type="button" onClick={() => setQuery('')}>
            Reset filter
          </button>
        </div>

        <div className="food-grid">
          {filteredFoods.map((food) => (
            <FoodCard key={food.id} food={food} />
          ))}
        </div>

        {filteredFoods.length === 0 && (
          <p style={{ marginTop: '20px', color: '#4b5563' }}>
            No food items match your query. Try another search term or select a different category.
          </p>
        )}
      </div>

      <section className="health-tips">
        {healthTips.map((tip) => (
          <div key={tip.title} className="tip">
            <h4>{tip.title}</h4>
            <p>{tip.text}</p>
          </div>
        ))}
      </section>

      <footer>
        Built with HTML, CSS, JavaScript, and React.
      </footer>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<FoodHealthApp />);
