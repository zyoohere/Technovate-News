<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use App\Models\User;
use Inertia\Inertia;

class ProfileController extends Controller
{
    public function edit()
    {
        return Inertia::render('Profile/Edit', [
            'user' => Auth::user(),
            'categories' => \App\Models\Category::all(),
            'flash' => ['success' => session('success')],
        ]);
    }
    public function update(Request $request)
    {
        $user = User::find(Auth::id());

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|unique:users,email,' . $user->id,
            'password' => 'nullable|string|min:6|confirmed',
            'avatar' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('avatar')) {
            $path = $request->file('avatar')->store('avatars', 'public');
            $validated['avatar'] = $path;
        }

        if (!empty($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        } else {
            unset($validated['password']);
        }

        $user->update($validated);

        return redirect()->back()->with('success', 'Profile updated successfully.');
    }

    public function destroy()
    {
        $authUser = Auth::user();

        if ($authUser) {
            $user = \App\Models\User::find($authUser->id);
            if ($user) {
                $user->delete();
            }
        }

        Auth::logout();

        return redirect('/')->with('success', 'Account deleted.');
    }
}
