<?php

use App\Http\Controllers\ArtikelController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\ErrController;
use App\Http\Controllers\ProfileController;
use App\Models\Artikel;
use App\Models\Category;
use App\Models\Tag;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::get('/', [ArtikelController::class, 'index'])->name('Home');
Route::get('/artikel/{slug}', [ArtikelController::class, 'show']);
Route::post('/artikel/komentar', [CommentController::class, 'store']);
Route::get('/artikel/kategori/{slug}', [CategoryController::class, 'show']);


Route::get('/search', [ArtikelController::class, 'search'])->name('articles.search');
Route::fallback([ErrController::class, 'notFound']);
Route::get('/error-500', [ErrController::class, 'ServerError']);

Route::get('/Technovate-profile', function () {
    return Inertia::render('CompanyProfile', [
        'categories' => Category::all(),
    ]);
});







// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth',  'verified')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::post('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
