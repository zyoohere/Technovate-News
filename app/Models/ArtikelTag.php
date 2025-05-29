<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ArtikelTag extends Model
{
    use HasFactory;

    protected $table = 'artikeltags';

    protected $fillable = [
        'artikel_id',
        'tag_id',
    ];
}
