<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Category>
 */
class CategoryFactory extends Factory
{
    public function definition(): array
    {
        $nama = $this->faker->unique()->words(2, true); // contoh: "Tech News"
        return [
            'nama' => $nama,
            'slug' => Str::slug($nama),
        ];
    }
}
// This factory generates unique category names and their corresponding slugs.