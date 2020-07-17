<?php

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $level0Id = Category::create([
            'en_name' => 'root_category_0',
            'vi_name' => 'danh_mục_gốc_0',
            'parent_id' => null,
            'level' => 0,
        ])->id;

        $enLevel1Categories = ['Clothing', 'Shoes', 'Accessories'];
        $viLevel1Categories = ['Quần áo', 'Dày dép', 'Phụ kiện'];
        $enLevel2Categories = [
            'Suits',
            'Dresses',
            'Hoodies & Sweats',
            'Jackets & Coats',
            'Jeans',
            'Pants & Leggings',
            'Rompers & Jumpsuits',
            'Shirts & Blouses',
            'Shirts',
            'Sweaters & Knits'
        ];
        $viLevel2Categories = [
            'Com lê',
            'Váy',
            'Thể thao',
            'Áo khoác',
            'Quần bò',
            'Quần bó',
            'Áo liền quần',
            'Áo sơ mi',
            'Áo',
            'Áo len'
        ];
        for ($i = 0; $i < 3; $i++) {
            $level1Id = Category::create([
                'en_name' => $enLevel1Categories[$i],
                'vi_name' => $viLevel1Categories[$i],
                'parent_id' => $level0Id,
                'level' => '1',
            ])->id;

            for ($j = 0; $j < 10; $j++) {
                Category::create([
                    'en_name' => $enLevel2Categories[$j],
                    'vi_name' => $viLevel2Categories[$j],
                    'parent_id' => $level1Id,
                    'level' => 2,
                ]);
            }
        }

        $productXCategory = [];
        $productIds = Product::pluck('id')->toArray();
        $categoryIds = Category::where('level', 2)->pluck('id')->toArray();

        $categoriesLength = count($categoryIds);
        $productXCategoryLength = count($productIds) * $categoriesLength;

        for ($k = 0; $k < $productXCategoryLength; $k++) {
            $productXCategory[] = $k;
        }

        for ($l = 0; $l < 1000; $l++) {
            $randProductXCategoryIndex = rand(0, $productXCategoryLength - 1);
            $randProductXCategory = $productXCategory[$randProductXCategoryIndex];
            $randProductId = $productIds[floor($randProductXCategory / $categoriesLength)];
            $randCategoryId = $categoryIds[$randProductXCategory % $categoriesLength];

            $randCategory = Category::find($randCategoryId);

            $randCategory->products()->attach($randProductId);

            while ($randCategory = $randCategory->category) {
                if ($randCategory->products()->wherePivot('product_id', $randProductId)->wherePivot('category_id', $randProductId)->count() === 0) {
                    $randCategory->products()->attach($randProductId);
                } else {
                    break;
                }
            }

            $productXCategory[$randProductXCategoryIndex] = $productXCategory[$productXCategoryLength - 1];
            $productXCategory[$productXCategoryLength - 1] = $randProductXCategory;
            $productXCategoryLength--;
        }
    }
}
