<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    public function categories()
    {
        return $this->hasMany(Category::class, 'parent_id');
    }

    public function products()
    {
        return $this->belongsToMany(Product::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class, 'parent_id');
    }
}
