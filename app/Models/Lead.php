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
        'business_type',
        'service_interest',
        'source',
        'utm_source',
        'utm_medium',
        'utm_campaign',
        'utm_term',
        'utm_content',
        'requirements',
        'conversation',
        'status',
        'consented_at',
    ];

    protected $casts = [
        'conversation' => 'array',
        'consented_at' => 'datetime',
    ];
}
