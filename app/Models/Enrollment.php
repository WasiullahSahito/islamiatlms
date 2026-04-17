<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Enrollment extends Model
{
    protected $fillable = [
        'user_id',
        'course_id',
        'amount',
        'payment_method',
        'payment_status',
        'proof_of_payment',
        'stripe_transaction_id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
