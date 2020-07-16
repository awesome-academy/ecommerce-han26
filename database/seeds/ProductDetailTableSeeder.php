<?php

use App\Models\ProductDetail;
use Illuminate\Database\Seeder;

class ProductDetailTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(ProductDetail::class, 1000)->create();
    }
}
