<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Tài khoản admin để quản trị
        User::create([
            'name'     => 'Admin',
            'email'    => 'admin@gmail.com',
            'password' => Hash::make('admin123'),
            'role'     => 'admin',
        ]);

        // Tài khoản phụ huynh mẫu để test
        User::create([
            'name'     => 'Mẹ Lan',
            'email'    => 'melan@gmail.com',
            'password' => Hash::make('123456'),
            'role'     => 'parent',
        ]);
    }
}
