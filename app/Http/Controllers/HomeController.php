<?php

namespace App\Http\Controllers;

use App\Models\Artikel;
use App\Models\Category;
use App\Models\Media;
use App\Models\Tag;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
     public function index()
    {
        $posts = Artikel::with('category', 'user')
            ->where('status', 'published')
            ->latest('published_at')
            ->paginate(10);
        $media = Media::with('uploader')
            ->latest()
            ->take(6)
            ->get();
        $categories = Category::all();
        return Inertia::render('Home', [
            'artikels' => $posts,
            'categories' => $categories,
            'tags' => Tag::all(),
            'media' => $media,
            
        ]);
    }
}
