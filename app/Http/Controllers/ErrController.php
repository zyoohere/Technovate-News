<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ErrController extends Controller
{
     public function notFound(Request $request)
    {
        return Inertia::render('Errors/Err404', [
            'categories' => Category::all(),
        ])->toResponse($request)->setStatusCode(404);
    }

     public function ServerError(Request $request)
    {
        return Inertia::render('Errors/ServerError', [
            'categories' => Category::all(),
        ])->toResponse($request)->setStatusCode(500);
    }
}
