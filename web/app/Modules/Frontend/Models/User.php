<?php

namespace App\Modules\Frontend\Models;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    protected $table = 'user';
    public function getAuthPassword() {
        return $this->password_hash;
    }

    public function getAuthIdentifierName() {
        return $this->username;
    }


}