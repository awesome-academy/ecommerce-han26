<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductDetail extends Model
{
    protected $hidden = [
        'description',
        'created_at',
        'updated_at',
    ];

    public function orderDetails()
    {
        return $this->hasMany(OrderDetail::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
