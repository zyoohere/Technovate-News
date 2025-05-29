<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Tag>
 */
class TagFactory extends Factory
{
    public function definition(): array
    {
        $nama = $this->faker->unique()->word();
        return [
            'nama' => ucfirst($nama),
            'slug' => Str::slug($nama),
        ];
    }
}
