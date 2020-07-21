<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $hidden = [
        'parent_id',
        'level',
        'created_at',
        'updated_at',
        'pivot',
    ];

    public function categories()
    {
        return $this->hasMany(Category::class, 'parent_id');
    }

    public function products()
    {
        return $this->belongsToMany(Product::class, 'product_category');
    }

    public function category()
    {
        return $this->belongsTo(Category::class, 'parent_id');
    }
}
