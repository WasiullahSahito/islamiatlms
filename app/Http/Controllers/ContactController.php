<?php

namespace App\Http\Controllers;

use App\Models\ContactMessage;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function submit(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email',
            'message' => 'required|string'
        ]);

        $message = ContactMessage::create($request->all());

        return response()->json(['message' => 'Thank you for your message! We will get back to you soon.']);
    }
}
