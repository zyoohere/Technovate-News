<?php

namespace App\Http\Controllers;

use App\Models\Media;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MediaController extends Controller
{
    public function index()
    {
        $media = Media::with('uploader')->latest()->get();

        return Inertia::render('Media/Index', [
            'media' => $media,
            'categories' => \App\Models\Category::all(),
        ]);
    }
}
