<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'avatar',
        'role',
        'status',
        'google_id',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'status' => 'boolean',
        ];
    }
    /**
     * Get the user's avatar URL.
     *
     * @return string
     */
    public function getAvatarUrlAttribute(): string
    {
        if ($this->avatar) {
            return asset('storage/' . $this->avatar);
        }

        return 'https://ui-avatars.com/api/?name=' . urlencode($this->name) . '&background=random';
    }
    /**
     * Get the user's full name.
     *
     * @return string
     */
    public function getFullNameAttribute(): string
    {
        return $this->name;
    }
    /**
     * Get the user's role.
     *
     * @return string
     */
    public function getRoleAttribute(): string
    {
        return $this->roles->first()->name ?? 'User';
    }
    /**
     * Check if the user is an admin.
     *
     * @return bool
     */
    public function isAdmin(): bool
    {
        return $this->hasRole('admin');
    }
    /**
     * Check if the user is a writer.
     *
     * @return bool
     */
    public function isWriter(): bool
    {
        return $this->hasRole('writer');
    }
    /**
     * Check if the user is a guest.
     *
     * @return bool
     */
    public function isGuest(): bool
    {
        return $this->hasRole('guest');
    }
}
