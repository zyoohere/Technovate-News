<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Media extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'caption',
        'type',
        'media_path',
        'media_url',
        'is_featured',
        'uploaded_by',
    ];

    /**
     * Relasi ke user yang mengupload media.
     */
    public function uploader()
    {
        return $this->belongsTo(User::class, 'uploaded_by');
    }
}
