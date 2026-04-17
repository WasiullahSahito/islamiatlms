<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TestScore extends Model
{
    protected $fillable = ['user_id', 'test_id', 'score', 'raw_score'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function test()
    {
        return $this->belongsTo(Test::class);
    }
}
