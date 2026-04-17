<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    protected $fillable = ['test_id', 'q_text', 'options', 'correct_option'];

    // This automatically handles converting the JSON options array to a PHP array and back
    protected $casts = [
        'options' => 'array'
    ];

    public function test()
    {
        return $this->belongsTo(Test::class);
    }
}
