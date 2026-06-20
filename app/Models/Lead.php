<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Lead extends Model
{
    protected $fillable = [
        'name',
        'email',
        'phone',
        'company',
        'service_interest',
        'requirements',
        'conversation',
        'status',
    ];

    protected $casts = [
        'conversation' => 'array',
    ];
}
