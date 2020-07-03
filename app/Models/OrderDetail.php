<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrderDetail extends Model
{
    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    public function productDetail()
    {
        return $this->belongsTo(ProductDetail::class);
    }
}
