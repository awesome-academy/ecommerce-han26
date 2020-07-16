<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    public function productDetails()
    {
        return $this->hasMany(ProductDetail::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function images()
    {
        return $this->morphMany(Image::class, 'imageable');
    }

    public function categories()
    {
        return $this->belongsToMany(Category::class);
    }
}
