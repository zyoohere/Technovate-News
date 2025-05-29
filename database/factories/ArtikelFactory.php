<?php

namespace Database\Factories;

use App\Models\Artikel;
use App\Models\Category;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Artikel>
 */
class ArtikelFactory extends Factory
{
     protected $model = Artikel::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
         $title = $this->faker->sentence();
        return [
            'title' => $title,
            'slug' => Str::slug($title) . '-' . Str::random(5),
            'excerpt' => $this->faker->paragraph(),
            'content' => $this->faker->paragraphs(5, true),
            'image' => null, // Or use fake image path
            'status' => $this->faker->randomElement(['draft', 'published', 'pending']),
            'category_id' => Category::inRandomOrder()->first()?->id,
            'user_id' => User::factory(),
            'published_at' => $this->faker->optional()->dateTimeBetween('-1 month', 'now'),
            'is_featured' => $this->faker->boolean(20),
        ];
    }
}
