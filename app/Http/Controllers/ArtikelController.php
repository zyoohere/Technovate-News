<?php

namespace App\Http\Controllers;

use App\Models\Artikel;
use App\Models\Category;
use App\Models\Comment;
use App\Models\Tag;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ArtikelController extends Controller
{
    public function index()
    {
        $posts = Artikel::with('category', 'user')
            ->where('status', 'published')
            ->latest('published_at')
            ->paginate(10);
        $categories = Category::all();
        return Inertia::render('Home', [
            'artikels' => $posts,
            'categories' => $categories,
        ]);
    }

    public function show($slug)
    {
        $posts = Artikel::where('slug', $slug)
            ->with(['category', 'user'])
            ->firstOrFail();
        $categories = Category::all();
        $comments = Comment::with('user')
            ->where('artikel_id', $posts->id)
            ->where('status', 'approved')
            ->latest()
            ->get();
        $tags = Tag::whereHas('artikels', function ($query) use ($posts) {
            $query->where('artikel_id', $posts->id);
        })->get();
        $relatedArticles = Artikel::latest()->take(3)->with(['category', 'user'])->get();
        return Inertia::render('ArtikelPage', [
            'artikels' => $posts,
            'categories' => $categories,
            'comments' => $comments,
            'tags' => $tags,
            'relatedArticles' => $relatedArticles,
        ]);
    }

    public function search(Request $request)
    {
        $query = $request->input('q');

        $categories = Category::all();
        $articles = Artikel::with('category', 'user')
            ->where('status', 'published')
            ->where(function ($q) use ($query) {
                $q->where('title', 'like', "%{$query}%")
                    ->orWhere('content', 'like', "%{$query}%");
            })
            ->orderByDesc('published_at')
            ->paginate(10)
            ->appends(['q' => $query]);

        return Inertia::render('SearchPage', [
            'artikels' => $articles,
            'query' => $query,
            'categories' => $categories,
        ]);
    }
}
