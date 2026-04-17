<?php

namespace App\Http\Controllers;

use App\Models\Enrollment;
use Illuminate\Http\Request;
use Stripe\Stripe;
use Stripe\Charge;

class PaymentController extends Controller
{
    public function purchaseCourse(Request $request)
    {
        $request->validate([
            'course_id' => 'required|string|in:igcse,olevel',
            'payment_method' => 'required|string|in:creditcard,bank,mezan,easypaisa,jazzcash',
            'amount' => 'required|numeric',
            // Token required for Stripe
            'stripe_token' => 'required_if:payment_method,creditcard,bank,mezan',
            // File required for manual transfers
            'proof_of_payment' => 'required_if:payment_method,easypaisa,jazzcash|file|mimes:jpg,jpeg,png,pdf|max:5120',
        ]);

        $user = $request->user();

        // Prevent duplicate successful enrollments
        $existing = Enrollment::where('user_id', $user->id)
            ->where('course_id', $request->course_id)
            ->where('payment_status', 'completed')
            ->first();

        if ($existing) {
            return response()->json(['message' => 'You are already enrolled in this course.'], 400);
        }

        $isStripeMethod = in_array($request->payment_method, ['creditcard', 'bank', 'mezan']);

        $enrollment = new Enrollment([
            'user_id' => $user->id,
            'course_id' => $request->course_id,
            'amount' => $request->amount,
            'payment_method' => $request->payment_method,
        ]);

        if ($isStripeMethod) {
            // === STRIPE LOGIC ===
            try {
                Stripe::setApiKey(env('STRIPE_SECRET'));

                $charge = Charge::create([
                    'amount' => $request->amount * 100, // Stripe expects amount in cents
                    'currency' => 'usd',
                    'source' => $request->stripe_token,
                    'description' => "Course Purchase: {$request->course_id} by {$user->email}",
                ]);

                $enrollment->stripe_transaction_id = $charge->id;
                $enrollment->payment_status = 'completed'; // Auto-approve Stripe
                $enrollment->save();

                return response()->json([
                    'message' => 'Payment successful via Stripe!',
                    'enrollment' => $enrollment
                ]);
            } catch (\Exception $e) {
                return response()->json([
                    'message' => 'Stripe Payment Failed',
                    'error' => $e->getMessage()
                ], 400);
            }
        } else {
            // === EASYPAISA / JAZZCASH LOGIC ===
            if ($request->hasFile('proof_of_payment')) {
                // Store file in storage/app/public/payment_proofs
                $filePath = $request->file('proof_of_payment')->store('payment_proofs', 'public');
                $enrollment->proof_of_payment = $filePath;
            }

            $enrollment->payment_status = 'pending'; // Requires Instructor/Admin approval
            $enrollment->save();

            return response()->json([
                'message' => 'Proof of payment submitted successfully. Your enrollment is pending approval.',
                'enrollment' => $enrollment
            ]);
        }
    }
}
