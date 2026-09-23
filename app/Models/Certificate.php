<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Certificate extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'uuid',
        'recipient_name',
        'email',
        'webinar_title',
        'webinar_date',
        'speaker_name',
        'speaker_signature_path',
        'speaker_role',
        'coordinator_name',
        'coordinator_signature_path',
        'coordinator_role',
        'issued_by',
    ];

    /**
     * The attributes that should be cast.
     */
    protected $casts = [
        'webinar_date' => 'date',
    ];

    /**
     * Boot the model — auto-generate UUID on creation.
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($certificate) {
            if (empty($certificate->uuid)) {
                $certificate->uuid = Str::uuid()->toString();
            }
        });
    }

    /**
     * Use UUID for route model binding instead of primary key.
     */
    public function getRouteKeyName(): string
    {
        return 'uuid';
    }

    /**
     * The user (admin) who issued this certificate.
     */
    public function issuer()
    {
        return $this->belongsTo(User::class, 'issued_by');
    }
}
