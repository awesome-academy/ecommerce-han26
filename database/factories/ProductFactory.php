<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Product;
use Faker\Generator as Faker;

$factory->define(Product::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
        'status' => $faker->randomElement([0, 1]),
        'description' => $faker->paragraph(3, true),
    ];
});
