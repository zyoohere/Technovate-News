<?php
namespace Database\Seeders;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Models\User;

class RoleAndPermissionSeeder extends Seeder
{
    public function run()
    {
        $permissions = [
            'view_any_article',
            'view_article',
            'create_article',
            'update_article',
            'delete_article',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        $admin = Role::firstOrCreate(['name' => 'admin']);
        $editor = Role::firstOrCreate(['name' => 'editor']);

        $admin->givePermissionTo(Permission::all());
        $editor->givePermissionTo([
            'view_any_article',
            'view_article',
            'update_article',
        ]);

        $user = User::first();
        $user->assignRole('admin');
    }
}
