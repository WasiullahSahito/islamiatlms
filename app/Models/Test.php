<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Test extends Model
{
    protected $fillable = ['title', 'course_id', 'available_from'];

    public function questions()
    {
        return $this->hasMany(Question::class);
    }

    public function scores()
    {
        return $this->hasMany(TestScore::class);
    }
}
