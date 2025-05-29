<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Artikel extends Model
{
    use HasFactory, SoftDeletes;
    protected $fillable = [
        'title',
        'slug',
        'excerpt',
        'content',
        'image',
        'status',
        'category_id',
        'user_id',
        'published_at',
        'is_featured',
    ];
    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'published_at' => 'datetime',
        'is_featured' => 'boolean',
    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function tags()
    {
        return $this->belongsToMany(Tag::class, 'artikeltags', 'artikel_id', 'tag_id');
    }
    
    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function getRouteKeyName()
    {
        return 'slug';
    }
    public function getGambarUrlAttribute()
    {
        return asset('storage/' . $this->gambar);
    }

    public function getCreatedAtFormattedAttribute()
    {
        return $this->created_at->format('d M Y H:i');
    }

    public function getUpdatedAtFormattedAttribute()
    {
        return $this->updated_at->format('d M Y H:i');
    }

    public function scopeSearch($query, $keyword)
    {
        return $query->where('judul', 'like', '%' . $keyword . '%')
            ->orWhere('isi', 'like', '%' . $keyword . '%');
    }
}
