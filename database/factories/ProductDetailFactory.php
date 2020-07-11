<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Product;
use App\Models\ProductDetail;
use Faker\Generator as Faker;

$factory->define(ProductDetail::class, function (Faker $faker) {
    $userIds = Product::pluck('id')->toArray();

    return [
        'product_id' => $faker->randomElement($userIds),
        'price' => $faker->randomFloat(2, 50, 300),
        'size' => $faker->randomElement(['S', 'M', 'L', 'XL', 'XXL']),
        'color' => $faker->randomElement(['white', 'gray', 'black', 'blue', 'red', 'yellow', 'orange', 'brown', 'green', 'pupple']),
        'description' => $faker->paragraph(3, true),
    ];
});
